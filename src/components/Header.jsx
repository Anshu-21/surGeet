import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="shadow-md sticky z-50 top-0 bg-gray-900">
      <nav className="px-6 py-4 flex justify-between items-center max-w-screen-xl mx-auto">
      
        <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-600 to-purple-500">
          SurGeet
        </div>

        
        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Search for music, artists, or albums..."
            className="w-full max-w-lg px-4 py-2 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200 font-medium rounded-lg text-sm px-4 py-2"
          >
            Log in
          </Link>
          <Link
            to="/get-started"
            className="text-white bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 transition-all duration-200 font-medium rounded-lg text-sm px-4 py-2"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
