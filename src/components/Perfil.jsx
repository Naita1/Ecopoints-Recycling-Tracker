import React from "react";
import "../styles/EcoPointsApp.css";

export default function Perfil({ user, points, goal, log, onEditProfile, setTab }) {
  const level = Math.floor(points / 100) + 1;
  const levelProgress = Math.min((points % 100) / 100, 1) * 100;
  const goalProgress = Math.min(points / goal, 1) * 100;

  const motivations = [
    "Continue reciclando para um planeta melhor! 🌍",
    "Cada ponto conta! Você está arrasando! 💚",
    "O futuro é verde, obrigado por ajudar! 🌿",
    "Reciclar é um ato de amor ao planeta! ♻️",
  ];

  const initials = user.username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="perfil-container">

      {/* Cabeçalho do perfil */}
      <div className="perfil-top">
        <div className="perfil-avatar">{initials}</div>
        <div className="perfil-top-info">
          <h2>Olá, {user.username} 👋</h2>
          <p>{motivations[points % motivations.length]}</p>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="perfil-cards">
        <div className="perfil-card">
          <div className="perfil-card-label">Pontos acumulados</div>
          <div className="perfil-card-value">{points} pts</div>
        </div>
        <div className="perfil-card">
          <div className="perfil-card-label">Nível atual</div>
          <div className="perfil-card-value">{level}</div>
        </div>
        <div className="perfil-card">
          <div className="perfil-card-label">Total de entregas</div>
          <div className="perfil-card-value">{log.length}</div>
        </div>
        <div className="perfil-card">
          <div className="perfil-card-label">Cidade</div>
          <div className="perfil-card-value text">{user.city || "—"}</div>
        </div>
      </div>

      {/* Progresso de nível */}
      <div className="perfil-section">
        <div className="perfil-section-title">Progresso do nível {level}</div>
        <div className="progress-bar-container" aria-label="Progresso para o próximo nível">
          <div className="progress-bar-fill" style={{ width: `${levelProgress}%` }} />
        </div>
        <div className="progress-label">{Math.floor(levelProgress)}% para o nível {level + 1}</div>
      </div>

      {/* Meta */}
      <div className="perfil-section">
        <div className="perfil-section-title">Meta personalizada</div>
        <div className="progress-bar-container" aria-label="Progresso da meta">
          <div className="progress-bar-fill goal-progress" style={{ width: `${goalProgress}%` }} />
        </div>
        <div className="progress-label">{points} / {goal} pts — {Math.floor(goalProgress)}% concluído</div>
        <button className="goal-btn" onClick={() => setTab("metas")}>
          Ver todas as metas
        </button>
      </div>

      <button className="edit-profile-btn" onClick={onEditProfile}>
        Editar perfil
      </button>

    </div>
  );
}
