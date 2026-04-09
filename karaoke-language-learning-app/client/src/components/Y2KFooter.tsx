const Y2KFooter = () => {
  return (
    <footer className="border-t-4 border-y2k-pink mt-8">
      <div className="bevel-box p-4 text-center star-bg">
        <div className="flex justify-center gap-2 text-xl mb-2">
          <span className="animate-bounce-y2k">⭐</span>
          <span className="animate-bounce-y2k" style={{ animationDelay: '0.1s' }}>🎵</span>
          <span className="animate-bounce-y2k" style={{ animationDelay: '0.2s' }}>🎤</span>
          <span className="animate-bounce-y2k" style={{ animationDelay: '0.3s' }}>🎶</span>
          <span className="animate-bounce-y2k" style={{ animationDelay: '0.4s' }}>⭐</span>
        </div>
        <p className="text-[10px] font-pixel text-y2k-cyan">
          © 2003 KARAOKE SENSEI | Best viewed in 800x600
        </p>
        <p className="text-xs font-retro text-y2k-pink mt-1">
          Made with 💖 and bad CSS | Sign my guestbook!
        </p>
        <div className="mt-2 text-[8px] font-pixel text-muted-foreground">
          <span className="blink">▶</span> UNDER CONSTRUCTION <span className="blink">◀</span>
        </div>
      </div>
    </footer>
  );
};

export default Y2KFooter;
