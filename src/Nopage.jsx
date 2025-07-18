import React from "react";
import { Link } from "react-router-dom"; // or next/link if using Next.js
import { motion } from "framer-motion";
import Layout from "./components/Layout"; // Adjust the import path as necessary
import { Helmet } from "react-helmet";

export default function NotFoundPage() {
  return (
    <Layout>
      <Helmet>
        <title>404 Not Found | CU STUDY HUB</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist. Visit Soft Game Studio's homepage to explore projects, courses, and more."
        />
        <meta
          name="keywords"
          content="404 Page, Page Not Found, Broken Link, Error Page, Soft Game Studio, Go Back, Missing Page"
        />
        <meta name="robots" content="noindex, follow" />
        <meta name="author" content=" CU STUDY HUB" />

        <meta
          property="og:title"
          content="404 | Page Not Found - CU STUDY HUB"
        />
        <meta
          property="og:description"
          content="Oops! This page doesn't exist. Return to Soft Game Studio's homepage to continue exploring our content."
        />
        <meta property="og:url" content="https://softgamestudio.web.app/404" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/Designer.png?alt=media&token=3e6ee22e-f7f7-4d73-8ce7-0b1441ed3050"
        />
      </Helmet>

      <div className="min-h-screen bg-white text-black flex items-center justify-center p-8 dark:bg-black dark:text-white">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Left Side Content */}
          <div>
            <p className="text-gray-400 mb-2">ERROR CODE: 404</p>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              OOOPS!!
            </h1>
            <p className="text-xl md:text-2xl mb-6">
              This is not the page you are looking for
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Here are some helpful links instead:
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/" className="underline hover:text-blue-500">
                Home
              </Link>
              <Link to="/ContactUs" className="underline hover:text-blue-500">
                Contact Us
              </Link>
              <Link to="/AboutUs" className="underline hover:text-blue-500">
                About Us
              </Link>
            </div>
          </div>

          {/* Right Side Graphic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/SGS%20images%2F%E2%80%94Pngtree%E2%80%94error%20404%20page%20not%20found_6681621.png?alt=media&token=e8563741-5d63-4b58-895c-951529ee8ad3" // Add your custom astronaut + 404 image in this path
              alt="404 Illustration"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
