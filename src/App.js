import React, { useState, useEffect } from "react";
import AuthForm from "./components/AuthForm";
import EcoPointsApp from "./components/EcoPointsApp";
import "./styles/App.css";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <>
      {user ? (
        <EcoPointsApp user={user} onLogout={handleLogout} />
      ) : (
        <AuthForm onLogin={handleLogin} />
      )}
    </>
  );
}
