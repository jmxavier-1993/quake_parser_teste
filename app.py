from flask import Flask, jsonify, request
import json
import os

app = Flask(__name__)
DATA_PATH = os.path.join("data", "output.json")

def load_data():
    if not os.path.exists(DATA_PATH):
        return None
    with open(DATA_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

@app.route('/')
def menu():
    """Menu Inicial com formulário (Inspirado na Raissa)"""
    return '''
        <h2>Quake Parser API - Juliana Xavier</h2>
        <p>Utilize as opções abaixo para consultar os dados das partidas:</p>
        <form action="/buscar" method="get">
            <label>Digite o ID do jogo (ex: 1):</label>
            <input type="number" name="game_id" required>
            <button type="submit">Buscar Partida</button>
        </form>
        <br>
        <a href="/games"><button>Ver Todos os Jogos</button></a>
        <a href="/ranking"><button>Ver Ranking Global</button></a>
    '''

@app.route('/buscar')
def buscar():
    """Rota de busca por parâmetro ?game_id="""
    game_id = request.args.get("game_id")
    data = load_data()
    
    if not data or not game_id:
        return jsonify({"erro": "Dados ou ID não fornecidos"}), 400

    game_key = f"game_{game_id}"
    if game_key in data:
        return jsonify(data[game_key])
    
    return jsonify({"erro": "Game não encontrado"}), 404

@app.route('/games')
def get_all():
    data = load_data()
    return jsonify(data) if data else (jsonify({"error": "Rode o main.py primeiro"}), 404)

@app.route('/ranking', methods=['GET'])
def get_global_ranking():
    """Consolida todos os jogos e traz o ranking por pontuação do jogador"""
    data = load_data()
    if not data:
        return jsonify({"erro": "Dados não encontrados"}), 404
    
    global_rank = {}
    for game_data in data.values():
        # game_data aqui é o conteúdo interno de cada game_x
        for player, score in game_data['kills'].items():
            # Filtra para não incluir o <world> no ranking de jogadores, se desejar
            if player != "<world>":
                global_rank[player] = global_rank.get(player, 0) + score
            
    # ORDENAÇÃO: Aqui trazemos o resumo global por pontuação do jogador
    sorted_rank = dict(sorted(global_rank.items(), key=lambda item: item[1], reverse=True))
    
    return jsonify({
        "titulo": "Ranking Global de Jogadores",
        "ranking": sorted_rank
    })

if __name__ == "__main__":
    app.run(debug=True)