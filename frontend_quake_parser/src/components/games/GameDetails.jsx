import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Users, Skull, Trophy, Zap } from 'lucide-react';

const MEANS_COLORS = {
  MOD_ROCKET: 'bg-red-500/20 text-red-400 border-red-500/30',
  MOD_RAILGUN: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  MOD_SHOTGUN: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  MOD_MACHINEGUN: 'bg-green-500/20 text-green-400 border-green-500/30',
  MOD_FALLING: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  MOD_TRIGGER_HURT: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  MOD_ROCKET_SPLASH: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  MOD_TELEFRAG: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  MOD_BFG: 'bg-lime-500/20 text-lime-400 border-lime-500/30',
  MOD_BFG_SPLASH: 'bg-lime-600/20 text-lime-500 border-lime-600/30',
  MOD_CRUSH: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
};

export default function GameDetails({ game, onClose }) {
  if (!game) return null;

  const sortedKills = game.kills 
    ? Object.entries(game.kills).sort(([,a], [,b]) => b - a)
    : [];

  const sortedMeans = game.kill_by_means
    ? Object.entries(game.kill_by_means).sort(([,a], [,b]) => b - a)
    : [];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        >
          <Card className="bg-slate-900/95 border-slate-700 shadow-2xl">
            <CardHeader className="border-b border-slate-700/50 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white capitalize">
                      {game.game_id?.replace('_', ' ')}
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-1 text-slate-400">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" /> {game.players?.length || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Skull className="w-4 h-4" /> {game.total_kills || 0}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-slate-400 hover:text-white hover:bg-slate-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Players Ranking */}
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  Ranking de Jogadores
                </h3>
                <div className="space-y-2">
                  {sortedKills.map(([player, kills], idx) => (
                    <motion.div
                      key={player}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          idx === 0 ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' :
                          idx === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-slate-800' :
                          idx === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' :
                          'bg-slate-700 text-slate-400'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="text-white font-medium">{player}</span>
                      </div>
                      <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                        {kills} kills
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Kills by Means */}
              {sortedMeans.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Skull className="w-4 h-4 text-red-400" />
                    Meios de Morte
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {sortedMeans.map(([mean, count]) => (
                      <Badge 
                        key={mean}
                        variant="outline"
                        className={MEANS_COLORS[mean] || 'bg-slate-500/20 text-slate-400 border-slate-500/30'}
                      >
                        {mean.replace('MOD_', '')} ({count})
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Players List */}
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  Jogadores
                </h3>
                <div className="flex flex-wrap gap-2">
                  {game.players?.map((player) => (
                    <Badge key={player} className="bg-slate-700/50 text-slate-300 border-slate-600">
                      {player}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}