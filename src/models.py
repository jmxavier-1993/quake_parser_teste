class Game:
    def __init__(self, game_id):
        self.game_id = game_id
        self.total_kills = 0
        self.players = set()  # Set evita nomes duplicados
        self.kills = {}       # Dicionário { "Nome": total_de_kills }
        self.kill_by_means = {} # Dicionário { "MOD_...": quantidade }

    def to_dict(self):
        """Retorna o formato solicitado pelo desafio"""
        return {
            f"game_{self.game_id}": {
                "total_kills": self.total_kills,
                "players": list(self.players),
                "kills": self.kills,
                "kill_by_means": self.kill_by_means
            }
        }