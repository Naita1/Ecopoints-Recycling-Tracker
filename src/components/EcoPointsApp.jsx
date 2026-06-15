import React, { useState, useEffect } from "react";
import "../styles/EcoPointsApp.css";
import Perfil from "./Perfil";
import EditarPerfil from "./EditarPerfil";
import MetasPersonalizadas from "./MetasPersonalizadas";
import Historico from "./Historico";
import MercadosParceiros from "./MercadosParceiros";
import Configuracoes from "./Configuracoes";

export default function EcoPointsApp({ user, onLogout }) {
  const storageKey = `ecodata_${user.username}`;

  const [tab, setTab] = useState("perfil");
  const [userData, setUserData] = useState(user);
  const [item, setItem] = useState("");

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [points, setPoints] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return saved?.points ?? 0;
  });

  const [goal, setGoal] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return saved?.goal ?? 200;
  });

  const [log, setLog] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return saved?.log ?? [];
  });

  const [metas, setMetas] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return saved?.metas ?? [{ id: 1, name: "Meta Inicial", goal: 200 }];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ points, goal, log, metas }));
  }, [points, goal, log, metas, storageKey]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleAddEntry = (newEntry) => {
    setPoints((prev) => prev + newEntry.earnedPoints);
    setLog((prev) => [newEntry, ...prev]);
  };

  const addMeta = (meta) => setMetas((prev) => [...prev, meta]);
  const deleteMeta = (id) => setMetas((prev) => prev.filter((m) => m.id !== id));

  const handleSaveProfile = (newUserData) => {
    setUserData(newUserData);
    setTab("perfil");
  };

  const handleChangePassword = (currentPassword, newPassword, confirmPassword) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((u) => u.username === userData.username);

    if (userIndex === -1 || users[userIndex].password !== currentPassword) {
      return { type: "error", text: "Senha atual incorreta." };
    }
    if (newPassword.length < 6) {
      return { type: "error", text: "A nova senha deve ter no mínimo 6 caracteres." };
    }
    if (!/[A-Z]/.test(newPassword)) {
      return { type: "error", text: "A nova senha deve conter pelo menos uma letra maiúscula." };
    }
    if (!/[0-9]/.test(newPassword)) {
      return { type: "error", text: "A nova senha deve conter pelo menos um número." };
    }
    if (newPassword !== confirmPassword) {
      return { type: "error", text: "As senhas não coincidem." };
    }

    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    return { type: "success", text: "Senha alterada com sucesso!" };
  };

  const handleClearData = () => {
    setPoints(0);
    setLog([]);
    setMetas([{ id: 1, name: "Meta Inicial", goal: 200 }]);
    setGoal(200);
  };

  const navItems = [
    { key: "perfil", label: "Perfil" },
    { key: "historico", label: "Histórico" },
    { key: "mercados", label: "Mercados" },
    { key: "metas", label: "Metas" },
    { key: "config", label: "Configurações" },
  ];

  return (
    <div className="eco-site">
      <header className="site-header">
        <h1 className="site-logo">🌿 EcoPoints</h1>
        <nav className="site-nav">
          {navItems.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={tab === key ? "active" : ""}
              aria-label={`Ir para ${label}`}
            >
              {label}
            </button>
          ))}
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
            onAddEntry={handleAddEntry}
          />
        )}

        {tab === "mercados" && <MercadosParceiros />}

        {tab === "metas" && (
          <MetasPersonalizadas
            metas={metas}
            points={points}
            onAddMeta={addMeta}
            onDeleteMeta={deleteMeta}
          />
        )}

        {tab === "config" && (
          <Configuracoes
            theme={theme}
            onToggleTheme={handleToggleTheme}
            goal={goal}
            onChangeGoal={setGoal}
            onClearData={handleClearData}
          />
        )}
      </main>
    </div>
  );
}
