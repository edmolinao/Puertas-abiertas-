
export type Gender = 'der' | 'die' | 'das';

export interface Phrase {
  german: string;
  spanish: string;
  pronunciation?: string;
  image?: string;
}

export interface Noun {
  word: string;
  gender: Gender;
  translation: string;
  image?: string;
}

export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  content?: string;
  phrases?: Phrase[];
  nouns?: Noun[];
  game?: {
    name: string;
    instructions: string;
    image?: string;
  };
  pronunciationTips?: string[];
  layout: 'intro' | 'grid' | 'dialogue' | 'game' | 'interactive' | 'list' | 'noun-quiz';
}
