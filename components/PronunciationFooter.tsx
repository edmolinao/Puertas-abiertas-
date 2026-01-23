
import React, { useMemo } from 'react';

interface PronunciationFooterProps {
  allTips: string[][];
  currentIndex: number;
}

const PronunciationFooter: React.FC<PronunciationFooterProps> = ({ allTips, currentIndex }) => {
  // Acumular todos los tips únicos vistos hasta ahora
  const discoveredTips = useMemo(() => {
    const seen = new Set<string>();
    const result: string[] = [];
    for (let i = 0; i <= currentIndex; i++) {
      (allTips[i] || []).forEach(tip => {
        if (!seen.has(tip)) {
          seen.add(tip);
          result.push(tip);
        }
      });
    }
    return result;
  }, [allTips, currentIndex]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-2 md:p-3 z-50 border-t-4 border-yellow-400 max-h-32 overflow-y-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-4">
        <div className="bg-red-600 text-white font-bold px-3 py-1 rounded text-[10px] uppercase tracking-widest whitespace-nowrap animate-pulse">
          Guía de Sonidos
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center md:justify-start">
          {discoveredTips.length > 0 ? (
            discoveredTips.map((tip, idx) => (
              <span key={idx} className="text-xs font-bold bg-gray-800 px-2 py-0.5 rounded border border-gray-700">
                {tip}
              </span>
            ))
          ) : (
            <span className="text-xs opacity-60 italic">Comienza a explorar para descubrir sonidos...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PronunciationFooter;
