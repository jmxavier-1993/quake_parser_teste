# Quake Log Parser API 🎮

Este projeto foi desenvolvido para analisar arquivos de log do jogo **Quake 3 Arena**, processando dados não estruturados para extrair estatísticas detalhadas de partidas. A solução disponibiliza essas informações através de uma **API REST** construída com Flask.

Como graduada em **Análise e Desenvolvimento de Sistemas** e com experiência sólida em análise de dados e planejamento operacional, desenvolvi esta ferramenta focando em eficiência de processamento, modularidade e clareza na entrega da informação.

### 🎯 Objetivo do Projeto

O sistema identifica cada partida no log e consolida:
* **Total de mortes** por partida.
* **Lista de jogadores** (únicos por partida).
* **Ranking de mortes** por jogador (com ordenação decrescente).
* **Relatório de Meios de Morte** (causas como `MOD_ROCKET`, `MOD_FALLING`, etc.).
* **Ranking Global Consolidado** (soma da performance acumulada de todos os jogos).

### 🛠️ Como a Solução Funciona

A arquitetura foi dividida em camadas seguindo boas práticas de desenvolvimento backend:

1. **Ingestão de Dados (Parser):** O arquivo `games.log` é lido de forma iterativa, otimizando o uso de memória.
2. **Lógica de Negócio (Models):** Implementação das regras de pontuação:
   - Atribuição de pontos para o assassino.
   - **Regra do `<world>`:** Quando o ambiente causa a morte, a vítima perde 1 ponto.
   - Extração de nomes de jogadores via **Regex** (Expressões Regulares).
3. **Persistência:** O script `main.py` atua como um processo de ETL, gerando um arquivo `output.json` estruturado na pasta `data/`.
4. **Camada de Entrega (API):** O Flask serve os dados processados para consumo externo via endpoints HTTP.

### 📁 Estrutura do Projeto

quake_parser/
├── src/
│   ├── models.py      # Definição da classe Game e lógica de pontuação
│   ├── parser.py      # Motor de processamento do log e Regex
│   └── __init__.py    # Identificador de pacote Python
├── data/
│   ├── games.log      # Arquivo de log original (entrada)
│   └── output.json    # Dados processados (saída)
├── main.py            # Script principal para processamento (ETL)
├── app.py             # Servidor da API Flask
└── README.md


### 🚀 Setup e Execução

**1. Instalar dependências:**


pip install flask

**2. Processar o log (Gerar JSON):**

python main.py

**3. Iniciar a API:**

python app.py

### 🔗 Rotas Disponíveis


GET / : Interface inicial com formulário de busca e menu de navegação.

GET /games : Retorna o resumo completo de todas as partidas processadas.

GET /buscar?game_id=<id> : Busca detalhes de uma partida específica por ID.

GET /ranking : Retorna o Resumo Global, com o ranking de jogadores ordenado por pontuação acumulada.

**Desenvolvido por Juliana Xavier
Analista de Sistemas com expertise em Python, SQL e Engenharia de Dados.**