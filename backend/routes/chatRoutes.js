const express = require('express');
const { sendMessage, getChatHistory, getApiKey, getOpenAIApiKey, testOpenAI, getGoogleApi, testGoogleSearch } = require('../controllers/chatController');

const router = express.Router();

router.post('/message', sendMessage);
router.get('/history', getChatHistory);
router.get('/apikey', getApiKey);
router.get('/openai-apikey', getOpenAIApiKey);
router.get('/google-api', getGoogleApi);
router.get('/test-openai', testOpenAI);
router.get('/test-google-search', testGoogleSearch);

module.exports = router;