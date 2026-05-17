import { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { songs } from '@/data/songs';
import { Link, useNavigate } from 'react-router-dom';
import Y2KHeader from '@/components/Y2KHeader';
import Y2KFooter from '@/components/Y2KFooter';

const Profile = () => {
  const { user, logout, toggleFavorite } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'favorites' | 'history'>('favorites');
  const [sliding, setSliding] = useState(false);
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('left');
  const contentRef = useRef<HTMLDivElement>(null);

  if (!user) { navigate('/'); return null; }

  const favoriteSongs = songs.filter(s => user.favorites.includes(s.id));

  const handleLogout = () => { logout(); navigate('/'); };

  const switchTab = (tab: 'favorites' | 'history') => {
    if (tab === activeTab || sliding) return;
    const dir = tab === 'history' ? 'left' : 'right';
    setSlideDir(dir);
    setSliding(true);
    setTimeout(() => {
      setActiveTab(tab);
      setSliding(false);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Y2KHeader />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-4">

        {/* User info */}
        <div className="bevel-box p-4">
          <div className="flex justify-between items-start flex-wrap gap-3">
            <div>
              <h2 className="font-pixel text-sm text-y2k-yellow">👾 {user.username}</h2>
              <p className="font-retro text-y2k-cyan mt-1">{user.email}</p>
              <p className="font-retro text-muted-foreground text-sm">
                {user.nationality} · {user.age} years old
              </p>
              <p className="font-retro text-sm mt-1">
                <span className="text-y2k-lime">{user.history.length}</span>
                <span className="text-muted-foreground"> songs played · </span>
                <span className="text-y2k-yellow">{user.favorites.length}</span>
                <span className="text-muted-foreground"> favorites</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bevel-box px-3 py-1 font-pixel text-[9px] text-y2k-pink hover:text-y2k-yellow transition-colors"
            >
              LOGOUT
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="bevel-box p-1 flex gap-1">
          <button
            onClick={() => switchTab('favorites')}
            className={`flex-1 py-2 font-pixel text-[9px] transition-colors bevel-box
              ${activeTab === 'favorites' ? 'text-y2k-yellow' : 'text-muted-foreground hover:text-y2k-cyan'}`}
          >
            ⭐ FAVORITES ({favoriteSongs.length})
          </button>
          <button
            onClick={() => switchTab('history')}
            className={`flex-1 py-2 font-pixel text-[9px] transition-colors bevel-box
              ${activeTab === 'history' ? 'text-y2k-yellow' : 'text-muted-foreground hover:text-y2k-cyan'}`}
          >
            🕹️ HISTORY ({user.history.length})
          </button>
        </div>

        {/* Sliding content */}
        <div className="overflow-hidden">
          <div
            ref={contentRef}
            className="bevel-box p-4 transition-all duration-300"
            style={{
              transform: sliding
                ? `translateX(${slideDir === 'left' ? '-60px' : '60px'})`
                : 'translateX(0)',
              opacity: sliding ? 0 : 1,
            }}
          >
            {activeTab === 'favorites' ? (
              <>
                <h3 className="font-pixel text-[10px] text-y2k-pink mb-3">⭐ FAVORITES</h3>
                {favoriteSongs.length === 0 ? (
                  <p className="font-retro text-muted-foreground">no favorites yet! heart a song to add it.</p>
                ) : (
                  <div className="space-y-2">
                    {favoriteSongs.map(song => (
                      <div key={song.id} className="bevel-box-inset p-2 flex justify-between items-center gap-2">
                        <span className="font-retro text-y2k-cyan">
                          {song.languageFlag} {song.title}
                          <span className="text-muted-foreground"> — {song.artist}</span>
                        </span>
                        <button
                          onClick={() => toggleFavorite(song.id)}
                          className="bevel-box px-2 py-0.5 font-pixel text-[8px] text-y2k-pink hover:text-y2k-yellow transition-colors shrink-0"
                        >
                          DELETE
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <h3 className="font-pixel text-[10px] text-y2k-cyan mb-3">🕹️ PLAY HISTORY</h3>
                {user.history.length === 0 ? (
                  <p className="font-retro text-muted-foreground">no songs played yet!</p>
                ) : (
                  <div className="space-y-2">
                    {user.history.map((entry, i) => {
                      const song = songs.find(s => s.id === entry.songId);
                      const scoreColor =
                        entry.score === 100 ? 'text-y2k-yellow' :
                        entry.score >= 70  ? 'text-y2k-lime' :
                        entry.score >= 40  ? 'text-y2k-cyan' : 'text-y2k-pink';
                      return (
                        <div key={i} className="bevel-box-inset p-2 flex justify-between items-center gap-2 flex-wrap">
                          <div>
                            <span className="font-retro text-foreground">
                              {song?.languageFlag} {song?.title ?? entry.songId}
                            </span>
                            <span className="font-retro text-muted-foreground text-sm block">
                              {entry.date}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className={`font-pixel text-[10px] ${scoreColor}`}>
                              {entry.score}%
                            </span>
                            <span className="font-retro text-muted-foreground text-sm block">
                              {entry.correctGaps}/{entry.totalGaps} words
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <Link to="/" className="block text-center font-pixel text-[9px] text-y2k-cyan hover:text-y2k-yellow transition-colors">
          ← BACK TO HOME
        </Link>
      </main>
      <Y2KFooter />
    </div>
  );
};

export default Profile;