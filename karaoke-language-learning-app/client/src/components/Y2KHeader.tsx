import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Y2KHeader = () => {
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    const count = parseInt(localStorage.getItem('y2k-visitors') || '0') + 1;
    localStorage.setItem('y2k-visitors', count.toString());
    setVisitors(count);
  }, []);

  return (
    <header className="border-b-4 border-y2k-pink">
      {/* Marquee bar */}
      <div className="bg-y2k-pink py-1 marquee-container">
        <span className="marquee-text font-pixel text-[10px] text-background">
          ★ Welcome to KARAOKE SENSEI ★ Learn languages through MUSIC ★ Sing your way to fluency ★ ¡Bienvenido! ★ Bienvenue! ★ ようこそ! ★
        </span>
      </div>

      <div className="bevel-box p-4 star-bg">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <span className="text-4xl animate-spin-slow">🎤</span>
            <div>
              <h1 className="font-pixel text-lg y2k-text-gradient leading-relaxed">
                KARAOKE SENSEI
              </h1>
              <p className="text-xs text-y2k-cyan font-retro">
                ～ learn languages thru music ～
              </p>
            </div>
          </Link>

          <nav className="flex gap-2 flex-wrap">
            <Link to="/" className="bevel-box px-3 py-1 text-y2k-yellow hover:text-y2k-lime no-underline text-sm font-retro transition-colors">
              🏠 HOME
            </Link>
          </nav>
        </div>

        {/* Visitor counter */}
        <div className="mt-2 flex justify-end">
          <div className="bevel-box-inset px-3 py-1 text-[10px] font-pixel text-y2k-lime">
            👁️ VISITORS: {String(visitors).padStart(6, '0')}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Y2KHeader;
