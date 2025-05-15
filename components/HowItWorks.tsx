"use client"

import React from 'react';
import { useState } from 'react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: 'Upload Your Licenses',
      description: 'Quickly upload your unused software license information through our secure portal. Our system validates and catalogs your licenses instantly.',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Get Instant Valuation',
      description: 'Our AI-powered system provides real-time market value assessment based on current demand and analyzes pricing trends to maximize your return.',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Get Paid Securely',
      description: 'Once a buyer is matched, receive payment through our secure escrow system within 14 days. Funds are transferred directly to your preferred account.',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">
            Simple 3-Step Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            How It <span className="text-blue-600">Works</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Our streamlined process makes selling your unused software licenses simple, secure, and profitable.
          </p>
        </div>

        <div className="relative mb-16">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -mt-px z-0"></div>
          <div className="flex justify-between relative z-10">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className="flex flex-col items-center"
                onClick={() => setActiveStep(step.id)}
              >
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    activeStep >= step.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-400 border-2 border-gray-200'
                  }`}
                >
                  <span className="text-xl font-bold">{step.id}</span>
                </div>
                <p className={`mt-2 font-medium ${activeStep >= step.id ? 'text-blue-600' : 'text-gray-500'}`}>
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div 
              key={step.id}
              className={`rounded-2xl p-8 transition-all duration-500 transform ${
                activeStep === step.id 
                  ? 'bg-white shadow-xl scale-105 border-t-4 border-blue-600' 
                  : 'bg-white/50 shadow-md hover:shadow-lg hover:scale-102'
              }`}
              onClick={() => setActiveStep(step.id)}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                activeStep === step.id ? 'bg-blue-50' : 'bg-gray-50'
              }`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="#contact" 
            className="group inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-xl transition duration-300 shadow-lg hover:shadow-xl"
          >
            Start Selling Now
            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <p className="mt-4 text-gray-500 text-sm">No obligations or upfront fees</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;