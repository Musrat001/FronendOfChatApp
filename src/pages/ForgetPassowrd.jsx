import { useState } from "react";
import {
  ArrowLeft,
  MessageCircle,
  Mail,
  UserRound,
  ArrowRight,
  ShieldCheck,
  LoaderCircle,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!identifier.trim()) {
      setError("Please enter your registered email or username.");
      return;
    }

    if (!newPassword.trim()) {
      setError("Please enter your new password.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Your new password must contain at least 8 characters.");
      return;
    }

    try {
      setLoading(true);
      const reqObj = {
        identifier,
        newPassword,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/forget-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reqObj),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      await new Promise((resolve) => setTimeout(resolve, 800));

      setMessage(
        data.message,
      );
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 text-slate-800">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />

      {/* Main container */}
      <div className="relative w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 flex justify-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <MessageCircle size={27} strokeWidth={2.2} />
            </div>

            <span className="text-2xl font-bold tracking-tight text-slate-900">
              Chat<span className="text-blue-600">App</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-9">
          {/* Back button */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to login
          </button>

          {/* Icon */}
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50">
            <ShieldCheck
              size={32}
              className="text-blue-600"
              strokeWidth={1.7}
            />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Reset password
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Enter your registered email or username and choose a new password
            for your account.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Email or username */}
            <div>
              <label
                htmlFor="identifier"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email address or username
              </label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  {identifier.includes("@") ? (
                    <Mail size={19} />
                  ) : (
                    <UserRound size={19} />
                  )}
                </div>

                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your email or username"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setError("");
                    setMessage("");
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            {/* New password */}
            <div>
              <label
                htmlFor="newPassword"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                New password
              </label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <LockKeyhole size={19} />
                </div>

                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError("");
                    setMessage("");
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition-colors hover:text-blue-600"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Use at least 8 characters.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {error}
              </div>
            )}

            {/* Success */}
            {message && (
              <div
                role="status"
                className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700"
              >
                {message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle size={19} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Reset password
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          {/* Security note */}
          <div className="mt-7 border-t border-slate-100 pt-6">
            <p className="text-center text-xs leading-5 text-slate-400">
              Keep your password private and never share it with anyone.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} ChatApp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
