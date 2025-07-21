import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navItems = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/notes', label: 'Notes', icon: '📝' },
    { to: '/upload', label: 'Upload', icon: '📤' },
  ];

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav 
        className={`
          relative mx-auto max-w-6xl transition-all duration-700 ease-out
          ${isScrolled ? 'scale-95' : 'scale-100'}
          ${mobileMenuOpen ? 'rounded-b-3xl' : 'rounded-3xl'}
        `}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
                      rgba(59, 130, 246, 0.15), 
                      rgba(147, 51, 234, 0.08), 
                      rgba(236, 72, 153, 0.05))`,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '24px',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.1),
            0 4px 16px rgba(59, 130, 246, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
          `
        }}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <div 
            className="absolute inset-0 opacity-30 animate-pulse"
            style={{
              background: `conic-gradient(from ${Date.now() / 100}deg, 
                          rgba(59, 130, 246, 0.1), 
                          rgba(147, 51, 234, 0.1), 
                          rgba(236, 72, 153, 0.1), 
                          rgba(59, 130, 246, 0.1))`
            }}
          />
        </div>

        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20"
              style={{
                width: `${40 + i * 20}px`,
                height: `${40 + i * 20}px`,
                background: `radial-gradient(circle, 
                           rgba(59, 130, 246, 0.3), 
                           rgba(147, 51, 234, 0.2))`,
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`
              }}
            />
          ))}
        </div>

        <div className="relative flex items-center justify-between px-4 md:px-8 py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group">
            <div className="flex flex-col justify-center items-center  ">
              <div className='flex items-center space-x-2 mb-1'>
<img className='w-10 rounded-full' src="https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/ing.png?alt=media&token=30ec48dc-f618-4d39-a69c-2aaaac7f7269" alt="" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 bg-clip-text text-transparent">
                CU STUDY HUB
              </h1>
              </div>
              
              <div className="h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none z-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenu className="h-6 w-6" />
            )}
          </button>

          {/* Navigation Items */}
          <div className={`md:flex items-center space-x-2 ${mobileMenuOpen 
            ? 'absolute top-full left-0 right-0 rounded-b-3xl pt-2 pb-6 px-4 shadow-lg bg-white' 
            : 'hidden'}`}
          >
            {navItems.map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `
                  relative group px-4 py-3 md:px-6 md:py-3 rounded-2xl font-medium transition-all duration-300
                  ${isActive 
                    ? 'text-white shadow-lg scale-105' 
                    : 'text-gray-700 hover:text-white hover:scale-105'
                  }
                  block md:inline-block w-full md:w-auto my-1 md:my-0
                `}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setMobileMenuOpen(false)}
                style={({ isActive }) => ({
                  background: hoveredItem === index || isActive
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8))'
                    : 'transparent'
                })}
              >
                {/* Morphing background */}
                <div 
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                    hoveredItem === index ? 'scale-110' : 'scale-100'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))'
                  }} 
                />

                {/* Glowing effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50 blur-lg transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))'
                  }} 
                />

                <div className="relative flex items-center space-x-2 justify-center md:justify-start">
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <span className="relative">
                    {item.label}
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500" />
                  </span>
                </div>

                {/* Particle effect */}
                {hoveredItem === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-70"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animation: `sparkle 1s ease-out ${i * 0.2}s infinite`
                        }}
                      />
                    ))}
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Bottom glow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl rounded-full" />
      </nav>
    </div>
  );
}