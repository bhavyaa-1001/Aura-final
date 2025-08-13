import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SLinePage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            S Line Management
          </h1>
          
          <p className="text-lg text-slate-300 mb-8">
            Manage and track your S Line applications for Consent to Establish (CTE) from the Delhi Pollution Control Committee.
          </p>

          <div className="bg-slate-800 rounded-lg overflow-hidden border border-blue-500/20 shadow-xl">
            <div className="border-b border-blue-500/20">
              <nav className="flex -mb-px">
                <TabButton 
                  active={activeTab === 'overview'} 
                  onClick={() => setActiveTab('overview')}
                  label="Overview"
                />
                <TabButton 
                  active={activeTab === 'applications'} 
                  onClick={() => setActiveTab('applications')}
                  label="My Applications"
                />
                <TabButton 
                  active={activeTab === 'new'} 
                  onClick={() => setActiveTab('new')}
                  label="New Application"
                />
                <TabButton 
                  active={activeTab === 'guidelines'} 
                  onClick={() => setActiveTab('guidelines')}
                  label="Guidelines"
                />
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && <OverviewTab />}
              {activeTab === 'applications' && <ApplicationsTab />}
              {activeTab === 'new' && <NewApplicationTab />}
              {activeTab === 'guidelines' && <GuidelinesTab />}
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

const OverviewTab = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">S Line Process Overview</h2>
    <p className="text-slate-300 mb-6">
      The S Line process is a streamlined approach for obtaining Consent to Establish (CTE) from the Delhi Pollution Control Committee for specific categories of industries and establishments.
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StepCard 
        number="01"
        title="Application Submission"
        description="Complete the online application form and submit required documents."
      />
      <StepCard 
        number="02"
        title="Technical Evaluation"
        description="Your application undergoes technical assessment by DPCC officials."
      />
      <StepCard 
        number="03"
        title="Approval & Certificate"
        description="Receive your CTE certificate upon successful evaluation."
      />
    </div>
    
    <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
      <h3 className="text-lg font-medium mb-2 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Important Information
      </h3>
      <p className="text-slate-300">
        The S Line process is applicable only for specific categories of industries. Please check the guidelines to confirm your eligibility before applying.
      </p>
    </div>
  </div>
);

const ApplicationsTab = () => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold">My Applications</h2>
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search applications..." 
          className="bg-slate-700 text-white rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        />
        <svg className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
    
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Application ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          <ApplicationRow 
            id="CTE-S-2023-001"
            date="15 Jun 2023"
            type="Manufacturing"
            status="Approved"
          />
          <ApplicationRow 
            id="CTE-S-2023-002"
            date="22 Jul 2023"
            type="Commercial"
            status="Under Review"
          />
          <ApplicationRow 
            id="CTE-S-2023-003"
            date="10 Aug 2023"
            type="Service"
            status="Pending Documents"
          />
        </tbody>
      </table>
    </div>
    
    <div className="mt-6 text-center text-slate-400 text-sm">
      Showing 3 of 3 applications
    </div>
  </div>
);

const ApplicationRow = ({ id, date, type, status }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'bg-green-900/30 text-green-400 border-green-500/30';
      case 'Under Review': return 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30';
      case 'Pending Documents': return 'bg-red-900/30 text-red-400 border-red-500/30';
      default: return 'bg-slate-700 text-slate-300';
    }
  };
  
  return (
    <tr className="hover:bg-slate-700/50 transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400">{id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{date}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{type}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
          {status}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </td>
    </tr>
  );
};

const NewApplicationTab = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-6">New S Line Application</h2>
    
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Industry Type</label>
          <select className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select Industry Type</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="commercial">Commercial</option>
            <option value="service">Service</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Project Category</label>
          <select className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select Project Category</option>
            <option value="small">Small Scale</option>
            <option value="medium">Medium Scale</option>
            <option value="large">Large Scale</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Project Name</label>
        <input type="text" className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Project Address</label>
        <textarea className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"></textarea>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Project Description</label>
        <textarea className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"></textarea>
      </div>
      
      <div className="pt-4 border-t border-slate-700">
        <h3 className="text-lg font-medium mb-4">Required Documents</h3>
        
        <div className="space-y-4">
          <DocumentUploadField label="Site Plan" />
          <DocumentUploadField label="Project Report" />
          <DocumentUploadField label="NOC from Land-owning Agency" />
          <DocumentUploadField label="Proof of Water Source" />
          <DocumentUploadField label="Effluent Treatment Plan" />
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 pt-6">
        <button 
          type="button" 
          className="px-6 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors duration-300"
        >
          Save as Draft
        </button>
        <button 
          type="submit" 
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
        >
          Submit Application
        </button>
      </div>
    </form>
  </div>
);

const GuidelinesTab = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-6">S Line Guidelines</h2>
    
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2 text-blue-400">Eligibility Criteria</h3>
        <ul className="list-disc pl-5 space-y-2 text-slate-300">
          <li>Small and medium-scale industries with low pollution potential</li>
          <li>Commercial establishments with built-up area less than 20,000 sq. meters</li>
          <li>Service sector units with specific operational parameters</li>
          <li>Projects not falling under the purview of Environmental Impact Assessment Notification</li>
        </ul>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2 text-blue-400">Document Requirements</h3>
        <ul className="list-disc pl-5 space-y-2 text-slate-300">
          <li>Detailed site plan showing the layout of the unit</li>
          <li>Comprehensive project report with production capacity details</li>
          <li>No Objection Certificate (NOC) from the land-owning agency</li>
          <li>Proof of water source and estimated water consumption</li>
          <li>Effluent treatment plan and waste management details</li>
        </ul>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2 text-blue-400">Processing Timeline</h3>
        <ul className="list-disc pl-5 space-y-2 text-slate-300">
          <li>Initial screening: 7 working days</li>
          <li>Technical evaluation: 15 working days</li>
          <li>Final approval: 7 working days</li>
          <li>Total processing time: Approximately 30 working days (subject to submission of complete documents)</li>
        </ul>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2 text-blue-400">Fee Structure</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Processing Fee (₹)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Consent Fee (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Small Scale</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">10,000</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">15,000</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Medium Scale</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">25,000</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">40,000</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">Large Scale</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">1,00,000</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">1,50,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

const StepCard = ({ number, title, description }) => (
  <div className="bg-slate-700 rounded-lg p-6 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
    <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400 font-bold mb-4">
      {number}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </div>
);

const DocumentUploadField = ({ label }) => (
  <div className="border border-dashed border-slate-600 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300">
    <label className="flex flex-col items-center justify-center cursor-pointer">
      <svg className="w-8 h-8 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <span className="text-sm font-medium text-slate-300 mb-1">{label}</span>
      <span className="text-xs text-slate-400">Click to upload or drag and drop</span>
      <span className="text-xs text-slate-500 mt-1">PDF, JPG, PNG (Max 5MB)</span>
      <input type="file" className="hidden" />
    </label>
  </div>
);

export default SLinePage;