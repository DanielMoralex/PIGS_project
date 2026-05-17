import { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { songs } from '@/data/songs';
import { useAuth } from '@/context/AuthContext';
import Y2KHeader from '@/components/Y2KHeader';
import Y2KFooter from '@/components/Y2KFooter';
import dieWithASmile from '@/assets/audio/die-with-a-smile.mp3';
import despacito from '@/assets/audio/despacito.mp3';

const audioMap: Record<string, string> = {
  'die-with-a-smile': dieWithASmile,
  'despacito': despacito
};

function getGapWords(text: string): { words: string[]; gapIndices: number[] } {
  const words = text.split(/\s+/);
  if (words.length <= 1) return { words, gapIndices: [] };
  // Pick one word roughly in the middle, avoiding first and last
  const gapIndex = Math.floor(words.length / 2);
  return { words, gapIndices: [gapIndex] };
}

const GapMode = () => {
  const { songId } = useParams();
  const song = songs.find(s => s.id === songId);
  const { user, addToHistory, toggleFavorite } = useAuth();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const lineRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const gapData = useMemo(() => {
    if (!song) return [];
    return song.lyrics.map((line, lineIdx) => {
      const { words, gapIndices } = getGapWords(line.text);
      return { lineIdx, time: line.time, text: line.text, translation: line.translation, words, gapIndices };
    });
  }, [song]);

  const allGapKeys = useMemo(() => {
    return gapData.flatMap(line =>
      line.gapIndices.map(gi => `${line.lineIdx}-${gi}`)
    );
  }, [gapData]);

  const handleKeyDown = (e: React.KeyboardEvent, key: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentIdx = allGapKeys.indexOf(key);
      const nextKey = allGapKeys[currentIdx + 1];
      if (nextKey && inputRefs.current[nextKey]) {
        inputRefs.current[nextKey]?.focus();
      } else {
        // Last gap — submit
        handleSubmit();
      }
    }
  };

  const activeLineIdx = useMemo(() => {
    if (!song) return -1;
    let active = -1;
    for (let i = 0; i < song.lyrics.length; i++) {
      if (currentTime >= song.lyrics[i].time) active = i;
      else break;
    }
    return active;
  }, [currentTime, song]);

  useEffect(() => {
    if (activeLineIdx >= 0 && lineRefs.current[activeLineIdx]) {
      lineRefs.current[activeLineIdx]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeLineIdx]);

  const activeWordIdx = useMemo(() => {
    if (!song || activeLineIdx < 0) return -1;
    const line = gapData[activeLineIdx];
    const nextLineTime = song.lyrics[activeLineIdx + 1]?.time ?? (song.lyrics[activeLineIdx].time + 10);
    const lineDuration = nextLineTime - song.lyrics[activeLineIdx].time;
    const timeIntoLine = currentTime - song.lyrics[activeLineIdx].time;
    const wordIndex = Math.floor((timeIntoLine / lineDuration) * line.words.length);
    return Math.min(wordIndex, line.words.length - 1);
  }, [currentTime, activeLineIdx, gapData, song]);

  const handleChange = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  // Count gaps before handleSubmit so it's available inside it
  let totalGaps = 0;
  let correctGaps = 0;
  gapData.forEach(line => {
    line.gapIndices.forEach(gi => {
      totalGaps++;
      const key = `${line.lineIdx}-${gi}`;
      const answer = (answers[key] || '').trim().toLowerCase();
      const expected = line.words[gi].toLowerCase().replace(/[^\w\s]/g, '');
      if (answer === expected) correctGaps++;
    });
  });

  const handleSubmit = () => {
    setSubmitted(true);
    if (user && song) {
      addToHistory(song.id, correctGaps, totalGaps);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const isFavorite = user?.favorites.includes(song?.id ?? '') ?? false;

  if (!song) {
    return (
      <div className="min-h-screen flex flex-col">
        <Y2KHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="bevel-box p-8 text-center">
            <p className="font-pixel text-sm text-y2k-pink blink">SONG NOT FOUND :(</p>
            <Link to="/" className="font-retro text-y2k-cyan mt-4 block">← back 2 home</Link>
          </div>
        </main>
        <Y2KFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Y2KHeader />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">

        {/* Song info */}
        <div className="bevel-box p-4 mb-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="font-pixel text-sm text-y2k-yellow">
                {song.languageFlag} {song.title}
              </h2>
              <p className="font-retro text-y2k-pink">{song.artist}</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Favorite button — only shown when logged in */}
              {user && (
                <button
                  onClick={() => toggleFavorite(song.id)}
                  className="bevel-box px-2 py-1 font-pixel text-[9px] transition-colors hover:text-y2k-yellow"
                  style={{ color: isFavorite ? 'hsl(var(--y2k-yellow))' : 'hsl(var(--muted-foreground))' }}
                  title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFavorite ? '⭐ SAVED' : '☆ SAVE'}
                </button>
              )}
              <Link to="/" className="bevel-box px-3 py-1 text-[9px] font-pixel text-y2k-cyan no-underline">
                ← BACK
              </Link>
            </div>
          </div>
        </div>

        {/* Audio player */}
        <div className="bevel-box p-3 mb-4 flex items-center gap-3">
          <span className="font-pixel text-[9px] text-y2k-yellow">🎵 AUDIO:</span>
          <audio ref={audioRef} controls className="flex-1 h-8" src={audioMap[song.id] ?? ''}>
            Your browser does not support audio.
          </audio>
          {isPlaying && (
            <span className="font-pixel text-[9px] text-y2k-lime blink">▶ PLAYING</span>
          )}
        </div>

        {/* Mode banner */}
        <div className="y2k-gradient p-1 mb-4">
          <div className="bg-background p-2 text-center">
            <span className="font-pixel text-[10px] text-y2k-yellow">✏️ FILL IN THE GAPS ✏️</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="bevel-box p-3 mb-4 text-center">
          <p className="font-retro text-y2k-cyan">
            Fill in the missing words! Use the translation as a hint 💡
          </p>
        </div>

        {/* Lyrics with gaps */}
        <div className="bevel-box p-4 mb-4 space-y-4">
          {gapData.map((line) => {
            const isActiveLine = line.lineIdx === activeLineIdx;
            return (
              <div
                key={line.lineIdx}
                ref={(el) => (lineRefs.current[line.lineIdx] = el)}
                className={`bevel-box-inset p-3 transition-all duration-300 ${
                  isActiveLine ? 'border-y2k-yellow shadow-[0_0_8px_2px_rgba(255,220,0,0.3)]' : ''
                }`}
              >
                <div className="flex flex-wrap items-center gap-1 font-retro text-lg">
                  {line.words.map((word, wi) => {
                    const key = `${line.lineIdx}-${wi}`;
                    const isPastWord = isActiveLine && wi <= activeWordIdx;

                    if (line.gapIndices.includes(wi)) {
                      const answer = answers[key] || '';
                      const expected = word.toLowerCase().replace(/[^\w\s]/g, '');
                      const isCorrect = submitted && answer.trim().toLowerCase() === expected;
                      const isWrong = submitted && answer.trim().toLowerCase() !== expected;

                      return (
                        <span key={wi} className="inline-flex flex-col items-center">
                          <input
                            ref={(el) => (inputRefs.current[key] = el)}
                            onKeyDown={(e) => handleKeyDown(e, key)}
                            type="text"
                            aria-label={`Missing word ${wi + 1} in line ${line.lineIdx + 1}`}
                            value={answer}
                            onChange={(e) => handleChange(key, e.target.value)}
                            disabled={submitted}
                            className={`w-24 px-1 py-0.5 text-center font-retro text-lg bevel-box-inset 
                              ${isCorrect ? 'text-y2k-lime border-y2k-lime' : ''}
                              ${isWrong ? 'text-y2k-pink border-y2k-pink' : ''}
                              ${!submitted && isPastWord ? 'text-y2k-yellow border-y2k-yellow' : ''}
                              ${!submitted && !isPastWord ? 'text-y2k-cyan' : ''}
                              bg-background focus:outline-none transition-colors duration-200`}
                            placeholder="___"
                          />
                          {isWrong && (
                            <span className="text-[10px] font-pixel text-y2k-lime mt-0.5">{word}</span>
                          )}
                        </span>
                      );
                    }

                    return (
                      <span
                        key={wi}
                        className={`transition-colors duration-200 ${
                          isActiveLine && wi === activeWordIdx
                            ? 'text-y2k-yellow font-bold scale-110 inline-block'
                            : isActiveLine && wi < activeWordIdx
                            ? 'text-y2k-lime'
                            : 'text-foreground'
                        }`}
                      >
                        {word}
                      </span>
                    );
                  })}
                </div>
                <p className="font-retro text-sm text-muted-foreground mt-1">
                  💡 {line.translation}
                </p>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="bevel-box p-4 flex items-center justify-center gap-4">
          {!submitted ? (
            <button onClick={handleSubmit} className="bevel-box px-6 py-2 font-pixel text-[10px] text-y2k-lime hover:text-y2k-yellow transition-colors">
              ✓ CHECK ANSWERS
            </button>
          ) : (
            <button onClick={handleReset} className="bevel-box px-6 py-2 font-pixel text-[10px] text-y2k-cyan hover:text-y2k-yellow transition-colors">
              ↻ TRY AGAIN
            </button>
          )}
        </div>

        {/* Score */}
        {submitted && (
          <div aria-live="polite" aria-atomic="true" className="bevel-box p-4 mt-4 text-center">
            <h3 className="font-pixel text-sm text-y2k-yellow mb-2">
              {correctGaps === totalGaps ? '🌟 PERFECT! 🌟' : correctGaps >= totalGaps * 0.7 ? '👍 GREAT JOB!' : '💪 KEEP TRYING!'}
            </h3>
            <p className="font-pixel text-2xl text-y2k-cyan">
              {correctGaps}/{totalGaps}
            </p>
            <p className="font-retro text-muted-foreground mt-1">words correct</p>
          </div>
        )}
      </main>
      <Y2KFooter />
    </div>
  );
};

export default GapMode;
