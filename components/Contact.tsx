"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    licenseCount: '',
    purchaseDate: '',
    message: ''
  });
  
  interface FormErrors {
    [key: string]: string | undefined;
    name?: string;
    email?: string;
    company?: string;
    licenseType?: string;
  }
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [formIsValid, setFormIsValid] = useState(false);
  const [focusedField, setFocusedField] = useState<FormField>(null);

  const licenseTypes = [
    'Enterprise Software',
    'Operating Systems',
    'Design & Creative',
    'Development Tools',
    'Productivity Suite',
    'Database & Analytics',
    'Security Software',
    'Cloud Services',
    'Virtualization',
    'Other'
  ];

  useEffect(() => {
    if (formStep === 1) {
      const step1Valid = formData.name.trim() !== '' && 
                        formData.email.trim() !== '' && 
                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email) &&
                        formData.company.trim() !== '';
      setFormIsValid(step1Valid);
    } else {
      const step2Valid = formData.licenseType !== '';
      setFormIsValid(step2Valid);
    }
  }, [formData, formStep]);

  const validateStep1 = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.licenseType) {
      newErrors.licenseType = 'Please select a license type';
    }
    
    return newErrors;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  type FormField = 'name' | 'email' | 'company' | 'licenseType' | 'licenseCount' | 'purchaseDate' | 'message' | null;

  const handleFocus = (field: FormField): void => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleNextStep = () => {
    const newErrors = validateStep1();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setFormStep(2);
  };

  const handlePrevStep = () => {
    setFormStep(1);
  };

  interface FormSubmitEvent {
    preventDefault: () => void;
  }

  const handleSubmit = (e: FormSubmitEvent): void => {
      e.preventDefault();
      
      const newErrors: FormErrors = formStep === 1 ? validateStep1() : validateStep2();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      
      setIsSubmitting(true);
      
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          licenseType: '',
          licenseCount: '',
          purchaseDate: '',
          message: ''
        });
        setFormStep(1);
      }, 1500);
    };

  const getFieldTip = () => {
    switch(focusedField) {
      case 'name':
        return "Please provide your full name for personalized communications.";
      case 'email':
        return "We'll send your free valuation to this email address.";
      case 'company':
        return "Your company name helps us tailor our valuation to your industry.";
      case 'licenseType':
        return "Select the category that best describes your software licenses.";
      case 'licenseCount':
        return "The number of licenses affects your potential return. More licenses often means a higher valuation.";
      case 'purchaseDate':
        return "Newer licenses typically have higher resale value.";
      case 'message':
        return "Include software versions, purchase types (perpetual/subscription), or any other details.";
      default:
        return null;
    }
  };

  const fieldTip = getFieldTip();

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Ready to Unlock the Value of Your Software Licenses?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Fill out the form and our team will provide a free valuation of your unused licenses within 24 hours.
            </p>
            
            <div className="space-y-8">
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600 mb-10">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">Why Recover Value from Unused Licenses?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Reduce annual maintenance costs</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Recover up to 70% of original investment</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Improve IT budget efficiency</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Free up resources for strategic initiatives</span>
                  </li>
                </ul>
              </div>
            
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
                  <p className="text-gray-600">info@softsell.example.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Call Us</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Visit Us</h3>
                  <p className="text-gray-600">123 Tech Plaza, San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-blue-600 px-8 py-4 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Get a Free License Valuation</h3>
                {formStep === 2 && (
                  <button
                    onClick={handlePrevStep}
                    className="text-white hover:underline flex items-center text-sm"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                )}
              </div>

              <div className="bg-blue-500 h-1 flex">
                <div className={`h-full bg-blue-300 transition-all duration-300 ${formStep === 1 ? 'w-1/2' : 'w-full'}`}></div>
              </div>
              
              <div className="p-8">
                {isSubmitted ? (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
                    <p className="text-gray-600 mb-6">
                      Your request has been received. We&apos;ll get back to you with a valuation within 24 hours.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
                    >
                      Submit Another Request
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={formStep === 1 ? handleNextStep : handleSubmit}>
                    <AnimatePresence mode="wait">
                      {formStep === 1 ? (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="mb-6">
                            <h4 className="text-lg text-gray-700 font-medium mb-4">Step 1: Your Information</h4>
                            
                            <div className="mb-4 relative">
                              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name*</label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onFocus={() => handleFocus('name')}
                                onBlur={handleBlur}
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                                placeholder="John Smith"
                              />
                              {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            
                            <div className="mb-4 relative">
                              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address*</label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => handleFocus('email')}
                                onBlur={handleBlur}
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                                placeholder="john@company.com"
                              />
                              {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            
                            <div className="relative">
                              <label htmlFor="company" className="block text-gray-700 font-medium mb-2">Company Name*</label>
                              <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                onFocus={() => handleFocus('company')}
                                onBlur={handleBlur}
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.company ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                                placeholder="Acme Inc."
                              />
                              {errors.company && <p className="mt-1 text-red-500 text-sm">{errors.company}</p>}
                            </div>
                          </div>
                          
                          <button
                            type="submit"
                            disabled={!formIsValid}
                            className={`w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300 ${formIsValid ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'}`}
                          >
                            Continue
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="mb-6">
                            <h4 className="text-lg text-gray-700 font-medium mb-4">Step 2: License Details</h4>
                            
                            <div className="mb-4">
                              <label htmlFor="licenseType" className="block text-gray-700 font-medium mb-2">License Type*</label>
                              <select
                                id="licenseType"
                                name="licenseType"
                                value={formData.licenseType}
                                onChange={handleChange}
                                onFocus={() => handleFocus('licenseType')}
                                onBlur={handleBlur}
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.licenseType ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                              >
                                <option value="">Select license type</option>
                                {licenseTypes.map((type) => (
                                  <option key={type} value={type}>
                                    {type}
                                  </option>
                                ))}
                              </select>
                              {errors.licenseType && <p className="mt-1 text-red-500 text-sm">{errors.licenseType}</p>}
                            </div>
                            
                            <div className="mb-4">
                              <label htmlFor="licenseCount" className="block text-gray-700 font-medium mb-2">
                                Number of Licenses <span className="text-gray-500 font-normal">(optional)</span>
                              </label>
                              <input
                                type="number"
                                id="licenseCount"
                                name="licenseCount"
                                value={formData.licenseCount}
                                onChange={handleChange}
                                onFocus={() => handleFocus('licenseCount')}
                                onBlur={handleBlur}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                                placeholder="e.g., 25"
                                min="1"
                              />
                            </div>
                            
                            <div className="mb-4">
                              <label htmlFor="purchaseDate" className="block text-gray-700 font-medium mb-2">
                                Original Purchase Date <span className="text-gray-500 font-normal">(optional)</span>
                              </label>
                              <input
                                type="date"
                                id="purchaseDate"
                                name="purchaseDate"
                                value={formData.purchaseDate}
                                onChange={handleChange}
                                onFocus={() => handleFocus('purchaseDate')}
                                onBlur={handleBlur}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                              />
                            </div>
                            
                            <div className="mb-4">
                              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Additional Details</label>
                              <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                onFocus={() => handleFocus('message')}
                                onBlur={handleBlur}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                                placeholder="Tell us about your software licenses (versions, original cost, etc.)"
                              ></textarea>
                            </div>
                          </div>
                          
                          <button
                            type="submit"
                            disabled={isSubmitting || !formIsValid}
                            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 ${isSubmitting || !formIsValid ? 'opacity-70 cursor-not-allowed' : ''}`}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                              </span>
                            ) : 'Get Free Valuation'}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <AnimatePresence>
                      {fieldTip && (
                        <motion.div 
                          className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-start">
                            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <p className="text-blue-800 text-sm">{fieldTip}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                )}
                
                {!isSubmitted && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-center text-gray-500 text-sm mb-3">Trusted by 500+ companies worldwide</p>
                    <div className="flex justify-center space-x-6">
                      <div className="w-10 h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-10 h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-10 h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-10 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
