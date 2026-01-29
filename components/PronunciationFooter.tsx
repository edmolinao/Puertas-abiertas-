
import React, { useMemo } from 'react';

interface PronunciationFooterProps {
  allTips: string[][];
  currentIndex: number;
}

const PronunciationFooter: React.FC<PronunciationFooterProps> = ({ allTips, currentIndex }) => {
  // Lógica: Mostrar solo los sonidos de la diapositiva actual que NO han aparecido antes.
  const newlyDiscoveredTips = useMemo(() => {
    const seenTipsInPreviousSlides = new Set<string>();
    
    // Recopilar todos los sonidos de las diapositivas anteriores
    for (let i = 0; i < currentIndex; i++) {
      (allTips[i] || []).forEach(tip => {
        seenTipsInPreviousSlides.add(tip);
      });
    }

    // Filtrar los sonidos de la diapositiva actual para dejar solo los nuevos
    const currentSlideTips = allTips[currentIndex] || [];
    return currentSlideTips.filter(tip => !seenTipsInPreviousSlides.has(tip));
  }, [allTips, currentIndex]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-2 md:p-3 z-50 border-t-4 border-yellow-400 max-h-32 overflow-y-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-4">
        <div className="bg-red-600 text-white font-bold px-3 py-1 rounded text-[10px] uppercase tracking-widest whitespace-nowrap">
          Nuevos Sonidos
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center md:justify-start">
          {newlyDiscoveredTips.length > 0 ? (
            newlyDiscoveredTips.map((tip, idx) => (
              <span key={idx} className="text-xs font-bold bg-gray-800 px-2 py-0.5 rounded border border-gray-700 animate-fadeIn">
                {tip}
              </span>
            ))
          ) : (
            <span className="text-xs opacity-60 italic">Repasando sonidos conocidos...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PronunciationFooter;
