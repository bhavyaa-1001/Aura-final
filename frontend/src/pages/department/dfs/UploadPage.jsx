import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DFSUploadPage = () => {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-500 text-transparent bg-clip-text">
            Document Upload - Delhi Fire Service
          </h1>
          
          <p className="text-lg text-slate-300 mb-8">
            Upload required documents for Fire NOC applications, renewals, and compliance certifications.
          </p>

          <div className="bg-slate-800 rounded-lg overflow-hidden border border-red-500/20 shadow-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Select Document Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DocumentTypeButton 
                  label="Fire NOC Application"
                  active={documentType === 'fire-noc'}
                  onClick={() => setDocumentType('fire-noc')}
                  icon={<FireNOCIcon />}
                />
                
                <DocumentTypeButton 
                  label="NOC Renewal"
                  active={documentType === 'noc-renewal'}
                  onClick={() => setDocumentType('noc-renewal')}
                  icon={<RenewalIcon />}
                />
                
                <DocumentTypeButton 
                  label="Fire Safety Compliance"
                  active={documentType === 'fire-safety'}
                  onClick={() => setDocumentType('fire-safety')}
                  icon={<ComplianceIcon />}
                />
                
                <DocumentTypeButton 
                  label="Fire Equipment Certificate"
                  active={documentType === 'equipment-cert'}
                  onClick={() => setDocumentType('equipment-cert')}
                  icon={<EquipmentIcon />}
                />
                
                <DocumentTypeButton 
                  label="Fire Safety Training"
                  active={documentType === 'training'}
                  onClick={() => setDocumentType('training')}
                  icon={<TrainingIcon />}
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
                
                <div className="bg-slate-700 rounded-lg p-6 border border-red-500/10 mb-6">
                  <div className="flex items-start">
                    <div className="text-orange-400 mr-4 mt-1">
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
                
                <div className="border border-dashed border-slate-600 rounded-lg p-8 hover:border-orange-500/50 transition-all duration-300">
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
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white transition-colors duration-300 disabled:opacity-50"
                    disabled={uploading || uploadedFiles.some(file => file.status !== 'completed')}
                  >
                    Submit All Documents
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-12 bg-slate-800 rounded-lg overflow-hidden border border-red-500/20 shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-6">Fire NOC Application Process</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <ProcessStep 
                number="1"
                title="Document Submission"
                description="Upload all required documents for your Fire NOC application."
              />
              
              <ProcessStep 
                number="2"
                title="Application Review"
                description="DFS officials review your application and documents for completeness."
              />
              
              <ProcessStep 
                number="3"
                title="Site Inspection"
                description="Fire officers conduct physical inspection of your premises."
              />
              
              <ProcessStep 
                number="4"
                title="NOC Issuance"
                description="Fire NOC is issued if all requirements are met and complied with."
              />
            </div>
            
            <div className="mt-8 p-4 bg-slate-700 rounded-lg border border-orange-500/10">
              <div className="flex items-start">
                <div className="text-orange-400 mr-4 mt-1">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Important Note</h3>
                  <p className="text-slate-300 text-sm">
                    The processing time for Fire NOC applications is typically 30 days from the date of submission of complete documents. 
                    Incomplete applications may be rejected or returned for resubmission. Please ensure all documents are clear, legible, and in the required format.
                  </p>
                </div>
              </div>
            </div>
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
      ? 'bg-red-900/30 border-red-500 text-red-300' 
      : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-red-500/50'}`}
  >
    <div className={`mr-3 ${active ? 'text-red-400' : 'text-slate-400'}`}>
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
              className="bg-orange-500 h-1.5 rounded-full" 
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

const ProcessStep = ({ number, title, description }) => (
  <div className="bg-slate-700 rounded-lg p-5 border border-slate-600 relative">
    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
      {number}
    </div>
    <h3 className="text-lg font-semibold mb-2 mt-2 text-orange-300">{title}</h3>
    <p className="text-slate-300 text-sm">{description}</p>
  </div>
);

// Helper functions
const getDocumentTypeLabel = (type) => {
  switch(type) {
    case 'fire-noc': return 'Fire NOC Application';
    case 'noc-renewal': return 'NOC Renewal';
    case 'fire-safety': return 'Fire Safety Compliance';
    case 'equipment-cert': return 'Fire Equipment Certificate';
    case 'training': return 'Fire Safety Training';
    case 'other': return 'Other';
    default: return '';
  }
};

const getRequiredDocuments = (type) => {
  switch(type) {
    case 'fire-noc':
      return [
        'Building plan/drawing with fire safety provisions marked',
        'Site plan showing access roads, water sources, etc.',
        'Occupancy certificate/Building use permission',
        'Fire safety system installation certificates',
        'Electrical safety certificate',
        'Structural stability certificate',
        'Previous NOC (if applicable for modifications)',
      ];
    case 'noc-renewal':
      return [
        'Previous Fire NOC',
        'Fire equipment maintenance records',
        'Fire drill records',
        'Fire safety staff training certificates',
        'Any modifications to building plan (if applicable)',
        'Electrical safety inspection report',
      ];
    case 'fire-safety':
      return [
        'Fire extinguisher installation details',
        'Fire alarm system specifications',
        'Sprinkler system layout',
        'Fire escape plan',
        'Emergency evacuation procedures',
        'Fire safety training records',
      ];
    case 'equipment-cert':
      return [
        'List of fire safety equipment installed',
        'Purchase invoices of equipment',
        'Installation certificates',
        'Maintenance records',
        'Technical specifications',
        'Testing certificates',
      ];
    case 'training':
      return [
        'Training program details',
        'Participant list',
        'Trainer credentials',
        'Training venue details',
        'Previous training certificates (if renewal)',
      ];
    case 'other':
      return [
        'Application form',
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
const FireNOCIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const RenewalIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const ComplianceIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const EquipmentIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const TrainingIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export default DFSUploadPage;