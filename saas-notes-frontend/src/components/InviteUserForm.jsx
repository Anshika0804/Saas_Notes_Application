import React, { useState } from "react";
import api from "../api/axiosInstance";
import { BsPersonCircle, BsEnvelopeFill, BsLockFill } from "react-icons/bs";

function InviteUserForm({ onInvite }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInvite = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await api.post("users/create/", { username, email, password });
      setSuccess("User invited successfully!");
      setUsername("");
      setEmail("");
      setPassword("");
      if (onInvite) onInvite();
    } catch (err) {
      setError("Failed to invite user. Only admins can do this.");
    }
  };

  return (
    <div
      className="card shadow-lg p-4 rounded-4 mt-3"
      style={{ maxWidth: "500px", margin: "auto" }}
    >
      <h4 className="text-center mb-3 fw-bold">Invite New User</h4>

      {error && (
        <div className="alert alert-danger py-2 text-center">{error}</div>
      )}
      {success && (
        <div className="alert alert-success py-2 text-center">{success}</div>
      )}

      <form onSubmit={handleInvite}>
        <div className="input-group mb-3 shadow-sm rounded">
          <span className="input-group-text bg-white">
            <BsPersonCircle />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group mb-3 shadow-sm rounded">
          <span className="input-group-text bg-white">
            <BsEnvelopeFill />
          </span>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group mb-3 shadow-sm rounded">
          <span className="input-group-text bg-white">
            <BsLockFill />
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn w-100 fw-bold shadow-sm text-white"
          style={{ background: "linear-gradient(90deg, #36d1dc, #5b86e5)" }}
        >
          Invite User
        </button>
      </form>
    </div>
  );
}

export default InviteUserForm;
