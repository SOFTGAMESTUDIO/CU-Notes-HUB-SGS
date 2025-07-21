import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import UserLogin from './pages/Registraction/UserLogin';
import UploadNotes from './pages/Uplode Notes/UplodeNotes';
import Notes from './pages/Notes/Notes';
import Admin from './pages/Admin/Admin';
import ContactPage from './pages/LeagleDocuments.jsx/ContactUs';
import PrivacyPolicy from './pages/LeagleDocuments.jsx/PrivacyPolicy';
import TermsAndConditions from './pages/LeagleDocuments.jsx/TermsAndConditions';
import AboutUs from './pages/LeagleDocuments.jsx/AbouUs';
import NotFoundPage from './Nopage';
import ScrollToTop from './ScrollToTop';
import NoteDetail from './pages/Notes/Notesview';
import CUDevelopers from './pages/Developer/Developer';
import SupportUs from './pages/Developer/SuportUs';


export default function App() {
  return (

      <Router>
         <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home/>} />
           <Route path="/home" element={<Home/>} />
          <Route path="*" element={<NotFoundPage/>} />
           <Route path="/AboutUS" element={<AboutUs/>} />
            <Route path="/SuportUS" element={<SupportUs/>} />
          <Route path="/ContactUS" element={<ContactPage/>} />
           <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>} />
           <Route path="/TermsAndConditions" element={<TermsAndConditions/>} />
          <Route path="/Login" element={<UserLogin/>} />
          <Route path="/Notes" element={<Notes/>} />
          <Route path="/Notes/:id" element={<NoteDetail/>} />
          <Route path="/Upload" element={<UploadNotes/>} />
           <Route path="/Developers" element={<CUDevelopers/>} />
          <Route path="/Admin" element={<ProtectedRouteForAdmin><Admin/></ProtectedRouteForAdmin>} />
        </Routes>
      </Router>

  );
}

export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    return <Navigate to={"/Login"} />;
  }
};

export const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));
  if (admin.email === import.meta.env.VITE__ADMIN_EMAIL_SGS) {
    return children;
  } else {
    return <Navigate to={"/Login"} />;
  }
};