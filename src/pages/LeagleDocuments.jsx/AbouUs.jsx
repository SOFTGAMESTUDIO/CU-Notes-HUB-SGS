import React from 'react';
import { FaGraduationCap, FaUsers, FaLightbulb, FaHandHoldingHeart, FaChartLine } from 'react-icons/fa';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <Layout>
      <Helmet>
        <title>About Us - CU STUDY HUB | Soft Game Studio</title>
        <meta name="title" content="About Us - CU STUDY HUB | Soft Game Studio" />
        <meta name="description" content="Free Notes share and Access a curated collection of study notes, lecture materials, and exam resources" />
        <meta property="og:title" content="About Us - CU STUDY HUB | Soft Game Studio" />
        <meta property="og:description" content="Free Notes share and Access a curated collection of study notes, lecture materials, and exam resources" />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/ing.png?alt=media&token=30ec48dc-f618-4d39-a69c-2aaaac7f7269" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="About US - CU STUDY HUB | Soft Game Studio" />
        <meta property="og:locale" content="en_US" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-indigo-600 to-purple-700 py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  About <span className="text-indigo-200">CU NOTES HUB</span>
                </h1>
                <p className="text-xl text-indigo-100 mb-8 max-w-2xl">
                  Empowering students with accessible, high-quality educational resources to enhance learning and academic success.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                 <Link to={"/notes"}>
                   <button className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg transform hover:-translate-y-1">
                    Explore Notes
                  </button>
                 </Link>
                <Link to={"/ContactUs"}> <button className="bg-transparent border-2 border-white text-white hover:bg-indigo-700 font-semibold py-3 px-8 rounded-lg transition duration-300">
                    Contact Us
                  </button></Link>
                 
                </div>
              </div>
              
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="bg-white p-2 rounded-2xl shadow-2xl transform rotate-3">
                    <div className="rounded-xl overflow-hidden w-72 h-72 md:w-80 md:h-80 border-4 border-white shadow-lg">
                      <img 
                        src="https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/ing.png?alt=media&token=30ec48dc-f618-4d39-a69c-2aaaac7f7269" 
                        alt="CU Notes Hub" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-indigo-500 p-3 rounded-full shadow-xl">
                    <FaGraduationCap className="text-white text-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full w-16 h-16 mb-6">
                  <FaLightbulb className="text-2xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">About CU NOTES HUB</h2>
                <div className="h-1 w-20 bg-indigo-500 mx-auto mb-8"></div>
              </div>
              
              <p className="text-gray-600 text-lg mb-8 text-center">
                CU NOTES HUB is a free platform by <strong className="text-indigo-600">Soft Game Studio</strong> for CU students. 
                Students can explore and share quality notes without login or sharing personal details. 
                This hub also provides Google search links to explore more CU materials and resources.
              </p>
              
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-lg text-center">
                <p className="text-indigo-700 font-medium italic">
                  "Built by students, for students — 100% free forever."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do at CU NOTES HUB
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { icon: FaUsers, title: "Community", desc: "Fostering collaboration among students" },
                { icon: FaLightbulb, title: "Innovation", desc: "Continuously improving learning experience" },
                { icon: FaHandHoldingHeart, title: "Accessibility", desc: "Free resources for all students" },
                { icon: FaGraduationCap, title: "Excellence", desc: "Curated high-quality study materials" },
                { icon: FaChartLine, title: "Growth", desc: "Supporting academic progression" },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-xl w-14 h-14 mb-4">
                    <item.icon className="text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 bg-gradient-to-r from-indigo-600 to-purple-700">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Enhance Your Learning?</h2>
            <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of students using CU NOTES HUB to ace their exams
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={"/"}>
                  <button className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold py-4 px-8 rounded-full transition duration-300 shadow-lg text-lg">
                Get Started Now
              </button>
                </Link>
            <Link to={"/notes"}><button className="bg-transparent border-2 border-white text-white hover:bg-indigo-800 font-bold py-4 px-8 rounded-full transition duration-300 text-lg">
                Browse Resources
              </button></Link>
              
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutUs;