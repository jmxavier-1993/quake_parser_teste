import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';

export default function RankingTable({ players }) {
  return (
    <div className="space-y-3">
      {players.map(([player, kills], idx) => (
        <motion.div
          key={player}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className={`relative overflow-hidden rounded-xl p-4 ${
            idx === 0 ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30' :
            idx === 1 ? 'bg-gradient-to-r from-slate-400/20 to-slate-500/20 border border-slate-400/30' :
            idx === 2 ? 'bg-gradient-to-r from-amber-700/20 to-amber-800/20 border border-amber-600/30' :
            'bg-slate-800/50 border border-slate-700/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                idx === 0 ? 'bg-gradient-to-br from-amber-400 to-orange-500' :
                idx === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400' :
                idx === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700' :
                'bg-slate-700'
              }`}>
                {idx === 0 ? <Trophy className="w-6 h-6 text-white" /> :
                 idx === 1 ? <Medal className="w-6 h-6 text-slate-800" /> :
                 idx === 2 ? <Award className="w-6 h-6 text-white" /> :
                 <span className="text-lg font-bold text-slate-400">{idx + 1}</span>
                }
              </div>
              <div>
                <p className="text-lg font-bold text-white">{player}</p>
                <p className="text-sm text-slate-400">
                  {idx === 0 ? '👑 Campeão' : 
                   idx === 1 ? '🥈 Vice-campeão' :
                   idx === 2 ? '🥉 3º Lugar' :
                   `#${idx + 1} no ranking`}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {kills}
              </p>
              <p className="text-xs text-slate-500 uppercase tracking-wider">kills totais</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}