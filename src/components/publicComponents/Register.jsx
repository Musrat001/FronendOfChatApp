import { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Later you can send this data to your backend
    const registerobj = {
      name,
      email,
      username,
      password,
    };

    try {
      const response = await fetch("http://localhost:9838/api/v1/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerobj),
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
        
      if (data.success == true) {
        alert(data.message)
        
        navigate("/login");
      }
    } catch (error) {
      console.log("Error while registering user", error.message);
    }

    // After successful registration
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo / App Name */}

        <div className="text-center mb-8">
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center
                       justify-center rounded-2xl bg-blue-600
                       text-2xl font-bold text-white shadow-lg"
          >
            C
          </div>

          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>

          <p className="mt-2 text-sm text-gray-500">
            Join ChatApp and start connecting with people
          </p>
        </div>

        {/* Register Card */}

        <div
          className="rounded-2xl border border-gray-200
                     bg-white p-8 shadow-xl"
        >
          <form>
            {/* Name */}

            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>

              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-gray-300
                           px-4 py-3 text-gray-900 outline-none
                           transition
                           focus:border-blue-500
                           focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            {/* Email */}

            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300
                           px-4 py-3 text-gray-900 outline-none
                           transition
                           focus:border-blue-500
                           focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            {/* Username */}

            <div className="mb-5">
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Username
              </label>

              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Create a username"
                className="w-full rounded-lg border border-gray-300
                           px-4 py-3 text-gray-900 outline-none
                           transition
                           focus:border-blue-500
                           focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            {/* Password */}

            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full rounded-lg border border-gray-300
                           px-4 py-3 text-gray-900 outline-none
                           transition
                           focus:border-blue-500
                           focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            {/* Register Button */}

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600
                         py-3 font-semibold text-white
                         transition
                         hover:bg-blue-700
                         active:scale-[0.98]"
              onClick={handleRegister}
            >
              Create Account
            </button>
          </form>

          {/* Divider */}

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200"></div>

            <span className="text-sm text-gray-400">OR</span>

            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          {/* Login */}

          <p className="text-center text-sm text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="ml-1 font-semibold text-blue-600
                         hover:text-blue-700"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Footer */}

        <p className="mt-6 text-center text-xs text-gray-400">
          © 2026 ChatApp. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Register;
