"use client"

import React, { useState, useEffect, useRef } from 'react';
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ChevronRight, CheckCircle, Award, BarChart2, Clock, Users } from "lucide-react";
import Image from 'next/image';

const EnhancedTestimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("testimonials");
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  
  // Animated counter hook
  interface CounterResult {
    count: number;
    nodeRef: React.RefObject<HTMLDivElement | null>;
  }

  const useCounter = (end: number, duration: number = 2000): CounterResult => {
    const [count, setCount] = useState<number>(0);
    const nodeRef = useRef<HTMLDivElement>(null);
    const inView = useInView(nodeRef);
    
    useEffect(() => {
      if (!inView) return;
      
      let startTime: number | undefined;
      let animationFrame: number;
      
      const updateCount = (timestamp: number): void => {
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 200) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Check immediately on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom data for SoftSell testimonials
  const testimonials = [
    {
      quote: "SoftSell helped us recover over $35,000 from unused enterprise licenses. The process was seamless, and their valuation was 25% higher than what we were offered elsewhere.",
      name: "Sarah Johnson",
      designation: "CTO at TechFirst Solutions",
      src: "sarah.jpg",
      company: "TechFirst Solutions",
      industry: "SaaS Development",
      roi: "145%",
    },
    {
      quote: "After downsizing our team, we had numerous unused licenses sitting idle. SoftSell found buyers within days and handled all the compliance details. Outstanding service!",
      name: "Mark Reynolds",
      designation: "IT Director at Horizon Innovations",
      src: "mark.webp",
      company: "Horizon Innovations",
      industry: "Financial Technology",
      roi: "210%",
    },
    {
      quote: "The ROI from working with SoftSell was immediate. We recovered 65% of our original investment on software we were no longer using, significantly boosting our quarterly financial results.",
      name: "Jennifer Lee",
      designation: "CFO at Apex Global",
      src: "jennifer.jpg",
      company: "Apex Global",
      industry: "E-commerce",
      roi: "165%",
    },
    {
      quote: "What impressed me most was the transparency throughout the entire process. The dashboard gave us real-time updates, and we always knew exactly where we stood with our license sales.",
      name: "David Chen",
      designation: "Operations Manager at Velocity Systems",
      src: "david.jpg",
      company: "Velocity Systems",
      industry: "Healthcare IT",
      roi: "180%",
    },
    {
      quote: "The AI-powered valuation feature accurately predicted our recovery value within 3% of the final amount. This level of precision helped us forecast our budget more effectively.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "lisa.jpg",
      company: "FutureNet",
      industry: "Telecommunications",
      roi: "195%",
    },
  ];

  // Case study data
  const caseStudies = [
    {
      title: "Enterprise Tech Overhaul",
      company: "Global Manufacturing Corp",
      challenge: "After a major merger, the company had $1.2M in redundant software licenses.",
      solution: "SoftSell's marketplace connected them with pre-vetted buyers within their industry.",
      result: "Recovered $780,000 within 45 days, avoiding quarterly write-offs.",
      metric: "65% Recovery Rate",
    },
    {
      title: "Startup Pivot & Cost Reduction",
      company: "InnovateTech",
      challenge: "Pivoting business model left $250K in specialized design software unused.",
      solution: "SoftSell matched licenses with compatible buyers and handled all transfer compliance.",
      result: "Recovered $162,500 that funded critical new development tools.",
      metric: "3 Week Turnaround",
    },
    {
      title: "Annual License Optimization",
      company: "FinServe Solutions",
      challenge: "Regular audits identified $420K in underutilized enterprise subscriptions annually.",
      solution: "Ongoing SoftSell partnership with quarterly optimization reviews.",
      result: "Established continuous license monetization pipeline, improving IT budget flexibility.",
      metric: "$1.2M 3-Year ROI",
    },
  ];

  // Success metrics with animated counters
  const metrics = [
    { 
      prefix: "$", 
      value: 2400000, 
      suffix: "+", 
      label: "License Value Recovered",
      icon: <BarChart2 className="text-blue-600" size={24} />,
      format: true
    },
    { 
      prefix: "", 
      value: 94, 
      suffix: "%", 
      label: "Client Satisfaction Rate",
      icon: <Users className="text-blue-600" size={24} />
    },
    { 
      prefix: "", 
      value: 72, 
      suffix: "", 
      label: "Hours Average Time to First Offer",
      icon: <Clock className="text-blue-600" size={24} />
    },
  ];

  const formatValue = (value: number): string => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "M";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(0) + "K";
    }
    return value.toString();
  };

  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">
            Real Results for Real Businesses
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Our Clients <span className="text-blue-600">Speak for Us</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            See how companies like yours transform unused software licenses into immediate cash recovery with SoftSell&apos;s intelligent marketplace.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-gray-100 p-1 rounded-xl">
            {[
              { id: "testimonials", label: "Testimonials" },
              { id: "caseStudies", label: "Case Studies" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-6 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {activeTab === "testimonials" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <AnimatedTestimonials testimonials={testimonials} />
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-blue-600 font-bold">{testimonial.roi}</span>
                    <span className="text-gray-500">ROI</span>
                  </div>
                  <h4 className="font-semibold text-lg mb-1">{testimonial.company}</h4>
                  <p className="text-gray-500 text-sm mb-4">{testimonial.industry}</p>
                  <div className="flex items-center mt-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <Image 
                        src={`${testimonial.src}`} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {(e.target as HTMLImageElement).src = "/api/placeholder/100/100"}}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{testimonial.name}</p>
                      <p className="text-gray-500 text-xs">{testimonial.designation}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "caseStudies" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-blue-600 p-4">
                    <h3 className="text-white font-bold text-lg mb-1">{study.title}</h3>
                    <p className="text-blue-100 text-sm">{study.company}</p>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className="text-gray-600 font-semibold text-sm mb-2">Challenge:</h4>
                      <p className="text-gray-700">{study.challenge}</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-gray-600 font-semibold text-sm mb-2">Solution:</h4>
                      <p className="text-gray-700">{study.solution}</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-gray-600 font-semibold text-sm mb-2">Result:</h4>
                      <p className="text-gray-700">{study.result}</p>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                      <span className="font-bold text-blue-600">{study.metric}</span>
                      <a href="#contact" className="text-blue-600 hover:text-blue-700 inline-flex items-center font-medium text-sm">
                        Full Case Study <ChevronRight size={16} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div 
          style={{ y: parallaxY }}
          className="mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-center text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#smallGrid)" />
              </svg>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-3xl md:text-4xl font-bold mb-2">4.9/5 Trustpilot rating</p>
              <p className="text-blue-100 text-lg mb-6">Based on 450+ verified reviews</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
                {[
                  { icon: <CheckCircle size={24} />, text: "Money-back guarantee" },
                  { icon: <Award size={24} />, text: "ISO 27001 certified" },
                  { icon: <Users size={24} />, text: "500+ enterprise clients" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-center">
                    <div className="mr-2 text-yellow-400">{item.icon}</div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="inline-flex flex-col sm:flex-row gap-4">
                <a 
                  href="#contact" 
                  className="bg-white text-blue-600 font-medium py-3 px-8 rounded-xl transition duration-300 hover:bg-blue-50 hover:shadow-lg flex items-center justify-center"
                >
                  Get a Free Valuation <ChevronRight size={16} className="ml-2" />
                </a>
                
                <a 
                  href="#demo" 
                  className="bg-transparent border-2 border-white text-white font-medium py-3 px-8 rounded-xl transition duration-300 hover:bg-white/10 flex items-center justify-center"
                >
                  Watch 2-Minute Demo
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <div ref={statsRef} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { count, nodeRef } = useCounter(
              metric.value,
              2000 + (index * 300)
            );
            
            return (
              <motion.div 
                key={index}
                ref={nodeRef}
                className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isStatsInView ? 1 : 0, 
                  y: isStatsInView ? 0 : 20 
                }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              >
                <div className="mb-4">{metric.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {metric.prefix}
                  {metric.format ? formatValue(count) : count}
                  {metric.suffix}
                </div>
                <div className="text-gray-600 text-center">{metric.label}</div>
              </motion.div>
            );
          })}
        </div>
    
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: isStatsInView ? 1 : 0, 
            y: isStatsInView ? 0 : 30 
          }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to unlock the value in your unused software licenses?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies that have transformed idle IT assets into immediate financial recovery.
          </p>
          <a 
            href="#calculator" 
            className="inline-flex items-center bg-blue-600 text-white font-medium py-3 px-8 rounded-xl transition duration-300 hover:bg-blue-700"
          >
            Calculate Your Recovery Value <ChevronRight size={16} className="ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedTestimonials;