import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Skull, Crosshair, ChevronRight } from 'lucide-react';

export default function GameCard({ game, onClick, index }) {
  const topPlayer = game.kills 
    ? Object.entries(game.kills).sort(([,a], [,b]) => b - a)[0] 
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
    >
      <Card 
        onClick={onClick}
        className="bg-slate-800/50 border-slate-700/50 hover:border-purple-500/50 hover:bg-slate-800/80 cursor-pointer transition-all duration-300 backdrop-blur-sm overflow-hidden group"
      >
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Crosshair className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white capitalize">
                  {game.game_id?.replace('_', ' ')}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{game.players?.length || 0} jogadores</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-red-400">
                    <Skull className="w-4 h-4" />
                    <span className="text-sm">{game.total_kills || 0} kills</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {topPlayer && (
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Top Player</p>
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 mt-1">
                    {topPlayer[0]} ({topPlayer[1]} kills)
                  </Badge>
                </div>
              )}
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 transition-colors" />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}