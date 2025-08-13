// API Keys Configuration

// Default values that will be overridden by environment variables or backend
export const GOOGLE_API_KEY = 'AIzaSyBBShwAtgdAlsA1h3bPCIu_YLN9mAlrrVM';
export const GOOGLE_SEARCH_ENGINE_ID = '1747d7ab8e14241f9';

// Function to fetch API keys from backend
export const fetchApiKeys = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/chat/google-api');
    const data = await response.json();
    
    if (data.success && data.data) {
      // Store in localStorage for persistence
      if (data.data.apiKey) {
        localStorage.setItem('google_api_key', data.data.apiKey);
      }
      
      if (data.data.searchEngineId) {
        localStorage.setItem('google_search_engine_id', data.data.searchEngineId);
      }
      
      return {
        apiKey: data.data.apiKey,
        searchEngineId: data.data.searchEngineId
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching Google API keys:', error);
    return null;
  }
};

// Get API keys from localStorage
export const getStoredApiKeys = () => {
  return {
    apiKey: localStorage.getItem('google_api_key') || GOOGLE_API_KEY,
    searchEngineId: localStorage.getItem('google_search_engine_id') || GOOGLE_SEARCH_ENGINE_ID
  };
};