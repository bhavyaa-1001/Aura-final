const Document = require('../models/Document');
const path = require('path');

// @desc    Upload a document
// @route   POST /api/documents
// @access  Private
exports.uploadDocument = async (req, res) => {
  try {
    // Check if file exists in the request
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    const { title, description, department } = req.body;
    
    // In a real app, userId would come from auth middleware
    const userId = req.body.userId || '64f5a7b2c7d4d8e9f0a1b2c3'; // Placeholder ID
    
    // Get file type from extension
    const fileExt = path.extname(req.file.originalname).toLowerCase().substring(1);
    let fileType = 'other';
    
    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExt)) {
      fileType = 'image';
    } else if (fileExt === 'pdf') {
      fileType = 'pdf';
    } else if (['doc', 'docx', 'txt'].includes(fileExt)) {
      fileType = 'doc';
    }
    
    // Create document in database
    const document = await Document.create({
      title,
      description,
      fileUrl: req.file.path,
      fileType,
      department: department || 'general',
      originalName: req.file.originalname,
      fileSize: req.file.size,
      mimetype: req.file.mimetype,
      user: userId
    });
    
    res.status(201).json({
      success: true,
      data: document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get all documents for a user
// @route   GET /api/documents
// @access  Private
exports.getDocuments = async (req, res) => {
  try {
    // In a real app, userId would come from auth middleware
    const userId = req.query.userId || '64f5a7b2c7d4d8e9f0a1b2c3'; // Placeholder ID
    
    const documents = await Document.find({ user: userId });
    
    res.status(200).json({
      success: true,
      count: documents.length,
      data: documents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get a single document
// @route   GET /api/documents/:id
// @access  Private
exports.getDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Verify a document (simulate AI verification)
// @route   PUT /api/documents/:id/verify
// @access  Private
exports.verifyDocument = async (req, res) => {
  try {
    let document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }
    
    // Simulate AI verification process
    const verificationResults = {
      verified: Math.random() > 0.2, // 80% chance of verification success
      score: Math.floor(Math.random() * 100),
      issues: [],
      timestamp: new Date()
    };
    
    if (!verificationResults.verified) {
      verificationResults.issues.push('Missing required information');
      document.status = 'rejected';
    } else {
      document.status = 'verified';
    }
    
    document.verificationResults = verificationResults;
    await document.save();
    
    res.status(200).json({
      success: true,
      data: document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};