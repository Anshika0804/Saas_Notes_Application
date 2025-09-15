import React, { useState, useEffect } from "react";
import NotesList from "../components/NotesList";
import NoteForm from "../components/NoteForm";
import UpgradeButton from "../components/UpgradeButton";
import InviteUserForm from "../components/InviteUserForm";
import { fetchMe, logout } from "../api/auth";
import api from "../api/axiosInstance";

function Dashboard({ user, setAuth }) {
  const [currentUser, setCurrentUser] = useState(user);
  const [notes, setNotes] = useState([]);
  const [limitReached, setLimitReached] = useState(false);

  // Fetch user info if not loaded
  useEffect(() => {
    if (!currentUser) {
      fetchMe().then(setCurrentUser);
    }
  }, [currentUser]);

  // Fetch notes from backend
  const loadNotes = async () => {
    try {
      const res = await api.get("notes/");
      setNotes(res.data);
      setLimitReached(
        res.data.length >= 3 && currentUser?.tenant?.plan === "free"
      );
    } catch (err) {
      console.error("Error loading notes:", err);
    }
  };

  // Load notes on mount
  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`notes/${id}/`);
      loadNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const handleLogout = () => {
    logout();
    setAuth(null);
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* NoteForm */}
      <div className="card p-3 mb-3 shadow-sm">
        <h5>Add a Note</h5>
        <NoteForm onCreate={loadNotes} />
      </div>

      {/* NotesList */}
      <div className="card p-3 mb-3 shadow-sm">
        <h5>Your Notes</h5>
        <NotesList notes={notes} onDelete={handleDelete} />
      </div>

      {/* Upgrade Button */}
      {limitReached && currentUser?.role === "admin" && (
        <div className="text-center my-3">
          <UpgradeButton tenant={currentUser.tenant} onUpgrade={loadNotes} />
        </div>
      )}

      {/* Invite Users */}
      <div className="my-4">
        {currentUser?.role === "admin" ? (
          <InviteUserForm onInvite={() => console.log("User invited")} />
        ) : (
          <div className="alert alert-warning text-center">
            Only admins can invite new users.
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
