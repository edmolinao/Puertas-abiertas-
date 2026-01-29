
import { SlideData } from './types';

export const SLIDES: SlideData[] = [
  {
    id: 1,
    title: "Herzlich Willkommen!",
    subtitle: "Fundación Colombo Alemana de Barranquilla (FCAB)",
    content: "¡Bienvenidos a nuestro Día de Puertas Abiertas! Hoy descubrirás que el alemán es más fácil de lo que parece.",
    layout: 'intro',
    phrases: [{ german: "Herzlich Willkommen", spanish: "Bienvenidos" }],
    pronunciationTips: ["H = j suave", "Z = ts"]
  },
  {
    id: 2,
    title: "Guten Morgen! Hallo!",
    subtitle: "¡A saludar!",
    layout: 'grid',
    phrases: [
      { 
        german: "Guten Morgen", 
        spanish: "Buen día", 
        image: "https://images.unsplash.com/photo-1541119638723-c51cbe2262aa?auto=format&fit=crop&q=80&w=400&h=300"
      },
      { 
        german: "Hallo", 
        spanish: "Hola", 
        image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80&w=400&h=300"
      }
    ],
    pronunciationTips: ["W = v dental", "V = f"]
  },
  {
    id: 3,
    title: "Saludando todo el día",
    subtitle: "Die Begrüßungen",
    layout: 'grid',
    phrases: [
      { 
        german: "Guten Tag", 
        spanish: "Buenas tardes", 
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=400&h=300" 
      },
      { 
        german: "Guten Abend", 
        spanish: "Buenas noches (llegada)", 
        image: "https://images.unsplash.com/photo-1507502707541-f369a3b18502?auto=format&fit=crop&q=80&w=400&h=300" 
      },
      { 
        german: "Gute Nacht", 
        spanish: "Buenas noches (dormir)", 
        image: "https://images.unsplash.com/photo-1483354483454-4cd359948304?auto=format&fit=crop&q=80&w=400&h=300" 
      }
    ],
    pronunciationTips: ["G final = k", "CH = jota suave"]
  },
  {
    id: 4,
    title: "¿Cómo estás?",
    subtitle: "Wie geht's?",
    layout: 'dialogue',
    phrases: [
      { german: "Wie geht's?", spanish: "¿Cómo va todo?", image: "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=100&h=100" },
      { german: "Gut, und dir?", spanish: "Bien, ¿y tú?", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=100&h=100" },
      { german: "Sehr gut, danke!", spanish: "¡Muy bien, gracias!", image: "https://images.unsplash.com/photo-1494178270175-e96de2971df9?auto=format&fit=crop&q=80&w=100&h=100" }
    ],
    pronunciationTips: ["IE = i larga", "EI = ai"]
  },
  {
    id: 5,
    title: "¿Cómo te llamas?",
    subtitle: "Mein Name ist...",
    layout: 'dialogue',
    phrases: [
      { german: "Wie ist dein Name?", spanish: "¿Cuál es tu nombre?", image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=100&h=100" },
      { german: "Mein Name ist...", spanish: "Mi nombre es...", image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=100&h=100" }
    ],
    pronunciationTips: ["ß = s fuerte", "EU = oi"]
  },
  {
    id: 6,
    title: "¡Juego: Zipp-Zapp!",
    subtitle: "Interacción grupal sin traducciones",
    layout: 'game',
    game: {
      name: "Zipp-Zapp",
      instructions: "¡Atención a las señales!",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600&h=400"
    },
    phrases: [
      { 
        german: "Zipp: Rechts", 
        spanish: "", 
        image: "https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?auto=format&fit=crop&q=80&w=200&h=200" 
      },
      { 
        german: "Zapp: Links", 
        spanish: "", 
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=200&h=200" 
      },
      { 
        german: "Zipp-Zapp!", 
        spanish: "", 
        image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=200&h=200" 
      }
    ],
    pronunciationTips: ["Z = ts"]
  },
  {
    id: 7,
    title: "Über mich",
    subtitle: "Información personal",
    layout: 'dialogue',
    phrases: [
      { 
        german: "Mein Name ist...", 
        spanish: "Mi nombre es...", 
        image: "https://images.unsplash.com/photo-1503437313881-503a91226402?auto=format&fit=crop&q=80&w=100&h=100" 
      },
      { 
        german: "Ich komme aus Kolumbien.", 
        spanish: "Yo vengo de Colombia.", 
        image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=100&h=100" 
      },
      { 
        german: "Ich wohne in Barranquilla.", 
        spanish: "Yo vivo en Barranquilla.", 
        image: "https://images.unsplash.com/photo-1569437061241-a848be43cc82?auto=format&fit=crop&q=80&w=100&h=100" 
      },
      { 
        german: "Und du?", 
        spanish: "¿Y tú?", 
        image: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=100&h=100" 
      }
    ],
    pronunciationTips: ["CH = j suave", "W = v dental"]
  },
  {
    id: 8,
    title: "Internationale Wörter",
    subtitle: "¡Ya sabes alemán!",
    layout: 'interactive',
    phrases: [
      { german: "Das Auto", spanish: "Auto" },
      { german: "Die Musik", spanish: "Música" },
      { german: "Der Hamburger", spanish: "Hamburguesa" },
      { german: "Das Taxi", spanish: "Taxi" },
      { german: "Das Hotel", spanish: "Hotel" },
      { german: "Die Pizza", spanish: "Pizza" },
      { german: "Das Problem", spanish: "Problema" },
      { german: "Die Kamera", spanish: "Cámara" },
      { german: "Das Museum", spanish: "Museo" },
      { german: "Das Restaurant", spanish: "Restaurante" },
      { german: "Der Bus", spanish: "Bus" },
      { german: "Das Tennis", spanish: "Tenis" },
      { german: "Die Banane", spanish: "Banano" },
      { german: "Das Telefon", spanish: "Teléfono" },
      { german: "Der Kaffee", spanish: "Café" },
      { german: "Das Hobby", spanish: "Hobby" },
      { german: "Das Alphabet", spanish: "Alfabeto" },
      { german: "Die Familie", spanish: "Familia" },
      { german: "Der Elefant", spanish: "Elefante" },
      { german: "Das Zebra", spanish: "Zebra" },
      { german: "Die Gitarre", spanish: "Guitarra" },
      { german: "Das Internet", spanish: "Internet" }
    ],
    pronunciationTips: ["J = y", "D final = t", "SCH = sh"]
  },
  {
    id: 9,
    title: "Deutsche Automarken",
    subtitle: "Los carros más famosos",
    layout: 'grid',
    phrases: [
      { 
        german: "Mercedes-Benz", 
        spanish: "Mercedes", 
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop" 
      },
      { 
        german: "BMW", 
        spanish: "Bayerische Motoren Werke", 
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop" 
      },
      { 
        german: "Audi", 
        spanish: "Audi", 
        image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800&auto=format&fit=crop" 
      },
      { 
        german: "Volkswagen", 
        spanish: "VW", 
        image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800&auto=format&fit=crop" 
      },
      { 
        german: "Porsche", 
        spanish: "Porsche", 
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop" 
      }
    ],
    pronunciationTips: ["W = v dental", "V = f", "SCH = sh"]
  },
  {
    id: 10,
    title: "Juego: Simon sagt",
    subtitle: "Moviendo el cuerpo",
    layout: 'game',
    game: {
      name: "Simon sagt...",
      instructions: "¡Solo muévete si Simón lo dice!",
      image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600&h=400"
    },
    phrases: [
      { german: "Hände hoch!", spanish: "Manos arriba" },
      { german: "Steh auf!", spanish: "Levántate" },
      { german: "Setz dich!", spanish: "Siéntate" },
      { german: "Tanz!", spanish: "Baila" }
    ],
    pronunciationTips: ["Ä = e abierta", "ST = sht"]
  },
  {
    id: 11,
    title: "Zahlen 1 bis 10",
    subtitle: "",
    layout: 'list',
    phrases: [
      { german: "Eins", spanish: "1" },
      { german: "Zwei", spanish: "2" },
      { german: "Drei", spanish: "3" },
      { german: "Vier", spanish: "4" },
      { german: "Fünf", spanish: "5" },
      { german: "Sechs", spanish: "6" },
      { german: "Sieben", spanish: "7" },
      { german: "Acht", spanish: "8" },
      { german: "Neun", spanish: "9" },
      { german: "Zehn", spanish: "10" }
    ],
    pronunciationTips: ["V = f", "Z = ts", "EU = oi", "IE = i larga"]
  },
  {
    id: 12,
    title: "Actividad: Schnitzel vs Arepa",
    subtitle: "Comida y Cultura",
    layout: 'game',
    game: {
      name: "Sabor Colombo-Alemán",
      instructions: "¿Cómo se dice tu comida favorita? Aprende: 'Ich mag...' (Me gusta...). ¿Prefieres la Arepa o el Schnitzel?",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600&h=400"
    },
    phrases: [
      { german: "Ich mag Arepa.", spanish: "Me gusta la arepa." },
      { german: "Ich mag Schnitzel.", spanish: "Me gusta el schnitzel." }
    ],
    pronunciationTips: ["SCH = sh"]
  },
  {
    id: 13,
    title: "Despedida",
    subtitle: "Tschüss & Auf Wiedersehen",
    layout: 'intro',
    phrases: [
      { german: "Tschüss!", spanish: "¡Chao!" },
      { german: "Auf Wiedersehen!", spanish: "¡Adiós!" }
    ],
    pronunciationTips: ["Tsch = ch fuerte"]
  }
];
