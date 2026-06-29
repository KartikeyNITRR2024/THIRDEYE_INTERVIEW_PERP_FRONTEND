import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 

  const links = [
    { name: "Course", path: "/" },
    { name: "Folder", path: "/folder" },
    { name: "About", path: "/about" },
    // { name: "Connect", path: "/connect" },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Brand */}
          <div className="flex-shrink-0 font-bold text-xl tracking-wider">
            <Link to="/">Interview Prep</Link>
          </div>

          {/* Right Side Controls (Links + Search + Hamburger) */}
          <div className="flex items-center space-x-4 md:space-x-8">
            
            {/* Desktop Menu (Hidden on mobile) */}
            <div className="hidden md:flex space-x-8 items-center">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`hover:text-blue-200 transition-colors ${
                    location.pathname === link.path ? "font-bold border-b-2 border-white pb-1" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Search Icon (Visible on BOTH Desktop and Mobile) */}
            <Link 
              to="/search"
              onClick={() => setIsOpen(false)} // Closes mobile menu if open
              className={`p-1 hover:text-blue-200 transition-colors ${
                location.pathname === "/search" ? "text-blue-200" : "text-white"
              }`}
              title="Search"
            >
              <FaSearch className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button (Hidden on desktop) */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="focus:outline-none hover:text-blue-200 transition-colors p-1"
              >
                {isOpen ? (
                  <FaTimes className="w-6 h-6" />
                ) : (
                  <FaBars className="w-6 h-6" />
                )}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)} 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path ? "bg-blue-800 text-white" : "text-blue-100 hover:bg-blue-500"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}