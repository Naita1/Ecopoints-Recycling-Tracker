import React, { useState } from "react";
import "../styles/MercadosParceiros.css"

const mercadosData = [
  {
    id: 1,
    nome: "Mercado Verde Vida",
    desconto: "10%",
    endereco: "Rua das Flores, 123",
    telefone: "(11) 1234-5678",
    horario: "8h às 18h",
    site: "https://verdevida.com",
    cidade: "São Paulo",
    favorito: false,
    comentarios: [
      { id: 1, texto: "Ótimo atendimento!" },
      { id: 2, texto: "Sempre boas promoções." },
    ],
  },
  {
    id: 2,
    nome: "SuperEco Brasil",
    desconto: "15%",
    endereco: "Av. Brasil, 456",
    telefone: "(21) 9876-5432",
    horario: "9h às 20h",
    site: "https://supereco.com",
    cidade: "Rio de Janeiro",
    favorito: false,
    comentarios: [],
  },
  {
    id: 3,
    nome: "ReciclaMarket",
    desconto: "Ofertas especiais para recicladores",
    endereco: "Rua do Meio, 789",
    telefone: "(31) 3456-7890",
    horario: "10h às 19h",
    site: "https://reciclamarket.com",
    cidade: "Belo Horizonte",
    favorito: false,
    comentarios: [{ id: 3, texto: "Super recomendo!" }],
  },
];

export default function MercadosParceiros() {
  const [mercados, setMercados] = useState(mercadosData);
  const [filtroCidade, setFiltroCidade] = useState("");
  
  // Marcar/Desmarcar favorito
  const toggleFavorito = (id) => {
    setMercados((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, favorito: !m.favorito } : m
      )
    );
  };

  // Filtrar por cidade
  const filtrados = mercados.filter((m) =>
    m.cidade.toLowerCase().includes(filtroCidade.toLowerCase())
  );

  return (
  <section className="mercados-container">
    <h2>Mercados Parceiros</h2>

    <input
      type="text"
      placeholder="Filtrar por cidade"
      value={filtroCidade}
      onChange={(e) => setFiltroCidade(e.target.value)}
      aria-label="Filtro por cidade"
      className="mercados-filtro"
    />

    {filtrados.length === 0 ? (
      <p>Nenhum mercado encontrado para essa cidade.</p>
    ) : (
      <ul className="mercados-lista">
        {filtrados.map((m) => (
          <li key={m.id} className="mercado-item">
            <div className="mercado-header">
              <h3 className="mercado-nome">
                {m.nome}
              </h3>
              <button
                onClick={() => toggleFavorito(m.id)}
                aria-label={m.favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                className={`favorito-btn ${m.favorito ? "active" : ""}`}
              >
                ★
              </button>
            </div>
            <div className="mercado-info">
              <p><strong>Desconto:</strong> {m.desconto}</p>
              <p><strong>Endereço:</strong> {m.endereco}</p>
              <p><strong>Telefone:</strong> {m.telefone}</p>
              <p><strong>Horário:</strong> {m.horario}</p>
              <p>
                <strong>Site:</strong>{" "}
                <a href={m.site} target="_blank" rel="noopener noreferrer">
                  {m.site}
                </a>
              </p>
              <p><strong>Cidade:</strong> {m.cidade}</p>
            </div>

            <div>
              <strong>Comentários:</strong>
              {m.comentarios.length === 0 ? (
                <p>Nenhum comentário ainda.</p>
              ) : (
                <ul className="comentarios-lista">
                  {m.comentarios.map((c) => (
                    <li key={c.id}>"{c.texto}"</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    )}
  </section>
);

}
