import React, { useState } from "react";
import { login, fetchMe } from "../api/auth";
import { BsPersonCircle, BsLockFill } from "react-icons/bs";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      const user = await fetchMe();
      onLogin(user);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
    >
      <div className="card shadow-lg p-4 p-md-5 rounded-4" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="text-center mb-4">
          <h3 className="text-white fw-bold">SaaS Notes</h3>
          <p className="text-light">Sign in to manage your notes</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3 shadow-sm rounded">
            <span className="input-group-text bg-white">
              <BsPersonCircle />
            </span>
            <input
              type="text"
              name="username"
              className="form-control rounded-end"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group mb-3 shadow-sm rounded">
            <span className="input-group-text bg-white">
              <BsLockFill />
            </span>
            <input
              type="password"
              name="password"
              className="form-control rounded-end"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-gradient w-100 fw-bold shadow-sm text-white" 
            style={{ background: "linear-gradient(90deg, #ff7e5f, #feb47b)" }}>
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <button className="btn btn-link text-decoration-none text-light" onClick={() => alert("Redirect to forgot password")}>
            Forgot Password?
          </button>
        </div>

        <div className="text-center mt-4 text-light-50 small">
          © 2025 SaaS Notes. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
