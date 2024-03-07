import React from "react";

const Navbar = ({ title }) => {
  return (
    <nav className="bg-gray-800 text-center h-16 flex items-center justify-center">
      <h1 className="text-lg text-white font-bold">{title}</h1>
    </nav>
  );
};

export default Navbar;
