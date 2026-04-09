export interface Song {
  id: string;
  title: string;
  artist: string;
  language: string;
  languageFlag: string;
  difficulty: 'easy' | 'medium' | 'hard';
  bpm: number;
  lyrics: LyricLine[];
  genre: string;
}

export interface LyricLine {
  time: number; // seconds
  text: string;
  translation: string;
}

export const LANGUAGES = [
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'pt', name: 'Portuguese', flag: '🇧🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
];

export const songs: Song[] = [
  {
    id: 'despacito',
    title: 'Despacito',
    artist: 'Luis Fonsi',
    language: 'es',
    languageFlag: '🇪🇸',
    difficulty: 'medium',
    bpm: 89,
    genre: 'Pop Latino',
    lyrics: [
      { time: 0, text: 'Sí, sabes que ya llevo un rato mirándote', translation: "Yes, you know I've been looking at you for a while" },
      { time: 4, text: 'Tengo que bailar contigo hoy', translation: 'I have to dance with you today' },
      { time: 7, text: 'Vi que tu mirada ya estaba llamándome', translation: 'I saw your gaze was already calling me' },
      { time: 11, text: 'Muéstrame el camino que yo voy', translation: 'Show me the way and I will go' },
      { time: 15, text: 'Tú, tú eres el imán y yo soy el metal', translation: 'You, you are the magnet and I am the metal' },
      { time: 19, text: 'Me voy acercando y voy armando el plan', translation: "I'm getting closer and putting together the plan" },
      { time: 23, text: 'Solo con pensarlo se acelera el pulso', translation: 'Just thinking about it quickens the pulse' },
      { time: 27, text: 'Despacito', translation: 'Slowly' },
      { time: 29, text: 'Quiero respirar tu cuello despacito', translation: 'I want to breathe in your neck slowly' },
      { time: 33, text: 'Deja que te diga cosas al oído', translation: 'Let me whisper things in your ear' },
    ],
  },
  {
    id: 'la-vie-en-rose',
    title: 'La Vie en Rose',
    artist: 'Édith Piaf',
    language: 'fr',
    languageFlag: '🇫🇷',
    difficulty: 'easy',
    bpm: 66,
    genre: 'Chanson',
    lyrics: [
      { time: 0, text: "Quand il me prend dans ses bras", translation: 'When he takes me in his arms' },
      { time: 4, text: "Il me parle tout bas", translation: 'He speaks to me softly' },
      { time: 7, text: "Je vois la vie en rose", translation: 'I see life in pink' },
      { time: 11, text: "Il me dit des mots d'amour", translation: 'He tells me words of love' },
      { time: 15, text: "Des mots de tous les jours", translation: 'Everyday words' },
      { time: 19, text: "Et ça me fait quelque chose", translation: 'And it does something to me' },
      { time: 23, text: "Il est entré dans mon cœur", translation: 'He entered my heart' },
      { time: 27, text: "Une part de bonheur", translation: 'A part of happiness' },
      { time: 31, text: "Dont je connais la cause", translation: 'Whose cause I know' },
    ],
  },
  {
    id: 'sakura',
    title: 'Sakura Sakura',
    artist: 'Traditional',
    language: 'ja',
    languageFlag: '🇯🇵',
    difficulty: 'hard',
    bpm: 72,
    genre: 'Traditional',
    lyrics: [
      { time: 0, text: 'さくら さくら', translation: 'Cherry blossoms, cherry blossoms' },
      { time: 4, text: '野山も里も', translation: 'Over fields and hills' },
      { time: 8, text: '見渡す限り', translation: 'As far as you can see' },
      { time: 12, text: '霞か雲か', translation: 'Is it mist or clouds?' },
      { time: 16, text: '朝日に匂う', translation: 'Fragrant in the morning sun' },
      { time: 20, text: 'さくら さくら', translation: 'Cherry blossoms, cherry blossoms' },
      { time: 24, text: '花盛り', translation: 'Flowers in full bloom' },
    ],
  },
  {
    id: 'gangnam',
    title: 'Gangnam Style',
    artist: 'PSY',
    language: 'ko',
    languageFlag: '🇰🇷',
    difficulty: 'hard',
    bpm: 132,
    genre: 'K-Pop',
    lyrics: [
      { time: 0, text: '오빤 강남스타일', translation: "Oppa is Gangnam style" },
      { time: 3, text: '강남스타일', translation: 'Gangnam style' },
      { time: 5, text: '낮에는 따사로운 인간적인 여자', translation: 'A girl who is warm during the day' },
      { time: 9, text: '커피 한잔의 여유를 아는 품격 있는 여자', translation: 'A classy girl who knows the leisure of a cup of coffee' },
      { time: 14, text: '밤이 오면 심장이 뜨거워지는 여자', translation: 'A girl whose heart gets hot when night comes' },
      { time: 18, text: '그런 반전 있는 여자', translation: 'A girl with that twist' },
    ],
  },
  {
    id: 'garota',
    title: 'Garota de Ipanema',
    artist: 'Tom Jobim',
    language: 'pt',
    languageFlag: '🇧🇷',
    difficulty: 'medium',
    bpm: 80,
    genre: 'Bossa Nova',
    lyrics: [
      { time: 0, text: 'Olha que coisa mais linda', translation: 'Look, what a beautiful thing' },
      { time: 4, text: 'Mais cheia de graça', translation: 'More full of grace' },
      { time: 7, text: 'É ela menina', translation: "It's that girl" },
      { time: 10, text: 'Que vem e que passa', translation: 'Who comes and who passes' },
      { time: 13, text: 'Num doce balanço a caminho do mar', translation: 'In a sweet sway on her way to the sea' },
      { time: 18, text: 'Moça do corpo dourado do sol de Ipanema', translation: 'Girl with a golden body from the sun of Ipanema' },
      { time: 23, text: 'O seu balançado é mais que um poema', translation: 'Her sway is more than a poem' },
    ],
  },
  {
    id: '99-luftballons',
    title: '99 Luftballons',
    artist: 'Nena',
    language: 'de',
    languageFlag: '🇩🇪',
    difficulty: 'medium',
    bpm: 180,
    genre: 'New Wave',
    lyrics: [
      { time: 0, text: 'Hast du etwas Zeit für mich', translation: 'Do you have some time for me' },
      { time: 3, text: 'Dann singe ich ein Lied für dich', translation: "Then I'll sing a song for you" },
      { time: 6, text: 'Von 99 Luftballons', translation: 'About 99 balloons' },
      { time: 9, text: 'Auf ihrem Weg zum Horizont', translation: 'On their way to the horizon' },
      { time: 12, text: 'Denkst du vielleicht grad an mich', translation: 'Are you perhaps thinking of me right now' },
      { time: 15, text: 'Dann singe ich ein Lied für dich', translation: "Then I'll sing a song for you" },
      { time: 18, text: 'Von 99 Luftballons', translation: 'About 99 balloons' },
      { time: 21, text: 'Und dass so was von so was kommt', translation: 'And that something like this comes from something like that' },
    ],
  },
];
