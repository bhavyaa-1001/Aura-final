import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CTEChatbotPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', content: 'Hello! I\'m your CTE Assistant. How can I help you with your Consent to Establish application today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { sender: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      const botResponses = {
        'application': 'To apply for CTE, you need to submit Form-1 along with required documents including site plan, project report, and processing fee. Would you like me to guide you through each requirement?',
        'documents': 'For CTE application, you need to submit: 1) Site plan, 2) Project report, 3) NOC from land-owning agency, 4) Proof of water source, 5) Effluent treatment plan. Do you need details on any specific document?',
        'fee': 'The processing fee for CTE depends on your industry category. Small-scale industries: ₹10,000, Medium-scale: ₹25,000, Large-scale: ₹1,00,000. How can I help you calculate the appropriate fee?',
        'timeline': 'The standard processing time for CTE applications is 60 days from the date of submission of complete documents. However, this may vary based on the complexity of your project.',
        'status': 'To check your application status, please provide your application reference number, and I can look it up for you.',
      };

      // Simple keyword matching (would be replaced with actual NLP in production)
      let botResponse = 'I\'m not sure I understand. Could you please rephrase your question about the CTE process?';
      
      Object.entries(botResponses).forEach(([keyword, response]) => {
        if (userMessage.content.toLowerCase().includes(keyword)) {
          botResponse = response;
        }
      });

      setMessages(prev => [...prev, { sender: 'bot', content: botResponse }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-800 rounded-lg shadow-xl overflow-hidden border border-blue-500/20"
        >
          <div className="p-4 bg-slate-700 border-b border-blue-500/20 flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2 animate-pulse"></div>
            <h2 className="text-xl font-semibold">Personalised CTE Chatbot</h2>
          </div>
          
          <div className="h-96 overflow-y-auto p-4 space-y-4" id="chat-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-3/4 rounded-lg px-4 py-2 ${message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-700 text-slate-200'}`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 rounded-lg px-4 py-2 text-slate-200">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-blue-500/20">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about CTE application process..."
                className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors duration-300 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </motion.div>
        
        <div className="mt-8 bg-slate-800 rounded-lg p-6 border border-blue-500/20">
          <h3 className="text-xl font-semibold mb-4">Common CTE Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SuggestionButton text="What documents do I need for CTE application?" onClick={() => {
              setInput("What documents do I need for CTE application?");
            }} />
            <SuggestionButton text="What is the application fee?" onClick={() => {
              setInput("What is the application fee?");
            }} />
            <SuggestionButton text="How long does the process take?" onClick={() => {
              setInput("How long does the process take?");
            }} />
            <SuggestionButton text="How do I check my application status?" onClick={() => {
              setInput("How do I check my application status?");
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const SuggestionButton = ({ text, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="text-left p-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-200 transition-colors duration-300 border border-blue-500/10 hover:border-blue-500/30"
  >
    {text}
  </motion.button>
);

export default CTEChatbotPage;