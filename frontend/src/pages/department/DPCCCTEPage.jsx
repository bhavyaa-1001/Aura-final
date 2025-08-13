import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const DPCCCTEPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            DPCC (CTE) Department
          </h1>
          
          <p className="text-lg text-slate-300 mb-8">
            Delhi Pollution Control Committee (DPCC) - Consent to Establish (CTE) department handles environmental clearances and permissions for establishing new industrial units in Delhi.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <ServiceCard 
              title="CTE Chatbot"
              description="Get instant answers to your CTE-related queries through our AI-powered chatbot."
              link="/department/dpcc-cte/chatbot"
              icon={<ChatIcon />}
            />
            
            <ServiceCard 
              title="S Line"
              description="Access and manage S Line applications and documentation."
              link="/department/dpcc-cte/s-line"
              icon={<DocumentIcon />}
            />
            
            <ServiceCard 
              title="Document Upload"
              description="Upload required documents for CTE application processing."
              link="/department/dpcc-cte/upload"
              icon={<UploadIcon />}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ServiceCard = ({ title, description, link, icon }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-slate-800 rounded-lg p-6 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
  >
    <div className="text-blue-400 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-slate-400 mb-4">{description}</p>
    <Link 
      to={link} 
      className="text-blue-400 hover:text-blue-300 flex items-center font-medium"
    >
      Access
      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </motion.div>
);

const ChatIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const UploadIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

export default DPCCCTEPage;