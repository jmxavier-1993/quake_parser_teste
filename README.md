🎮 Quake Log Parser - Dashboard Neon
Este projeto é um ecossistema completo para análise de logs do jogo Quake 3 Arena. Ele consiste em um Parser em Python que processa arquivos de log brutos, uma API Flask para servir esses dados e um Frontend moderno em React para visualização.

🚀 Tecnologias Utilizadas
Backend
Python: Lógica principal de processamento de strings e regex para os logs.

Flask: API REST para fornecer os dados processados ao frontend.

Flask-CORS: Gerenciamento de permissões para comunicação entre domínios.

Frontend
React + Vite: Estrutura de SPA rápida e otimizada.

Tailwind CSS: Estilização neon e responsiva.

TanStack Query (React Query): Gerenciamento de estado e cache das requisições de API.

Lucide React: Biblioteca de ícones vetoriais.

🛠️ Como Executar o Projeto
1. Preparando o Backend (Python)
Certifique-se de estar na pasta raiz do projeto.

Bash
# Instale as dependências
pip install flask flask-cors

# Execute o parser para gerar o output.json (se necessário)
python main.py

# Inicie a API Flask
python app.py
O servidor Flask iniciará em http://127.0.0.1:5000.

2. Preparando o Frontend (React)
Navegue até a pasta frontend_quake_parser.

Bash
# Instale as dependências do Node
npm install

# Inicie o servidor de desenvolvimento
npm run dev
O Dashboard estará disponível em http://localhost:5173.

📊 Endpoints da API
GET /api/games: Retorna a lista completa de partidas processadas.

GET /api/ranking: Retorna o ranking global consolidado de todos os jogadores.

📁 Estrutura de Pastas (Frontend)
A estrutura foi otimizada para ser independente de plataformas externas:

src/components/pages: Contém o Dashboard principal (Home.jsx).

src/components/ui: Componentes de interface baseados em Shadcn (Tabs, Cards, etc.).

src/components/lib: Lógica de configuração do query-client e utilitários.

src/components/utils: Função centralizada cn para manipulação de classes CSS.

👩‍💻 Desenvolvido por
Juliana Xavier (Ju)

Especialista em Análise e Desenvolvimento de Sistemas.

Mais de 5 anos de experiência em análise de dados e planejamento operacional.

## 📺 Demonstração do Dashboard

![Demonstração do Quake Parser](assets/quaker_parser.gif)