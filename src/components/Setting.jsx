import React from "react";
import Sidebar from "./Sidebar";

const Settings = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <div className="space-y-6">
          <div className="backdrop-blur-sm bg-white bg-opacity-10 border border-gray-200 border-opacity-20 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <p className="text-gray-300">Manage your account preferences here.</p>
          </div>

          <div className="backdrop-blur-sm bg-white bg-opacity-10 border border-gray-200 border-opacity-20 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
            <p className="text-gray-300">Set your notification preferences here.</p>
          </div>

          <div className="backdrop-blur-sm bg-white bg-opacity-10 border border-gray-200 border-opacity-20 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
            <p className="text-gray-300">Adjust your privacy settings here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
