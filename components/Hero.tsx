"use client"

import React, { useState } from 'react';
import { WobbleCard } from "@/components/ui/wobble-card";

const Hero = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-6">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
                <svg className="mr-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Trusted by 2,500+ companies worldwide
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Turn Unused Software Licenses Into 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 block">
                Immediate Revenue
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              Recover up to 70% of your investment on software licenses you're no longer using. Our secure marketplace connects you directly with verified buyers.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Get Your Valuation
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
            
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              100% free assessment. No obligation. Usually under 24 hours.
            </div>
          </div>
          
          {/* Right side with WobbleCard */}
          <div className="relative">
            <WobbleCard 
              containerClassName="col-span-1 min-h-[440px] bg-blue-600"
              className=""
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h4 className="text-lg font-bold text-white">License Value Recovery</h4>
                    <p className="text-blue-100">Your estimated returns</p>
                  </div>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    +$35,750
                  </div>
                </div>
                
                <div className="space-y-4">
                  {['Adobe Creative Cloud', 'Microsoft Power BI', 'Salesforce'].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-blue-700/30 backdrop-blur-sm rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                          {item.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-white">{item}</p>
                          <p className="text-sm text-blue-100">Enterprise - {10 + index} licenses</p>
                        </div>
                      </div>
                      <div className="text-white font-bold">
                        ${(12500 + index * 3700).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-6 bg-white hover:bg-blue-50 text-blue-600 font-medium px-4 py-2 rounded-lg transition-colors">
                  Recover Value Now
                </button>
              </div>
              
              {/* Notification pop-up */}
              {/* <div className="absolute -bottom-4 -left-10 bg-white rounded-lg shadow-lg p-4 transform -rotate-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Valuation Complete</p>
                    <p className="text-sm text-gray-500">TechFirst recovered $28,450</p>
                  </div>
                </div>
              </div> */}
            </WobbleCard>
          </div>
        </div>
        
        {/* Additional WobbleCards section */}
        <div className="mt-16 md:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <WobbleCard 
              containerClassName="col-span-1 lg:col-span-2 bg-blue-900 min-h-[220px]"
              className=""
            >
              <div className="max-w-md p-6">
                <h2 className="text-left text-balance text-xl lg:text-2xl font-semibold tracking-tight text-white">
                  The Most Trusted License Recovery Platform
                </h2>
                <p className="mt-3 text-left text-base text-blue-100">
                  Join over 2,500 companies who have recovered millions in unused software investments.
                </p>
              </div>
              <div className="absolute -right-4 lg:-right-[20%] -bottom-6 flex space-x-4">
                {['Microsoft', 'Adobe', 'Salesforce'].map((company, index) => (
                  <div key={index} className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl">
                    <span className="font-bold text-lg text-white">{company.charAt(0)}</span>
                  </div>
                ))}
              </div>
            </WobbleCard>
            
            <WobbleCard 
              containerClassName="col-span-1 bg-green-700 min-h-[220px]"
              className=""
            >
              <div className="p-6">
                <h2 className="text-left text-balance text-xl font-semibold tracking-tight text-white">
                  Average Recovery
                </h2>
                <p className="mt-2 text-left text-sm text-green-100">
                  Percentage of original investment
                </p>
                <div className="mt-4 text-4xl font-bold text-white">
                  70%
                </div>
                <p className="mt-3 text-sm text-green-100">
                  Our marketplace achieves industry-leading returns
                </p>
              </div>
            </WobbleCard>
          </div>
        </div>
        
        {/* Trusted by logos */}
        <div className="mt-16">
          <p className="text-center text-gray-500 mb-6">Trusted by leading companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
            {['Microsoft', 'Adobe', 'IBM', 'Oracle', 'Salesforce'].map((company, index) => (
              <div key={index} className="text-xl md:text-2xl font-bold text-gray-400">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;