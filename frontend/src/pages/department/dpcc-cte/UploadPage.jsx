import React, { useState } from 'react';
import { motion } from 'framer-motion';

const UploadPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [currentTab, setCurrentTab] = useState('upload');

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'pending',
        uploadDate: null
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
      
      // Simulate upload progress
      setUploading(true);
      newFiles.forEach(file => {
        const interval = setInterval(() => {
          setUploadedFiles(prev => {
            const updatedFiles = prev.map(f => {
              if (f.id === file.id) {
                const newProgress = f.progress + 10;
                if (newProgress >= 100) {
                  clearInterval(interval);
                  setUploading(false);
                  return { ...f, progress: 100, status: 'completed', uploadDate: new Date() };
                }
                return { ...f, progress: newProgress };
              }
              return f;
            });
            return updatedFiles;
          });
        }, 500);
      });
    }
  };

  const handleRemoveFile = (id) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Document Upload - DPCC (CTE)
          </h1>
          
          <p className="text-lg text-slate-300 mb-8">
            Upload required documents for your Consent to Establish (CTE) application with the Delhi Pollution Control Committee.
          </p>

          <div className="bg-slate-800 rounded-lg overflow-hidden border border-blue-500/20 shadow-xl">
            <div className="border-b border-blue-500/20">
              <nav className="flex -mb-px">
                <TabButton 
                  active={currentTab === 'upload'} 
                  onClick={() => setCurrentTab('upload')}
                  label="Upload Documents"
                />
                <TabButton 
                  active={currentTab === 'history'} 
                  onClick={() => setCurrentTab('history')}
                  label="Upload History"
                />
                <TabButton 
                  active={currentTab === 'requirements'} 
                  onClick={() => setCurrentTab('requirements')}
                  label="Document Requirements"
                />
              </nav>
            </div>

            <div className="p-6">
              {currentTab === 'upload' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Upload Documents</h2>
                    <p className="text-slate-400">Select and upload the required documents for your CTE application.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <DocumentUploadCard 
                      title="Site Plan"
                      description="Upload a detailed site plan showing the layout of your unit."
                      icon={<SiteIcon />}
                      onFileChange={handleFileChange}
                      acceptedFormats=".pdf,.jpg,.png"
                    />
                    
                    <DocumentUploadCard 
                      title="Project Report"
                      description="Upload a comprehensive project report with production capacity details."
                      icon={<ReportIcon />}
                      onFileChange={handleFileChange}
                      acceptedFormats=".pdf,.docx"
                    />
                    
                    <DocumentUploadCard 
                      title="NOC from Land-owning Agency"
                      description="Upload No Objection Certificate from the land-owning agency."
                      icon={<CertificateIcon />}
                      onFileChange={handleFileChange}
                      acceptedFormats=".pdf,.jpg,.png"
                    />
                    
                    <DocumentUploadCard 
                      title="Proof of Water Source"
                      description="Upload documents proving the source of water for your project."
                      icon={<WaterIcon />}
                      onFileChange={handleFileChange}
                      acceptedFormats=".pdf,.jpg,.png"
                    />
                    
                    <DocumentUploadCard 
                      title="Effluent Treatment Plan"
                      description="Upload your effluent treatment plan and waste management details."
                      icon={<TreatmentIcon />}
                      onFileChange={handleFileChange}
                      acceptedFormats=".pdf,.docx"
                    />
                    
                    <DocumentUploadCard 
                      title="Other Supporting Documents"
                      description="Upload any other supporting documents for your application."
                      icon={<DocumentIcon />}
                      onFileChange={handleFileChange}
                      acceptedFormats=".pdf,.jpg,.png,.docx"
                    />
                  </div>
                  
                  {uploadedFiles.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">Uploaded Files</h3>
                      <div className="space-y-4">
                        {uploadedFiles.map(file => (
                          <FileProgressCard 
                            key={file.id}
                            file={file}
                            onRemove={() => handleRemoveFile(file.id)}
                          />
                        ))}
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <button 
                          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300 disabled:opacity-50"
                          disabled={uploading || uploadedFiles.some(file => file.status !== 'completed')}
                        >
                          Submit All Documents
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {currentTab === 'history' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Upload History</h2>
                    <p className="text-slate-400">View your document upload history and status.</p>
                  </div>
                  
                  {uploadedFiles.filter(file => file.status === 'completed').length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-slate-700">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Document Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Size</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Upload Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                          {uploadedFiles
                            .filter(file => file.status === 'completed')
                            .map(file => (
                              <tr key={file.id} className="hover:bg-slate-700/50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400">{file.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                  {file.type.split('/')[1]?.toUpperCase() || file.type}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                  {(file.size / 1024).toFixed(2)} KB
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                  {file.uploadDate?.toLocaleString() || '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  <span className="px-2 py-1 rounded-full text-xs font-medium border bg-green-900/30 text-green-400 border-green-500/30">
                                    Uploaded
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                  <button className="text-blue-400 hover:text-blue-300 mr-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                  </button>
                                  <button className="text-blue-400 hover:text-blue-300">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-slate-400">No documents have been uploaded yet.</p>
                    </div>
                  )}
                </div>
              )}
              
              {currentTab === 'requirements' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Document Requirements</h2>
                    <p className="text-slate-400">Learn about the required documents for your CTE application.</p>
                  </div>
                  
                  <div className="space-y-6">
                    <RequirementCard 
                      title="Site Plan"
                      description="A detailed site plan showing the layout of your unit, including the location of machinery, storage areas, and effluent treatment facilities."
                      format="PDF, JPG, or PNG format"
                      size="Max 5MB"
                    />
                    
                    <RequirementCard 
                      title="Project Report"
                      description="A comprehensive project report with details of production capacity, manufacturing process, raw materials, water consumption, and waste generation."
                      format="PDF or DOCX format"
                      size="Max 10MB"
                    />
                    
                    <RequirementCard 
                      title="NOC from Land-owning Agency"
                      description="No Objection Certificate from the land-owning agency, confirming that the land can be used for the proposed industrial activity."
                      format="PDF, JPG, or PNG format"
                      size="Max 5MB"
                    />
                    
                    <RequirementCard 
                      title="Proof of Water Source"
                      description="Documents proving the source of water for your project, such as a water connection bill, borewell permission, or water supply agreement."
                      format="PDF, JPG, or PNG format"
                      size="Max 5MB"
                    />
                    
                    <RequirementCard 
                      title="Effluent Treatment Plan"
                      description="Detailed plan for the treatment of effluents and waste management, including the design of the effluent treatment plant if applicable."
                      format="PDF or DOCX format"
                      size="Max 10MB"
                    />
                  </div>
                  
                  <div className="mt-8 bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Important Information
                    </h3>
                    <p className="text-slate-300">
                      All documents must be clear, legible, and in the specified format. Incomplete or unclear documents may result in delays in processing your application.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors duration-300 ${active 
      ? 'border-blue-500 text-blue-400' 
      : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'}`}
  >
    {label}
  </button>
);

const DocumentUploadCard = ({ title, description, icon, onFileChange, acceptedFormats }) => (
  <div className="bg-slate-700 rounded-lg p-6 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
    <div className="text-blue-400 mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-slate-400 text-sm mb-4">{description}</p>
    <label className="flex items-center justify-center w-full p-3 border border-dashed border-slate-500 rounded-lg cursor-pointer hover:border-blue-400 transition-colors duration-300">
      <input 
        type="file" 
        className="hidden" 
        onChange={onFileChange}
        accept={acceptedFormats}
      />
      <div className="text-center">
        <svg className="w-6 h-6 text-slate-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <span className="text-sm text-slate-300">Click to upload</span>
        <p className="text-xs text-slate-500 mt-1">{acceptedFormats.replace(/\./g, '').toUpperCase()} (Max 5MB)</p>
      </div>
    </label>
  </div>
);

const FileProgressCard = ({ file, onRemove }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-900/30 text-green-400 border-green-500/30';
      case 'error': return 'bg-red-900/30 text-red-400 border-red-500/30';
      default: return 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30';
    }
  };
  
  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Uploaded';
      case 'error': return 'Failed';
      default: return 'Uploading';
    }
  };
  
  return (
    <div className="bg-slate-700 rounded-lg p-4 flex items-center">
      <div className="mr-4 text-slate-400">
        <DocumentIcon />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <div>
            <h4 className="text-sm font-medium text-slate-200">{file.name}</h4>
            <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(2)} KB</p>
          </div>
          <div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(file.status)}`}>
              {getStatusText(file.status)}
            </span>
          </div>
        </div>
        {file.status === 'pending' && (
          <div className="w-full bg-slate-600 rounded-full h-1.5 mt-2">
            <div 
              className="bg-blue-500 h-1.5 rounded-full" 
              style={{ width: `${file.progress}%` }}
            ></div>
          </div>
        )}
      </div>
      <button 
        onClick={onRemove}
        className="ml-4 text-slate-400 hover:text-red-400 transition-colors duration-300"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

const RequirementCard = ({ title, description, format, size }) => (
  <div className="bg-slate-700 rounded-lg p-6 border border-blue-500/10">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-slate-400 mb-4">{description}</p>
    <div className="flex space-x-4 text-sm">
      <div className="flex items-center text-slate-300">
        <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {format}
      </div>
      <div className="flex items-center text-slate-300">
        <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
        {size}
      </div>
    </div>
  </div>
);

// Icons
const SiteIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const ReportIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CertificateIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const WaterIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

const TreatmentIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export default UploadPage;