class Game:
    def __init__(self, game_id):
        self.game_id = game_id
        self.total_kills = 0
        self.players = set()  # Set evita nomes duplicados
        self.kills = {}       # Dicionário { "Nome": total_de_kills }
        self.kill_by_means = {} # Dicionário { "MOD_...": quantidade }

    def to_dict(self):
        # Ordena o dicionário de kills pelo valor (pontuação) de forma decrescente
        sorted_kills = dict(sorted(self.kills.items(), key=lambda item: item[1], reverse=True))
        """Retorna o formato solicitado pelo desafio"""
        return {
            f"game_{self.game_id}": {
                "total_kills": self.total_kills,
                "players": list(self.players),
                "kills": sorted_kills,
                "kill_by_means": self.kill_by_means
            }
        }