import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const statsRef = useRef(null);
  const timelineRef = useRef(null);
  
  useEffect(() => {
    // Animate stats counters
    const statElements = document.querySelectorAll('.stat-value');
    
    statElements.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      
      gsap.fromTo(
        stat,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    
    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: timelineRef.current,
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
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About AURA
            </motion.h1>
            
            <motion.p 
              className="text-xl text-slate-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Transforming regulatory compliance through AI-powered solutions
            </motion.p>
            
            <motion.div 
              className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20 text-left shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-slate-300 mb-4">
                AURA (Agentic Unified Regulatory Architecture) is a revolutionary platform designed to simplify and streamline the complex world of industrial licensing and regulatory compliance. Our mission is to reduce bureaucratic delays, eliminate hidden compliance gaps, and keep businesses informed about regulatory changes.
              </p>
              <p className="text-slate-300">
                By leveraging cutting-edge AI technology, AURA transforms the traditional sequential approval process into an efficient parallel workflow, reducing approval times from years to months or even weeks.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Vision & Mission Section */}
      <section className="py-16 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 shadow-xl border border-blue-500/20"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">Our Vision</h3>
              <p className="text-slate-300">
                A world where regulatory compliance is seamless, transparent, and accessible to all businesses, regardless of size or resources. We envision a future where entrepreneurs can focus on innovation rather than paperwork, and where regulatory bodies can ensure compliance without creating bottlenecks.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 shadow-xl border border-purple-500/20"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-purple-300 mb-4">Our Mission</h3>
              <p className="text-slate-300">
                To revolutionize regulatory compliance through intelligent automation, parallel processing, and proactive alerts. We're committed to reducing approval times by 80%, eliminating compliance gaps, and creating a level playing field where small businesses can navigate regulations as effectively as large corporations with dedicated legal teams.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Key Stats Section */}
      <section ref={statsRef} className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Impact by the Numbers
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard 
              value={80} 
              label="Reduction in Approval Time" 
              description="Average time saved in the approval process" 
              icon={(
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              suffix="%"
            />
            
            <StatCard 
              value={95} 
              label="Compliance Accuracy" 
              description="Success rate in identifying regulatory requirements" 
              icon={(
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              suffix="%"
            />
            
            <StatCard 
              value={500} 
              label="Businesses Served" 
              description="Companies using AURA for compliance management" 
              icon={(
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              )}
              suffix="+"
            />
            
            <StatCard 
              value={30} 
              label="Regulatory Domains" 
              description="Industry sectors and regulatory areas covered" 
              icon={(
                <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              )}
              suffix="+"
            />
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section ref={timelineRef} className="py-16 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Journey
          </motion.h2>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            
            <TimelineItem 
              year="2020" 
              title="The Idea" 
              description="AURA was conceived after our founders experienced firsthand the challenges of navigating regulatory compliance for their manufacturing startup."
              isLeft={true}
            />
            
            <TimelineItem 
              year="2021" 
              title="Research & Development" 
              description="Our team spent a year researching regulatory frameworks across industries and developing the AI algorithms that power AURA's compliance engine."
              isLeft={false}
            />
            
            <TimelineItem 
              year="2022" 
              title="Beta Launch" 
              description="AURA was released to a select group of 50 businesses across manufacturing, healthcare, and food processing industries for beta testing."
              isLeft={true}
            />
            
            <TimelineItem 
              year="2023" 
              title="Full Platform Launch" 
              description="After incorporating feedback from our beta users, we officially launched the AURA platform with support for 15 regulatory domains."
              isLeft={false}
            />
            
            <TimelineItem 
              year="2024" 
              title="Expansion & Growth" 
              description="AURA now serves over 500 businesses across 30 regulatory domains, with new features including predictive compliance analytics and integration with government portals."
              isLeft={true}
            />
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Leadership Team
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamMember 
              name="Rajiv Mehta" 
              position="CEO & Co-Founder" 
              bio="Former regulatory consultant with 15+ years of experience in industrial compliance across Asia."
            />
            
            <TeamMember 
              name="Priya Singh" 
              position="COO & Co-Founder" 
              bio="Experienced entrepreneur who faced regulatory challenges firsthand while building her manufacturing business."
            />
            
            <TeamMember 
              name="Dr. Aditya Sharma" 
              position="CTO" 
              bio="AI researcher with a PhD in Machine Learning and previous experience at leading tech companies."
            />
            
            <TeamMember 
              name="Sarah Johnson" 
              position="Head of Regulatory Affairs" 
              bio="Former government official with deep knowledge of regulatory frameworks and policy development."
            />
            
            <TeamMember 
              name="Michael Chen" 
              position="Head of Product" 
              bio="Product leader with experience building compliance software for Fortune 500 companies."
            />
            
            <TeamMember 
              name="Lakshmi Nair" 
              position="Head of Customer Success" 
              bio="Customer experience expert focused on helping businesses navigate their compliance journey."
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-8 md:p-12 shadow-xl border border-blue-500/30 text-center">
            <motion.h2 
              className="text-3xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Join the Regulatory Revolution
            </motion.h2>
            
            <motion.p 
              className="text-lg text-blue-100 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Experience how AURA can transform your approach to regulatory compliance.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/contact">
                <motion.button 
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-lg shadow-lg shadow-blue-500/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
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
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ value, label, description, icon, suffix }) => {
  return (
    <motion.div 
      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 shadow-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center mr-4">
          {icon}
        </div>
        <div>
          <div className="flex items-baseline">
            <span className="stat-value text-3xl font-bold text-white" data-target={value}>0</span>
            <span className="text-2xl font-bold text-white ml-1">{suffix}</span>
          </div>
          <h3 className="text-lg font-medium text-blue-300">{label}</h3>
        </div>
      </div>
      <p className="text-sm text-slate-400">{description}</p>
    </motion.div>
  );
};

const TimelineItem = ({ year, title, description, isLeft }) => {
  return (
    <div className={`timeline-item relative mb-12 ${isLeft ? 'left-item' : 'right-item'}`}>
      <div className="flex items-center">
        {isLeft ? (
          <>
            <div className="w-1/2 pr-8 md:pr-16 text-right">
              <div className="bg-slate-700/50 rounded-lg p-4 border border-blue-500/20">
                <h3 className="text-xl font-semibold text-blue-300 mb-1">{title}</h3>
                <div className="text-sm font-medium text-purple-400 mb-2">{year}</div>
                <p className="text-sm text-slate-300">{description}</p>
              </div>
            </div>
            
            <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-blue-500 border-4 border-slate-800 flex items-center justify-center z-10">
              <span className="text-white text-xs font-bold">{year.slice(2)}</span>
            </div>
            
            <div className="w-1/2 pl-8 md:pl-16"></div>
          </>
        ) : (
          <>
            <div className="w-1/2 pr-8 md:pr-16"></div>
            
            <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-purple-500 border-4 border-slate-800 flex items-center justify-center z-10">
              <span className="text-white text-xs font-bold">{year.slice(2)}</span>
            </div>
            
            <div className="w-1/2 pl-8 md:pl-16">
              <div className="bg-slate-700/50 rounded-lg p-4 border border-purple-500/20">
                <h3 className="text-xl font-semibold text-purple-300 mb-1">{title}</h3>
                <div className="text-sm font-medium text-blue-400 mb-2">{year}</div>
                <p className="text-sm text-slate-300">{description}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const TeamMember = ({ name, position, bio }) => {
  return (
    <motion.div 
      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-blue-300 mb-1">{name}</h3>
        <div className="text-sm font-medium text-purple-400 mb-4">{position}</div>
        <p className="text-slate-300 text-sm">{bio}</p>
        
        <div className="mt-6 flex space-x-3">
          <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default About;