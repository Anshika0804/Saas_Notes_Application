import React from "react";

function NotesList({ notes = [], onDelete }) {
  if (!notes.length) return <p>No notes yet.</p>;

  return (
    <ul className="list-group">
      {notes.map((note) => (
        <li
          key={note.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <strong>{note.title}</strong>
            <p className="mb-0">{note.content}</p>
          </div>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(note.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default NotesList;
