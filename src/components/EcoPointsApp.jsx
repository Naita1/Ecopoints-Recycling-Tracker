import React, { useState } from "react";
import "../styles/EcoPointsApp.css";

function Perfil({ user, points }) {
  const level = Math.floor(points / 100) + 1;
  const progress = Math.min((points % 100) / 100, 1) * 100;

  const motivations = [
    "Continue reciclando para um planeta melhor! 🌍",
    "Cada ponto conta! Você está arrasando! 💚",
    "O futuro é verde, obrigado por ajudar! 🌿",
    "Reciclar é um ato de amor ao planeta! ♻️",
  ];
  const motivation = motivations[points % motivations.length];

  const initials = user.username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <section className="perfil-container">
      <div className="perfil-avatar">{initials}</div>
      <h2>Olá, {user.username}!</h2>
      <p className="perfil-info">
        <strong>Nome de usuário:</strong> {user.username}
      </p>
      <p className="perfil-info">
        <strong>Pontos acumulados:</strong> {points} pts
      </p>
      <p className="perfil-info">
        <strong>Nível atual:</strong> {level}
      </p>

      <div
        className="progress-bar-container"
        aria-label="Barra de progresso de pontos"
      >
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>

      <p className="motivation-msg">{motivation}</p>

      <button
        className="edit-profile-btn"
        onClick={() =>
          alert("Funcionalidade de editar perfil ainda não implementada")
        }
      >
        Editar Perfil
      </button>
    </section>
  );
}

export default function EcoPointsApp({ user, onLogout }) {
  const [tab, setTab] = useState("perfil");
  const [item, setItem] = useState("");
  const [points, setPoints] = useState(0);
  const [log, setLog] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item.trim()) return;
    const earnedPoints = 10;
    setPoints(points + earnedPoints);
    setLog([{ item, earnedPoints, date: new Date() }, ...log]);
    setItem("");
  };

  return (
    <div className="eco-site">
      <header className="site-header">
        <h1 className="site-logo">🌿 EcoPoints</h1>
        <nav className="site-nav">
          <button
            onClick={() => setTab("perfil")}
            className={tab === "perfil" ? "active" : ""}
            aria-label="Ir para Perfil"
          >
            Perfil
          </button>
          <button
            onClick={() => setTab("historico")}
            className={tab === "historico" ? "active" : ""}
            aria-label="Ir para Histórico"
          >
            Histórico
          </button>
          <button
            onClick={() => setTab("config")}
            className={tab === "config" ? "active" : ""}
            aria-label="Ir para Configurações"
          >
            Configurações
          </button>
          <button
            onClick={() => setTab("mercados")}
            className={tab === "mercados" ? "active" : ""}
            aria-label="Ir para Mercados Parceiros"
          >
            Mercados
          </button>
        </nav>
        <button className="logout-btn" onClick={onLogout} aria-label="Logout">
          Logout
        </button>
      </header>

      <main className="eco-main">
        {tab === "perfil" && <Perfil user={user} points={points} />}

        {tab === "historico" && (
          <section>
            <h2>Histórico de Entregas</h2>
            <form onSubmit={handleSubmit} className="eco-form">
              <input
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="Resíduo entregue (ex: Garrafa PET)"
                required
                aria-label="Resíduo entregue"
              />
              <button type="submit">Registrar Entrega</button>
            </form>

            <ul className="eco-log">
              {log.length === 0 ? (
                <p>Nenhuma entrega registrada ainda.</p>
              ) : (
                log.map((entry, idx) => (
                  <li key={idx}>
                    <div>
                      <strong>{entry.item}</strong>
                      <br />
                      <small>{entry.date.toLocaleString("pt-BR")}</small>
                    </div>
                    <span>+{entry.earnedPoints} pts</span>
                  </li>
                ))
              )}
            </ul>
          </section>
        )}

        {tab === "config" && (
          <section>
            <h2>Configurações</h2>
            <p>Em breve: atualização de perfil, preferências e mais opções.</p>
          </section>
        )}

        {tab === "mercados" && (
          <section>
            <h2>Mercados Parceiros</h2>
            <ul>
              <li>
                <strong>Mercado Verde Vida</strong> - Desconto de 10%
              </li>
              <li>
                <strong>SuperEco Brasil</strong> - Desconto de 15%
              </li>
              <li>
                <strong>ReciclaMarket</strong> - Ofertas especiais para
                recicladores
              </li>
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
