const express = require('express');
const { uploadDocument, getDocuments, getDocument, verifyDocument } = require('../controllers/documentController');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/', upload.single('file'), uploadDocument);
router.get('/', getDocuments);
router.get('/:id', getDocument);
router.put('/:id/verify', verifyDocument);

module.exports = router;