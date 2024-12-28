import React from "react"; 
import { FaHome, FaInfoCircle, FaCog, FaEnvelope } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 flex flex-col gap-6">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Menu</h1>
      </div>

      <div className="flex flex-col gap-4">
        {/* Home Link */}
        <div className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700">
          <FaHome className="text-lg" />
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
            }
          >
            Home
          </NavLink>
        </div>

        {/* About Link */}
        <div className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700">
          <FaInfoCircle className="text-lg" />
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
            }
          >
            About
          </NavLink>
        </div>

        {/* Settings Link */}
        <div className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700">
          <FaCog className="text-lg" />
          <NavLink 
            to="/setting" 
            className={({ isActive }) => 
              `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
            }
          >
            Settings
          </NavLink>
        </div>

        {/* Contact Link */}
        <div className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700">
          <FaEnvelope className="text-lg" />
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
            }
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
