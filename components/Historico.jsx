import React, { useState } from "react";
// import "../styles/Historico"

export default function Historico({ log, item, setItem, onSubmit, setLog }) {
  const [busca, setBusca] = useState("");
  const [filtroDias, setFiltroDias] = useState("tudo");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = item.trim();

    if (trimmed.length < 3) {
      alert("Descreva melhor o resíduo.");
      return;
    }

    const ultimaEntrega = log[0];
    if (ultimaEntrega && ultimaEntrega.item.toLowerCase() === trimmed.toLowerCase()) {
      alert("Esse item já foi registrado por último.");
      return;
    }

    onSubmit(e);
    setItem("");
  };

  const handleLimparHistorico = () => {
    if (window.confirm("Tem certeza que deseja apagar todo o histórico?")) {
      setLog([]);
    }
  };

  const totalPontos = log.reduce((acc, l) => acc + l.earnedPoints, 0);

  const getIcon = (item) => {
    const lower = item.toLowerCase();
    if (lower.includes("papel")) return "📄";
    if (lower.includes("plástico") || lower.includes("pet")) return "🧴";
    if (lower.includes("vidro")) return "🍾";
    if (lower.includes("metal") || lower.includes("lata")) return "🥫";
    if (lower.includes("orgânico")) return "🍃";
    return "♻️";
  };

  // Filtro por dias
  const agora = new Date();
  const filtrarPorDias = (entrada) => {
    if (filtroDias === "tudo") return true;
    const dias = parseInt(filtroDias);
    const dataEntrada = new Date(entrada.date);
    const diff = (agora - dataEntrada) / (1000 * 60 * 60 * 24);
    return diff <= dias;
  };

  // Filtro por busca
  const logFiltrado = [...log]
    .filter(filtrarPorDias)
    .filter((entry) =>
      entry.item.toLowerCase().includes(busca.toLowerCase())
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
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

      <div className="resumo-historico" style={{ marginBottom: "20px" }}>
        <p><strong>Total de entregas:</strong> {log.length}</p>
        <p><strong>Total de pontos:</strong> {totalPontos} pts</p>
      </div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar no histórico..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        <select
          value={filtroDias}
          onChange={(e) => setFiltroDias(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        >
          <option value="tudo">Todos os períodos</option>
          <option value="7">Últimos 7 dias</option>
          <option value="30">Últimos 30 dias</option>
        </select>

        <button
          onClick={handleLimparHistorico}
          style={{
            backgroundColor: "#d32f2f",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Limpar Histórico
        </button>
      </div>

      <ul className="eco-log">
        {logFiltrado.length === 0 ? (
          <p style={{ fontStyle: "italic", color: "#555" }}>Nenhuma entrega registrada com os filtros aplicados.</p>
        ) : (
          logFiltrado.map((entry, idx) => (
            <li key={idx}>
              <div>
                <strong>{getIcon(entry.item)} {entry.item}</strong>
                <br />
                <small>{new Date(entry.date).toLocaleString("pt-BR")}</small>
              </div>
              <span>+{entry.earnedPoints} pts</span>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
