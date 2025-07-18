import React from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
  return (
    <Layout>
        <Helmet>
          {/* Primary Meta Tags */}
          <title>
            PrivacyPolicy -  CU STUDY HUB | Soft Game Studio
          </title>
        
          <meta
            name="title"
            content=" PrivacyPolicy -  CU STUDY HUB | Soft Game Studio"
          />
          <meta
            name="description"
            content="Free Notes share and Access a curated collection of study notes, lecture materials, and exam resources"
          />

          
          <meta
            property="og:title"
            content=" PrivacyPolicy -  CU STUDY HUB | Soft Game Studio"
          />
          <meta
            property="og:description"
            content="Free Notes share and Access a curated collection of study notes, lecture materials, and exam resources"
          />
          <meta
            property="og:image"
            content="https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/ing.png?alt=media&token=30ec48dc-f618-4d39-a69c-2aaaac7f7269"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta
            property="og:image:alt"
            content="PrivacyPolicy -  CU STUDY HUB | Soft Game Studio"
          />
          <meta property="og:locale" content="en_US" />

        
      
        </Helmet>
 <div className="min-h-screen bg-purple-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">Privacy Policy</h1>
          <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
        </div>
        
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 py-6 px-8">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-lg mr-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" >
                    <img src="https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/ing.png?alt=media&token=30ec48dc-f618-4d39-a69c-2aaaac7f7269" alt="" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">CU NOTES HUB</h2>
                <p className="text-purple-200">Educational Notes Platform</p>
              </div>
            </div>
          </div>
          
          {/* Content Container */}
          <div className="p-8">
            {/* Introduction */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Website Name and Domain</h3>
              <p className="text-gray-600 mb-6">
                CU NOTES HUB is the brand name of our educational notes platform. Our site is accessible at <span className="text-purple-600 font-medium">https://custudyhub.web.app</span>. CU Notes Hub operates primarily to serve students seeking study notes.
              </p>
            </div>
            
            {/* Information Collection */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Information We Collect</h3>
              <p className="text-gray-600 mb-4">
                We only collect the minimum information needed to provide our service:
              </p>
              
              <div className="bg-purple-50 rounded-lg p-6 mb-6">
                <ul className="list-disc pl-5 space-y-3 text-gray-700">
                  <li><span className="font-medium">Academic details and notes:</span> Course, branch, subject, semester, and note type information that users provide when they upload notes. We also store the note content (PDF files) uploaded by users.</li>
                  <li><span className="font-medium">User name and roll number:</span> We collect each user's name and college roll number as identifiers for the notes they submit.</li>
                  <li><span className="font-medium">Contact information (voluntary):</span> We do not collect email addresses, phone numbers, or other personal data by default. We only receive contact details if you choose to contact us via our form.</li>
                </ul>
              </div>
              
              <p className="text-gray-600">
                We never collect sensitive personal data (like government ID numbers, financial data, health information, etc.) nor any cookies or usage data beyond what is required by our hosting provider for basic operation.
              </p>
            </div>
            
            {/* Third Party Services */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Third-Party Services Used</h3>
              <div className="flex items-start bg-purple-50 rounded-lg p-6">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Firebase (Google)</h4>
                  <p className="text-gray-700">
                    Our site uses Firebase (by Google) to host the app and store data. Firebase is certified under major industry security standards (ISO 27001 and SOC 1/2/3 compliance). We do not use any advertising networks or analytics services on our site. Only Firebase is used as a third-party for functionality and hosting.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Data Usage */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Use of Collected Data</h3>
              <div className="bg-purple-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  The information we collect is used only to manage and deliver the notes service. Specifically:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Academic details and note files are used to index and share notes correctly</li>
                  <li>We do not use your data for marketing, sell it to others, or share it with unrelated third parties</li>
                  <li>Contact information is used solely to respond to inquiries</li>
                  <li>We do not send unsolicited emails or communications</li>
                </ul>
              </div>
            </div>
            
            {/* Data Deletion */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Deletion / Modification Policy</h3>
              <div className="border-l-4 border-purple-500 pl-4 py-1">
                <p className="text-gray-700">
                  Currently, CU NOTES HUB does not provide a mechanism for users to request deletion or modification of their submitted data. Once notes are uploaded, they remain on our site according to our internal retention policy.
                </p>
                <p className="text-gray-700 mt-3">
                  We acknowledge that under India's Digital Personal Data Protection (DPDP) Act, individuals have rights (like a "right to erasure"). However, at this time we have not implemented a user-facing deletion feature. Users with privacy concerns can contact us as described below.
                </p>
              </div>
            </div>
            
            {/* Contact */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact for Privacy Concerns</h3>
              <div className="bg-purple-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  We encourage users to reach out if they have any privacy questions or requests. We do not list a direct email address; instead, we provide a Google Contact Form on the "Contact Us" page of our website.
                </p>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <p className="text-purple-700 font-medium">Privacy Contact Form:</p>
                  <p className="text-gray-700 mt-1">Go to the "Contact Us" page and fill out the Google Form with your email and issue. We will respond to privacy-related messages sent this way.</p>
                </div>
              </div>
            </div>
            
            {/* Target Users */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Target Users and Applicable Laws</h3>
              <div className="flex">
                <div className="mr-4 flex-shrink-0">
                 <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" >
                    <img src="https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/ing.png?alt=media&token=30ec48dc-f618-4d39-a69c-2aaaac7f7269" alt="" />
                </div>
                </div>
                <div>
                  <p className="text-gray-700 mb-4">
                    CU NOTES HUB is intended for users in India (primarily college students and educators). We do not specifically target users in the European Union or the United States.
                  </p>
                  <p className="text-gray-700">
                    Because we operate in India, we follow Indian data protection guidance. India's Digital Personal Data Protection Act 2023 (DPDP) is the upcoming law governing personal data. CU NOTES HUB is aware of these rules and intends to comply as required when they come into effect.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Summary */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Summary</h3>
              <p className="text-gray-700 mb-3">
                In summary, CU NOTES HUB collects only basic educational identifiers (name, roll number, course info) and note files, primarily stored using Firebase's secure services. We do not gather additional personal info like email or phone unless you choose to provide it via our contact form.
              </p>
              <p className="text-gray-700">
                Users can ask privacy questions through the contact form. Currently we do not offer data deletion requests; however, we note that Indian law grants data erasure rights and plan to adapt accordingly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
   
  );
};

export default PrivacyPolicy;