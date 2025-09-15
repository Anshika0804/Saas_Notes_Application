import React from "react";

function NotesList({ notes = [], onDelete, onUpdate }) {
  if (!notes.length) return <p>No notes yet.</p>;

  const handleUpdate = async (note) => {
    const newTitle = prompt("Enter new title", note.title);
    const newContent = prompt("Enter new content", note.content);

    if (newTitle !== null && newContent !== null) {
      await onUpdate(note.id, { title: newTitle, content: newContent });
    }
  };

  return (
    <ul className="list-group">
      {notes.map((note) => (
        <li
          key={note.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {/* Note content */}
          <div>
            <strong>{note.title}</strong>
            <p className="mb-0">{note.content}</p>
          </div>

          {/* Buttons container */}
          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => handleUpdate(note)}
            >
              Update
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => onDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NotesList;

