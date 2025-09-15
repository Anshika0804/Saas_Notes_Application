import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { BsPersonCircle, BsLockFill } from "react-icons/bs";

function LoginPage({ setAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("token/", { username, password });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      setAuth(true);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "#f0f2f5", fontFamily: "Poppins, sans-serif" }}
    >
      <div className="card shadow-sm p-4 rounded-3" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center mb-4">
          <h3 className="fw-bold">SaaS Notes</h3>
          <p className="text-muted">Sign in to manage your notes</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text bg-white border-1">
              <BsPersonCircle />
            </span>
            <input
              type="text"
              name="username"
              className="form-control border-1"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group mb-4">
            <span className="input-group-text bg-white border-1">
              <BsLockFill />
            </span>
            <input
              type="password"
              name="password"
              className="form-control border-1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-3 text-muted small">
          © 2025 SaaS Notes
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
