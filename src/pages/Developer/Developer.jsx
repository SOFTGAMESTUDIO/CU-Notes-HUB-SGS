// src/pages/CUDevelopers.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const teamMembers = [
  {
    name: "LIVESH KUMAR GARG",
    role: "SENIOR DEVELOPER & FOUNDER OF SOFT GAME STUDIO",
    bio: "BCA student skilled in Python, HTML, CSS, JavaScript, React, DSA, SQL, Firebase, Unity, Unreal Engine. Passionate about building impactful tech solutions.",
    image: "https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/DEVLOPERS%2FSnapchat-467264900.jpg?alt=media&token=a1f217d0-2444-47d1-8e40-7d69b43a970d",
    accentColor: "bg-pink-500",
    skills: ["Python", "React", "Firebase", "Unity"],
    social: {
      linkedin: "https://www.linkedin.com/in/Livesh-Kumar-Garg",
      github: "https://github.com/SOFTGAMESTUDIO",
      instagram: "https://www.instagram.com/liveshkumargarg/"
    }
  },
  
  {
    name: "SHARIK HASAN",
    role: "JUNIOR DEVELOPER & CO-FOUNDER OF SOFT GAME STUDIO",
    bio: "B.Tech CSE student focused on C, HTML, CSS, JS and Firebase. Interested in building real-world projects with modern tech.",
    image: "https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/DEVLOPERS%2F467048382_429449520023246_5293710440583554823_n.jpeg?alt=media&token=c4cacfe1-bea3-43a6-848e-8b5e852e41a1",
    accentColor: "bg-purple-500",
    skills: ["C", "JavaScript", "Firebase", "HTML/CSS"],
    social: {
      linkedin: "https://www.linkedin.com/in/sharik-hasan",
      github: "https://github.com/0xSharik",
      instagram: "https://www.instagram.com/samar_pb15/"
    }
  },
  {
    name: "JATIN DUA",
    role: "JUNIOR DEVELOPER & DESIGNER OF SOFT GAME STUDIO",
    bio: "B.Tech CSBS student with a knack for C, C++, DSA, HTML, CSS, JavaScript & Python. Always learning, always improving.",
    image: "https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/DEVLOPERS%2FSnapchat-471840155.jpg?alt=media&token=af7951a2-e956-4531-804f-ec448f914083",
    accentColor: "bg-blue-500",
    skills: ["C++", "DSA", "JavaScript", "Python"],
    social: {
      linkedin: "https://www.linkedin.com/in/jatin-2a-kumar-/",
      instagram: "https://www.instagram.com/jatinkumar.dua/"
    }
  },
];

const SocialIcon = ({ platform, url }) => {
  const icons = {
    linkedin: <FaLinkedinIn className="text-blue-600" size={18} />,
    github: <FaGithub className="text-gray-800 dark:text-gray-200" size={18} />,
    instagram: <FaInstagram className="text-pink-500" size={18} />,
    email: <MdEmail className="text-red-500" size={20} />
  };

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all"
      whileHover={{ y: -3, scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {icons[platform]}
    </motion.a>
  );
};

const TeamCard = ({ member, index }) => (
  <motion.div
    className="bg-gradient-to-br from-white/90 to-gray-100/90 dark:from-gray-800/90 dark:to-gray-900/90 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.15, duration: 0.5 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
  >
    <div className="relative">
      <div className={`h-28 w-full ${member.accentColor}`}></div>
      <div className="absolute  -bottom-14 left-1/2 transform -translate-x-1/2">
        <div className="relative">
          <div className="absolute  inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-md opacity-30"></div>
          <img 
            src={member.image} 
            alt={member.name}
            className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-800 object-cover relative z-10"
          />
        </div>
      </div>
    </div>
    
    <div className="pt-16 pb-8 px-6">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
        <p className="text-sm uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mt-1">
          {member.role}
        </p>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 text-center text-sm leading-relaxed mb-6">
        {member.bio}
      </p>
      
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {member.skills.map((skill) => (
          <span 
            key={skill} 
            className="text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 px-3 py-1.5 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
      
      <div className="flex justify-center space-x-3">
        {Object.entries(member.social).map(([platform, url]) => (
          <SocialIcon key={platform} platform={platform} url={url} />
        ))}
      </div>
    </div>
  </motion.div>
);

const CUDevelopers = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <Layout>
      <Helmet>
        <title>Meet Our Developers | CU Study Hub</title>
        <meta name="description" content="Meet the talented developers behind CU Study Hub. Learn about their skills, roles, and contributions to our platform." />
        <link rel="canonical" href="https://custudyhub.web.app/developers" />
      </Helmet>

      <div 
        ref={containerRef}
        className="min-h-screen bg-gradient-to-br from-indigo-50 via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white overflow-hidden relative"
      >
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
          style={{ y }}
        >
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-indigo-300 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-pink-300 blur-3xl"></div>
        </motion.div>
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-200 dark:bg-indigo-900/50"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 40 - 20],
              x: [0, Math.random() * 30 - 15],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <section className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1
              className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Development Team
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Meet the talented developers building CU Study Hub. Our team combines technical expertise with passion for education.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>

          <motion.div 
            className="mt-20 text-center bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Want to join our team?</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              We're always looking for passionate developers to help us improve CU Study Hub.
            </p>
            <motion.a
              href="mailto:contact@custudyhub.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MdEmail size={20} />
              Contact Us
            </motion.a>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

export default CUDevelopers;