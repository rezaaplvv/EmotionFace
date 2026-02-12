"use client";

import { useState, useEffect } from "react";
import WebcamView from "@/components/WebcamView";

// --- DATA TEMA EMOJI ---
const THEMES = {
  classic: {
    label: "Classic 😐",
    emojis: {
      happy: ["😄", "✨", "🎉", "💛", "🔥", "🌈"],
      sad: ["💧", "🌧️", "💔", "🌫️", "🥀", "☁️"],
      angry: ["🔥", "💢", "🤬", "💥", "⚡", "👹"],
      surprised: ["😲", "❗", "⚡", "👀", "🌌", "🛸"],
      neutral: [],
    }
  },
  anime: {
    label: "Anime 🌸",
    emojis: {
      happy: ["🌸", "✨", "😻", "🍡", "💖", "uwu"],
      sad: ["💔", "🥀", "☔", "😿", "🌪️"],
      angry: ["💢", "😤", "🔥", "⚔️", "😈"],
      surprised: ["⁉️", "⚡", "✨", "😱", "💫"],
      neutral: ["💤", "...", "🎐"],
    }
  },
  kpop: {
    label: "K-Pop 💜",
    emojis: {
      happy: ["🫰", "💜", "🎤", "🕺", "✨", "🍭"],
      sad: ["🥀", "🌧️", "💧", "🩹", "🎼"],
      angry: ["🔥", "📢", "💣", "💔", "🕶️"],
      surprised: ["✨", "🤩", "📸", "💎", "😲"],
      neutral: ["🎧", "☁️", "🤍"],
    }
  },
  pixel: {
    label: "8-Bit 👾",
    emojis: {
      happy: ["👾", "⭐", "🍄", "💎", "🆙"],
      sad: ["💀", "🪦", "📉", "⛈️", "💧"],
      angry: ["💣", "🧨", "💥", "🕹️", "🤬"],
      surprised: ["❗", "❓", "⚡", "💾", "👀"],
      neutral: ["💾", "📼", "⬛"],
    }
  }
};

