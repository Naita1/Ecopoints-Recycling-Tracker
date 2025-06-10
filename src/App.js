import React, { useState, useEffect } from "react";
import AuthForm from "./components/AuthForm";
import EcoPointsApp from "./components/EcoPointsApp";
import "./styles/App.css";

export default function App() {
  const [user, setUser] = useState(null);

  // Carrega usuário salvo no localStorage ao iniciar o app
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  // Função para fazer login e salvar no localStorage
  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  // Função para logout, limpa usuário e localStorage
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
