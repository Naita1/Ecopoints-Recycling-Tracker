import React, { useState } from "react";
import "../styles/Configuracoes.css";

const NOTIFICATION_OPTIONS = [
  {
    key: "dailyReminder",
    label: "Lembrete diário",
    desc: "Receba um aviso para registrar sua entrega do dia",
  },
  {
    key: "goalReached",
    label: "Meta atingida",
    desc: "Seja notificado quando atingir uma meta personalizada",
  },
  {
    key: "levelUp",
    label: "Subiu de nível",
    desc: "Comemore quando avançar para um novo nível",
  },
  {
    key: "weeklyReport",
    label: "Relatório semanal",
    desc: "Resumo das suas entregas toda segunda-feira",
  },
];

export default function Configuracoes({ theme, onToggleTheme, goal, onChangeGoal, onClearData }) {
  const [newGoal, setNewGoal] = useState(goal);
  const [goalSaved, setGoalSaved] = useState(false);

  const [notifications, setNotifications] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("notifications"));
    return saved || { dailyReminder: true, goalReached: true, levelUp: false, weeklyReport: false };
  });

  const handleSaveGoal = () => {
    const parsed = Number(newGoal);
    if (!parsed || parsed < 1) return;
    onChangeGoal(parsed);
    setGoalSaved(true);
    setTimeout(() => setGoalSaved(false), 2000);
  };

  const handleToggleNotification = (key) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const handleClearData = () => {
    if (window.confirm("Tem certeza? Isso vai apagar todo o seu histórico, pontos e metas. Essa ação não pode ser desfeita.")) {
      onClearData();
    }
  };

  return (
    <div className="config-container">
      <h2>Configurações</h2>

      <div className="config-section">
        <div className="config-section-title">Aparência</div>
        <div className="config-row">
          <div className="config-row-info">
            <span className="config-row-label">Tema escuro</span>
            <span className="config-row-desc">Reduz o brilho da tela em ambientes escuros</span>
          </div>
          <button
            className={`toggle-btn ${theme === "dark" ? "active" : ""}`}
            onClick={onToggleTheme}
            aria-label="Alternar tema"
          >
            <span className="toggle-thumb" />
          </button>
        </div>
      </div>

      <div className="config-section">
        <div className="config-section-title">Meta de pontos</div>
        <div className="config-row">
          <div className="config-row-info">
            <span className="config-row-label">Meta padrão</span>
            <span className="config-row-desc">Quantidade de pontos para atingir sua meta principal</span>
          </div>
          <div className="config-goal-input">
            <input
              type="number"
              min="1"
              value={newGoal}
              onChange={(e) => { setNewGoal(e.target.value); setGoalSaved(false); }}
            />
            <button className="config-btn-save" onClick={handleSaveGoal}>
              {goalSaved ? "Salvo ✓" : "Salvar"}
            </button>
          </div>
        </div>
      </div>

      <div className="config-section full-width">
        <div className="config-section-title">Notificações</div>
        <div className="config-notifications-grid">
          {NOTIFICATION_OPTIONS.map(({ key, label, desc }) => (
            <div className="config-row" key={key}>
              <div className="config-row-info">
                <span className="config-row-label">{label}</span>
                <span className="config-row-desc">{desc}</span>
              </div>
              <button
                className={`toggle-btn ${notifications[key] ? "active" : ""}`}
                onClick={() => handleToggleNotification(key)}
                aria-label={`Alternar ${label}`}
              >
                <span className="toggle-thumb" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="config-section danger-section full-width">
        <div className="config-section-title">Zona de perigo</div>
        <div className="config-row">
          <div className="config-row-info">
            <span className="config-row-label">Limpar todos os dados</span>
            <span className="config-row-desc">Remove permanentemente histórico, pontos e metas</span>
          </div>
          <button className="config-btn-danger" onClick={handleClearData}>
            Limpar dados
          </button>
        </div>
      </div>
    </div>
  );
}
