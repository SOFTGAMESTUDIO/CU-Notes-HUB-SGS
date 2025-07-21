import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 py-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              CU STUDY HUB
            </h3>
            <p className="text-gray-600 mb-4 max-w-md">
              A smart space to access and share study resources freely.
Connect with students and educators from CU and beyond.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Navigation</h4>
            <ul className="space-y-2">
              {['Home', 'Notes', 'Upload',].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2">
              {['Terms And Conditions', 'Privacy Policy', 'About Us', 'Contact Us'].map((item) => (
  <li key={item}>
    <Link 
      to={`/${item.toLowerCase().replace(/ /g, '')}`} 
      className="text-gray-600 hover:text-blue-600 transition-colors"
    >
      {item}
    </Link>
  </li>
))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">
            &copy; {currentYear} CU STUDY HUB | Developed by Soft Game Studio 
          </p>
          <div className="flex space-x-6">
            <a href="/Developers" className="text-gray-600 hover:text-blue-600">Developers</a>
            <a href="/SuportUS" className="text-gray-600 hover:text-blue-600">Suport US </a>
          </div>
        </div>
      </div>
    </footer>
  );
}