const ParticleOverlay = ({ emotion, currentTheme }) => {
  if (!emotion) return null;
  
  const count = 40; 
  const themeData = THEMES[currentTheme] || THEMES.classic;
  const selectedEmojis = themeData.emojis[emotion.toLowerCase()] || [];

  if (selectedEmojis.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className="absolute top-[-10%] animate-fall select-none"
          style={{
            left: Math.floor(Math.random() * 100) + "%",
            animationDelay: Math.random() * 5 + "s",
            animationDuration: Math.random() * 3 + 3 + "s",
            fontSize: Math.random() * 20 + 15 + "px",
            opacity: 0.7,
            textShadow: "0 0 10px rgba(255,255,255,0.5)"
          }}
        >
          {selectedEmojis[Math.floor(Math.random() * selectedEmojis.length)]}
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const [emotion, setEmotion] = useState("Neutral");
  const [randomQuote, setRandomQuote] = useState("");
  // State untuk menyimpan tema yang dipilih (Default: classic)
  const [currentTheme, setCurrentTheme] = useState("classic");

  const quotesData = {
    happy: ["Lebar amat tuh senyum, Hutang jangan lupa dibayar ya!", "Bau-bau habis dapet transferan nih.", "Senyummu mengandung gula, awas diabetes."],
    sad: ["Tenang, habis gelap terbitlah paket kurir.", "Sedih boleh, tapi jangan lupa makan seblak.", "Jangan nangis, nanti maskaranya luntur."],
    angry: ["Mode 'Senggol Bacok': ON.", "Awas meledak! Jauhkan benda tajam.", "Sabar, tarik napas... tahan... jangan dibuang sayang."],
    surprised: ["Oomagaaa! 😲", "Plot twist kehidupan emang suka bikin jantungan.", "Muka kagetnya dapet banget, calon meme viral."],
    neutral: ["Si Monyet Lagi Diem.", "Mode NPC: ON. Menunggu instruksi.", "Lagi meditasi apa lagi bengong mikirin cicilan?"]
  };

  useEffect(() => {
    const emotionQuotes = quotesData[emotion.toLowerCase()] || quotesData.neutral;
    setRandomQuote(emotionQuotes[Math.floor(Math.random() * emotionQuotes.length)]);
  }, [emotion]);

  const creativeData = {
    happy: { playlistUrl: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC", playlistLabel: "Putar Lagu Happy 🎵" },
    sad: { playlistUrl: "https://open.spotify.com/playlist/37i9dQZF1DWTwvXSt53CGR", playlistLabel: "Temani Aku Galau 🥀" },
    angry: { playlistUrl: "https://open.spotify.com/playlist/37i9dQZF1DX6tQ6a39u6a4", playlistLabel: "Lepaskan Emosi 🎸" },
    surprised: { playlistUrl: "https://open.spotify.com/playlist/37i9dQZF1DX0Uv9tZ47pWo", playlistLabel: "Party Vibes 🎉" },
    neutral: { playlistUrl: "https://open.spotify.com/playlist/37i9dQZF1DXdxcBWuJkbcy", playlistLabel: "Chill Mode ☕" }
  };
  const currentData = creativeData[emotion.toLowerCase()] || creativeData.neutral;

  const emotionConfig = {
    happy: { pageBg: "bg-gradient-to-br from-gray-900 via-gray-900 to-yellow-900", overlay: "bg-[radial-gradient(circle_at_center_bottom,_var(--tw-gradient-stops))] from-yellow-500/20 via-transparent to-transparent", textInfo: { color: "text-yellow-400" }, border: "border-yellow-400/60 shadow-[0_0_30px_rgba(250,204,21,0.3)]" },
    sad: { pageBg: "bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900", overlay: "bg-[linear-gradient(to_bottom,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent", textInfo: { color: "text-blue-400" }, border: "border-blue-400/50 shadow-[0_0_30px_rgba(96,165,250,0.2)]" },
    angry: { pageBg: "bg-gradient-to-br from-red-950 via-black to-red-950", overlay: "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-red-900/10 to-red-600/20", textInfo: { color: "text-red-500" }, border: "border-red-600/60 shadow-[0_0_30px_rgba(220,38,38,0.4)]" },
    surprised: { pageBg: "bg-gradient-to-r from-indigo-950 via-purple-950 to-indigo-950", overlay: "bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-purple-500/10", textInfo: { color: "text-purple-400" }, border: "border-purple-400/50 shadow-[0_0_30px_rgba(192,132,252,0.3)]" },
    neutral: { pageBg: "bg-[#050505]", overlay: "opacity-0", textInfo: { color: "text-gray-400" }, border: "border-white/10" },
  };

  const currentVibe = emotionConfig[emotion.toLowerCase()] || emotionConfig.neutral;
  const isAngry = emotion.toLowerCase() === 'angry';

  return (
    <main className={`h-screen w-full overflow-hidden relative flex flex-col transition-all duration-1000 ${currentVibe.pageBg} text-white`}>
      
      <style jsx global>{`
        @keyframes fall { 0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; } 100% { transform: translateY(110vh) rotate(360deg); opacity: 0; } }
        .animate-fall { animation-name: fall; animation-timing-function: linear; animation-iteration-count: infinite; }
        @keyframes glitch-smooth { 0% { transform: translate(0); } 25% { transform: translate(-1px, 1px); } 50% { transform: translate(1px, -1px); } 100% { transform: translate(0); } }
        .animate-vibe-shake { animation: glitch-smooth 0.1s ease-in-out infinite; will-change: transform; }
      `}</style>

      <ParticleOverlay emotion={emotion} currentTheme={currentTheme} />
      <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${currentVibe.overlay}`} />

      {/* NAVBAR */}
      <nav className="absolute top-0 w-full z-50 px-6 py-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="w-2 h-6 bg-white/40 rounded-full"></div>
          <h1 className="text-sm font-bold tracking-widest opacity-70">EMOTION UI</h1>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4 pointer-events-auto">
           {/* THEME SELECTOR (DROPDOWN/BUTTONS) */}
           <div className="flex gap-1 bg-black/30 backdrop-blur-md p-1 rounded-full border border-white/10">
              {Object.keys(THEMES).map((themeKey) => (
                <button
                  key={themeKey}
                  onClick={() => setCurrentTheme(themeKey)}
                  className={`text-[10px] md:text-xs px-2 py-1 rounded-full transition-all ${
                    currentTheme === themeKey 
                      ? "bg-white text-black font-bold shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {THEMES[themeKey].label.split(" ")[1]} {/* Ambil iconnya saja biar rapi di HP */}
                </button>
              ))}
           </div>

           <a 
              href="https://sociabuzz.com/zeronaut/tribe" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] md:text-xs font-bold text-red-400 hover:bg-red-500/20 transition-all uppercase tracking-tighter"
           >
              Donate
           </a>
        </div>
      </nav>

      <div className={`flex-1 flex flex-col items-center justify-center gap-4 md:gap-8 px-4 relative z-30 ${isAngry ? 'animate-vibe-shake' : ''}`}>
        
        <div className="text-center space-y-2 md:space-y-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic">
            Detect Your <span className={currentVibe.textInfo.color}>Vibe</span>
          </h2>
          
          <div className="flex flex-col items-center gap-2">
            <div className={`px-4 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm`}>
               <span className={`text-xs md:text-sm font-bold uppercase ${currentVibe.textInfo.color}`}>
                  {emotion}
               </span>
            </div>
            
            <p className="text-[10px] uppercase tracking-widest opacity-40">
              Theme: {THEMES[currentTheme].label}
            </p>

            <div className="h-6 flex items-center justify-center px-4">
              <p className={`text-sm md:text-lg font-medium italic opacity-80 text-center ${currentVibe.textInfo.color}`}>
                "{randomQuote}"
              </p>
            </div>
          </div>
        </div>

        <div className="relative shrink-0">
          <div className={`absolute -inset-6 rounded-[2rem] opacity-20 blur-2xl transition-all duration-700 ${currentVibe.textInfo.color.replace('text-', 'bg-')}`}></div>
          <div className={`relative bg-black rounded-3xl p-1 transition-all duration-500 ${currentVibe.border}`}>
             <div className="rounded-[1.4rem] overflow-hidden w-[280px] sm:w-[320px] md:w-[400px] aspect-[4/3] bg-neutral-900 shadow-2xl flex items-center justify-center">
                <WebcamView onEmotionDetected={setEmotion} />
             </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <a href={currentData.playlistUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 px-5 py-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all scale-90 md:scale-100 ${currentVibe.textInfo.color.replace('text-', 'hover:border-')}`}>
            <div className="text-green-400"><SpotifyIcon /></div>
            <div className="text-left">
              <p className="text-[10px] opacity-50 uppercase font-bold">Recommended</p>
              <p className="text-xs font-bold">{currentData.playlistLabel}</p>
            </div>
          </a>
        </div>

      </div>
    </main>
  );
}

function SocialLink({ href, icon }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-opacity p-1">{icon}</a>;
}
const GithubIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>);
const InstagramIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>);
const SpotifyIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.299z"/></svg>);