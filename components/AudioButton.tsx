
import React, { useState } from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { geminiService } from '../geminiService';

interface AudioButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
}

const AudioButton: React.FC<AudioButtonProps> = ({ text, size = 'md' }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading) return;
    setLoading(true);
    await geminiService.speak(text);
    setLoading(false);
  };

  const sizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`bg-yellow-400 hover:bg-yellow-500 text-black rounded-full shadow-md transition-all active:scale-95 flex items-center justify-center ${sizeClasses[size]} disabled:opacity-50`}
      title="Escuchar pronunciación"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
    </button>
  );
};

export default AudioButton;
