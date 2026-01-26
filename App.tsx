
import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Home, Globe, RefreshCcw, Lightbulb } from 'lucide-react';
import { SLIDES } from './constants';
import { Gender, Noun } from './types';
import AudioButton from './components/AudioButton';
import PronunciationFooter from './components/PronunciationFooter';
import { geminiService } from './geminiService';

const CORRECT_MEMES = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7abKhOpuMcmLjDC8/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l0MYt5jPR6QX5pnqM/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/26gsjCZpPolPr3sBy/giphy.gif"
];

const INCORRECT_MEMES = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKVUn7iM8FMEU24/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/d2lcHJTGfCmefmUM/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/OPU6wUKARAySA/giphy.gif"
];

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [answeredGender, setAnsweredGender] = useState<Gender | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentSlide = SLIDES[currentSlideIndex];

  const nextSlide = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      // Reset quiz state when moving between slides
      setQuizIndex(0);
      setAnsweredGender(null);
      setExplanation(null);
      setQuizScore(0);
      setQuizFinished(false);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      setQuizIndex(0);
      setAnsweredGender(null);
      setExplanation(null);
      setQuizScore(0);
      setQuizFinished(false);
    }
  };

  const goToHome = () => {
    setCurrentSlideIndex(0);
    setQuizIndex(0);
    setAnsweredGender(null);
    setExplanation(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  const allTips = SLIDES.map(s => s.pronunciationTips || []);

  const handleAnswer = (gender: Gender) => {
    if (answeredGender || !currentSlide.nouns) return;
    const currentNoun = currentSlide.nouns[quizIndex];
    setAnsweredGender(gender);
    if (gender === currentNoun.gender) {
      setQuizScore(prev => prev + 1);
    }
  };

  const getExplanation = async () => {
    if (!currentSlide.nouns || isExplaining) return;
    const noun = currentSlide.nouns[quizIndex];
    setIsExplaining(true);
    try {
      const ai = new (window as any).GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Explica brevemente en alemán y español por qué "${noun.word}" es "${noun.gender}". Usa un tono divertido.`,
      });
      setExplanation(response.text);
    } catch (e) {
      setExplanation("Man muss es auswendig lernen! (¡Hay que aprenderlo de memoria!)");
    } finally {
      setIsExplaining(false);
    }
  };

  const nextQuizNoun = () => {
    if (!currentSlide.nouns) return;
    if (quizIndex + 1 < currentSlide.nouns.length) {
      setQuizIndex(prev => prev + 1);
      setAnsweredGender(null);
      setExplanation(null);
    } else {
      setQuizFinished(true);
    }
  };

  const currentMeme = useMemo(() => {
    if (!answeredGender || !currentSlide.nouns) return "";
    const isCorrect = answeredGender === currentSlide.nouns[quizIndex].gender;
    const memes = isCorrect ? CORRECT_MEMES : INCORRECT_MEMES;
    return memes[Math.floor(Math.random() * memes.length)];
  }, [answeredGender, quizIndex]);

  const renderLayout = () => {
    switch (currentSlide.layout) {
      case 'intro':
        return (
          <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn">
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-red-500 rounded-full opacity-20"></div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight">
                {currentSlide.title}
              </h1>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-red-600">
              {currentSlide.subtitle}
            </p>
            <p className="max-w-2xl text-lg text-gray-600 leading-relaxed">
              {currentSlide.content}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {currentSlide.phrases?.map((p, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border-2 border-transparent hover:border-yellow-400 transition-all">
                  <div className="text-left">
                    <p className="text-2xl font-black text-gray-800">{p.german}</p>
                    <p className="text-sm text-gray-500">{p.spanish}</p>
                  </div>
                  <AudioButton text={p.german} size="lg" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'grid':
        return (
          <div className="w-full space-y-8 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-4xl font-black text-gray-900">{currentSlide.title}</h2>
              <p className="text-xl text-red-600 font-bold">{currentSlide.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentSlide.phrases?.map((p, i) => (
                <div key={i} className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 transform transition hover:-translate-y-2 hover:shadow-2xl">
                  {p.image && <img src={p.image} alt={p.german} className="w-full h-48 object-cover" />}
                  <div className="p-6 flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{p.german}</h3>
                      <p className="text-gray-500 italic">{p.spanish}</p>
                    </div>
                    <AudioButton text={p.german} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'dialogue':
        return (
          <div className="w-full max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-4xl font-black text-gray-900">{currentSlide.title}</h2>
              <p className="text-xl text-red-600 font-bold">{currentSlide.subtitle}</p>
            </div>
            <div className="bg-gray-100 p-4 md:p-8 rounded-[2rem] shadow-inner space-y-6">
              {currentSlide.phrases?.map((p, i) => (
                <div 
                  key={i} 
                  className={`flex items-center gap-4 p-4 rounded-3xl bg-white shadow-md transition-all hover:shadow-lg ${i % 2 === 0 ? 'ml-0 mr-8 md:mr-16' : 'ml-8 md:ml-16 mr-0 flex-row-reverse'}`}
                >
                  <div className={`flex-1 flex items-center gap-4 ${i % 2 !== 0 ? 'flex-row-reverse text-right' : 'text-left'}`}>
                    {p.image && <img src={p.image} className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-4 border-yellow-400 flex-shrink-0" alt="avatar" />}
                    <div className="min-w-0">
                      <p className="text-xl md:text-2xl font-black text-gray-800 leading-tight break-words">{p.german}</p>
                      <p className="text-sm md:text-base text-gray-500 font-medium">{p.spanish}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <AudioButton text={p.german} size="lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'game':
        return (
          <div className="w-full max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center animate-fadeIn">
            <div className="space-y-6 order-2 md:order-1">
              <div className="bg-yellow-400 inline-block px-4 py-1 rounded-full font-bold text-sm uppercase tracking-wider">
                ¡Hora de Jugar!
              </div>
              <h2 className="text-4xl font-black text-gray-900">{currentSlide.game?.name}</h2>
              <p className="text-xl text-gray-700 leading-relaxed border-l-4 border-red-600 pl-4 bg-white p-4 rounded-r-xl shadow-sm">
                {currentSlide.game?.instructions}
              </p>
              {currentSlide.phrases && (
                <div className="grid grid-cols-1 gap-4">
                  {currentSlide.phrases.map((p, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-md border-2 border-gray-50 hover:border-yellow-400 transition-colors">
                       <AudioButton text={p.german} size="md" />
                       <div className="flex items-center gap-4 flex-1">
                         {p.image && <img src={p.image} className="w-12 h-12 rounded-lg object-cover" alt="action" />}
                         <div>
                           <span className="text-2xl font-black text-gray-800">{p.german}</span>
                           {p.spanish && (
                             <div className="text-sm text-gray-500">{p.spanish}</div>
                           )}
                         </div>
                       </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="order-1 md:order-2 flex flex-col items-center">
              <img src={currentSlide.game?.image} alt="Juego" className="rounded-3xl shadow-2xl border-8 border-white transform rotate-2 max-h-[400px] object-cover" />
            </div>
          </div>
        );

      case 'interactive':
        return (
          <div className="w-full space-y-8 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-4xl font-black text-gray-900">{currentSlide.title}</h2>
              <p className="text-xl text-red-600 font-bold">{currentSlide.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {currentSlide.phrases?.map((p, i) => (
                <button 
                  key={i}
                  onClick={() => geminiService.speak(p.german)}
                  className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border-2 border-transparent hover:border-yellow-400 hover:scale-105 transition-all group flex flex-col items-center gap-2 min-w-[160px]"
                >
                  <Globe className="w-8 h-8 text-yellow-500 mb-2 group-hover:animate-bounce" />
                  <span className="text-2xl md:text-3xl font-black text-gray-800 text-center">{p.german}</span>
                  <span className="text-gray-400 font-medium text-center">{p.spanish}</span>
                  <div className="mt-2 text-[10px] font-bold text-red-600 opacity-0 group-hover:opacity-100 uppercase tracking-tighter">Click para oír</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'list':
        return (
          <div className="w-full max-w-2xl mx-auto space-y-8 animate-fadeIn pb-12">
            <div className="text-center">
              <h2 className="text-4xl font-black text-gray-900">{currentSlide.title}</h2>
              <p className="text-xl text-red-600 font-bold">{currentSlide.subtitle}</p>
            </div>
            <div className="flex flex-col gap-3">
              {currentSlide.phrases?.map((p, i) => (
                <div key={i} className="flex items-center justify-between bg-white p-5 rounded-2xl shadow-md border-2 border-gray-50 hover:border-yellow-400 transition-all transform hover:scale-[1.01]">
                   <div className="flex items-center gap-6">
                     <span className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-full font-black text-xl">
                       {p.spanish}
                     </span>
                     <span className="text-3xl font-black text-gray-800">{p.german}</span>
                   </div>
                   <AudioButton text={p.german} size="lg" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'noun-quiz':
        if (quizFinished) {
          return (
            <div className="w-full max-w-2xl mx-auto text-center space-y-8 animate-fadeIn">
              <h2 className="text-5xl font-black text-gray-900">Training beendet!</h2>
              <div className="bg-white p-12 rounded-[3rem] shadow-2xl space-y-6">
                <p className="text-3xl font-bold">Puntaje: {quizScore} / {currentSlide.nouns?.length}</p>
                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmZzR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6NHR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/ddHhhUBn25ARMTn37K/giphy.gif" alt="celebration" className="mx-auto rounded-3xl" />
                <button 
                  onClick={() => { setQuizIndex(0); setQuizScore(0); setQuizFinished(false); }}
                  className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xl hover:bg-black transition-all flex items-center gap-3 mx-auto"
                >
                  <RefreshCcw /> Neu starten
                </button>
              </div>
            </div>
          );
        }

        const currentNoun = currentSlide.nouns?.[quizIndex];
        return (
          <div className="w-full max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-4xl font-black text-gray-900">{currentSlide.title}</h2>
              <p className="text-xl text-red-600 font-bold">{currentSlide.subtitle}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-[3rem] shadow-2xl">
              <div className="space-y-6 text-center">
                <div className="relative inline-block">
                   <img src={currentNoun?.image} className="w-full h-64 object-cover rounded-3xl shadow-lg border-4 border-white" alt={currentNoun?.word} />
                   {answeredGender && (
                     <div className="absolute inset-0 bg-black/40 rounded-3xl flex items-center justify-center">
                       <img src={currentMeme} className="max-h-full max-w-full rounded-2xl" alt="Meme" />
                     </div>
                   )}
                </div>
                <h3 className="text-5xl font-black text-gray-800">
                  {answeredGender && <span className={`mr-2 ${answeredGender === currentNoun?.gender ? 'text-green-600' : 'text-red-600'}`}>{currentNoun?.gender}</span>}
                  {currentNoun?.word}
                </h3>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {(['der', 'die', 'das'] as Gender[]).map(g => (
                    <button 
                      key={g}
                      disabled={!!answeredGender}
                      onClick={() => handleAnswer(g)}
                      className={`py-4 rounded-2xl font-black text-2xl transition-all shadow-md transform hover:scale-105 active:scale-95
                        ${answeredGender === g 
                          ? (g === currentNoun?.gender ? 'bg-green-500 text-white' : 'bg-red-500 text-white') 
                          : (answeredGender ? 'bg-gray-100 opacity-50' : (g === 'der' ? 'bg-blue-600 text-white' : g === 'die' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'))}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>

                {answeredGender && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex gap-2">
                       <button onClick={getExplanation} disabled={isExplaining} className="flex-1 flex items-center justify-center gap-2 bg-indigo-100 text-indigo-700 py-3 rounded-xl font-bold hover:bg-indigo-200 transition-all">
                         <Lightbulb className="w-4 h-4" /> KI-Erklärung
                       </button>
                       <button onClick={nextQuizNoun} className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2">
                         Weiter <ChevronRight className="w-4 h-4" />
                       </button>
                    </div>
                    {explanation && (
                      <div className="p-4 bg-indigo-50 text-indigo-900 rounded-2xl text-sm border border-indigo-100">
                        {explanation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-4 pb-32 px-4 md:px-8 overflow-y-auto relative">
      <div className="fixed top-0 left-0 w-full h-2 bg-gradient-to-r from-black via-red-600 to-yellow-400 z-[100]"></div>
      
      <div className="max-w-6xl mx-auto w-full flex justify-between items-center mb-6 md:mb-10">
        <button onClick={goToHome} className="flex items-center gap-2 font-black text-xl text-gray-900 group">
          <div className="bg-black text-white p-2 rounded-lg group-hover:bg-red-600 transition-colors shadow-lg">
            <Home className="w-5 h-5" />
          </div>
          <span className="hidden sm:inline">Tag der offenen Türen</span>
          <span className="bg-red-600 text-white px-2 py-0.5 rounded text-xs ml-1">FCAB</span>
        </button>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-1">
            {SLIDES.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentSlideIndex(i)}
                className={`h-2 w-6 rounded-full transition-all hover:bg-red-400 ${i === currentSlideIndex ? 'bg-red-600 w-10' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          <span className="font-black text-gray-900 tabular-nums bg-yellow-400 px-3 py-1 rounded-full text-sm shadow-sm">
            {currentSlideIndex + 1} / {SLIDES.length}
          </span>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto w-full flex items-center justify-center py-4">
        {renderLayout()}
      </main>

      <div className="fixed bottom-36 right-4 md:right-8 flex gap-4 z-40">
        <button 
          onClick={prevSlide}
          disabled={currentSlideIndex === 0}
          className="p-4 bg-white shadow-2xl rounded-full disabled:opacity-30 hover:bg-gray-100 transition-all border-2 border-gray-100 active:scale-90"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          disabled={currentSlideIndex === SLIDES.length - 1}
          className="p-4 bg-black text-white shadow-2xl rounded-full disabled:opacity-30 hover:bg-gray-800 transition-all active:scale-90"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <PronunciationFooter allTips={allTips} currentIndex={currentSlideIndex} />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
