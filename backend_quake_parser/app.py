from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app) # Permite o acesso do frontend React
app.json.sort_keys = False
DATA_PATH = os.path.join("data", "output.json")

def load_data():
    if not os.path.exists(DATA_PATH):
        return None
    with open(DATA_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

@app.route('/api/games')
def get_all():
    data = load_data()
    if not data:
        return jsonify([])
    
    # Transforma o dicionário em lista e injeta o game_id conforme o schema jogo.json
    games_list = []
    for game_id, details in data.items():
        game_entry = {
            "id": game_id,
            "game_id": game_id,
            "total_kills": details.get('total_kills', 0),
            "players": details.get('players', []),
            "kills": details.get('kills', {}),
            "kill_by_means": details.get('kill_by_means', {}) # Nome conforme o front
            
        }
        games_list.append(game_entry)
    return jsonify(games_list)

@app.route('/api/ranking', methods=['GET'])
def get_global_ranking():
    data = load_data()
    if not data:
        return jsonify({"ranking": []})
    
    global_rank = {}
    for game_data in data.values():
        kills = game_data.get('kills', {})
        for player, score in kills.items():
            if player != "<world>":
                global_rank[player] = global_rank.get(player, 0) + score
            
    # Retorna o ranking ordenado
    sorted_rank = sorted(global_rank.items(), key=lambda item: item[1], reverse=True)
    return jsonify({"ranking": sorted_rank})

if __name__ == "__main__":
    app.run(debug=True, port=5000)