import { useState, useMemo, useEffect } from 'react';
import { songs, LANGUAGES } from '@/data/songs';
import SongCard from '@/components/SongCard';
import Y2KHeader from '@/components/Y2KHeader';
import Y2KFooter from '@/components/Y2KFooter';

const Index = () => {
  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState('all');
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    const langHistory = JSON.parse(localStorage.getItem('lang-history') || '[]') as string[];
    const recentSongs = JSON.parse(localStorage.getItem('recent-songs') || '[]') as string[];
    
    if (langHistory.length > 0) {
      const topLang = langHistory[0];
      const recs = songs
        .filter(s => s.language === topLang && !recentSongs.includes(s.id))
        .map(s => s.id);
      setRecommendations(recs);
    }
  }, []);

  const filtered = useMemo(() => {
    return songs.filter(song => {
      const matchesSearch = search === '' || 
        song.title.toLowerCase().includes(search.toLowerCase()) ||
        song.artist.toLowerCase().includes(search.toLowerCase());
      const matchesLang = langFilter === 'all' || song.language === langFilter;
      return matchesSearch && matchesLang;
    });
  }, [search, langFilter]);

  const recommendedSongs = useMemo(() => {
    return songs.filter(s => recommendations.includes(s.id));
  }, [recommendations]);

  return (
    <div className="min-h-screen flex flex-col">
      <Y2KHeader />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        {/* Welcome box */}
        <div className="bevel-box p-4 mb-6 text-center">
          <h2 className="font-pixel text-sm text-y2k-yellow mb-2">
            ✧ WELCOME TO KARAOKE SENSEI ✧
          </h2>
          <p className="font-retro text-y2k-cyan text-lg">
            Pick a song, choose your mode, and learn a new language! 🎵
          </p>
          <div className="flex justify-center gap-4 mt-3 text-xs font-retro">
            <span className="text-y2k-lime">🎤 SING MODE - sing along!</span>
            <span className="text-y2k-pink">✏️ GAP MODE - fill the blanks!</span>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bevel-box p-4 mb-6">
          <h3 className="font-pixel text-[10px] text-y2k-pink mb-3">
            🔍 FIND A SONG
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="search songs or artists..."
                className="w-full bevel-box-inset px-3 py-2 font-retro text-y2k-yellow bg-background focus:outline-none focus:border-y2k-cyan placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <select
                value={langFilter}
                onChange={(e) => setLangFilter(e.target.value)}
                className="bevel-box-inset px-3 py-2 font-retro text-y2k-cyan bg-background focus:outline-none cursor-pointer"
              >
                <option value="all">🌍 ALL LANGUAGES</option>
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {recommendedSongs.length > 0 && (
          <div className="bevel-box p-4 mb-6">
            <h3 className="font-pixel text-[10px] text-y2k-lime mb-3">
              ⭐ RECOMMENDED 4 U ⭐
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {recommendedSongs.map(song => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          </div>
        )}

        {/* Song List */}
        <div className="bevel-box p-4">
          <h3 className="font-pixel text-[10px] text-y2k-cyan mb-3">
            🎵 SONG LIST ({filtered.length} songs)
          </h3>
          {filtered.length === 0 ? (
            <div className="text-center py-8">
              <p className="font-pixel text-[10px] text-y2k-pink blink">
                NO SONGS FOUND :(
              </p>
              <p className="font-retro text-sm text-muted-foreground mt-2">
                Try a different search or language filter!
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {filtered.map(song => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Y2KFooter />
    </div>
  );
};

export default Index;
