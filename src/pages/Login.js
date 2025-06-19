import React from "react";
import API from "../api";

const Login = ({ onLogin }) => {
  const loginAs = async (role) => {
    const res = await API.post("/auth/login", { role });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    onLogin(res.data.user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">🔐 Login as</h2>

        <div className="space-y-4">
          <button
            onClick={() => loginAs("celebrity")}
            className="w-full py-3 rounded-full bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 transition"
          >
            🎤 Celebrity
          </button>
          <button
            onClick={() => loginAs("public")}
            className="w-full py-3 rounded-full bg-green-600 text-white text-sm font-semibold shadow hover:bg-green-700 transition"
          >
            🙋 Public User
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Powered by <span className="font-medium text-purple-600">YourApp</span>
        </p>
      </div>
    </div>
  );
};

export default Login;


