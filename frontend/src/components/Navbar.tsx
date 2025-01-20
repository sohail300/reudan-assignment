import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Task Manager</h1>
      </div>
    </nav>
  );
};

export default Navbar;
