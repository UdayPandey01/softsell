"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronRight, Shield, DollarSign, Users, Lock, CheckCircle, ChevronDown } from "lucide-react";

const WhyChooseUs = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const container = document.getElementById('gradient-container');
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const nodeRef = useRef(null);
    const inView = useInView(nodeRef);
    
    useEffect(() => {
      if (!inView) return;
      
      let startTime;
      let animationFrame;
      
      const updateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        setCount(Math.floor(percentage * end));
        
        if (percentage < 1) {
          animationFrame = requestAnimationFrame(updateCount);
        }
      };
      
      animationFrame = requestAnimationFrame(updateCount);
      
      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, inView]);
    
    return { count, nodeRef };
  };
  
  const formatValue = (value) => {
    if (typeof value === 'string') return value;
    
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "M";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(0) + "K";
    }
    return value;
  };
  
  const features = [
    {
      id: 1,
      title: 'Maximum Return Value',
      description: 'Our marketplace algorithms ensure you get up to 70% of original license value, compared to industry average of 40%.',
      statistic: '70%',
      statisticLabel: 'of original value',
      icon: <DollarSign size={28} />,
      gradient: 'from-emerald-500 to-teal-400',
      lightGradient: 'from-emerald-50 to-teal-50',
      hoverGradient: 'from-emerald-600 to-teal-500',
      textColor: 'text-emerald-600'
    },
    {
      id: 2,
      title: 'Fully Compliant Process',
      description: 'Our legal team ensures all transfers comply with license agreements and software regulations worldwide.',
      statistic: '100%',
      statisticLabel: 'legally compliant',
      icon: <Shield size={28} />,
      gradient: 'from-indigo-500 to-blue-400',
      lightGradient: 'from-indigo-50 to-blue-50',
      hoverGradient: 'from-indigo-600 to-blue-500',
      textColor: 'text-indigo-600'
    },
    {
      id: 3,
      title: 'Verified Buyers Network',
      description: 'Access our exclusive network of 5,000+ pre-verified business buyers actively looking for discounted software.',
      statistic: '5,000+',
      statisticLabel: 'verified buyers',
      icon: <Users size={28} />,
      gradient: 'from-violet-500 to-purple-400',
      lightGradient: 'from-violet-50 to-purple-50',
      hoverGradient: 'from-violet-600 to-purple-500',
      textColor: 'text-violet-600'
    },
    {
      id: 4,
      title: 'Secure Escrow System',
      description: 'Our bank-grade secure payment system protects both parties throughout the entire transaction process.',
      statistic: 'Bank-Grade',
      statisticLabel: 'security system',
      icon: <Lock size={28} />,
      gradient: 'from-rose-500 to-pink-400',
      lightGradient: 'from-rose-50 to-pink-50',
      hoverGradient: 'from-rose-600 to-pink-500',
      textColor: 'text-rose-600'
    }
  ];

  const stats = [
    { value: 14000000, label: 'Recovered value', prefix: '$', suffix: '+', format: true },
    { value: 2500, label: 'Companies served', suffix: '+' },
    { value: 14, label: 'Average sale time', suffix: ' days' },
    { value: 98, label: 'Client satisfaction', suffix: '%' }
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-gradient-to-b from-white to-blue-50 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={statsRef} id="gradient-container" className="relative rounded-3xl shadow-xl mb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600"></div>
          <div 
            className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-60"
            style={{
              background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(105, 155, 255, 0.4), transparent 40%)`,
            }}
          ></div>
          <div className="relative z-10 p-8 md:p-12">
            <div className="text-center mb-10">
              <motion.span 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isStatsInView ? 1 : 0, y: isStatsInView ? 0 : -20 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium text-sm mb-4"
              >
                Proven Results
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isStatsInView ? 1 : 0, y: isStatsInView ? 0 : -20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold text-white mb-2"
              >
                Why Companies Trust SoftSell
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isStatsInView ? 1 : 0, y: isStatsInView ? 0 : -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-blue-100 max-w-2xl mx-auto"
              >
                We've helped thousands of businesses recover millions in software license value.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              {stats.map((stat, index) => {
                const { count, nodeRef } = useCounter(
                  typeof stat.value === 'string' ? 0 : stat.value,
                  2000 + (index * 300)
                );
                
                return (
                  <motion.div 
                    key={index} 
                    ref={nodeRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: isStatsInView ? 1 : 0,
                      y: isStatsInView ? 0 : 20,
                    }}
                    transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
                  >
                    <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                      {stat.prefix || ''}{stat.format ? formatValue(count) : count}{stat.suffix || ''}
                    </p>
                    <p className="text-blue-100">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Wave SVG effect at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden">
              <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-12 text-blue-50">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,140.83,141.89,213.83,131.11,304.43,118.72,248.071,70.79,321.39,56.44Z" className="fill-white opacity-20"></path>
              </svg>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">
            Our Advantages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">SoftSell</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Experience the most advanced license recovery platform, built for businesses like yours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              className={`bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 relative overflow-hidden transform hover:-translate-y-1 hover:shadow-xl`}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Top accent border with gradient */}
              <div className={`h-1 w-full bg-gradient-to-r ${feature.gradient}`}></div>
              
              {/* Background decoration */}
              <div className={`absolute -right-16 -bottom-16 w-40 h-40 rounded-full transition-all duration-500 bg-gradient-to-br ${
                hoveredFeature === feature.id ? feature.lightGradient + ' opacity-100 scale-125' : feature.lightGradient + ' opacity-0 scale-100'
              }`}></div>
              
              <div className="relative z-10 p-6">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      hoveredFeature === feature.id 
                        ? `bg-gradient-to-br ${feature.hoverGradient} text-white shadow-lg` 
                        : `bg-gradient-to-br ${feature.lightGradient} ${feature.textColor}`
                    }`}>
                      {feature.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                      <div className="mt-2 md:mt-0">
                        <span className={`text-2xl font-bold ${feature.textColor}`}>{feature.statistic}</span>
                        <span className="text-gray-500 text-sm ml-1">{feature.statisticLabel}</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{feature.description}</p>
                    
                    {/* Subtle hover arrow indicator */}
                    <div className={`mt-4 flex justify-end transition-opacity duration-300 ${
                      hoveredFeature === feature.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <ChevronRight className={feature.textColor} size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 relative">
          {/* Expanded additional features section */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-16 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: <CheckCircle className="text-green-500" size={24} />,
                      title: "24/7 Support Team",
                      description: "Access our dedicated support specialists anytime you need assistance"
                    },
                    {
                      icon: <CheckCircle className="text-green-500" size={24} />,
                      title: "Transparent Fee Structure",
                      description: "No hidden costs with our simple percentage-based commission model"
                    },
                    {
                      icon: <CheckCircle className="text-green-500" size={24} />,
                      title: "Fast Payment Processing",
                      description: "Receive funds within 3 business days of completed transactions"
                    }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * idx }}
                      className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                    >
                      <div className="flex items-start">
                        <div className="mr-4 mt-1">{item.icon}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Toggle button for expanding */}
          <div className="flex justify-center mb-16">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              {isExpanded ? "Show Less" : "View More Features"}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={18} />
              </motion.div>
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative"
        >
          {/* CTA gradient background with mesh effect */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700"></div>
            
            {/* Mesh gradient overlay */}
            <div className="absolute inset-0 opacity-30">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#smallGrid)" />
              </svg>
            </div>
            
            {/* Glass reflections */}
            <div className="absolute -left-40 -top-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-white opacity-10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 p-8 md:p-12 text-center">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-white mb-4"
            >
              Ready to recover your software investment?
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-blue-100 mb-8 max-w-2xl mx-auto"
            >
              Join the thousands of businesses that have successfully recouped their software costs through SoftSell. It takes less than 5 minutes to get started.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <a 
                href="#contact" 
                className="inline-block bg-gradient-to-r from-white to-blue-50 hover:from-blue-50 hover:to-blue-100 text-blue-600 font-medium py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started Today
              </a>
              <a 
                href="#demo" 
                className="inline-flex items-center text-white hover:text-blue-100 font-medium transition duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo Video
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;