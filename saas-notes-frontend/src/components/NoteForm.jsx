import React, { useState } from "react";
import { createNote } from "../api/notes";

const NoteForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNote({ title, content });
      setTitle("");
      setContent("");
      onCreate();
    } catch (err) {
      alert(err.response?.data?.detail || "Error creating note");
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h5 className="mb-3">Add a Note</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 fw-semibold shadow-sm">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
