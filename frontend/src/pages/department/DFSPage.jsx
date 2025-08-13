import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const DFSPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-500 text-transparent bg-clip-text">
            Delhi Fire Service (DFS)
          </h1>
          
          <p className="text-lg text-slate-300 mb-8">
            Access fire safety services, NOC applications, and document management for Delhi Fire Service compliance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Fire NOC Application */}
            <ServiceCard 
              title="Fire NOC Application"
              description="Apply for Fire Safety Certificate/NOC for your building or establishment."
              icon={<FireIcon />}
              link="/department/dfs/upload"
              color="from-red-500 to-orange-500"
            />
            
            {/* Document Upload */}
            <ServiceCard 
              title="Document Upload"
              description="Upload required documents for fire safety compliance and NOC applications."
              icon={<DocumentIcon />}
              link="/department/dfs/upload"
              color="from-orange-500 to-yellow-500"
            />
            
            {/* Application Status */}
            <ServiceCard 
              title="Application Status"
              description="Check the status of your Fire NOC applications and certificates."
              icon={<StatusIcon />}
              link="/department/dfs/status"
              color="from-yellow-500 to-green-500"
            />
            
            {/* Fire Safety Guidelines */}
            <ServiceCard 
              title="Fire Safety Guidelines"
              description="Access comprehensive fire safety guidelines and compliance requirements."
              icon={<GuidelineIcon />}
              link="/department/dfs/guidelines"
              color="from-green-500 to-blue-500"
            />
            
            {/* Renewal Applications */}
            <ServiceCard 
              title="Renewal Applications"
              description="Apply for renewal of existing Fire Safety Certificates and NOCs."
              icon={<RenewalIcon />}
              link="/department/dfs/renewal"
              color="from-blue-500 to-purple-500"
            />
            
            {/* Fire Safety Training */}
            <ServiceCard 
              title="Fire Safety Training"
              description="Register for fire safety training programs and certification courses."
              icon={<TrainingIcon />}
              link="/department/dfs/training"
              color="from-purple-500 to-red-500"
            />
          </div>
          
          <div className="bg-slate-800 rounded-lg overflow-hidden border border-orange-500/20 shadow-xl p-6 mb-12">
            <h2 className="text-2xl font-bold mb-4">About Delhi Fire Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-slate-300 mb-4">
                  Delhi Fire Service (DFS) is responsible for fire prevention and fire safety in the National Capital Territory of Delhi. 
                  The department provides fire protection, firefighting, emergency response, and rescue services to safeguard life and property against fire hazards.
                </p>
                <p className="text-slate-300 mb-4">
                  DFS issues Fire Safety Certificates/NOCs to buildings and establishments after verifying compliance with fire safety norms and standards as per the National Building Code and Delhi Fire Service Rules.
                </p>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Key Responsibilities:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-slate-300">
                    <li>Issuing Fire Safety Certificates and NOCs</li>
                    <li>Fire prevention and safety inspections</li>
                    <li>Emergency response and firefighting</li>
                    <li>Rescue operations during disasters</li>
                    <li>Fire safety awareness and training</li>
                    <li>Enforcement of fire safety regulations</li>
                  </ul>
                </div>
              </div>
              <div className="bg-slate-700 rounded-lg p-6 border border-orange-500/10">
                <h3 className="text-lg font-semibold mb-4">Fire NOC Requirements</h3>
                <div className="space-y-4">
                  <RequirementItem 
                    title="Residential Buildings"
                    requirements={[
                      "Height above 15 meters",
                      "Built-up area exceeding 500 sq. meters",
                      "More than ground plus three floors"
                    ]}
                  />
                  
                  <RequirementItem 
                    title="Commercial Establishments"
                    requirements={[
                      "All commercial buildings regardless of height",
                      "Shopping complexes and malls",
                      "Restaurants with seating capacity >50 persons",
                      "Hotels and guest houses"
                    ]}
                  />
                  
                  <RequirementItem 
                    title="Industrial Units"
                    requirements={[
                      "All manufacturing units",
                      "Warehouses and storage facilities",
                      "Hazardous material handling units"
                    ]}
                  />
                  
                  <RequirementItem 
                    title="Institutional Buildings"
                    requirements={[
                      "Schools and educational institutions",
                      "Hospitals and nursing homes",
                      "Government buildings",
                      "Places of public assembly"
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg overflow-hidden border border-orange-500/20 shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ContactCard 
                title="Head Office"
                address="Connaught Place Fire Station, Connaught Place, New Delhi - 110001"
                phone="011-23414000"
                email="director@dfs.delhi.gov.in"
              />
              
              <ContactCard 
                title="NOC Department"
                address="Delhi Fire Service Headquarters, Connaught Lane, New Delhi"
                phone="011-23414444"
                email="noc@dfs.delhi.gov.in"
              />
              
              <ContactCard 
                title="Emergency Services"
                address="Control Room, Delhi Fire Service"
                phone="101"
                email="emergency@dfs.delhi.gov.in"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ServiceCard = ({ title, description, icon, link, color }) => (
  <Link to={link} className="block">
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 h-full"
    >
      <div className={`h-2 bg-gradient-to-r ${color}`}></div>
      <div className="p-6">
        <div className="text-slate-300 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-slate-400">{description}</p>
      </div>
    </motion.div>
  </Link>
);

const RequirementItem = ({ title, requirements }) => (
  <div>
    <h4 className="text-md font-medium text-orange-300 mb-2">{title}</h4>
    <ul className="list-disc pl-5 space-y-1 text-slate-300 text-sm">
      {requirements.map((req, index) => (
        <li key={index}>{req}</li>
      ))}
    </ul>
  </div>
);

const ContactCard = ({ title, address, phone, email }) => (
  <div className="bg-slate-700 rounded-lg p-5 border border-slate-600">
    <h3 className="text-lg font-semibold mb-3 text-orange-300">{title}</h3>
    <div className="space-y-3">
      <div className="flex">
        <div className="text-slate-400 mr-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <span className="text-slate-300 text-sm">{address}</span>
      </div>
      <div className="flex">
        <div className="text-slate-400 mr-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <span className="text-slate-300 text-sm">{phone}</span>
      </div>
      <div className="flex">
        <div className="text-slate-400 mr-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="text-slate-300 text-sm">{email}</span>
      </div>
    </div>
  </div>
);

// Icons
const FireIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const StatusIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const GuidelineIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const RenewalIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const TrainingIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
);

export default DFSPage;