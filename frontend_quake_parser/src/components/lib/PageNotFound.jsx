import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-purple-500" />
        </div>
        <h1 className="text-4xl font-black text-white mb-2 italic">404</h1>
        <p className="text-slate-400 mb-8">Oops! A página que você procura não existe.</p>
        <Link to="/">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
            <Home className="w-4 h-4" /> Voltar para o Dashboard
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}