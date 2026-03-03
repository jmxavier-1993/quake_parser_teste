import re
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src.models import Game


        
class QuakeParser:
    def __init__(self, file_path):
        self.file_path = file_path
        self.games = []
        self.current_game = None

    def parse(self):
        """Função principal que percorre o arquivo"""
        try:
            with open(self.file_path, 'r', encoding='utf-8') as file:
                for line in file:
                    self._process_line(line)
            return self.games
        except FileNotFoundError:
            print(f"Erro: O arquivo {self.file_path} não foi encontrado.")
            return []

    def _process_line(self, line):
        """Identifica o tipo de linha e chama o método correto"""
        if "InitGame" in line:
            self._handle_new_game()
        elif "ClientUserinfoChanged" in line:
            self._handle_player_info(line)
        elif "Kill:" in line:
            self._handle_kill(line)
    def _handle_new_game(self):
        """Cria uma nova partida e adiciona à lista de jogos"""
        game_id = len(self.games) + 1
        self.current_game = Game(game_id)
        self.games.append(self.current_game)

    def _handle_player_info(self, line):
        """Extrai o nome do jogador usando Regex"""
        if not self.current_game:
            return

        # Regex: Procura por n\, captura tudo até a próxima \
        match = re.search(r'n\\([^\\]+)', line)
        if match:
            player_name = match.group(1)
            self.current_game.players.add(player_name)
            
            # Inicializa o score do jogador com 0 se ele for novo na partida
            if player_name not in self.current_game.kills:
                self.current_game.kills[player_name] = 0    
    def _handle_kill(self, line):
        """Processa as mortes e aplica as regras de pontuação"""
        if not self.current_game:
            return

        self.current_game.total_kills += 1

        # Regex para capturar: Assassino 'killed' Vítima 'by' Causa
        # Ex: "Isgalamido killed Mocinha by MOD_ROCKET"
        kill_pattern = r'Kill: \d+ \d+ \d+: (.*) killed (.*) by (.*)'
        match = re.search(kill_pattern, line)

        if match:
            killer = match.group(1).strip()
            victim = match.group(2).strip()
            means = match.group(3).strip()

            # 1. Contabilizar Meio de Morte
            self.current_game.kill_by_means[means] = self.current_game.kill_by_means.get(means, 0) + 1

            # 2. Regra do <world> vs Player
            if killer == "<world>":
                # Vítima perde 1 ponto (mínimo 0 ou negativo conforme o desafio, 
                # geralmente permite-se ficar negativo no Quake)
                if victim in self.current_game.kills:
                    self.current_game.kills[victim] -= 1
            elif killer != victim:
                # Player ganha 1 ponto (se não for suicídio)
                self.current_game.kills[killer] = self.current_game.kills.get(killer, 0) + 1                        