import React, { useState, useEffect } from "react";
import "./../styles/AuthForm.css";

export default function AuthForm({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [users, setUsers] = useState([]);

  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [recoveryUsernameInput, setRecoveryUsernameInput] = useState("");
  const [recoveryMessage, setRecoveryMessage] = useState({ type: "", text: "" });
  const [recoveredPassword, setRecoveredPassword] = useState("");
  const [recoveryUser, setRecoveryUser] = useState("");

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  const saveUsers = (updatedUsers) => {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const validatePassword = (pwd) => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    if (pwd.length < minLength) return "A senha deve ter no mínimo 6 caracteres.";
    if (!hasUpperCase) return "A senha deve conter pelo menos uma letra maiúscula.";
    if (!hasNumber) return "A senha deve conter pelo menos um número.";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return;

    if (isRegister) {
      const pwdError = validatePassword(password);
      if (pwdError) {
        setMessage({ type: "error", text: pwdError });
        return;
      }

      if (users.find((u) => u.username === username)) {
        setMessage({ type: "error", text: "Usuário já cadastrado." });
      } else {
        const newUser = { username, password };
        saveUsers([...users, newUser]);
        setMessage({ type: "success", text: "Conta criada com sucesso!" });
        setIsRegister(false);
        setUsername("");
        setPassword("");
      }
    } else {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        setMessage({ type: "success", text: "Login realizado!" });
        setTimeout(() => {
          onLogin(user);
        }, 1000);
      } else {
        setMessage({ type: "error", text: "Usuário ou senha inválidos." });
      }
    }
  };

  const openRecoveryModal = () => {
    setRecoveryUsernameInput("");
    setRecoveryMessage({ type: "", text: "" });
    setRecoveredPassword("");
    setRecoveryUser("");
    setShowRecoveryModal(true);
  };

  const closeRecoveryModal = () => {
    setShowRecoveryModal(false);
  };

  const handleRecoverySubmit = (e) => {
    e.preventDefault();
    const trimmedInput = recoveryUsernameInput.trim();
    if (!trimmedInput) {
      setRecoveryMessage({ type: "error", text: "Digite o nome de usuário." });
      return;
    }

    const foundUser = users.find((u) => u.username === trimmedInput);
    if (foundUser) {
      setRecoveredPassword(foundUser.password);
      setRecoveryUser(foundUser.username);
      setRecoveryMessage({ type: "success", text: "Senha recuperada com sucesso!" });
    } else {
      setRecoveryMessage({ type: "error", text: "Usuário não encontrado." });
      setRecoveredPassword("");
      setRecoveryUser("");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="login-header">
          <h1>EcoPoints</h1>
          <p>Aplicativo para registro de recicláveis e acúmulo de pontos</p>
        </div>

        <div className="auth-toggle">
          <button
            className={!isRegister ? "active" : ""}
            onClick={() => {
              setIsRegister(false);
              setMessage({ type: "", text: "" });
            }}
          >
            Login
          </button>
          <button
            className={isRegister ? "active" : ""}
            onClick={() => {
              setIsRegister(true);
              setMessage({ type: "", text: "" });
            }}
          >
            Cadastrar
          </button>
        </div>

        <h2 className="auth-title">{isRegister ? "Crie sua conta" : "Bem-vindo de volta!"}</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={isRegister ? "new-password" : "current-password"}
          />

          <button type="submit" className="auth-submit">
            {isRegister ? "Registrar" : "Entrar"}
          </button>
        </form>

        {!isRegister && (
          <button
            className="forgot-password-btn"
            onClick={openRecoveryModal}
            type="button"
          >
            Esqueci a senha
          </button>
        )}

        {message.text && (
          <p className={message.type === "error" ? "auth-error" : "auth-success"}>
            {message.text}
          </p>
        )}

        <footer className="auth-footer">
          © {new Date().getFullYear()} EcoPoints. Todos os direitos reservados.
        </footer>
      </div>

      {showRecoveryModal && (
        <div className="modal-overlay" onClick={closeRecoveryModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Recuperar Senha</h3>

            <form onSubmit={handleRecoverySubmit} className="auth-form">
              <input
                type="text"
                placeholder="Digite seu nome de usuário"
                value={recoveryUsernameInput}
                onChange={(e) => setRecoveryUsernameInput(e.target.value)}
                autoFocus
                required
              />

              <div className="modal-buttons">
                <button type="submit" className="auth-submit">
                  Recuperar
                </button>
                <button type="button" className="auth-submit close-btn" onClick={closeRecoveryModal}>
                  Fechar
                </button>
              </div>
            </form>

            {recoveryMessage.text && (
              <p className={recoveryMessage.type === "error" ? "auth-error" : "auth-success"}>
                {recoveryMessage.text}
              </p>
            )}

            {recoveredPassword && (
              <p className="password-display">
                A senha do usuário <b>{recoveryUser}</b> é: <strong>{recoveredPassword}</strong>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
