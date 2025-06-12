# EcoPoints 🌿

## Visão Geral

EcoPoints é uma aplicação web focada em incentivar a reciclagem e o consumo sustentável. Usuários podem registrar materiais recicláveis entregues, acumular pontos, definir metas pessoais de reciclagem e descobrir mercados parceiros que aceitam materiais recicláveis. Tudo isso com uma interface amigável, responsiva e suporte a tema claro e escuro.

---

## Funcionalidades

- **Cadastro e Login:** Sistema simples para criar e acessar contas usando LocalStorage.
- **Registro de Recicláveis:** Entrada rápida e prática dos tipos e quantidades de materiais entregues.
- **Histórico Detalhado:** Lista de entregas com filtros, datas e status.
- **Sistema de Pontos:** Pontos acumulados automaticamente com base no tipo e quantidade de recicláveis entregues.
- **Metas Pessoais:** Criação e acompanhamento de metas com barra de progresso visual.
- **Mercados Parceiros:** Lista de estabelecimentos que aceitam recicláveis, com avaliações, comentários e possibilidade de favoritar.
- **Modo Escuro:** Alternância entre tema claro e escuro para melhor usabilidade.
- **Responsividade:** Layout adaptável para celulares, tablets e desktops.

---

## Tecnologias Utilizadas

- **HTML5 & CSS3:** Estrutura e estilização, com uso de Flexbox e CSS Grid para layout responsivo.
- **JavaScript (ES6+):** Lógica do aplicativo, manipulação DOM, eventos e persistência de dados.
- **LocalStorage:** Armazenamento local dos dados do usuário para manter histórico e preferências sem backend.
- **Fonts & Ícones:** Fontes do Google Fonts (Ex: Inter, Segoe UI) e ícones SVG para botões e estrelas de avaliação.

---

## Instalação e Uso

### Requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari) com suporte a LocalStorage.
- Conexão à internet para carregar fontes e ícones externos.


### Cadastro e Login
- Cadastre um usuário com email e senha.
- Faça login para acessar o painel de controle.

### Registro de Recicláveis
- Preencha o formulário para registrar tipos e quantidades de recicláveis.
- Os pontos são calculados automaticamente.

### Histórico
- Visualize as entregas realizadas com status e datas.
- Use filtros para facilitar a busca.

### Metas Pessoais
- Crie metas com nome e quantidade alvo.
- Acompanhe o progresso com barras visuais.

### Mercados Parceiros
- Navegue pelos mercados parceiros.
- Favorite seus preferidos.
- Leia e adicione comentários.

### Tema
- Use o botão de alternância para mudar entre tema claro e escuro.

---

## Roadmap (Funcionalidades Futuras)
- Integração com backend para autenticação segura e dados persistentes.
- Sistema de notificações e lembretes para metas.
- Gamificação: badges, níveis e recompensas.
- Mapa interativo dos mercados parceiros.
- Suporte multi-idioma.

---

## Como Rodar o Projeto

Siga os passos abaixo para rodar o EcoPoints localmente na sua máquina.

### Pré-requisitos

- Ter o [Node.js](https://nodejs.org/) instalado (versão 14 ou superior recomendada)
- Um gerenciador de pacotes como [npm](https://www.npmjs.com/) (já vem com o Node.js) ou [yarn](https://yarnpkg.com/)
## Como Rodar o Projeto

Siga os passos abaixo para rodar o EcoPoints localmente na sua máquina.

### Pré-requisitos

- Ter o [Node.js](https://nodejs.org/) instalado (versão 14 ou superior recomendada)
- Um gerenciador de pacotes como [npm](https://www.npmjs.com/) (já vem com o Node.js) ou [yarn](https://yarnpkg.com/)

### Passos para rodar

```bash
# Clone o repositório e acesse a pasta do projeto
git clone https://github.com/seu-usuario/ecopoints.git
cd ecopoints

# Instale as dependências
npm install
# ou, se usar yarn:
# yarn install

# Inicie o servidor de desenvolvimento
npm start
# ou, com yarn:
# yarn start

