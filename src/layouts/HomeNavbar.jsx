import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo/logo1.png"
//Home Navbar
const HomeNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Change the background after 50px scroll
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b-[1px] border-zinc-200' : 'bg-transparent'
      }`}
    >
      <div className='container mx-auto flex justify-between items-center py-4'>
        <img className='w-60 h-auto object-cover' src={logo} alt="Logo" />
        <ul className='flex items-center gap-10'>
          <Link 
          className={`${isScrolled? "text-zinc-900" : "text-black"} 
          text-lg font-medium hover:text-green-500`}>Home</Link>
          <Link 
          className={`${isScrolled? "text-zinc-900" : "text-black"} 
          text-lg font-medium hover:text-green-500`}>About</Link>
          <Link 
          className={`${isScrolled? "text-zinc-900" : "text-black"} 
          text-lg font-medium hover:text-green-500`}>Contact</Link>
        </ul>
      </div>
    </div>
  );
};

export default HomeNavbar;
