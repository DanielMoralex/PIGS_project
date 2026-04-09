import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { songs } from '@/data/songs';
import Y2KHeader from '@/components/Y2KHeader';
import Y2KFooter from '@/components/Y2KFooter';

function getGapWords(text: string): { words: string[]; gapIndices: number[] } {
  const words = text.split(/\s+/);
  const gapIndices: number[] = [];
  // Remove ~40% of words as gaps
  words.forEach((_, i) => {
    if (i % 3 === 1 || (words.length > 4 && i % 3 === 2 && i > 2)) {
      gapIndices.push(i);
    }
  });
  if (gapIndices.length === 0 && words.length > 1) gapIndices.push(1);
  return { words, gapIndices };
}

const GapMode = () => {
  const { songId } = useParams();
  const song = songs.find(s => s.id === songId);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const gapData = useMemo(() => {
    if (!song) return [];
    return song.lyrics.map((line, lineIdx) => {
      const { words, gapIndices } = getGapWords(line.text);
      return { lineIdx, text: line.text, translation: line.translation, words, gapIndices };
    });
  }, [song]);

  const handleChange = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => setSubmitted(true);

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

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
            <Link to="/" className="bevel-box px-3 py-1 text-[9px] font-pixel text-y2k-cyan no-underline">
              ← BACK
            </Link>
          </div>
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
          {gapData.map((line) => (
            <div key={line.lineIdx} className="bevel-box-inset p-3">
              <div className="flex flex-wrap items-center gap-1 font-retro text-lg">
                {line.words.map((word, wi) => {
                  const key = `${line.lineIdx}-${wi}`;
                  if (line.gapIndices.includes(wi)) {
                    const answer = answers[key] || '';
                    const expected = word.toLowerCase().replace(/[^\w\s]/g, '');
                    const isCorrect = submitted && answer.trim().toLowerCase() === expected;
                    const isWrong = submitted && answer.trim().toLowerCase() !== expected;

                    return (
                      <span key={wi} className="inline-flex flex-col items-center">
                        <input
                          type="text"
                          value={answer}
                          onChange={(e) => handleChange(key, e.target.value)}
                          disabled={submitted}
                          className={`w-24 px-1 py-0.5 text-center font-retro text-lg bevel-box-inset 
                            ${isCorrect ? 'text-y2k-lime border-y2k-lime' : ''}
                            ${isWrong ? 'text-y2k-pink border-y2k-pink' : ''}
                            ${!submitted ? 'text-y2k-yellow' : ''}
                            bg-background focus:outline-none`}
                          placeholder="___"
                        />
                        {isWrong && (
                          <span className="text-[10px] font-pixel text-y2k-lime mt-0.5">{word}</span>
                        )}
                      </span>
                    );
                  }
                  return <span key={wi} className="text-foreground">{word}</span>;
                })}
              </div>
              <p className="font-retro text-sm text-muted-foreground mt-1">
                💡 {line.translation}
              </p>
            </div>
          ))}
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
          <div className="bevel-box p-4 mt-4 text-center">
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
