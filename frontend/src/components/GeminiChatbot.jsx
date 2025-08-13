import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GOOGLE_API_KEY, GOOGLE_SEARCH_ENGINE_ID } from '../config/apiKeys';

const GeminiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [apiKey, setApiKey] = useState(localStorage.getItem('google_api_key') || GOOGLE_API_KEY);
  const [searchEngineId, setSearchEngineId] = useState(localStorage.getItem('google_search_engine_id') || GOOGLE_SEARCH_ENGINE_ID);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  
  // Fetch API keys from backend on component mount
  useEffect(() => {
    const fetchKeys = async () => {
      try {
        // Use the full URL including the port where the backend is running
        const response = await fetch('http://localhost:5000/api/chat/google-api');
        const data = await response.json();
        
        if (data.success && data.data) {
          if (data.data.apiKey) {
            setApiKey(data.data.apiKey);
            localStorage.setItem('google_api_key', data.data.apiKey);
          }
          
          if (data.data.searchEngineId) {
            setSearchEngineId(data.data.searchEngineId);
            localStorage.setItem('google_search_engine_id', data.data.searchEngineId);
          }
          
          setShowApiKeyInput(false);
        } else {
          // If backend doesn't provide keys, check if we have them in localStorage
          const storedApiKey = localStorage.getItem('google_api_key');
          const storedSearchEngineId = localStorage.getItem('google_search_engine_id');
          
          if (!storedApiKey || !storedSearchEngineId) {
            setShowApiKeyInput(true);
          }
        }
      } catch (error) {
        console.error('Error fetching API keys:', error);
        // If fetch fails, check if we have keys in localStorage
        const storedApiKey = localStorage.getItem('google_api_key');
        const storedSearchEngineId = localStorage.getItem('google_search_engine_id');
        
        if (!storedApiKey || !storedSearchEngineId) {
          setShowApiKeyInput(true);
        }
      }
    };
    
    fetchKeys();
  }, []);
  const [systemPrompt, setSystemPrompt] = useState(
    localStorage.getItem('gemini_system_prompt') || 
    'You are a helpful assistant that can answer questions on any topic. You provide concise, accurate, and helpful information.'
  );
  const [showSettings, setShowSettings] = useState(false);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const saveApiKey = () => {
    if (apiKey.trim() && searchEngineId.trim()) {
      localStorage.setItem('google_api_key', apiKey.trim());
      localStorage.setItem('google_search_engine_id', searchEngineId.trim());
      setShowApiKeyInput(false);
    }
  };

  const saveSystemPrompt = () => {
    localStorage.setItem('gemini_system_prompt', systemPrompt);
    localStorage.setItem('google_api_key', apiKey.trim());
    localStorage.setItem('google_search_engine_id', searchEngineId.trim());
    setShowSettings(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !apiKey || !searchEngineId) return;

    // Add user message to chat
    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Use Google Custom Search API to search for the query
      const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(input)}`;
      
      const response = await fetch(searchUrl);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'Google Search API error');
      }
      
      // Format search results into a readable response
      let botResponse = 'Here are the search results:\n\n';
      
      if (data.items && data.items.length > 0) {
        // Add search information
        botResponse += `Found about ${data.searchInformation.formattedTotalResults} results (${data.searchInformation.formattedSearchTime} seconds)\n\n`;
        
        // Add top 3 results
        data.items.slice(0, 3).forEach((item, index) => {
          botResponse += `${index + 1}. **${item.title}**\n`;
          botResponse += `${item.snippet}\n`;
          botResponse += `[${item.displayLink}](${item.link})\n\n`;
        });
      } else {
        botResponse = 'No search results found for your query.';
      }

      // Add bot response to chat
      const botMessage = {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling Google Search API:', error);
      
      // Add error message to chat
      const errorMessage = {
        text: `Error: ${error.message || 'Failed to connect to Google Search API'}`,
        sender: 'bot',
        timestamp: new Date(),
        isError: true,
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat toggle button */}
      {!isOpen && (
        <motion.button
          onClick={toggleChat}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </motion.button>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-white rounded-lg shadow-xl w-80 sm:w-96 flex flex-col overflow-hidden"
            style={{ height: '500px' }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chat header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 flex justify-between items-center">
              <div className="flex items-center">
                <h3 className="font-medium">Ask a Question</h3>
                <span className="ml-2 bg-blue-400 text-xs px-2 py-0.5 rounded-full font-medium">Google Search</span>
              </div>
              <div className="flex items-center">
                <motion.button 
                  onClick={() => setShowSettings(!showSettings)} 
                  className="text-white hover:text-gray-200 mr-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </motion.button>
                <motion.button 
                  onClick={toggleChat} 
                  className="text-white hover:text-gray-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">Chatbot Settings</h4>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Google API Key</label>
                  <div className="flex">
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Enter your Google API key"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Get your API key from <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a></p>
                </div>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Search Engine ID</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={searchEngineId}
                      onChange={(e) => setSearchEngineId(e.target.value)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Enter your Search Engine ID"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Get your Search Engine ID from <a href="https://programmablesearchengine.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Programmable Search Engine</a></p>
                </div>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">System Prompt</label>
                  <textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    rows="4"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Enter system instructions for the AI"
                  />
                  <p className="text-xs text-gray-500 mt-1">This sets the AI's behavior and knowledge context</p>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={saveSystemPrompt}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            )}

            {/* API Key Input */}
            {showApiKeyInput && !showSettings && (
              <div className="p-4 bg-yellow-50 border-b border-yellow-100">
                <p className="text-sm text-gray-700 mb-2">Please enter your Google API key and Search Engine ID:</p>
                <div className="mb-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Google API Key</label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Enter your Google API key"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Search Engine ID</label>
                  <input
                    type="text"
                    value={searchEngineId}
                    onChange={(e) => setSearchEngineId(e.target.value)}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Enter your Search Engine ID"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={saveApiKey}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Get your API key from <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a> and Search Engine ID from <a href="https://programmablesearchengine.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Programmable Search Engine</a></p>
              </div>
            )}

            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-gray-500">Search for anything to get started!</p>
                  <p className="text-xs text-gray-400 mt-1">Powered by Google Search API</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-4 py-2 ${message.sender === 'user'
                          ? 'bg-blue-100 text-gray-800'
                          : message.isError
                            ? 'bg-red-100 text-red-800'
                            : 'bg-white border border-gray-200 text-gray-800'
                          }`}
                      >
                        <p className="whitespace-pre-wrap">{message.text}</p>
                        {message.timestamp && (
                          <p className="text-xs text-gray-500 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Chat input */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Type your message..."
                  disabled={isLoading || showApiKeyInput}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim() || showApiKeyInput}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GeminiChatbot;