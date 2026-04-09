import { Link } from 'react-router-dom';
import { Song } from '@/data/songs';

interface SongCardProps {
  song: Song;
  onSelect?: (song: Song) => void;
}

const difficultyColors: Record<string, string> = {
  easy: 'text-y2k-lime',
  medium: 'text-y2k-yellow',
  hard: 'text-y2k-pink',
};

const difficultyStars: Record<string, string> = {
  easy: '★☆☆',
  medium: '★★☆',
  hard: '★★★',
};

const SongCard = ({ song, onSelect }: SongCardProps) => {
  const handleClick = () => {
    // Save to recent searches
    const recent = JSON.parse(localStorage.getItem('recent-songs') || '[]') as string[];
    const updated = [song.id, ...recent.filter((id: string) => id !== song.id)].slice(0, 10);
    localStorage.setItem('recent-songs', JSON.stringify(updated));
    // Save language preference
    const langs = JSON.parse(localStorage.getItem('lang-history') || '[]') as string[];
    const updatedLangs = [song.language, ...langs.filter((l: string) => l !== song.language)].slice(0, 5);
    localStorage.setItem('lang-history', JSON.stringify(updatedLangs));
    onSelect?.(song);
  };

  return (
    <div className="bevel-box p-3 hover:border-y2k-cyan transition-all group" onClick={handleClick}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{song.languageFlag}</span>
            <h3 className="font-pixel text-[11px] text-y2k-yellow truncate group-hover:text-y2k-cyan transition-colors">
              {song.title}
            </h3>
          </div>
          <p className="text-sm font-retro text-y2k-pink">{song.artist}</p>
          <div className="flex items-center gap-3 mt-2 text-xs font-retro">
            <span className="text-muted-foreground">{song.genre}</span>
            <span className={difficultyColors[song.difficulty]}>
              {difficultyStars[song.difficulty]} {song.difficulty.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Link
            to={`/sing/${song.id}`}
            className="bevel-box px-2 py-1 text-[9px] font-pixel text-y2k-lime hover:text-y2k-yellow no-underline text-center transition-colors"
            onClick={(e) => { e.stopPropagation(); handleClick(); }}
          >
            🎤 SING
          </Link>
          <Link
            to={`/gaps/${song.id}`}
            className="bevel-box px-2 py-1 text-[9px] font-pixel text-y2k-cyan hover:text-y2k-yellow no-underline text-center transition-colors"
            onClick={(e) => { e.stopPropagation(); handleClick(); }}
          >
            ✏️ GAPS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
