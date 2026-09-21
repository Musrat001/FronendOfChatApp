import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}

        <NavLink to="/" className="flex items-center gap-3">
          <div
            className="w-15 h-15 rounded-xl bg-blue-600
                       flex items-center justify-center
                       text-white font-bold text-xl "
          >
            E&C
          </div>

          <span className="text-2xl font-bold text-gray-900">
            Egg&Code <span className="text-blue-600">ChatApp</span>
          </span>
        </NavLink>

        {/* Navigation */}

        <nav className="flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`
            }
          >
            Home
          </NavLink>
{/* 
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`
            }
          >
            About Us
          </NavLink> */}

          <NavLink
            to="/login"
            className="px-6 py-2 rounded-lg border border-blue-600
                       text-blue-600 font-medium
                       hover:bg-blue-50
                       active:scale-95
                       transition"
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="px-6 py-2 rounded-lg bg-blue-600
                       text-white font-medium
                       hover:bg-blue-700
                       active:scale-95
                       transition"
          >
            Register
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
