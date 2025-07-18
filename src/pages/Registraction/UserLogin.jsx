import React, { useState } from "react";
import { useNavigate, } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import { handleLogin } from "../../Functions/LoginHandler";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password, navigate);
    navigate("/Admin");
  };


  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen p-4 bg-purple-100 dark:bg-neutral-950">
        <Helmet>
          <title>Login | Studen Notes Hub</title>
          <meta
            name="description"
            content="Login to your Soft Game Studio account to access projects, courses, exams, and more. Secure and simple authentication for students and developers."
          />
          <meta
            name="keywords"
            content="Login, User Account, Sign In, Soft Game Studio, Student Portal, Developer Login, Project Access"
          />
          <meta name="author" content="Soft Game Studio" />

          <meta property="og:title" content="Login | Soft Game Studio" />
          <meta
            property="og:description"
            content="Access your Soft Game Studio account. View your courses, download projects, and track your progress with secure login."
          />
          <meta
            property="og:url"
            content="https://softgamestudio.web.app/login"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/Designer.png?alt=media&token=3e6ee22e-f7f7-4d73-8ce7-0b1441ed3050"
          />
        </Helmet>

        <div className="shadow-lg w-full max-w-md rounded-2xl border border-gray-300 dark:border-neutral-700 p-4 md:p-8 bg-white dark:bg-neutral-900">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Welcome to Soft Game Studio
          </h2>
          <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            Secure access to your creative journey with Soft Game Studio.
          </p>
          
          <form className="my-8" onSubmit={onSubmit}>
            {/* Email Input */}
            <div className="mb-4 flex flex-col space-y-2">
              <label htmlFor="email" className="text-neutral-700 dark:text-neutral-300">
                Email Address
              </label>
              <input
                id="email"
                placeholder="user123@gmail.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            {/* Password Input */}
            <div className="mb-4 flex flex-col space-y-2">
              <label htmlFor="password" className="text-neutral-700 dark:text-neutral-300">
                Password
              </label>
              <input
                id="password"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              
            </div>

            {/* Login Button */}
            <button
              className="relative w-full py-2 px-4 rounded-md bg-gradient-to-br from-purple-500 to-purple-700 dark:from-neutral-800 dark:to-neutral-900 font-medium text-white shadow-md hover:shadow-lg transition-all duration-300"
              type="submit"
            >
              Login &rarr;
              <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-purple-400 dark:via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default UserLogin;