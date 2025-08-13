import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [verificationResults, setVerificationResults] = useState(null);
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFileType(selectedFile.type);
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setFileName(droppedFile.name);
      setFileType(droppedFile.type);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file || !title || !description || !department) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsUploading(true);
    
    // Create form data for file upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('department', department);
    
    try {
      // Set up progress tracking
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) { // Only go to 95% until we get server response
            clearInterval(interval);
            return 95;
          }
          return prev + 5;
        });
      }, 200);
      
      // Send to backend API
      const response = await fetch('/api/documents', {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header, browser will set it with boundary for FormData
      });
      
      clearInterval(interval);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }
      
      const data = await response.json();
      
      setUploadProgress(100);
      setUploadComplete(true);
      setIsUploading(false);
      
      // Start verification process
      simulateVerification();
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Upload failed: ${error.message}`);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };
  
  const simulateVerification = () => {
    setVerificationInProgress(true);
    
    // Simulate AI verification process
    setTimeout(() => {
      // Generate mock verification results
      const results = {
        score: Math.floor(Math.random() * 30) + 70, // Score between 70-99
        issues: [],
        recommendations: []
      };
      
      // Add some mock issues based on document type
      if (results.score < 85) {
        results.issues.push(
          'Section 3.2 contains ambiguous language that may not comply with current regulations',
          'Missing required disclosure statement in section 5'
        );
        results.recommendations.push(
          'Clarify language in section 3.2 to explicitly state compliance measures',
          'Add standard disclosure statement to section 5'
        );
      } else if (results.score < 95) {
        results.issues.push('Minor formatting inconsistencies detected');
        results.recommendations.push('Standardize formatting throughout document');
      }
      
      setVerificationResults(results);
      setVerificationInProgress(false);
      setVerificationComplete(true);
    }, 5000);
  };
  
  const resetForm = () => {
    setFile(null);
    setFileName('');
    setFileType('');
    setTitle('');
    setDescription('');
    setDepartment('');
    setUploadProgress(0);
    setUploadComplete(false);
    setVerificationInProgress(false);
    setVerificationComplete(false);
    setVerificationResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Document Upload</h1>
            <p className="text-slate-300 mt-1">Upload regulatory documents for AI verification</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Link to="/dashboard">
              <motion.button 
                className="px-4 py-2 rounded-lg bg-slate-700 text-white font-medium shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboard
                </span>
              </motion.button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-slate-800/50 rounded-xl p-6 border border-blue-500/20 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {!uploadComplete ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Document File</label>
                    <div 
                      className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors duration-300"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById('file-upload').click()}
                    >
                      <input 
                        type="file" 
                        id="file-upload" 
                        className="hidden" 
                        onChange={handleFileChange} 
                        accept=".pdf,.doc,.docx,.txt"
                      />
                      
                      {!file ? (
                        <div>
                          <svg className="w-12 h-12 mx-auto text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="mt-4 text-slate-300 font-medium">Drag and drop your file here, or click to browse</p>
                          <p className="mt-2 text-sm text-slate-400">Supports PDF, DOC, DOCX, and TXT files</p>
                        </div>
                      ) : (
                        <div>
                          <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-lg flex items-center justify-center">
                            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <p className="mt-4 text-slate-300 font-medium">{fileName}</p>
                          <p className="mt-2 text-sm text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          <button 
                            type="button"
                            className="mt-4 px-3 py-1 text-xs font-medium rounded-md bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors duration-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFile(null);
                              setFileName('');
                              setFileType('');
                            }}
                          >
                            Remove File
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">Document Title</label>
                      <input 
                        type="text" 
                        id="title" 
                        className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                        placeholder="Enter document title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="department" className="block text-sm font-medium text-slate-300 mb-2">Department</label>
                      <select 
                        id="department" 
                        className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                      >
                        <option value="" disabled>Select department</option>
                        <option value="Environmental Protection">Environmental Protection</option>
                        <option value="Labor Department">Labor Department</option>
                        <option value="Fire Department">Fire Department</option>
                        <option value="Industrial Safety">Industrial Safety</option>
                        <option value="Tax Authority">Tax Authority</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">Document Description</label>
                    <textarea 
                      id="description" 
                      className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white min-h-[120px]"
                      placeholder="Enter a brief description of the document"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <motion.button 
                      type="submit" 
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isUploading || !file}
                    >
                      {isUploading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Uploading...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          Upload Document
                        </span>
                      )}
                    </motion.button>
                  </div>
                  
                  {isUploading && (
                    <div className="mt-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-300">Uploading...</span>
                        <span className="text-sm font-medium text-blue-400">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2.5">
                        <motion.div 
                          className="bg-blue-500 h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                          transition={{ duration: 0.5 }}
                        ></motion.div>
                      </div>
                    </div>
                  )}
                </form>
              ) : (
                <div>
                  {verificationInProgress ? (
                    <div className="text-center py-8">
                      <div className="relative mx-auto w-24 h-24 mb-6">
                        <div className="w-24 h-24 border-4 border-blue-500/30 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-blue-400 mb-2">AI Verification in Progress</h3>
                      <p className="text-slate-300 mb-6">Our AI is analyzing your document for regulatory compliance</p>
                      
                      <div className="max-w-md mx-auto">
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-sm text-slate-300">Scanning document structure</span>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-sm text-slate-300">Analyzing content</span>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-blue-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <span className="text-sm text-slate-300">Checking regulatory compliance</span>
                          </div>
                          
                          <div className="flex items-center opacity-50">
                            <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <span className="text-sm text-slate-400">Generating recommendations</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : verificationComplete ? (
                    <div>
                      <div className="text-center mb-8">
                        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        
                        <h3 className="text-xl font-bold text-green-400 mb-2">Verification Complete</h3>
                        <p className="text-slate-300">Your document has been analyzed for regulatory compliance</p>
                      </div>
                      
                      <div className="bg-slate-700/50 rounded-lg p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-lg font-medium text-white">Compliance Score</h4>
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-2 font-bold text-lg"
                              style={{
                                color: verificationResults.score >= 90 ? '#10B981' : verificationResults.score >= 70 ? '#F59E0B' : '#EF4444',
                                backgroundColor: verificationResults.score >= 90 ? 'rgba(16, 185, 129, 0.2)' : verificationResults.score >= 70 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)'
                              }}
                            >
                              {verificationResults.score}
                            </div>
                            <span className="text-sm font-medium"
                              style={{
                                color: verificationResults.score >= 90 ? '#10B981' : verificationResults.score >= 70 ? '#F59E0B' : '#EF4444'
                              }}
                            >
                              {verificationResults.score >= 90 ? 'Excellent' : verificationResults.score >= 70 ? 'Good' : 'Needs Improvement'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="w-full bg-slate-800 rounded-full h-2.5 mb-6">
                          <div 
                            className={`h-2.5 rounded-full ${verificationResults.score >= 90 ? 'bg-green-500' : verificationResults.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${verificationResults.score}%` }}
                          ></div>
                        </div>
                        
                        {verificationResults.issues.length > 0 && (
                          <div className="mb-6">
                            <h4 className="text-md font-medium text-white mb-3">Issues Detected</h4>
                            <ul className="space-y-2">
                              {verificationResults.issues.map((issue, index) => (
                                <li key={index} className="flex items-start">
                                  <svg className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                  </svg>
                                  <span className="text-sm text-slate-300">{issue}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {verificationResults.recommendations.length > 0 && (
                          <div>
                            <h4 className="text-md font-medium text-white mb-3">Recommendations</h4>
                            <ul className="space-y-2">
                              {verificationResults.recommendations.map((recommendation, index) => (
                                <li key={index} className="flex items-start">
                                  <svg className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span className="text-sm text-slate-300">{recommendation}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-between">
                        <motion.button 
                          type="button" 
                          className="px-4 py-2 rounded-lg bg-slate-700 text-white font-medium shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={resetForm}
                        >
                          Upload Another Document
                        </motion.button>
                        
                        <motion.button 
                          type="button" 
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg shadow-blue-500/20"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Save to Dashboard
                        </motion.button>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </motion.div>
          </div>
          
          <div>
            <motion.div 
              className="bg-slate-800/50 rounded-xl p-6 border border-blue-500/20 shadow-xl sticky top-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-blue-300 mb-4">Upload Guidelines</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm">Supported File Types</h3>
                    <p className="text-sm text-slate-400 mt-1">PDF, DOC, DOCX, and TXT files are supported. Maximum file size is 10MB.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm">Document Quality</h3>
                    <p className="text-sm text-slate-400 mt-1">Ensure documents are clearly scanned and text is legible for best AI analysis results.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm">Processing Time</h3>
                    <p className="text-sm text-slate-400 mt-1">Document verification typically takes 30-60 seconds depending on file size and complexity.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm">Privacy & Security</h3>
                    <p className="text-sm text-slate-400 mt-1">All documents are encrypted and processed securely. We do not share your data with third parties.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <h3 className="font-medium text-blue-300 text-sm mb-2">Need Help?</h3>
                <p className="text-sm text-slate-400">If you have questions about document requirements or the verification process, contact our support team.</p>
                <button className="mt-3 px-4 py-2 w-full rounded-lg bg-blue-500/20 text-blue-300 font-medium hover:bg-blue-500/30 transition-colors duration-300 text-sm">
                  Contact Support
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;