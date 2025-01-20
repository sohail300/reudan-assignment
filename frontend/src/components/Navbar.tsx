import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Task Manager</h1>
        <div>
          <button className="bg-white text-bg-gray-900 px-4 py-2 rounded-lg mr-2">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
