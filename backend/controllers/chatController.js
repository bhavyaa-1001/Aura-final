const Chat = require('../models/Chat');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { OpenAI } = require('openai');
const config = require('../config/config');

// In-memory chat storage as fallback when database is unavailable
const memoryChats = new Map();

// Initialize Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Configure the model with more robust settings
// Using the latest model name format for Gemini
const model = genAI.getGenerativeModel({ 
  model: 'gemini-1.5-pro',  // Updated from gemini-pro to gemini-1.5-pro
  generationConfig: {
    temperature: 0.7,
    topP: 0.8,
    topK: 40,
    maxOutputTokens: 1024,
  },
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    }
  ]
});


// @desc    Get Gemini API key
// @route   GET /api/chat/apikey
// @access  Public
exports.getApiKey = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        apiKey: process.env.GEMINI_API_KEY
      }
    });
  } catch (error) {
    console.error('Error retrieving API key:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get OpenAI API key
// @route   GET /api/chat/openai-apikey
// @access  Public
exports.getOpenAIApiKey = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        apiKey: process.env.OPENAI_API_KEY
      }
    });
  } catch (error) {
    console.error('Error retrieving OpenAI API key:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get Google API key and Search Engine ID
// @route   GET /api/chat/google-api
// @access  Public
exports.getGoogleApi = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        apiKey: process.env.GOOGLE_API_KEY,
        searchEngineId: process.env.SEARCH_ENGINE_ID
      }
    });
  } catch (error) {
    console.error('Error retrieving Google API key and Search Engine ID:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Test OpenAI API connection
// @route   GET /api/chat/test-openai
// @access  Public
exports.testOpenAI = async (req, res) => {
  try {
    // Test the OpenAI connection with a simple completion
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hello, OpenAI!" }],
    });

    res.status(200).json({
      success: true,
      data: {
        message: completion.choices[0].message.content,
        model: completion.model
      }
    });
  } catch (error) {
    console.error('Error testing OpenAI API:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
};

// @desc    Test Google Search API connection
// @route   GET /api/chat/test-google-search
// @access  Public
exports.testGoogleSearch = async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const searchEngineId = process.env.SEARCH_ENGINE_ID;
    const query = req.query.q || 'MERN stack';
    
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message || 'Google Search API error');
    }
    
    res.status(200).json({
      success: true,
      data: {
        items: data.items?.slice(0, 3) || [],
        searchInformation: data.searchInformation
      }
    });
  } catch (error) {
    console.error('Error testing Google Search API:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
};

// @desc    Create a new chat or add message to existing chat
// @route   POST /api/chat/message
// @access  Private
exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.body.userId || 'anonymous'; // Use anonymous if userId not provided

    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    let useMemoryStorage = false;
    let chat;

    // Try to use database storage first
    try {
      // Find existing chat for this user or create a new one
      chat = await Chat.findOne({ user: userId }).catch(err => {
        console.error('Error finding chat:', err);
        return null;
      });

      if (!chat) {
        // Create new chat
        chat = new Chat({
          user: userId,
          messages: [{
            sender: 'user',
            content: message
          }]
        });
      } else {
        // Add message to existing chat
        chat.messages.push({
          sender: 'user',
          content: message
        });
      }

      await chat.save();
    } catch (dbError) {
      console.error('Database error, using in-memory storage:', dbError);
      useMemoryStorage = true;
      
      // Use in-memory storage as fallback
      if (!memoryChats.has(userId)) {
        memoryChats.set(userId, {
          user: userId,
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      
      const memoryChat = memoryChats.get(userId);
      memoryChat.messages.push({
        sender: 'user',
        content: message,
        timestamp: new Date()
      });
      memoryChat.updatedAt = new Date();
    }

    // Generate AI response with error handling
    let systemResponse;
    try {
      systemResponse = await generateResponse(message);
    } catch (genError) {
      console.error('Error generating response:', genError);
      // Provide a more helpful fallback response
      systemResponse = "I'm sorry, I encountered an error processing your request. The Gemini API might be unavailable at the moment. I can help you with any questions you have, including topics about government documents, general knowledge, or any other subject you're curious about. Please try again with your question.";
    }
    
    // Save the AI response
    if (useMemoryStorage) {
      const memoryChat = memoryChats.get(userId);
      memoryChat.messages.push({
        sender: 'system',
        content: systemResponse,
        timestamp: new Date()
      });
      memoryChat.updatedAt = new Date();
    } else {
      try {
        // Add system response to database chat
        chat.messages.push({
          sender: 'system',
          content: systemResponse
        });
        
        chat.updatedAt = Date.now();
        await chat.save();
      } catch (saveError) {
        console.error('Error saving chat to database:', saveError);
        // Fall back to memory storage if database save fails
        if (!memoryChats.has(userId)) {
          memoryChats.set(userId, {
            user: userId,
            messages: [
              { sender: 'user', content: message, timestamp: new Date() },
              { sender: 'system', content: systemResponse, timestamp: new Date() }
            ],
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      }
    }

    res.status(200).json({
      success: true,
      data: {
        message: systemResponse
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get chat history for a user
// @route   GET /api/chat/history
// @access  Private
exports.getChatHistory = async (req, res) => {
  try {
    const userId = req.query.userId; // In a real app, this would come from auth middleware

    const chat = await Chat.findOne({ user: userId });

    if (!chat) {
      return res.status(200).json({
        success: true,
        data: { messages: [] }
      });
    }

    res.status(200).json({
      success: true,
      data: { messages: chat.messages }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Helper function to generate responses using Google's Gemini API
async function generateResponse(message) {
  try {
    // Create a system prompt with context about the application and government documents
    const systemPrompt = `You are a helpful assistant for the Aura document management system. While you specialize in government document processing, you can answer any question on any topic to the best of your ability.
    You help users with document uploads, verification status, detailed questions about government documents and rules, as well as any general knowledge questions they might have.
    
    DOCUMENT SYSTEM INFORMATION:
    - The system supports PDF, DOCX, JPG, and PNG formats with a maximum file size of 10MB.
    - Document verification typically takes 1-2 business days.
    - Users can check document status in the "My Documents" section.
    - For urgent requests or additional support, users can contact support@aura-project.com or call +1-800-AURA-HELP (9 AM - 5 PM EST).
    
    GOVERNMENT DOCUMENT KNOWLEDGE:
    
    PAN CARD:
    - Permanent Account Number (PAN) is a 10-character alphanumeric identifier issued by the Income Tax Department
    - Format: AAAPL1234C (5 letters, 4 numbers, 1 letter)
    - Required for financial transactions above ₹50,000
    - Application process takes 15-20 days
    - Can be applied online through NSDL or UTITSL websites
    - Required documents: proof of identity, address proof, and photograph
    
    AADHAAR CARD:
    - 12-digit unique identity number issued by UIDAI
    - Serves as proof of identity and address
    - Linked to biometric data (fingerprints, iris scan)
    - Can be updated online through the UIDAI website
    - Address changes require supporting documents
    - Virtual ID option available for enhanced security
    
    VOTER ID:
    - Also known as Election Photo Identity Card (EPIC)
    - Issued by the Election Commission of India
    - Required for voting in elections
    - Can be applied for by any Indian citizen above 18 years
    - Online application available through National Voter Service Portal
    
    PASSPORT:
    - Official travel document issued by the government
    - Valid for 10 years for adults, 5 years for minors
    - Regular and tatkal (expedited) application options available
    - Police verification required for first-time applicants
    - Online application through Passport Seva Portal
    
    DRIVING LICENSE:
    - Issued by Regional Transport Office (RTO)
    - Learning license valid for 6 months
    - Permanent license valid for 20 years
    - Online application available through Parivahan Sewa portal
    - Renewal must be done before expiration
    
    CTE APPLICATION:
    - Consent to Establish (CTE) is required for new industrial units before construction
    - Application fee varies from ₹10,000 to ₹50,000 depending on project size
    - Required documents: project report, land documents, site plan, process flow diagram
    - Processing time is typically 30-45 days
    - Validity period is usually 5 years from the date of issue
    - Can be applied online through the State Pollution Control Board portal
    
    DOCUMENT VERIFICATION RULES:
    - Original documents must be presented for physical verification
    - Self-attestation required on photocopies
    - Documents in regional languages need certified translation
    - Digital signatures accepted for certain online submissions
    - Foreign documents require Apostille or Embassy attestation
    
    User message: ${message}
    
    Provide a helpful, concise response with accurate information about government documents and rules.`;
    
    // Call Gemini API
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    
    // Return the generated response
    return response.text().trim();
  } catch (error) {
    console.error('Error generating response with Gemini:', error);
    // Enhanced fallback responses for various types of questions
    const lowerMessage = message.toLowerCase();
    
    // Government document specific fallbacks
    if (lowerMessage.includes('pan') || lowerMessage.includes('permanent account')) {
      return 'PAN (Permanent Account Number) is a 10-character alphanumeric identifier issued by the Income Tax Department. It follows the format AAAPL1234C and is required for financial transactions above ₹50,000. You can apply online through NSDL or UTITSL websites.';
    } else if (lowerMessage.includes('aadhaar') || lowerMessage.includes('aadhar')) {
      return 'Aadhaar is a 12-digit unique identity number issued by UIDAI that serves as proof of identity and address. It is linked to biometric data and can be updated online through the UIDAI website.';
    } else if (lowerMessage.includes('voter') || lowerMessage.includes('election')) {
      return 'Voter ID (EPIC) is issued by the Election Commission of India and is required for voting. Any Indian citizen above 18 years can apply through the National Voter Service Portal.';
    } else if (lowerMessage.includes('passport')) {
      return 'A passport is valid for 10 years for adults and 5 years for minors. You can apply through the Passport Seva Portal with regular or tatkal (expedited) options.';
    } else if (lowerMessage.includes('license') || lowerMessage.includes('driving')) {
      return 'Driving licenses are issued by the Regional Transport Office (RTO). A learning license is valid for 6 months, while a permanent license is valid for 20 years. You can apply online through the Parivahan Sewa portal.';
    } else if (lowerMessage.includes('cte') || lowerMessage.includes('consent to establish')) {
      return 'Consent to Establish (CTE) is required for new industrial units before construction. The application fee varies from ₹10,000 to ₹50,000 depending on project size. Required documents include project report, land documents, site plan, and process flow diagram.';
    } else if (lowerMessage.includes('cte application') || lowerMessage.includes('cte documents')) {
      return 'For a CTE application, you need to submit a project report, land documents, site plan, and process flow diagram. The application can be submitted online through the State Pollution Control Board portal.';
    } else if (lowerMessage.includes('fee') && (lowerMessage.includes('cte') || lowerMessage.includes('application'))) {
      return 'The CTE application fee varies from ₹10,000 to ₹50,000 depending on the size and category of your project. You can check the exact fee applicable to your project on the State Pollution Control Board website.';
    } else if (lowerMessage.includes('verification') || lowerMessage.includes('verify')) {
      return 'For document verification, original documents must be presented for physical verification. Self-attestation is required on photocopies, and documents in regional languages need certified translation.';
    }
    // General fallbacks
    else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! I can help you with any questions you have. Feel free to ask about government documents, general knowledge, or any other topic you\'re curious about.';
    } else if (lowerMessage.includes('document') || lowerMessage.includes('upload')) {
      return 'You can upload documents through the upload section. We support various document types including PDF, DOCX, JPG, and PNG with a maximum file size of 10MB.';
    } else {
      return 'I\'m here to help with any questions you might have. While I specialize in government documents like PAN, Aadhaar, Voter ID, Passport, or Driving License, I can try to assist with other topics as well. What would you like to know?';
    }
  }
}