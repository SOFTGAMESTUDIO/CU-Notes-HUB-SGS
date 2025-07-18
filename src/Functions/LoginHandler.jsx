// src/handlers/loginHandler.js
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, } from "../database/firebase"; // import providers
import { toast } from "react-toastify";

const handleLogin = async (email, password, navigate) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    localStorage.setItem("user", JSON.stringify(result.user));
    navigate("/");
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Invalid credentials. Please try again or sign up.");
  }
};

export {handleLogin};