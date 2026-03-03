import React, { useState, useMemo } from 'react';
// Removido: import { base44 } from '@/api/base44Client'; 
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gamepad2, Trophy, Skull, Users, Search, Loader2, Zap } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import GameCard from '@/components/games/GameCard';
import GameDetails from '@/components/games/GameDetails';
import RankingTable from '@/components/ranking/RankingTable';

export default function Home() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('games');

  // AJUSTE AQUI: Agora consome sua API Flask via fetch
  const { data: games = [], isLoading } = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const response = await fetch('/api/games');
      if (!response.ok) {
        throw new Error('Erro ao carregar dados do servidor Flask');
      }
      return response.json();
    },
  });

  // Calculate global stats (Mantido para processar a lista que vem do Flask)
  const stats = useMemo(() => {
    const totalKills = games.reduce((sum, g) => sum + (g.total_kills || 0), 0);
    const allPlayers = new Set(games.flatMap(g => g.players || []));
    const globalRanking = {};

    games.forEach(game => {
      if (game.kills) {
        Object.entries(game.kills).forEach(([player, kills]) => {
          globalRanking[player] = (globalRanking[player] || 0) + kills;
        });
      }
    });

    const sortedRanking = Object.entries(globalRanking).sort(([, a], [, b]) => b - a);

    return {
      totalGames: games.length,
      totalKills,
      totalPlayers: allPlayers.size,
      globalRanking: sortedRanking,
    };
  }, [games]);

  // Filter games (Busca local nos dados carregados)
  const filteredGames = useMemo(() => {
    if (!searchTerm) return games;
    const term = searchTerm.toLowerCase();
    return games.filter(game =>
      game.game_id?.toLowerCase().includes(term) ||
      game.players?.some(p => p.toLowerCase().includes(term))
    );
  }, [games, searchTerm]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Efeitos de Fundo */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent italic">
              Quake Parser
            </h1>
          </div>
          <p className="text-slate-400 text-lg">Dashboards de Logs • Juliana Xavier</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatsCard title="Partidas" value={stats.totalGames} icon={Gamepad2} gradient="bg-gradient-to-br from-purple-600 to-purple-800" />
          <StatsCard title="Total Kills" value={stats.totalKills} icon={Skull} gradient="bg-gradient-to-br from-red-600 to-pink-700" />
          <StatsCard title="Jogadores" value={stats.totalPlayers} icon={Users} gradient="bg-gradient-to-br from-blue-600 to-cyan-700" />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-md mx-auto bg-slate-800/50 border border-slate-700/50 p-1 mb-6">
            <TabsTrigger value="games" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600">
              <Gamepad2 className="w-4 h-4 mr-2" /> Partidas
            </TabsTrigger>
            <TabsTrigger value="ranking" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500">
              <Trophy className="w-4 h-4 mr-2" /> Ranking Global
            </TabsTrigger>
          </TabsList>

          <TabsContent value="games">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <Input
                placeholder="Buscar por partida ou jogador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-slate-800/50 border-slate-700 text-white rounded-xl focus:ring-purple-500/20"
              />
            </div>

            <div className="space-y-3">
              {filteredGames.length === 0 ? (
                <div className="text-center py-12 text-slate-500 italic">Nenhuma partida encontrada</div>
              ) : (
                filteredGames.map((game, idx) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    index={idx}
                    onClick={() => {
                      console.log("DADOS DO JOGO SELECIONADO:", game); 
                      setSelectedGame(game);
                    }}
                  />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="ranking">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 glass">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-amber-400" />
                <h2 className="text-xl font-bold text-white tracking-tight">Ranking Global de Jogadores</h2>
              </div>
              <RankingTable players={stats.globalRanking} />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {selectedGame && (
        <GameDetails game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </div>
  );
}