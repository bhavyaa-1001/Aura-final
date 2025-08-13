import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const problemRef = useRef(null);
  const workflowRef = useRef(null);
  const techStackRef = useRef(null);
  
  // Parallax effect for hero section
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  
  useEffect(() => {
    // GSAP animations for problem cards
    const problemCards = document.querySelectorAll('.problem-card');
    
    problemCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: problemRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    
    // GSAP animations for workflow steps
    const workflowSteps = document.querySelectorAll('.workflow-step');
    
    workflowSteps.forEach((step, index) => {
      gsap.fromTo(
        step,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.3,
          scrollTrigger: {
            trigger: workflowRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    
    // GSAP animations for tech stack icons
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach((icon, index) => {
      gsap.fromTo(
        icon,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: index * 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: techStackRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
          <div className="absolute inset-0 bg-[url('/src/assets/grid-pattern.svg')] opacity-10" />
        </motion.div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            AURA Platform
          </motion.h1>
          
          <motion.h2 
            className="text-2xl md:text-3xl font-light mb-8 text-blue-100"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Agentic Unified Regulatory Architecture
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-slate-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Revolutionizing industrial licensing and approvals with AI-powered compliance solutions.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/dashboard">
              <motion.button 
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium text-lg shadow-lg shadow-blue-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </Link>
            
            <Link to="/about">
              <motion.button 
                className="px-8 py-3 rounded-lg bg-transparent border border-blue-500 text-blue-400 font-medium text-lg hover:bg-blue-500/10 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2, repeat: Infinity, repeatType: 'reverse' }}
          >
            <svg className="w-6 h-6 text-blue-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </section>
      
      {/* Priya's Story Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Meet Priya: A Story of Regulatory Challenges
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden bg-slate-700 shadow-xl">
                <div className="p-6 flex items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-blue-300 mb-2 text-center">Priya Singh</h3>
                    <p className="text-slate-400 text-center mb-4">Factory Owner, Mumbai</p>
                    <div className="bg-slate-800 rounded-lg p-4 text-slate-300 italic">
                      "I spent months navigating complex regulations, only to discover hidden compliance requirements that delayed my factory opening by over a year."
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-slate-700/50 rounded-lg p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-blue-300 mb-2">The Challenge</h3>
                <p className="text-slate-300">
                  Priya wanted to open a small textile manufacturing unit in Mumbai. Despite her best efforts, she faced numerous regulatory hurdles that were difficult to navigate.
                </p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-6 border-l-4 border-purple-500">
                <h3 className="text-xl font-semibold text-purple-300 mb-2">The Struggle</h3>
                <p className="text-slate-300">
                  She had to visit multiple government offices, fill out countless forms, and wait for approvals that took months. Each department had different requirements, often contradicting each other.
                </p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-6 border-l-4 border-green-500">
                <h3 className="text-xl font-semibold text-green-300 mb-2">The Solution</h3>
                <p className="text-slate-300">
                  With AURA, Priya could have navigated the entire process digitally, receiving AI-powered guidance on compliance requirements and processing applications in parallel across departments.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Problem Statement Section */}
      <section ref={problemRef} className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            The Problems We Solve
          </motion.h2>
          
          <motion.p 
            className="text-lg text-slate-300 text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Industrial licensing and regulatory compliance face significant challenges that AURA addresses through innovative AI solutions.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="problem-card bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 shadow-xl border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors duration-300">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-300 mb-4 group-hover:text-blue-200 transition-colors duration-300">Hidden Compliance Gaps</h3>
              <p className="text-slate-300 mb-6 group-hover:text-slate-200 transition-colors duration-300">
                Businesses often miss critical regulatory requirements due to complex and fragmented compliance landscapes, leading to costly delays and penalties.
              </p>
              <motion.div 
                className="mt-auto"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/about" className="text-blue-400 font-medium flex items-center group-hover:text-blue-300 transition-colors duration-300">
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>
            
            <div className="problem-card bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 shadow-xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors duration-300">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-purple-300 mb-4 group-hover:text-purple-200 transition-colors duration-300">Lack of Awareness</h3>
              <p className="text-slate-300 mb-6 group-hover:text-slate-200 transition-colors duration-300">
                Businesses struggle to stay updated with constantly changing regulations across multiple jurisdictions, increasing non-compliance risks.
              </p>
              <motion.div 
                className="mt-auto"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/about" className="text-purple-400 font-medium flex items-center group-hover:text-purple-300 transition-colors duration-300">
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>
            
            <div className="problem-card bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 shadow-xl border border-green-500/20 hover:border-green-500/50 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition-colors duration-300">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-300 mb-4 group-hover:text-green-200 transition-colors duration-300">Bureaucratic Delays</h3>
              <p className="text-slate-300 mb-6 group-hover:text-slate-200 transition-colors duration-300">
                Sequential processing of applications across multiple departments creates bottlenecks, extending approval timelines from months to years.
              </p>
              <motion.div 
                className="mt-auto"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/about" className="text-green-400 font-medium flex items-center group-hover:text-green-300 transition-colors duration-300">
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Workflow Diagram Section */}
      <section ref={workflowRef} className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How AURA Works
          </motion.h2>
          
          <motion.p 
            className="text-lg text-slate-300 text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our AI-powered platform streamlines the entire compliance process through intelligent automation and parallel processing.
          </motion.p>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            
            {/* Step 1 */}
            <div className="workflow-step relative mb-24">
              <div className="flex items-center">
                <div className="w-1/2 pr-8 md:pr-16 text-right">
                  <h3 className="text-xl font-semibold text-blue-300 mb-2">Document Upload</h3>
                  <p className="text-slate-300">
                    Upload all your business and compliance documents through our secure portal. Our system accepts various formats including PDFs, images, and text files.
                  </p>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-blue-500 border-4 border-slate-800 flex items-center justify-center z-10">
                  <span className="text-white font-bold">1</span>
                </div>
                
                <div className="w-1/2 pl-8 md:pl-16">
                  <div className="bg-slate-700/50 rounded-lg p-4 border border-blue-500/20">
                    <svg className="w-12 h-12 text-blue-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-slate-400 text-center">Secure, encrypted document upload</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="workflow-step relative mb-24">
              <div className="flex items-center">
                <div className="w-1/2 pr-8 md:pr-16 text-right">
                  <div className="bg-slate-700/50 rounded-lg p-4 border border-purple-500/20">
                    <svg className="w-12 h-12 text-purple-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <p className="text-sm text-slate-400 text-center">AI-powered document analysis</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-purple-500 border-4 border-slate-800 flex items-center justify-center z-10">
                  <span className="text-white font-bold">2</span>
                </div>
                
                <div className="w-1/2 pl-8 md:pl-16">
                  <h3 className="text-xl font-semibold text-purple-300 mb-2">AI Verification</h3>
                  <p className="text-slate-300">
                    Our advanced AI analyzes your documents, extracts key information, and identifies any missing requirements or potential compliance issues.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="workflow-step relative mb-24">
              <div className="flex items-center">
                <div className="w-1/2 pr-8 md:pr-16 text-right">
                  <h3 className="text-xl font-semibold text-green-300 mb-2">Parallel Department Processing</h3>
                  <p className="text-slate-300">
                    AURA simultaneously processes your application across multiple regulatory departments, eliminating sequential bottlenecks.
                  </p>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-green-500 border-4 border-slate-800 flex items-center justify-center z-10">
                  <span className="text-white font-bold">3</span>
                </div>
                
                <div className="w-1/2 pl-8 md:pl-16">
                  <div className="bg-slate-700/50 rounded-lg p-4 border border-green-500/20">
                    <svg className="w-12 h-12 text-green-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <p className="text-sm text-slate-400 text-center">Parallel processing across departments</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="workflow-step relative">
              <div className="flex items-center">
                <div className="w-1/2 pr-8 md:pr-16 text-right">
                  <div className="bg-slate-700/50 rounded-lg p-4 border border-blue-500/20">
                    <svg className="w-12 h-12 text-blue-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-slate-400 text-center">Fast-tracked approval process</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-blue-500 border-4 border-slate-800 flex items-center justify-center z-10">
                  <span className="text-white font-bold">4</span>
                </div>
                
                <div className="w-1/2 pl-8 md:pl-16">
                  <h3 className="text-xl font-semibold text-blue-300 mb-2">Final Approval</h3>
                  <p className="text-slate-300">
                    Receive your approvals in record time with complete digital documentation and compliance verification certificates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Regulatory Alerts Simulation */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Proactive Regulatory Alerts
          </motion.h2>
          
          <motion.p 
            className="text-lg text-slate-300 text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Stay ahead of regulatory changes with our intelligent alert system that notifies you of relevant updates.
          </motion.p>
          
          <div className="max-w-4xl mx-auto bg-slate-800/50 rounded-xl p-6 md:p-8 shadow-xl border border-blue-500/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-yellow-500 shadow-md"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-yellow-300">Upcoming Deadline</h3>
                    <p className="mt-1 text-sm text-slate-300">Annual Environmental Compliance Report due in 15 days</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-red-500 shadow-md"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-red-300">Critical Update</h3>
                    <p className="mt-1 text-sm text-slate-300">New safety regulations for textile manufacturing effective next month</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-blue-500 shadow-md"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-blue-300">Information</h3>
                    <p className="mt-1 text-sm text-slate-300">Tax incentives available for businesses implementing green technologies</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-green-500 shadow-md"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-green-300">Completed</h3>
                    <p className="mt-1 text-sm text-slate-300">Your Fire Safety Certificate has been approved and issued</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Link to="/dashboard">
                <motion.button 
                  className="px-6 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Alerts
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Tech Stack Section */}
      <section ref={techStackRef} className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Powered by Cutting-Edge Technology
          </motion.h2>
          
          <motion.p 
            className="text-lg text-slate-300 text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            AURA leverages the latest technologies to deliver a seamless, intelligent compliance platform.
          </motion.p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            <TechIcon name="MongoDB" color="green" />
            <TechIcon name="Express.js" color="gray" />
            <TechIcon name="React.js" color="blue" />
            <TechIcon name="Node.js" color="green" />
            <TechIcon name="LangChain" color="purple" />
            <TechIcon name="OpenAI API" color="teal" />
            <TechIcon name="AWS" color="orange" />
            <TechIcon name="SendGrid" color="blue" />
            <TechIcon name="Dagster" color="pink" />
            <TechIcon name="Camunda" color="red" />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-8 md:p-12 shadow-xl border border-blue-500/30">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Transform Your Compliance Process?</h2>
              <p className="text-lg text-blue-100 mb-8">
                Join thousands of businesses that have simplified their regulatory compliance with AURA.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <motion.button 
                    className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-lg shadow-lg shadow-blue-500/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.button>
                </Link>
                
                <Link to="/upload">
                  <motion.button 
                    className="px-8 py-3 rounded-lg bg-transparent border border-blue-400 text-blue-300 font-medium text-lg hover:bg-blue-500/10 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Try Demo
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

const TechIcon = ({ name, color }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'blue': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'green': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'purple': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'orange': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'red': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'teal': return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
      case 'pink': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'gray': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <motion.div 
      className={`tech-icon flex flex-col items-center justify-center p-4 rounded-lg ${getColorClasses()} border hover:shadow-lg transition-all duration-300`}
      whileHover={{ y: -5, scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-12 h-12 flex items-center justify-center mb-3">
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
      </div>
      <p className="text-sm font-medium">{name}</p>
    </motion.div>
  );
};

export default Home;