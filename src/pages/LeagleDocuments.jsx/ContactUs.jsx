// ContactPage.jsx
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, useScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  // Replace these with your actual EmailJS credentials
  const SERVICE_ID = import.meta.env.VITE__EMAILJS_SERVICEID_SGS;
  const TEMPLATE_ID = import.meta.env.VITE__EMAILJS_TEMPLATEID_SGS;
  const PUBLIC_KEY = import.meta.env.VITE__EMAILJS_PUBLICKEY_SGS;

  emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
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

  // Additional parallax effects for decorative elements
  const parallaxYFast = useTransform(scrollY, [0, 300], [0, -100]);
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
          {/* Primary Meta Tags */}
          <title>
            Contact Us -  CU STUDY HUB | Soft Game Studio
          </title>
        
          <meta
            name="title"
            content=" Contact Us -  CU STUDY HUB | Soft Game Studio"
          />
          <meta
            name="description"
            content="Get in touch with Soft Game Studio for game development services, educational programs, and innovative tech solutions. Our team is ready to bring your ideas to life."
          />

          
          <meta
            property="og:title"
            content=" Contact Us -  CU STUDY HUB | Soft Game Studio"
          />
          <meta
            property="og:description"
            content="Reach out to our game development experts. We specialize in Unity development, educational games, and interactive experiences. Let's create something amazing together!"
          />
          <meta
            property="og:image"
            content="https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/ing.png?alt=media&token=30ec48dc-f618-4d39-a69c-2aaaac7f7269"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta
            property="og:image:alt"
            content="Contact Us -  CU STUDY HUB | Soft Game Studio"
          />
          <meta property="og:locale" content="en_US" />

        
        </Helmet>

        {/* Parallax Background Elements */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: parallaxYSlow }}
        >
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-purple-200 dark:bg-purple-900/30 blur-3xl opacity-50"></div>
          <div className="absolute bottom-40 right-20 w-64 h-64 rounded-full bg-indigo-200 dark:bg-indigo-900/30 blur-3xl opacity-40"></div>
        </motion.div>

        <motion.div
          className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full bg-purple-500 opacity-20"
          style={{ y: parallaxYFast }}
        />
        <motion.div
          className="absolute top-1/4 right-1/3 w-6 h-6 rounded-full bg-indigo-500 opacity-20"
          style={{ y: parallaxYFast }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-10 h-10 rounded-full bg-violet-400 opacity-20"
          style={{ y: parallaxYFast }}
        />

        {/* Main Content */}
        <motion.section
          style={{ y: parallaxY, opacity: fadeIn }}
          className="min-h-screen relative z-10 text-gray-900 dark:text-gray-200 px-4 py-16 transition-colors duration-500"
        >
          <div className="max-w-7xl mx-auto">
            {/* Animated Header */}
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
                Have questions or want to work together? Reach out to our team
                and we'll get back to you as soon as possible.
              </motion.p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Left: Contact Info with Staggered Animation */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="lg:w-1/2 space-y-8"
              >
                <motion.div variants={itemVariants} className="space-y-2">
                  <h2 className="text-3xl font-bold">Get in Touch</h2>
                  <p className="text-gray-700 dark:text-gray-400">
                    CU Study Hub is owned and maintained by Soft Game Studio.
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
                </motion.div>
              </motion.div>

              {/* Right: Contact Form with Staggered Animation */}
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
                    Send us a message
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="name"
                        className="block mb-2 font-medium text-gray-800 dark:text-gray-300"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="w-full p-3 rounded-xl bg-purple-50 dark:bg-neutral-700/50 border border-purple-200 dark:border-neutral-600 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="email"
                        className="block mb-2 font-medium text-gray-800 dark:text-gray-300"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="w-full p-3 rounded-xl bg-purple-50 dark:bg-neutral-700/50 border border-purple-200 dark:border-neutral-600 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="subject"
                        className="block mb-2 font-medium text-gray-800 dark:text-gray-300"
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        required
                        className="w-full p-3 rounded-xl bg-purple-50 dark:bg-neutral-700/50 border border-purple-200 dark:border-neutral-600 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="message"
                        className="block mb-2 font-medium text-gray-800 dark:text-gray-300"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Type your message here..."
                        className="w-full p-3 rounded-xl bg-purple-50 dark:bg-neutral-700/50 border border-purple-200 dark:border-neutral-600 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        required
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 px-6 rounded-xl font-medium transition-all ${
                          isSubmitting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
                        }`}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          "Send Message"
                        )}
                      </button>
                    </motion.div>

                    {status && (
                      <motion.div
                        variants={itemVariants}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-center p-3 rounded-xl ${
                          status.includes("successfully")
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                        }`}
                      >
                        {status}
                      </motion.div>
                    )}
                  </form>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Floating Elements */}
        <motion.div
          className="hidden md:block absolute bottom-10 left-20 w-24 h-24 rounded-full bg-purple-400/10 blur-xl"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="hidden md:block absolute top-20 right-20 w-16 h-16 rounded-full bg-indigo-400/10 blur-xl"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>
    </Layout>
  );
};

export default ContactPage;
