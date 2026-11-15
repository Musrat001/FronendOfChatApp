import { NavLink } from "react-router-dom";
import {MessageCircle} from "lucide-react"

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}

          <div>
            <NavLink to="/" className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white  group-hover:scale-105 transition-transform duration-200">
                <MessageCircle size={25} strokeWidth={2.3} />
              </div>

              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white leading-tight">
                  Egg&Code
                </span>

                <span className="text-xs sm:text-sm font-semibold text-blue-600 tracking-wide">
                  ChatApp
                </span>
              </div>
            </NavLink>

            <p className="text-sm text-gray-400 leading-6 max-w-xs">
              A simple and modern way to connect, communicate, and stay in touch
              with the people who matter.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">
              <NavLink
                to="/"
                className="text-sm hover:text-blue-500 transition"
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className="text-sm hover:text-blue-500 transition"
              >
                About Us
              </NavLink>

              <NavLink
                to="/login"
                className="text-sm hover:text-blue-500 transition"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="text-sm hover:text-blue-500 transition"
              >
                Register
              </NavLink>
            </div>
          </div>

          {/* Features */}

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Features</h3>

            <div className="flex flex-col gap-3">
              <span className="text-sm text-gray-400">Real-Time Messaging</span>

              <span className="text-sm text-gray-400">
                Secure Authentication
              </span>

              <span className="text-sm text-gray-400">User Profiles</span>

              <span className="text-sm text-gray-400">
                Private Conversations
              </span>
            </div>
          </div>

          {/* Connect */}

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Connect With Us
            </h3>

            <p className="text-sm text-gray-400 mb-4">
              Follow the project and stay updated.
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-800
                           flex items-center justify-center
                           text-sm font-semibold
                           hover:bg-blue-600 hover:text-white
                           transition"
              >
                in
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-800
                           flex items-center justify-center
                           text-sm font-semibold
                           hover:bg-pink-600 hover:text-white
                           transition"
              >
                IG
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-800
                           flex items-center justify-center
                           text-sm font-semibold
                           hover:bg-gray-700 hover:text-white
                           transition"
              >
                GH
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}

        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              © 2026 Egg&Code ChatApp. All rights reserved.
            </p>

            <p className="text-sm text-gray-500">
              Built with React & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
