import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import CreatePost from "./components/CreatePost";
import Feed from "./components/Feed";
import Profile from "./pages/Profile";

function App() {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (!user) return <Login onLogin={setUser} />;

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8 transition-all duration-300">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                👋 Welcome, {user.name}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Role: <span className="font-medium">{user.role}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Link
                to="/feed"
                className="text-sm px-4 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
              >
                Feed
              </Link>
              {user.role === "celebrity" && (
                <Link
                  to="/create"
                  className="text-sm px-4 py-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition"
                >
                  Create
                </Link>
              )}
              <Link
                to="/profile"
                className="text-sm px-4 py-2 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Navigate to="/feed" />} />
            <Route path="/feed" element={<Feed />} />
            {user.role === "celebrity" && (
              <Route path="/create" element={<CreatePost user={user} />} />
            )}
            <Route path="/profile" element={<Profile user={user} />} />
            <Route
              path="*"
              element={
                <p className="text-center text-gray-500 text-sm py-10">
                  🚫 404 – Page Not Found
                </p>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
