import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deptMenuOpen, setDeptMenuOpen] = useState(false);
  const deptMenuRef = useRef(null);

  // Close department menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (deptMenuRef.current && !deptMenuRef.current.contains(event.target)) {
        setDeptMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <motion.div 
              className="flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">AURA</span>
              </Link>
            </motion.div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/" label="Home" />
                <NavLink to="/about" label="About" />
                <NavLink to="/dashboard" label="Dashboard" />
                <NavLink to="/upload" label="Upload" />
                <NavLink to="/contact" label="Contact" />
                
                {/* Department Dropdown */}
                <div className="relative" ref={deptMenuRef}>
                  <button 
                    onClick={() => setDeptMenuOpen(!deptMenuOpen)}
                    className="px-3 py-2 rounded-md text-sm font-medium text-blue-200 hover:text-white hover:bg-blue-800/50 transition-all duration-300 flex items-center"
                  >
                    Department
                    <svg 
                      className={`ml-1 h-4 w-4 transition-transform ${deptMenuOpen ? 'rotate-180' : ''}`} 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {deptMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-slate-800 ring-1 ring-black ring-opacity-5 z-50"
                    >
                      <div className="py-1">
                        <DropdownLink to="/department/dpcc-cte" label="DPCC (CTE)" />
                        <div className="pl-4 border-l border-blue-500/30 ml-4 my-1">
                          <DropdownLink to="/department/dpcc-cte/chatbot" label="CTE Chatbot" />
                          <DropdownLink to="/department/dpcc-cte/s-line" label="S Line" />
                          <DropdownLink to="/department/dpcc-cte/upload" label="Upload Documents" />
                        </div>
                        <DropdownLink to="/department/mcd" label="MCD" />
                        <div className="pl-4 border-l border-blue-500/30 ml-4 my-1">
                          <DropdownLink to="/department/mcd/upload" label="Upload Documents" />
                        </div>
                        <DropdownLink to="/department/dfs" label="DFS" />
                        <div className="pl-4 border-l border-blue-500/30 ml-4 my-1">
                          <DropdownLink to="/department/dfs/upload" label="Upload Documents" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium"
              >
                Sign In
              </motion.button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-300 hover:text-white hover:bg-blue-800 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div 
        className={`${isOpen ? 'block' : 'hidden'} md:hidden`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800">
          <MobileNavLink to="/" label="Home" setIsOpen={setIsOpen} />
          <MobileNavLink to="/about" label="About" setIsOpen={setIsOpen} />
          <MobileNavLink to="/dashboard" label="Dashboard" setIsOpen={setIsOpen} />
          <MobileNavLink to="/upload" label="Upload" setIsOpen={setIsOpen} />
          <MobileNavLink to="/contact" label="Contact" setIsOpen={setIsOpen} />
          
          {/* Mobile Department Links */}
          <div className="pt-2 pb-1">
            <div className="block px-3 py-2 rounded-md text-base font-medium text-blue-200 border-t border-blue-500/20 pt-3">
              Department
            </div>
            <div className="pl-4">
              <MobileNavLink to="/department/dpcc-cte" label="DPCC (CTE)" setIsOpen={setIsOpen} />
              <div className="pl-4">
                <MobileNavLink to="/department/dpcc-cte/chatbot" label="CTE Chatbot" setIsOpen={setIsOpen} />
                <MobileNavLink to="/department/dpcc-cte/s-line" label="S Line" setIsOpen={setIsOpen} />
                <MobileNavLink to="/department/dpcc-cte/upload" label="Upload Documents" setIsOpen={setIsOpen} />
              </div>
              <MobileNavLink to="/department/mcd" label="MCD" setIsOpen={setIsOpen} />
              <div className="pl-4">
                <MobileNavLink to="/department/mcd/upload" label="Upload Documents" setIsOpen={setIsOpen} />
              </div>
              <MobileNavLink to="/department/dfs" label="DFS" setIsOpen={setIsOpen} />
              <div className="pl-4">
                <MobileNavLink to="/department/dfs/upload" label="Upload Documents" setIsOpen={setIsOpen} />
              </div>
            </div>
          </div>
          <div className="pt-4">
            <button className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium">
              Sign In
            </button>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

const NavLink = ({ to, label }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      to={to}
      className="px-3 py-2 rounded-md text-sm font-medium text-blue-200 hover:text-white hover:bg-blue-800/50 transition-all duration-300"
    >
      {label}
    </Link>
  </motion.div>
);

const MobileNavLink = ({ to, label, setIsOpen }) => (
  <Link
    to={to}
    className="block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-white hover:bg-blue-800/50 transition-all duration-300"
    onClick={() => setIsOpen(false)}
  >
    {label}
  </Link>
);

const DropdownLink = ({ to, label }) => (
  <Link
    to={to}
    className="block px-4 py-2 text-sm text-blue-200 hover:bg-blue-700/50 hover:text-white transition-all duration-200"
  >
    {label}
  </Link>
);

export default Navbar;