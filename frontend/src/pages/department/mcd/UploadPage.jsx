import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MCDUploadPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [documentType, setDocumentType] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'pending',
        uploadDate: null,
        documentType: documentType
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
            Document Upload - MCD
          </h1>
          
          <p className="text-lg text-slate-300 mb-8">
            Upload required documents for your Municipal Corporation of Delhi (MCD) applications and approvals.
          </p>

          <div className="bg-slate-800 rounded-lg overflow-hidden border border-blue-500/20 shadow-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Select Document Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DocumentTypeButton 
                  label="Building Permit Documents"
                  active={documentType === 'building-permit'}
                  onClick={() => setDocumentType('building-permit')}
                  icon={<BuildingIcon />}
                />
                
                <DocumentTypeButton 
                  label="Trade License Documents"
                  active={documentType === 'trade-license'}
                  onClick={() => setDocumentType('trade-license')}
                  icon={<LicenseIcon />}
                />
                
                <DocumentTypeButton 
                  label="Property Tax Documents"
                  active={documentType === 'property-tax'}
                  onClick={() => setDocumentType('property-tax')}
                  icon={<TaxIcon />}
                />
                
                <DocumentTypeButton 
                  label="Health License Documents"
                  active={documentType === 'health-license'}
                  onClick={() => setDocumentType('health-license')}
                  icon={<HealthIcon />}
                />
                
                <DocumentTypeButton 
                  label="Business Registration"
                  active={documentType === 'business-registration'}
                  onClick={() => setDocumentType('business-registration')}
                  icon={<BusinessIcon />}
                />
                
                <DocumentTypeButton 
                  label="Other Documents"
                  active={documentType === 'other'}
                  onClick={() => setDocumentType('other')}
                  icon={<DocumentIcon />}
                />
              </div>
            </div>
            
            {documentType && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">
                  Upload {getDocumentTypeLabel(documentType)} Documents
                </h2>
                
                <div className="bg-slate-700 rounded-lg p-6 border border-blue-500/10 mb-6">
                  <div className="flex items-start">
                    <div className="text-blue-400 mr-4 mt-1">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Required Documents</h3>
                      <ul className="list-disc pl-5 space-y-1 text-slate-300 text-sm">
                        {getRequiredDocuments(documentType).map((doc, index) => (
                          <li key={index}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="border border-dashed border-slate-600 rounded-lg p-8 hover:border-blue-500/50 transition-all duration-300">
                  <label className="flex flex-col items-center justify-center cursor-pointer">
                    <svg className="w-12 h-12 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-lg font-medium text-slate-300 mb-1">Drag and drop files here</span>
                    <span className="text-sm text-slate-400">or click to browse</span>
                    <span className="text-xs text-slate-500 mt-2">PDF, JPG, PNG (Max 10MB per file)</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </label>
                </div>
              </div>
            )}
            
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
        </motion.div>
      </div>
    </div>
  );
};

const DocumentTypeButton = ({ label, active, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`p-4 rounded-lg border transition-all duration-300 flex items-center ${active 
      ? 'bg-blue-900/30 border-blue-500 text-blue-300' 
      : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-blue-500/50'}`}
  >
    <div className={`mr-3 ${active ? 'text-blue-400' : 'text-slate-400'}`}>
      {icon}
    </div>
    <span>{label}</span>
  </button>
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
            <div className="flex text-xs text-slate-400 space-x-2">
              <span>{(file.size / 1024).toFixed(2)} KB</span>
              {file.documentType && (
                <>
                  <span>•</span>
                  <span>{getDocumentTypeLabel(file.documentType)}</span>
                </>
              )}
            </div>
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

// Helper functions
const getDocumentTypeLabel = (type) => {
  switch(type) {
    case 'building-permit': return 'Building Permit';
    case 'trade-license': return 'Trade License';
    case 'property-tax': return 'Property Tax';
    case 'health-license': return 'Health License';
    case 'business-registration': return 'Business Registration';
    case 'other': return 'Other';
    default: return '';
  }
};

const getRequiredDocuments = (type) => {
  switch(type) {
    case 'building-permit':
      return [
        'Building plan/drawing (architectural plans)',
        'Structural stability certificate',
        'NOC from fire department',
        'Proof of property ownership',
        'Site photographs',
        'Previous sanction letter (for modifications)',
      ];
    case 'trade-license':
      return [
        'Proof of identity (Aadhaar/PAN)',
        'Proof of property ownership/rent agreement',
        'NOC from property owner (if rented)',
        'Business registration certificate',
        'Photographs of business premises',
        'Fire safety certificate (if applicable)',
      ];
    case 'property-tax':
      return [
        'Property ownership documents',
        'Previous tax receipts',
        'Property measurement details',
        'Electricity bill/connection proof',
        'Water connection proof',
        'Photographs of property',
      ];
    case 'health-license':
      return [
        'Food safety certificate (for food establishments)',
        'Medical certificates of staff',
        'Premises layout plan',
        'Pest control certificate',
        'Water testing report',
        'Waste disposal plan',
      ];
    case 'business-registration':
      return [
        'Proof of identity of proprietor/partners/directors',
        'Address proof of business premises',
        'Partnership deed/MOA/AOA (as applicable)',
        'Rent agreement/ownership proof of premises',
        'NOC from building owner',
        'Photographs of business premises',
      ];
    case 'other':
      return [
        'Relevant application form',
        'Supporting documents as per requirement',
        'Proof of identity',
        'Proof of address',
        'Photographs (if required)',
      ];
    default:
      return [];
  }
};

// Icons
const BuildingIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const LicenseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const TaxIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const HealthIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const BusinessIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export default MCDUploadPage;