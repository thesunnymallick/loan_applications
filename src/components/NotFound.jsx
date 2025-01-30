import React from 'react';
import notFound from "../assets/notFound.jpg";
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../features/authSlice';
import { useDispatch } from 'react-redux';

const NotFound = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleLogout=()=>{
        dispatch(setLogout());
        navigate("/")
    }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white px-4">
      <div className="text-center max-w-lg w-full">
        <img 
          className="w-full h-auto object-cover " 
          src={notFound} 
          alt="404 - Page Not Found" 
        />
        <div className="-mt-8">
          <p className="text-3xl sm:text-4xl font-semibold text-gray-800">
            404 - Page Not Found
          </p>
          <p className="text-gray-600 mt-4 text-base sm:text-lg">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <button 
            onClick={handleLogout}
            className="mt-6 px-6 sm:px-8 py-3 text-white bg-green-700 hover:bg-green-800 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300">
            Go to homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
