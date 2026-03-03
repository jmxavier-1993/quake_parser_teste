from src.parser import QuakeParser
import json
import os

def run():
    
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    log_path = os.path.join(BASE_DIR, "data", "games.log")
    # 1. Instancia o parser com o caminho do log
    parser = QuakeParser(log_path)
    games_list = parser.parse()

    # 2.Converte os objetos Game para o formato de dicionário final
    output = {}
    for game in games_list:
        output.update(game.to_dict())
    # 3. Define onde salvar (na raiz do projeto)
    output_path = os.path.join(BASE_DIR, "data", "output.json")

    # 4. Salva o arquivo fisicamente
    try:
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(output, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Sucesso! O relatório foi gerado em: {os.path.abspath(output_path)}")
        
    except Exception as e:
        print(f"❌ Erro ao salvar o arquivo: {e}")

if __name__ == "__main__":
    run()