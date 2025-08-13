import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    // In a real app, this would fetch data from your backend
    // Simulate API call for demo purposes
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock documents data
        setDocuments([
          {
            id: '1',
            title: 'Factory License Application',
            status: 'approved',
            date: '2024-03-15',
            department: 'Industrial Safety',
            verificationScore: 98
          },
          {
            id: '2',
            title: 'Environmental Compliance Report',
            status: 'pending',
            date: '2024-04-02',
            department: 'Environmental Protection',
            verificationScore: 87
          },
          {
            id: '3',
            title: 'Fire Safety Certificate',
            status: 'in_review',
            date: '2024-04-10',
            department: 'Fire Department',
            verificationScore: 92
          },
          {
            id: '4',
            title: 'Labor Compliance Declaration',
            status: 'rejected',
            date: '2024-03-28',
            department: 'Labor Department',
            verificationScore: 65
          }
        ]);
        
        // Mock alerts data
        setAlerts([
          {
            id: '1',
            type: 'warning',
            message: 'Annual Environmental Compliance Report due in 15 days',
            date: '2024-04-15'
          },
          {
            id: '2',
            type: 'critical',
            message: 'New safety regulations for textile manufacturing effective next month',
            date: '2024-05-01'
          },
          {
            id: '3',
            type: 'info',
            message: 'Tax incentives available for businesses implementing green technologies',
            date: '2024-04-20'
          },
          {
            id: '4',
            type: 'success',
            message: 'Your Fire Safety Certificate has been approved and issued',
            date: '2024-04-12'
          }
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'in_review': return 'bg-blue-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Approved';
      case 'pending': return 'Pending';
      case 'in_review': return 'In Review';
      case 'rejected': return 'Rejected';
      default: return 'Unknown';
    }
  };
  
  const getAlertTypeColor = (type) => {
    switch (type) {
      case 'warning': return 'border-yellow-500 bg-yellow-500/10 text-yellow-300';
      case 'critical': return 'border-red-500 bg-red-500/10 text-red-300';
      case 'info': return 'border-blue-500 bg-blue-500/10 text-blue-300';
      case 'success': return 'border-green-500 bg-green-500/10 text-green-300';
      default: return 'border-gray-500 bg-gray-500/10 text-gray-300';
    }
  };
  
  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return (
          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'critical':
        return (
          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-blue-500/30 rounded-full"></div>
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-blue-500 rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Dashboard</h1>
                <p className="text-slate-300 mt-1">Welcome back, Priya Singh</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Link to="/upload">
                  <motion.button 
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg shadow-blue-500/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Upload New Document
                    </span>
                  </motion.button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <DashboardCard 
                title="Total Documents" 
                value="4" 
                icon={(
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
                color="blue"
              />
              
              <DashboardCard 
                title="Approved" 
                value="1" 
                icon={(
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                color="green"
              />
              
              <DashboardCard 
                title="Pending" 
                value="2" 
                icon={(
                  <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                color="yellow"
              />
              
              <DashboardCard 
                title="Rejected" 
                value="1" 
                icon={(
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                color="red"
              />
            </div>
            
            <div className="mb-8">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-blue-500/20">
                <div className="flex border-b border-slate-700 mb-4">
                  <button 
                    className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-blue-400 border-b-2 border-blue-500' : 'text-slate-400 hover:text-slate-300'}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button 
                    className={`px-4 py-2 font-medium ${activeTab === 'documents' ? 'text-blue-400 border-b-2 border-blue-500' : 'text-slate-400 hover:text-slate-300'}`}
                    onClick={() => setActiveTab('documents')}
                  >
                    Documents
                  </button>
                  <button 
                    className={`px-4 py-2 font-medium ${activeTab === 'alerts' ? 'text-blue-400 border-b-2 border-blue-500' : 'text-slate-400 hover:text-slate-300'}`}
                    onClick={() => setActiveTab('alerts')}
                  >
                    Alerts
                  </button>
                </div>
                
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-xl font-semibold text-blue-300 mb-4">Recent Activity</h2>
                    
                    <div className="space-y-4">
                      {documents.slice(0, 2).map(doc => (
                        <motion.div 
                          key={doc.id}
                          className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-white">{doc.title}</h3>
                              <p className="text-sm text-slate-400">{doc.department} • {doc.date}</p>
                            </div>
                            <div className="flex items-center">
                              <span className={`inline-block w-3 h-3 rounded-full ${getStatusColor(doc.status)} mr-2`}></span>
                              <span className="text-sm font-medium text-slate-300">{getStatusText(doc.status)}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <h2 className="text-xl font-semibold text-blue-300 mt-6 mb-4">Recent Alerts</h2>
                    
                    <div className="space-y-4">
                      {alerts.slice(0, 2).map(alert => (
                        <motion.div 
                          key={alert.id}
                          className={`rounded-lg p-4 border-l-4 ${getAlertTypeColor(alert.type)}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                              {getAlertIcon(alert.type)}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium">{alert.message}</p>
                              <p className="text-xs mt-1 opacity-70">Due: {alert.date}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <button 
                        className="px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300"
                        onClick={() => setActiveTab('documents')}
                      >
                        View All Documents
                      </button>
                      <button 
                        className="px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300 ml-4"
                        onClick={() => setActiveTab('alerts')}
                      >
                        View All Alerts
                      </button>
                    </div>
                  </div>
                )}
                
                {activeTab === 'documents' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-blue-300">All Documents</h2>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Search documents..." 
                          className="px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white text-sm w-64"
                        />
                        <svg className="w-5 h-5 text-slate-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-slate-700">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Document</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Verification</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                          {documents.map((doc, index) => (
                            <motion.tr 
                              key={doc.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="hover:bg-slate-700/30 transition-colors duration-150"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <svg className="w-5 h-5 text-slate-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  <span className="font-medium text-white">{doc.title}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{doc.department}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{doc.date}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <span className={`inline-block w-2.5 h-2.5 rounded-full ${getStatusColor(doc.status)} mr-2`}></span>
                                  <span className="text-sm font-medium text-slate-300">{getStatusText(doc.status)}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-full bg-slate-700 rounded-full h-2.5 mr-2">
                                    <div 
                                      className={`h-2.5 rounded-full ${doc.verificationScore >= 90 ? 'bg-green-500' : doc.verificationScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                      style={{ width: `${doc.verificationScore}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium text-slate-300">{doc.verificationScore}%</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                <button className="text-blue-400 hover:text-blue-300 transition-colors duration-300 mr-3">
                                  View
                                </button>
                                <button className="text-slate-400 hover:text-slate-300 transition-colors duration-300">
                                  Download
                                </button>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {activeTab === 'alerts' && (
                  <div>
                    <h2 className="text-xl font-semibold text-blue-300 mb-4">All Alerts</h2>
                    
                    <div className="space-y-4">
                      {alerts.map((alert, index) => (
                        <motion.div 
                          key={alert.id}
                          className={`rounded-lg p-4 border-l-4 ${getAlertTypeColor(alert.type)}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                              {getAlertIcon(alert.type)}
                            </div>
                            <div className="ml-3 flex-1">
                              <div className="flex justify-between items-start">
                                <p className="text-sm font-medium">{alert.message}</p>
                                <p className="text-xs opacity-70 ml-4">{alert.date}</p>
                              </div>
                              <div className="mt-2 flex space-x-2">
                                <button className="px-3 py-1 text-xs font-medium rounded-md bg-slate-700 hover:bg-slate-600 transition-colors duration-300">
                                  Mark as Read
                                </button>
                                <button className="px-3 py-1 text-xs font-medium rounded-md bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors duration-300">
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-blue-500/20">
                <h2 className="text-xl font-semibold text-blue-300 mb-4">Compliance Status</h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-300">Environmental Compliance</span>
                      <span className="text-sm font-medium text-green-400">92%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-300">Safety Regulations</span>
                      <span className="text-sm font-medium text-green-400">88%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-300">Labor Compliance</span>
                      <span className="text-sm font-medium text-yellow-400">65%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-300">Tax Compliance</span>
                      <span className="text-sm font-medium text-green-400">95%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <button className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 font-medium hover:bg-blue-500/30 transition-colors duration-300">
                    View Detailed Report
                  </button>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-6 border border-blue-500/20">
                <h2 className="text-xl font-semibold text-blue-300 mb-4">Upcoming Deadlines</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Annual Environmental Report</h3>
                      <p className="text-sm text-slate-400 mt-1">Due: April 30, 2024</p>
                      <div className="mt-2">
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-yellow-500/20 text-yellow-300">
                          15 days remaining
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Quarterly Tax Filing</h3>
                      <p className="text-sm text-slate-400 mt-1">Due: April 15, 2024</p>
                      <div className="mt-2">
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-red-500/20 text-red-300">
                          3 days remaining
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Safety Inspection</h3>
                      <p className="text-sm text-slate-400 mt-1">Due: May 10, 2024</p>
                      <div className="mt-2">
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-blue-500/20 text-blue-300">
                          28 days remaining
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <button className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 font-medium hover:bg-blue-500/30 transition-colors duration-300">
                    View Calendar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, icon, color }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'blue': return 'from-blue-500/20 to-blue-600/20 border-blue-500/30';
      case 'green': return 'from-green-500/20 to-green-600/20 border-green-500/30';
      case 'yellow': return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
      case 'red': return 'from-red-500/20 to-red-600/20 border-red-500/30';
      default: return 'from-slate-500/20 to-slate-600/20 border-slate-500/30';
    }
  };

  return (
    <motion.div 
      className={`bg-gradient-to-br ${getColorClasses()} rounded-xl p-6 border shadow-xl`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-slate-300">{title}</h3>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-slate-800/50">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;