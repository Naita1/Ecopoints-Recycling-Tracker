import React, { useState } from "react";
import "../styles/EcoPointsApp.css";
import EditarPerfil from "./EditarPerfil";
import MetasPersonalizadas from "./MetasPersonalizadas";
import Historico from "./Historico";
import MercadosParceiros from "./MercadosParceiros"; 

function Perfil({ user, points, goal, log, onEditProfile, tab, setTab }) {
  const level = Math.floor(points / 100) + 1;
  const progress = Math.min((points % 100) / 100, 1) * 100;
  const goalProgress = Math.min(points / goal, 1) * 100;

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

      <div className="perfil-content">
        <h2>Olá, {user.username}!</h2>
        <p className="perfil-info">
          <strong>Pontos acumulados:</strong> {points} pts
        </p>
        <p className="perfil-info">
          <strong>Nível atual:</strong> {level}
        </p>
        <p className="perfil-info">
          <strong>Data de nascimento:</strong> {user.birthdate || "-"}
        </p>
        <p className="perfil-info">
          <strong>Cidade:</strong> {user.city || "-"}
        </p>

        <div
          className="progress-bar-container"
          aria-label="Barra de progresso de pontos"
        >
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <h3>Meta Personalizada</h3>
        <button
          className={`goal-btn ${tab === "metas" ? "active" : ""}`}
          aria-label="Ir para Metas Personalizadas"
          onClick={() => setTab("metas")}
        >
          Metas
        </button>

        <p className="perfil-info">
          Progresso: {points} / {goal} pts
        </p>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill goal-progress"
            style={{ width: `${goalProgress}%` }}
          />
        </div>

        <h3>Estatísticas</h3>
        <p>Total de entregas: {log.length}</p>
        <p>Pontos por entrega: 10 pts</p>

        <p className="motivation-msg">{motivation}</p>

        <button className="edit-profile-btn" onClick={onEditProfile}>
          Editar Perfil
        </button>
      </div>
    </section>
  );
}

export default function EcoPointsApp({ user, onLogout }) {
  const [tab, setTab] = useState("perfil");
  const [userData, setUserData] = useState(user);
  const [item, setItem] = useState("");
  const [points, setPoints] = useState(0);
  const [goal, setGoal] = useState(200);
  const [log, setLog] = useState([]);

  // Estado e funções para metas personalizadas
  const [metas, setMetas] = useState([{ id: 1, name: "Meta Inicial", goal: 200 }]);

  const addMeta = (meta) => setMetas((prev) => [...prev, meta]);
  const deleteMeta = (id) => setMetas((prev) => prev.filter((m) => m.id !== id));

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedItem = item.trim();

    if (trimmedItem.length < 3) {
      alert("Por favor, descreva melhor o resíduo (mínimo 3 caracteres).");
      return;
    }

    if (log.length > 0 && log[0].item.toLowerCase() === trimmedItem.toLowerCase()) {
      alert("Você já registrou esse item por último. Registre outro resíduo.");
      return;
    }

    const earnedPoints = 10;
    const newEntry = {
      item: trimmedItem,
      earnedPoints,
      date: new Date().toISOString(),
    };

    setPoints(points + earnedPoints);
    setLog([newEntry, ...log]);
    setItem("");
  };

  const handleSaveProfile = (newUserData) => {
    setUserData(newUserData);
    setTab("perfil");
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
            onClick={() => setTab("mercados")}
            className={tab === "mercados" ? "active" : ""}
            aria-label="Ir para Mercados Parceiros"
          >
            Mercados
          </button>
          <button
            onClick={() => setTab("metas")}
            className={tab === "metas" ? "active" : ""}
            aria-label="Ir para Metas Personalizadas"
          >
            Metas
          </button>
                    <button
            onClick={() => setTab("config")}
            className={tab === "config" ? "active" : ""}
            aria-label="Ir para Configurações"
          >
            Configurações
          </button>
        </nav>
        <button className="logout-btn" onClick={onLogout} aria-label="Logout">
          Logout
        </button>
      </header>

      <main className="eco-main">
        {tab === "perfil" && (
          <Perfil
            user={userData}
            points={points}
            goal={goal}
            log={log}
            onEditProfile={() => setTab("editarPerfil")}
            tab={tab}
            setTab={setTab}
          />
        )}

        {tab === "editarPerfil" && (
          <EditarPerfil
            user={userData}
            onSave={handleSaveProfile}
            onCancel={() => setTab("perfil")}
          />
        )}

        {tab === "historico" && (
          <Historico
            log={log}
            setLog={setLog}  
            item={item}
            setItem={setItem}
            onSubmit={handleSubmit}
          />
        )}

                {tab === "mercados" && <MercadosParceiros />} {/* Usando componente importado */}


        {tab === "metas" && (
          <MetasPersonalizadas metas={metas} points={points} onAddMeta={addMeta} onDeleteMeta={deleteMeta} />
        )}

        
        {tab === "config" && (
          <section>
            <h2>Configurações</h2>
            <p>Em breve: atualização de perfil, preferências e mais opções.</p>
          </section>
        )}

      </main>
    </div>
  );
}
