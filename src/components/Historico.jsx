import React, { useState } from "react";
import "../styles/Historico.css";

const PONTOS_COLETA = [
  "EcoPosto Central",
  "Ponto Verde Bairro Sul",
  "Cooperativa Sustentável",
  "Recicla+ Zona Leste",
];

const getIcon = (item) => {
  const lower = item.toLowerCase();
  if (lower.includes("papel")) return "📄";
  if (lower.includes("plástico") || lower.includes("pet")) return "🧴";
  if (lower.includes("vidro")) return "🍾";
  if (lower.includes("metal") || lower.includes("lata")) return "🥫";
  if (lower.includes("orgânico")) return "🍃";
  return "♻️";
};

export default function Historico({ log, setLog, item, setItem, onAddEntry }) {
  const [busca, setBusca] = useState("");
  const [filtroDias, setFiltroDias] = useState("tudo");
  const [modalEntryId, setModalEntryId] = useState(null);
  const [codigo, setCodigo] = useState("");
  const [local, setLocal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = item.trim();

    if (trimmed.length < 3) {
      alert("Descreva melhor o resíduo.");
      return;
    }
    if (log[0]?.item.toLowerCase() === trimmed.toLowerCase()) {
      alert("Esse item já foi registrado por último.");
      return;
    }

    const novaEntrada = {
      id: Date.now(),
      item: trimmed,
      date: new Date().toISOString(),
      earnedPoints: 10,
      validado: false,
    };

    onAddEntry(novaEntrada);
    setItem("");
  };

  const handleLimparHistorico = () => {
    if (window.confirm("Tem certeza que deseja apagar todo o histórico?")) {
      setLog([]);
    }
  };

  const handleConfirmarValidacao = () => {
    if (!local || codigo.trim().length < 4) {
      alert("Selecione o local e insira um código válido (mínimo 4 caracteres).");
      return;
    }
    setLog((prev) =>
      prev.map((entry) =>
        entry.id === modalEntryId ? { ...entry, validado: true } : entry
      )
    );
    setModalEntryId(null);
    setCodigo("");
    setLocal("");
  };

  const closeModal = () => {
    setModalEntryId(null);
    setCodigo("");
    setLocal("");
  };

  const totalPontos = log.reduce((acc, l) => (l.validado ? acc + l.earnedPoints : acc), 0);

  const agora = new Date();
  const logFiltrado = log
    .filter((entry) => {
      if (filtroDias === "tudo") return true;
      const dias = parseInt(filtroDias);
      return (agora - new Date(entry.date)) / (1000 * 60 * 60 * 24) <= dias;
    })
    .filter((entry) => entry.item.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section className="historico-container">
      <h2>Histórico de Entregas</h2>

      <form onSubmit={handleSubmit} className="eco-form">
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Resíduo entregue (ex: Garrafa PET)"
          required
        />
        <button type="submit">Registrar Entrega</button>
      </form>

      <div className="resumo-historico">
        <p><strong>Total de entregas:</strong> {log.length}</p>
        <p><strong>Pontos validados:</strong> {totalPontos} pts</p>
      </div>

      <div className="filtros-container">
        <input
          type="text"
          placeholder="Buscar no histórico..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select value={filtroDias} onChange={(e) => setFiltroDias(e.target.value)}>
          <option value="tudo">Todos os períodos</option>
          <option value="7">Últimos 7 dias</option>
          <option value="30">Últimos 30 dias</option>
        </select>
        <button onClick={handleLimparHistorico} className="limpar-btn" type="button">
          Limpar Histórico
        </button>
      </div>

      <ul className="eco-log">
        {logFiltrado.length === 0 ? (
          <p className="sem-entregas">Nenhuma entrega registrada com os filtros aplicados.</p>
        ) : (
          logFiltrado.map((entry) => (
            <li key={entry.id}>
              <div>
                <strong>{getIcon(entry.item)} {entry.item}</strong>
                <br />
                <small>{new Date(entry.date).toLocaleString("pt-BR")}</small>
                <br />
                <small className={entry.validado ? "status-validado" : "status-pendente"}>
                  {entry.validado ? "✔ Validado" : "⏳ Pendente"}
                </small>
              </div>
              <div className="entry-actions">
                <span>+{entry.earnedPoints} pts</span>
                {!entry.validado && (
                  <button className="validar-btn" onClick={() => setModalEntryId(entry.id)}>
                    Validar
                  </button>
                )}
              </div>
            </li>
          ))
        )}
      </ul>

      {modalEntryId !== null && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Validação de Entrega</h3>
            <p>Escolha o local de descarte e insira o código fornecido pelo ponto de coleta.</p>

            <select
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              className="modal-select"
            >
              <option value="">-- Selecione um ponto de coleta --</option>
              {PONTOS_COLETA.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Código do ponto de coleta"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="modal-input"
            />

            <div className="modal-buttons">
              <button className="btn-confirmar" onClick={handleConfirmarValidacao}>
                Confirmar
              </button>
              <button className="btn-cancelar" onClick={closeModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
