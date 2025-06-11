import React, { useState } from "react";
import "../styles/MetasPersonalizadas.css"
export default function MetasPersonalizadas({ metas, points, onAddMeta, onDeleteMeta }) {
  const [newMetaName, setNewMetaName] = useState("");
  const [newMetaGoal, setNewMetaGoal] = useState("");

  const handleAdd = () => {
    if (!newMetaName.trim() || !newMetaGoal || isNaN(newMetaGoal) || newMetaGoal <= 0) {
      alert("Por favor, preencha um nome válido e uma meta numérica maior que zero.");
      return;
    }
    onAddMeta({ id: Date.now(), name: newMetaName.trim(), goal: Number(newMetaGoal) });
    setNewMetaName("");
    setNewMetaGoal("");
  };

  return (
    <section className="metas-container">
      <h2>Metas Personalizadas</h2>

      <div className="new-meta-form">
        <input
          type="text"
          placeholder="Nome da meta"
          value={newMetaName}
          onChange={(e) => setNewMetaName(e.target.value)}
          aria-label="Nome da meta"
        />
        <input
          type="number"
          placeholder="Pontos para atingir"
          value={newMetaGoal}
          onChange={(e) => setNewMetaGoal(e.target.value)}
          aria-label="Pontos da meta"
          min="1"
        />
        <button onClick={handleAdd}>Adicionar Meta</button>
      </div>

      {metas.length === 0 ? (
        <p>Você ainda não criou nenhuma meta personalizada.</p>
      ) : (
        <ul className="metas-list">
          {metas.map((meta) => {
            const progressPercent = Math.min((points / meta.goal) * 100, 100);
            return (
              <li key={meta.id} className="meta-item">
                <div>
                  <strong>{meta.name}</strong> - {meta.goal} pts
                  <div className="progress-bar-container" aria-label={`Progresso da meta ${meta.name}`}>
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <p>Progresso: {Math.floor(progressPercent)}%</p>
                </div>
                <button
                  className="delete-meta-btn"
                  onClick={() => onDeleteMeta(meta.id)}
                  aria-label={`Deletar meta ${meta.name}`}
                >
                  &times;
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
