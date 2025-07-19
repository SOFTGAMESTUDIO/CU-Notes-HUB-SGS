// ContactPage.jsx
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, useScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";

const ContactPage = () => {
  // State for CU Study Hub form
  const [formDataCU, setFormDataCU] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [statusCU, setStatusCU] = useState("");
  const [isSubmittingCU, setIsSubmittingCU] = useState(false);

  // State for SGS form
  const [formDataSGS, setFormDataSGS] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [statusSGS, setStatusSGS] = useState("");
  const [isSubmittingSGS, setIsSubmittingSGS] = useState(false);

  const handleChange = (setFormData) => (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitSGS = (formData, setStatus, setIsSubmitting, serviceType) => (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Determine which service to use based on type
    const SERVICE_ID = import.meta.env.VITE__EMAILJS_SERVICEID_SGS;
    const TEMPLATE_ID = import.meta.env.VITE__EMAILJS_TEMPLATEID_SGS;
    const PUBLIC_KEY = import.meta.env.VITE__EMAILJS_PUBLICKEY_SGS;

    emailjs.send(SERVICE_ID, TEMPLATE_ID, formDataSGS, PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus("Message sent successfully!");
        setFormDataSGS({ name: "", email: "", subject: "", message: "" });
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setStatus("Failed to send message. Please try again later.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
   const handleSubmitCU = (formData, setStatus, setIsSubmitting, serviceType) => (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Determine which service to use based on type
    const SERVICE_ID = import.meta.env.VITE__EMAILJS_SERVICEID_SGS;
    const TEMPLATE_ID = import.meta.env.VITE__EMAILJS_TEMPLATEID_SGS2;
    const PUBLIC_KEY = import.meta.env.VITE__EMAILJS_PUBLICKEY_SGS;

    emailjs.send(SERVICE_ID, TEMPLATE_ID, formDataCU, PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus("Message sent successfully!");
        setFormDataCU({ name: "", email: "", subject: "", message: "" });
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setStatus("Failed to send message. Please try again later.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 300], [0, -50]);
  const fadeIn = useTransform(scrollY, [0, 300], [1, 0.9]);
  const parallaxYSlow = useTransform(scrollY, [0, 300], [0, -30]);

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-neutral-900 dark:to-neutral-950 overflow-hidden">
        <Helmet>
          <title>Contact Us - CU STUDY HUB | Soft Game Studio</title>
          <meta
            name="description"
            content="Get in touch with CU Study Hub and Soft Game Studio for educational resources and game development services."
          />
          <meta
            property="og:title"
            content="Contact Us - CU STUDY HUB | Soft Game Studio"
          />
          <meta
            property="og:description"
            content="Reach out to CU Study Hub for academic resources or Soft Game Studio for game development services."
          />
          <meta
            property="og:image"
            content="https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/ing.png?alt=media&token=30ec48dc-f618-4d39-a69c-2aaaac7f7269"
          />
        </Helmet>

        {/* Parallax Background Elements */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: parallaxYSlow }}
        >
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-purple-200 dark:bg-purple-900/30 blur-3xl opacity-50"></div>
          <div className="absolute bottom-40 right-20 w-64 h-64 rounded-full bg-indigo-200 dark:bg-indigo-900/30 blur-3xl opacity-40"></div>
        </motion.div>

        {/* Main Content */}
        <motion.section
          style={{ y: parallaxY, opacity: fadeIn }}
          className="min-h-screen relative z-10 text-gray-900 dark:text-gray-200 px-4 py-16 transition-colors duration-500"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Contact Us
              </motion.h1>
              <motion.p
                className="max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Reach out to CU Study Hub for academic resources or contact Soft Game Studio for development services
              </motion.p>
            </motion.div>

            {/* CU Study Hub Section */}
            <div className="mb-24">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400">CU Study Hub</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Get in touch with our educational support team
                </p>
              </motion.div>
              
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Left: Contact Form */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="lg:w-1/2"
                >
                  <motion.div
                    variants={itemVariants}
                    className="bg-white dark:bg-neutral-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-purple-200 dark:border-neutral-700"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-2xl font-semibold mb-6">
                      Contact CU Study Hub
                    </h3>
                    <form onSubmit={handleSubmitCU(formDataCU, setStatusCU, setIsSubmittingCU, "CU")} className="space-y-6">
                      {/* Form fields same as before */}
                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="cu-name"
                          className="block mb-2 font-medium text-gray-800 dark:text-gray-300"
                        >
                          Name
                        </label>
                        <input
                          id="cu-name"
                          name="name"
                          value={formDataCU.name}
                          onChange={handleChange(setFormDataCU)}
                          placeholder="Your full name"
                          required
                          className="w-full p-3 rounded-xl bg-purple-50 dark:bg-neutral-700/50 border border-purple-200 dark:border-neutral-600 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="cu-email"
                          className="block mb-2 font-medium text-gray-800 dark:text-gray-300"
                        >
                          Email
                        </label>
                        <input
                          id="cu-email"
                          name="email"
                          type="email"
                          value={formDataCU.email}
                          onChange={handleChange(setFormDataCU)}
                          placeholder="you@example.com"
                          required
                          className="w-full p-3 rounded-xl bg-purple-50 dark:bg-neutral-700/50 border border-purple-200 dark:border-neutral-600 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="cu-subject"
                          className="block mb-2 font-medium text-gray-800 dark:text-gray-300"
                        >
                          Subject
                        </label>
                        <input
                          id="cu-subject"
                          name="subject"
                          value={formDataCU.subject}
                          onChange={handleChange(setFormDataCU)}
                          placeholder="What's this about?"
                          required
                          className="w-full p-3 rounded-xl bg-purple-50 dark:bg-neutral-700/50 border border-purple-200 dark:border-neutral-600 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="cu-message"
                          className="block mb-2 font-medium text-gray-800 dark:text-gray-300"
                        >
                          Message
                        </label>
                        <textarea
                          id="cu-message"
                          name="message"
                          rows={5}
                          value={formDataCU.message}
                          onChange={handleChange(setFormDataCU)}
                          placeholder="Type your message here..."
                          className="w-full p-3 rounded-xl bg-purple-50 dark:bg-neutral-700/50 border border-purple-200 dark:border-neutral-600 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          required
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <button
                          type="submit"
                          disabled={isSubmittingCU}
                          className={`w-full py-3 px-6 rounded-xl font-medium transition-all ${
                            isSubmittingCU
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
                          }`}
                        >
                          {isSubmittingCU ? "Sending..." : "Send Message"}
                        </button>
                      </motion.div>

                      {statusCU && (
                        <motion.div
                          variants={itemVariants}
                          className={`text-center p-3 rounded-xl ${
                            statusCU.includes("successfully")
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                          }`}
                        >
                          {statusCU}
                        </motion.div>
                      )}
                    </form>
                  </motion.div>
                </motion.div>

                {/* Right: Contact Info */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="lg:w-1/2 space-y-8"
                >
                  <motion.div variants={itemVariants} className="space-y-2">
                    <h3 className="text-2xl font-bold">CU Study Hub Information</h3>
                    <p className="text-gray-700 dark:text-gray-400">
                      Educational resources and academic support
                    </p>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="bg-white dark:bg-neutral-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-purple-200 dark:border-neutral-700 space-y-4 transition-all hover:shadow-lg"
                    whileHover={{ y: -5 }}
                  >
                    <motion.div variants={itemVariants}>
                      <p className="font-semibold text-purple-700 dark:text-purple-400">
                        Academic Support:
                      </p>
                      <p>+91 6283400770</p>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <p className="font-semibold text-purple-700 dark:text-purple-400">
                        Social Media:
                      </p>
                      <div className="flex space-x-4 mt-2">
                        
                        <a href="https://instagram.com/cu_study_hub" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                          Instagram : @cu_study_hub
                        </a>
                        
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* SGS Soft Game Studio Section */}
            <div className="mt-24 pt-12 border-t border-gray-200 dark:border-neutral-700">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400">SGS Soft Game Studio</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Contact our game development team
                </p>
              </motion.div>
              
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Left: Contact Info */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="lg:w-1/2 space-y-8"
                >
                  <motion.div variants={itemVariants} className="space-y-2">
                    <h3 className="text-2xl font-bold">Studio Information</h3>
                    <p className="text-gray-700 dark:text-gray-400">
                      Game development and tech solutions
                    </p>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="bg-white dark:bg-neutral-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-purple-200 dark:border-neutral-700 space-y-4 transition-all hover:shadow-lg"
                    whileHover={{ y: -5 }}
                  >
                    <motion.div variants={itemVariants}>
                      <p className="font-semibold text-purple-700 dark:text-purple-400">
                        Address:
                      </p>
                      <p>
                        Abohar, Punjab 152116
                      </p>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <p className="font-semibold text-purple-700 dark:text-purple-400">
                        Email:
                      </p>
                      <a
                        href="mailto:team.softgamestudio@gmail.com"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        team.softgamestudio@gmail.com
                      </a>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <p className="font-semibold text-purple-700 dark:text-purple-400">
                        Phone:
                      </p>
                      <p>For Hindi: +91 9914267704</p>
                      <p>For English: +91 6283400770</p>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <p className="font-semibold text-purple-700 dark:text-purple-400">
                        Service Time:
                      </p>
                      <p>Monday – Saturday, 9:00 AM – 5:00 PM</p>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <p className="font-semibold text-purple-700 dark:text-purple-400">
                        Google Maps:
                      </p>
                      <a
                        href="https://g.co/kgs/HWfapjM"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        View Location
                      </a>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <p className="font-semibold text-purple-700 dark:text-purple-400">
                        Social Media:
                      </p>
                      <div className="flex space-x-4 mt-2">
                        <a href="https://github.com/SOFTGAMESTUDIO" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                          GitHub
                        </a>
                        <a href="https://www.linkedin.com/company/soft-game-studio/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                          LinkedIn
                        </a>
                         <a href="https://www.instagram.com/softgamestudioofficial/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                          Instagram
                        </a>
                         <a href="https://www.facebook.com/people/Soft-Game-Studio/61570435445258/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                          facebook
                        </a>
                        <a href="https://www.youtube.com/@SoftGameStudioOfficial" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                         youtube
                        </a> 
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Right: Contact Form */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="lg:w-1/2"
                >
                  <motion.div
                    variants={itemVariants}
                    className="bg-white dark:bg-neutral-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-purple-200 dark:border-neutral-700"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-2xl font-semibold mb-6">
                      Contact Soft Game Studio
                    </h3>
                    <form onSubmit={handleSubmitSGS(formDataSGS, setStatusSGS, setIsSubmittingSGS, "SGS")} className="space-y-6">
                      {/* Form fields same as before */}
                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="sgs-name"
                          className="block mb-2 font-medium text-gray-800 dark:text-gray-300"
                        >
                          Name
                        </label>
                        <input
                          id="sgs-name"
                          name="name"
                          value={formDataSGS.name}
                          onChange={handleChange(setFormDataSGS)}
                          placeholder="Your full name"
                          required
                          className="w-full p-3 rounded-xl bg-purple-50 dark:bg-neutral-700/50 border border-purple-200 dark:border-neutral-600 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="sgs-email"
                          className="block mb-2 font-medium text-gray-800 dark:text-gray-300"
                        >
                          Email
                        </label>
                        <input
                          id="sgs-email"
                          name="email"
                          type="email"
                          value={formDataSGS.email}
                          onChange={handleChange(setFormDataSGS)}
                          placeholder="you@example.com"
                          required
                          className="w-full p-3 rounded-xl bg-purple-50 dark:bg-neutral-700/50 border border-purple-200 dark:border-neutral-600 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="sgs-subject"
                          className="block mb-2 font-medium text-gray-800 dark:text-gray-300"
                        >
                          Subject
                        </label>
                        <input
                          id="sgs-subject"
                          name="subject"
                          value={formDataSGS.subject}
                          onChange={handleChange(setFormDataSGS)}
                          placeholder="What's this about?"
                          required
                          className="w-full p-3 rounded-xl bg-purple-50 dark:bg-neutral-700/50 border border-purple-200 dark:border-neutral-600 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="sgs-message"
                          className="block mb-2 font-medium text-gray-800 dark:text-gray-300"
                        >
                          Message
                        </label>
                        <textarea
                          id="sgs-message"
                          name="message"
                          rows={5}
                          value={formDataSGS.message}
                          onChange={handleChange(setFormDataSGS)}
                          placeholder="Type your message here..."
                          className="w-full p-3 rounded-xl bg-purple-50 dark:bg-neutral-700/50 border border-purple-200 dark:border-neutral-600 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          required
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <button
                          type="submit"
                          disabled={isSubmittingSGS}
                          className={`w-full py-3 px-6 rounded-xl font-medium transition-all ${
                            isSubmittingSGS
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
                          }`}
                        >
                          {isSubmittingSGS ? "Sending..." : "Send Message"}
                        </button>
                      </motion.div>

                      {statusSGS && (
                        <motion.div
                          variants={itemVariants}
                          className={`text-center p-3 rounded-xl ${
                            statusSGS.includes("successfully")
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                          }`}
                        >
                          {statusSGS}
                        </motion.div>
                      )}
                    </form>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
};

export default ContactPage;