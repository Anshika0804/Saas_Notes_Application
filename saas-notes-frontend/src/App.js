import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  return (
    <div>
      {!user ? (
        <LoginForm onLogin={setUser} />
      ) : (
        <Dashboard user={user} setAuth={setUser} />
      )}
    </div>
  );
}

export default App;
