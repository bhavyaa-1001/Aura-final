import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MCDPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Municipal Corporation of Delhi (MCD)
          </h1>
          
          <p className="text-lg text-slate-300 mb-8">
            Access services and information related to the Municipal Corporation of Delhi (MCD), including building permits, trade licenses, and property tax.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <ServiceCard 
              title="Building Permits"
              description="Apply for building permits and construction approvals from MCD."
              link="/department/mcd/building-permits"
              icon={<BuildingIcon />}
            />
            
            <ServiceCard 
              title="Trade Licenses"
              description="Apply for and renew trade licenses for your business operations."
              link="/department/mcd/trade-licenses"
              icon={<LicenseIcon />}
            />
            
            <ServiceCard 
              title="Property Tax"
              description="Calculate and pay property tax for your residential or commercial property."
              link="/department/mcd/property-tax"
              icon={<TaxIcon />}
            />
            
            <ServiceCard 
              title="Health Licenses"
              description="Apply for health licenses for food establishments and healthcare facilities."
              link="/department/mcd/health-licenses"
              icon={<HealthIcon />}
            />
            
            <ServiceCard 
              title="Document Upload"
              description="Upload required documents for MCD applications and approvals."
              link="/department/mcd/upload"
              icon={<UploadIcon />}
            />
            
            <ServiceCard 
              title="Application Status"
              description="Check the status of your MCD applications and approvals."
              link="/department/mcd/status"
              icon={<StatusIcon />}
            />
          </div>
          
          <div className="mt-12 bg-slate-800 rounded-lg p-6 border border-blue-500/20">
            <h2 className="text-2xl font-semibold mb-4">About MCD</h2>
            <p className="text-slate-300 mb-4">
              The Municipal Corporation of Delhi (MCD) is responsible for providing civic services and infrastructure in Delhi. It oversees various aspects of urban governance, including building regulations, public health, sanitation, and property taxation.
            </p>
            <p className="text-slate-300">
              Through the AURA platform, you can access various MCD services digitally, submit applications, upload documents, and track the status of your applications in real-time.
            </p>
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

const BuildingIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const LicenseIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const TaxIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const HealthIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const UploadIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const StatusIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

export default MCDPage;