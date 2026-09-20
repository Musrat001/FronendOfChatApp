import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Later you can put your API/login logic here
    console.log({
      username,
      password,
    });

    // After successful login
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      {/* Login Card */}
      <div className="w-full max-w-md">
        {/* Logo / App Name */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white text-2xl font-bold shadow-lg">
            C
          </div>

          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to continue to ChatApp
          </p>
        </div>

        {/* Card */}

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
          <form onSubmit={handleLogin}>
            {/* Username */}

            <div className="mb-5">
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Username or Email
              </label>

              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username or email"
                className="w-full rounded-lg border border-gray-300 px-4 py-3
                           text-gray-900 outline-none
                           transition
                           focus:border-blue-500
                           focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Password */}

            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3
                           text-gray-900 outline-none
                           transition
                           focus:border-blue-500
                           focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Remember Me */}

            <div className="flex items-center gap-2 mb-6">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 accent-blue-600"
              />

              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>

            {/* Login Button */}

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3
                         font-semibold text-white
                         transition
                         hover:bg-blue-700
                         active:scale-[0.98]"
            >
              Login
            </button>
          </form>

          {/* Divider */}

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200"></div>

            <span className="text-sm text-gray-400">OR</span>

            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          {/* Register */}

          <p className="text-center text-sm text-gray-600">
            Don't have an account?
            <Link
              to="/register"
              className="ml-1 font-semibold text-blue-600 hover:text-blue-700"
            >
              Create account
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

export default Login;
