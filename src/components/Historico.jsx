import React, { useState } from "react";
import "../styles/Historico.css";

export default function Historico({ log, item, setItem, onSubmit, setLog }) {
  const [busca, setBusca] = useState("");
  const [filtroDias, setFiltroDias] = useState("tudo");
  const [modalIndex, setModalIndex] = useState(null);
  const [codigo, setCodigo] = useState("");
  const [local, setLocal] = useState("");

  const pontosColeta = [
    "EcoPosto Central",
    "Ponto Verde Bairro Sul",
    "Cooperativa Sustentável",
    "Recicla+ Zona Leste"
  ];

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

    const novaEntrega = {
      item: trimmed,
      date: new Date().toISOString(),
      earnedPoints: 10,
      validado: false,
    };

    setLog([novaEntrega, ...log]);
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

    const novaLista = [...log];
    novaLista[modalIndex].validado = true;
    setLog(novaLista);
    setModalIndex(null);
    setCodigo("");
    setLocal("");
  };

  const totalPontos = log.reduce((acc, l) => l.validado ? acc + l.earnedPoints : acc, 0);

  const getIcon = (item) => {
    const lower = item.toLowerCase();
    if (lower.includes("papel")) return "📄";
    if (lower.includes("plástico") || lower.includes("pet")) return "🧴";
    if (lower.includes("vidro")) return "🍾";
    if (lower.includes("metal") || lower.includes("lata")) return "🥫";
    if (lower.includes("orgânico")) return "🍃";
    return "♻️";
  };

  const agora = new Date();
  const filtrarPorDias = (entrada) => {
    if (filtroDias === "tudo") return true;
    const dias = parseInt(filtroDias);
    const dataEntrada = new Date(entrada.date);
    const diff = (agora - dataEntrada) / (1000 * 60 * 60 * 24);
    return diff <= dias;
  };

  const logFiltrado = [...log]
    .filter(filtrarPorDias)
    .filter((entry) =>
      entry.item.toLowerCase().includes(busca.toLowerCase())
    )
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
        <p><strong>Total de pontos:</strong> {totalPontos} pts</p>
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

        <button
          onClick={handleLimparHistorico}
          className="limpar-btn"
          type="button"
        >
          Limpar Histórico
        </button>
      </div>

      <ul className="eco-log">
        {logFiltrado.length === 0 ? (
          <p className="sem-entregas">Nenhuma entrega registrada com os filtros aplicados.</p>
        ) : (
          logFiltrado.map((entry, idx) => (
            <li key={idx}>
              <div>
                <strong>{getIcon(entry.item)} {entry.item}</strong><br />
                <small>{new Date(entry.date).toLocaleString("pt-BR")}</small><br />
                <small style={{ color: entry.validado ? "#4caf50" : "#f57c00" }}>
                  {entry.validado ? "✔ Validado" : "⏳ Pendente"}
                </small>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                <span>+{entry.earnedPoints} pts</span>
                {!entry.validado && (
                  <button
                    onClick={() => setModalIndex(idx)}
                    style={{
                      fontSize: "0.75rem",
                      backgroundColor: "#388e3c",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "4px 8px",
                      cursor: "pointer",
                    }}
                  >
                    Validar
                  </button>
                )}
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Modal de Validação */}
      {modalIndex !== null && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "10px",
            width: "90%",
            maxWidth: "400px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            textAlign: "center"
          }}>
            <h3>Validação de Entrega</h3>
            <p>Escolha o local de descarte e insira o código fornecido pelo ponto de coleta.</p>

            <select value={local} onChange={(e) => setLocal(e.target.value)} style={{ marginTop: 12, padding: 8, width: "100%", borderRadius: 6 }}>
              <option value="">-- Selecione um ponto de coleta --</option>
              {pontosColeta.map((p, i) => (
                <option key={i} value={p}>{p}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Código do ponto de coleta"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              style={{ marginTop: 12, padding: 8, width: "100%", borderRadius: 6 }}
            />

            <div style={{ marginTop: "16px", display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                onClick={handleConfirmarValidacao}
                style={{
                  backgroundColor: "#388e3c",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Confirmar
              </button>
              <button
                onClick={() => {
                  setModalIndex(null);
                  setCodigo("");
                  setLocal("");
                }}
                style={{
                  backgroundColor: "#aaa",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
