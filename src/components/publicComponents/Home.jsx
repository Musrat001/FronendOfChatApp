import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <p className="text-blue-600 font-semibold mb-3">
            Simple. Fast. Private.
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Connect and Chat
            <span className="text-blue-600"> Anywhere</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            ChatApp is a simple and modern messaging platform that lets you
            connect with your friends, share messages, and stay connected in
            real time.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg
                         font-medium hover:bg-blue-700 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="px-6 py-3 border border-gray-300
                         rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">
              Everything You Need to Chat
            </h2>

            <p className="text-gray-600">
              Simple features designed to make communication easier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}

            <div
              className="p-6 border border-gray-200 rounded-xl
                            hover:shadow-lg transition"
            >
              <div className="text-3xl mb-4">💬</div>

              <h3 className="text-xl font-semibold mb-2">
                Real-Time Messaging
              </h3>

              <p className="text-gray-600">
                Send and receive messages instantly and stay connected with your
                conversations.
              </p>
            </div>

            {/* Feature 2 */}

            <div
              className="p-6 border border-gray-200 rounded-xl
                            hover:shadow-lg transition"
            >
              <div className="text-3xl mb-4">👥</div>

              <h3 className="text-xl font-semibold mb-2">
                Connect with People
              </h3>

              <p className="text-gray-600">
                Find your friends and start conversations easily from a single,
                simple interface.
              </p>
            </div>

            {/* Feature 3 */}

            <div
              className="p-6 border border-gray-200 rounded-xl
                            hover:shadow-lg transition"
            >
              <div className="text-3xl mb-4">🔒</div>

              <h3 className="text-xl font-semibold mb-2">
                Secure Authentication
              </h3>

              <p className="text-gray-600">
                Your account is protected with secure authentication so you can
                chat with confidence.
              </p>
            </div>

            {/* Feature 4 */}

            <div
              className="p-6 border border-gray-200 rounded-xl
                            hover:shadow-lg transition"
            >
              <div className="text-3xl mb-4">📱</div>

              <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>

              <p className="text-gray-600">
                Enjoy a clean and responsive experience across desktop, tablet,
                and mobile devices.
              </p>
            </div>

            {/* Feature 5 */}

            <div
              className="p-6 border border-gray-200 rounded-xl
                            hover:shadow-lg transition"
            >
              <div className="text-3xl mb-4">⚡</div>

              <h3 className="text-xl font-semibold mb-2">Fast & Simple</h3>

              <p className="text-gray-600">
                A lightweight interface focused on fast and straightforward
                communication.
              </p>
            </div>

            {/* Feature 6 */}

            <div
              className="p-6 border border-gray-200 rounded-xl
                            hover:shadow-lg transition"
            >
              <div className="text-3xl mb-4">🎨</div>

              <h3 className="text-xl font-semibold mb-2">Clean Interface</h3>

              <p className="text-gray-600">
                A modern and distraction-free interface that keeps your
                conversations at the center.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}

      <section className="py-20 px-6 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Chatting?</h2>

          <p className="text-blue-100 mb-8">
            Create your account and start connecting with people.
          </p>

          <Link
            to="/register"
            className="inline-block px-7 py-3 bg-white
                       text-blue-600 rounded-lg font-semibold
                       hover:bg-gray-100 transition"
          >
            Create Account
          </Link>
        </div>
      </section>

      {/* Footer */}

      
    </div>
  );
}

export default Home;
