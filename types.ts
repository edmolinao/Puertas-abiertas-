
export interface Phrase {
  german: string;
  spanish: string;
  pronunciation?: string;
  image?: string;
}

export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  content?: string;
  phrases?: Phrase[];
  game?: {
    name: string;
    instructions: string;
    image?: string;
  };
  pronunciationTips?: string[];
  layout: 'intro' | 'grid' | 'dialogue' | 'game' | 'interactive' | 'list';
}
