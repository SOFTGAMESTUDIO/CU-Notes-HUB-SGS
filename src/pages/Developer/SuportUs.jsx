import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import { motion } from "framer-motion";
import qrCode from "../../assets/QR.jpeg";

const SupportUs = () => {
  return (
    <Layout>
      <Helmet>
        <title>Support Free Education | CU Study Hub</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-gray-900 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Fuel Free Education for All
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              CU Study Hub provides 100% free educational resources with zero ads or paywalls. 
              Help us sustain this mission and empower thousands of students.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Impact Section */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-indigo-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-4">Your Impact</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg mr-4">
                      <span className="text-2xl">📚</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Resource Maintenance</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Keep servers running and content updated
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg mr-4">
                      <span className="text-2xl">✨</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Ad-Free Experience</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Maintain our zero-ad policy forever
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg mr-4">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Future Development</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Build new features requested by students
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h3 className="text-xl font-bold mb-2">Every Contribution Matters</h3>
                <p className="opacity-90">
                  Join 450+ supporters keeping education free and accessible
                </p>
              </motion.div>
            </motion.div>

            {/* Donation Card */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-600">
                <div className="bg-white dark:bg-gray-800 p-7">
                  <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                    Support in Seconds
                  </h3>
                  
                  <div className="flex flex-col items-center mb-6">
                    <div className="p-4 bg-indigo-50 dark:bg-gray-700 rounded-xl mb-5">
                      <img
                        src={qrCode}
                        alt="Donate via UPI QR Code"
                        className="w-80 h-80 object-contain rounded-lg"
                      />
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 font-medium text-center mb-4">
                      Scan with any UPI app
                    </p>
                    
                    <div className="flex space-x-3 mb-6">
                      <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-md text-sm">PayTM</div>
                      <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-md text-sm">GPay</div>
                      <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-md text-sm">PhonePe</div>
                    </div>
                    <div className="flex space-x-3 mb-6">
                      <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-md text-sm">UPI ID : liveshgarg@cnrb</div>
                    
                    </div>
                     <div className="flex space-x-3 mb-6">
                      <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-md text-3xl">Livesh Garg</div>
                    
                    </div>
                  </div>
                  
                  <div className="text-center border-t border-gray-100 dark:border-gray-700 pt-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Your donation helps us cover server costs and development
                    </p>
                    <a
                      href="mailto:team.softgamestudio@gmail.com?subject=Sponsorship%20Inquiry"
                      className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                    >
                      Discuss sponsorship opportunities
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Testimonial */}
          <motion.div
            className="mt-16 max-w-3xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="text-indigo-600 dark:text-indigo-400 text-4xl mb-2">❝</div>
            <blockquote className="text-lg italic text-gray-700 dark:text-gray-300">
              "CU Study Hub saved me during exams with last-minute notes. Supporting them is supporting education equality."
            </blockquote>
            <p className="mt-4 text-gray-600 dark:text-gray-400">- Recent Computer Science Graduate</p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default SupportUs;