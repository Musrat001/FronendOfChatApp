
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `font-medium transition-colors duration-200 ${
      isActive
        ? "text-blue-600"
        : "text-gray-600 hover:text-blue-600"
    }`;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-18 flex items-center justify-between">

          {/* Logo */}

          <NavLink
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-200 group-hover:scale-105 transition-transform duration-200">
              <MessageCircle size={25} strokeWidth={2.3} />
            </div>

            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Egg&Code
              </span>

              <span className="text-xs sm:text-sm font-semibold text-blue-600 tracking-wide">
                ChatApp
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}

          <nav className="hidden md:flex items-center gap-7 lg:gap-9">

            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink
              to="/login"
              className="px-5 py-2.5 rounded-xl border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 active:scale-95 transition-all duration-200"
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold shadow-md shadow-blue-200 hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all duration-200"
            >
              Get Started
            </NavLink>

          </nav>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>

        </div>

        {/* Mobile Navigation */}

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-64 opacity-100 pb-5"
              : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-2 pt-3 border-t border-gray-100">

            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/login"
              onClick={closeMenu}
              className="px-4 py-3 rounded-lg border border-blue-600 text-blue-600 text-center font-semibold hover:bg-blue-50 transition"
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              onClick={closeMenu}
              className="px-4 py-3 rounded-lg bg-blue-600 text-white text-center font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </NavLink>

          </nav>
        </div>

      </div>
    </header>
  );
}

export default Header;
