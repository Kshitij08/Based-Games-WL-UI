import React, { useState } from 'react';
import { 
  Wallet, Share2, Trophy, Ticket, Users, Twitter, 
  MessageCircle, Repeat, Heart, CheckCircle2, Copy, Star, Zap, Home, User
} from 'lucide-react';

// --- MOCK DATA ---
const LEADERBOARD_DATA = [
  { rank: 1, username: 'BaseGod', points: 15400, tickets: 30, avatar: '👑' },
  { rank: 2, username: 'StumbleKing', points: 14200, tickets: 28, avatar: '😎' },
  { rank: 3, username: 'CryptoFall', points: 13500, tickets: 27, avatar: '🚀' },
  { rank: 4, username: 'DiamondHands', points: 12100, tickets: 24, avatar: '💎' },
  { rank: 5, username: 'DegenDash', points: 11800, tickets: 23, avatar: '🏃' },
  { rank: 6, username: 'ApeGamer', points: 11500, tickets: 23, avatar: '🦍' },
  { rank: 7, username: 'WhaleSniper', points: 10900, tickets: 21, avatar: '🐳' },
  { rank: 8, username: 'BasedChad', points: 10200, tickets: 20, avatar: '🗿' },
  { rank: 9, username: 'PepeRunner', points: 9800, tickets: 19, avatar: '🐸' },
  { rank: 10, username: 'GigaBrain', points: 9500, tickets: 19, avatar: '🧠' },
];

const CUTOFFS = {
  rank100: 5200,
  rank500: 2100
};

// Updated Tasks corresponding to the PRD
const TASKS = [
  // Community Actions
  { id: 'c1', category: 'Community', title: 'Follow @abc (Twitter)', points: 250, icon: Twitter, color: 'bg-sky-500' },
  { id: 'c2', category: 'Community', title: 'Follow @abc (BaseApp)', points: 250, icon: Zap, color: 'bg-blue-600' },
  { id: 'c3', category: 'Community', title: 'Join Discord', points: 250, icon: MessageCircle, color: 'bg-indigo-500' },
  { id: 'c4', category: 'Community', title: 'Join TG', points: 250, icon: Share2, color: 'bg-blue-400' },
  
  // Post & Engagement
  { id: 'p1', category: 'Posts & Engagement', title: 'Post tagging @abc (Twitter)', points: 300, icon: Twitter, color: 'bg-sky-500' },
  { id: 'p2', category: 'Posts & Engagement', title: 'Post tagging @abc (BaseApp)', points: 300, icon: Zap, color: 'bg-blue-600' },
  { id: 'p3', category: 'Posts & Engagement', title: 'Quote Tweet (Twitter)', points: 200, icon: Repeat, color: 'bg-sky-500' },
  { id: 'p4', category: 'Posts & Engagement', title: 'Quote Tweet (BaseApp)', points: 200, icon: Repeat, color: 'bg-blue-600' },
  { id: 'p5', category: 'Posts & Engagement', title: 'Retweet (Twitter)', points: 150, icon: Repeat, color: 'bg-sky-500' },
  { id: 'p6', category: 'Posts & Engagement', title: 'Retweet (BaseApp)', points: 150, icon: Repeat, color: 'bg-blue-600' },
  { id: 'p7', category: 'Posts & Engagement', title: 'Comment (Twitter)', points: 100, icon: MessageCircle, color: 'bg-sky-500' },
  { id: 'p8', category: 'Posts & Engagement', title: 'Comment (BaseApp)', points: 100, icon: MessageCircle, color: 'bg-blue-600' },
  { id: 'p9', category: 'Posts & Engagement', title: 'Like (Twitter)', points: 50, icon: Heart, color: 'bg-sky-500' },
  { id: 'p10', category: 'Posts & Engagement', title: 'Like (BaseApp)', points: 50, icon: Heart, color: 'bg-blue-600' },
  
  // Daily Actions
  { id: 'd1', category: 'Daily Grind', title: 'Daily Check-in', points: 50, icon: CheckCircle2, color: 'bg-green-500' },
  { id: 'd2', category: 'Daily Grind', title: 'Daily Post (Twitter)', points: 250, icon: Twitter, color: 'bg-sky-500' },
  { id: 'd3', category: 'Daily Grind', title: 'Daily Post (BaseApp)', points: 250, icon: Zap, color: 'bg-blue-600' },
];

export default function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [username, setUsername] = useState('');
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'quests', 'leaderboard', 'profile'
  
  // User Stats & Profile
  const [points, setPoints] = useState(0);
  const [rank, setRank] = useState('Unranked');
  const [completedTasks, setCompletedTasks] = useState([]);
  const [referrals, setReferrals] = useState(0);
  const [twitterConnected, setTwitterConnected] = useState(false);

  // Mock Profile Data
  const walletAddress = "0x7F...4A2b";
  const ethBalance = "0.045";

  const tickets = Math.floor(points / 500);

  const getAvatar = () => {
    if (points > 5000) return '👑';
    if (points > 2000) return '🚀';
    if (points > 500) return '😎';
    return '👾';
  };

  const handleConnect = (e) => {
    e.preventDefault();
    if (username.trim().length > 2) {
      setIsRegistered(true);
      setPoints(50); 
      setRank('12,405'); 
    }
  };

  const completeTask = (taskId, taskPoints) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks([...completedTasks, taskId]);
      setPoints(prev => prev + taskPoints);
      if (points + taskPoints > CUTOFFS.rank500) setRank('482');
      if (points + taskPoints > CUTOFFS.rank100) setRank('94');
    }
  };

  const simulateReferral = () => {
    setReferrals(prev => prev + 1);
    // Logic corresponding to PRD: 1-5 = 200, 6-20 = 300, 21+ = 500
    let refPoints = referrals < 5 ? 200 : referrals < 20 ? 300 : 500;
    setPoints(prev => prev + refPoints);
  };

  const handleShare = () => {
    const tweetText = `Stack points. Win passes. Get Based.\n\nI'm ranked ${rank} on the @abc Based Games Waitlist with ${tickets} Lottery Tickets! 🎟️\n\nUse my code: ${username.toUpperCase()}-BASED\nJoin here: basedgames.xyz`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank');
  };

  // --- LOGIN SCREEN ---
  if (!isRegistered) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 font-sans text-slate-900 selection:bg-pink-500 selection:text-white relative">
        {/* Video background + overlay (same as Home tab) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          <source src="/Based%20Games%20Trailer.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-0 pointer-events-none bg-black/60" aria-hidden />

        <div className="w-full max-w-md p-8 rounded-3xl border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center relative z-10 overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600">
          <div className="relative z-10">
            <img
              src="/logo_base.png"
              alt="Based Games"
              className="max-w-[200px] w-full h-auto mx-auto mb-4 drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]"
            />
            <p className="font-bold text-lg mb-8 text-white">The most chaotic tournament on Base.</p>

            <form onSubmit={handleConnect} className="space-y-4">
              <input 
                type="text" 
                placeholder="Enter your Username" 
                className="w-full p-4 text-xl font-bold rounded-xl border-4 border-black outline-none focus:ring-4 focus:ring-pink-400 focus:border-black transition-all bg-white/90 text-slate-900 text-center placeholder:text-slate-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                maxLength={15}
              />
              <button 
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xl p-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 uppercase"
              >
                <Wallet size={24} />
                Connect Wallet
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Helper for Desktop Navigation styling
  const getNavBtnClass = (id, baseColor, activeColor) => `
    w-full flex items-center gap-4 p-4 rounded-2xl font-black uppercase transition-all border-4 
    ${activeTab === id 
      ? `bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${activeColor} translate-x-2` 
      : `border-transparent text-slate-500 hover:bg-slate-200 hover:text-slate-800`
    }
  `;

  // --- DASHBOARD LAYOUT (RESPONSIVE DESKTOP & MOBILE) ---
  return (
    <div className="flex h-screen w-full bg-slate-200 font-sans text-slate-900 overflow-hidden">
      
      {/* DESKTOP SIDEBAR (Hidden on Mobile) */}
      <aside className="hidden md:flex w-80 bg-slate-100 border-r-4 border-black flex-col shadow-[4px_0_15px_rgba(0,0,0,0.1)] z-50 relative">
        <div className="p-8 border-b-4 border-black bg-white">
          <h1 className="text-4xl font-black italic text-blue-600 uppercase drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">BASED<br/>GAMES</h1>
        </div>
        
        <nav className="flex-1 p-6 space-y-4 overflow-y-auto">
          <button onClick={() => setActiveTab('home')} className={getNavBtnClass('home', '', 'text-pink-600')}>
            <Home size={28} className={activeTab === 'home' ? 'fill-pink-100' : ''} /> Home
          </button>
          <button onClick={() => setActiveTab('quests')} className={getNavBtnClass('quests', '', 'text-blue-600')}>
            <Star size={28} className={activeTab === 'quests' ? 'fill-blue-100' : ''} /> Quests
          </button>
          <button onClick={() => setActiveTab('leaderboard')} className={getNavBtnClass('leaderboard', '', 'text-yellow-600')}>
            <Trophy size={28} className={activeTab === 'leaderboard' ? 'fill-yellow-100' : ''} /> Ranks
          </button>
          <button onClick={() => setActiveTab('profile')} className={getNavBtnClass('profile', '', 'text-green-600')}>
            <User size={28} className={activeTab === 'profile' ? 'fill-green-100' : ''} /> Profile
          </button>
        </nav>

        <div className="p-6 border-t-4 border-black bg-white flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-sky-100 rounded-xl border-2 border-black flex items-center justify-center text-xl">
               {getAvatar()}
             </div>
             <div>
               <p className="font-black text-sm uppercase">{username}</p>
               <p className="text-xs font-bold text-slate-500">{ethBalance} ETH</p>
             </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen relative bg-sky-50 overflow-hidden">
        
        {/* Video background + overlay on all pages */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          <source src="/Based%20Games%20Trailer.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-0 pointer-events-none bg-black/60" aria-hidden />

        {/* Mobile Header (Hidden on Desktop) */}
        <header className="md:hidden bg-white border-b-4 border-black p-4 flex justify-between items-center sticky top-0 z-40 shadow-[0_4px_0_0_rgba(0,0,0,1)]">
          <h1 className="text-2xl font-black italic text-blue-600 uppercase">BASED</h1>
          <div className="bg-sky-100 border-2 border-black px-3 py-1.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse border border-black"></div>
            {username}
          </div>
        </header>

        {/* Desktop Header Banner */}
        <header className="hidden md:flex bg-white border-b-4 border-black p-6 justify-between items-center z-30">
           <h2 className="text-3xl font-black uppercase text-slate-800">{activeTab}</h2>
           <div className="bg-blue-600 text-white border-4 border-black px-5 py-2 rounded-xl font-black flex items-center gap-3 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
             <span>RANK #{rank}</span>
             <span className="text-yellow-300">• {points.toLocaleString()} PTS</span>
           </div>
        </header>

        {/* Scrollable Container – extra bottom padding on mobile so content clears the nav */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8 custom-scrollbar relative z-10 min-h-0">
          <div className="max-w-3xl mx-auto">

            {/* TAB: HOME */}
            {activeTab === 'home' && (
              <div className="space-y-6 animate-in slide-in-from-left-4 fade-in duration-200">
                {/* Logo */}
                <div className="flex justify-center">
                  <img
                    src="/logo_base.png"
                    alt="Based Games"
                    className="max-w-[220px] w-full h-auto drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]"
                  />
                </div>
                {/* Shareable Card */}
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay"></div>
                  
                  <div className="flex justify-between items-start relative z-10 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-4xl">
                        {getAvatar()}
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] leading-none mb-1">{username}</h2>
                        <p className="font-bold text-yellow-300 drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">Rank #{rank}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                    <div className="bg-black/20 p-3 rounded-xl border-2 border-black/30 backdrop-blur-sm">
                      <p className="text-blue-100 text-xs font-black uppercase tracking-wider mb-1">Total Points</p>
                      <p className="text-2xl font-black text-white">{points.toLocaleString()}</p>
                    </div>
                    <div className="bg-black/20 p-3 rounded-xl border-2 border-black/30 backdrop-blur-sm">
                      <p className="text-blue-100 text-xs font-black uppercase tracking-wider mb-1">Tickets</p>
                      <div className="flex items-center gap-2">
                        <Ticket className="text-pink-400 w-6 h-6" />
                        <p className="text-2xl font-black text-white">{tickets}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-400 text-black p-3 rounded-xl border-2 border-black font-black text-center relative z-10 transform -rotate-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-6 md:text-lg">
                    STACK POINTS. WIN PASSES. GET BASED.
                  </div>

                  <button 
                    onClick={handleShare}
                    className="w-full bg-pink-500 text-white font-black py-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all flex justify-center items-center gap-2 text-lg"
                  >
                    <Twitter size={20} /> Share to X
                  </button>
                </div>

                {/* Lottery Progress Widget */}
                <div className="bg-white rounded-3xl p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-black uppercase flex items-center gap-2 text-xl">
                      <Ticket className="text-pink-500" size={24} /> Lottery
                    </h3>
                    <span className="font-black text-pink-500 text-lg">{points % 500} / 500</span>
                  </div>
                  
                  <div className="w-full bg-sky-100 rounded-full h-5 border-2 border-black overflow-hidden relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] mb-4">
                    <div 
                      className="bg-pink-500 h-full border-r-2 border-black transition-all duration-500 ease-out"
                      style={{ width: `${(points % 500) / 5}%` }}
                    ></div>
                  </div>
                  
                  <p className="font-bold text-slate-600 text-center mb-4">Every 500 pts = 1 Lottery Ticket</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-100 border-2 border-black rounded-xl p-3 text-center flex flex-col items-center justify-center">
                      <span className="font-black text-lg text-slate-800">$25 Pass</span>
                      <span className="text-sm font-bold text-pink-600">25 Winners</span>
                    </div>
                    <div className="bg-slate-100 border-2 border-black rounded-xl p-3 text-center flex flex-col items-center justify-center">
                      <span className="font-black text-lg text-slate-800">$5 Pass</span>
                      <span className="text-sm font-bold text-blue-600">100 Winners</span>
                    </div>
                  </div>
                </div>

                {/* Referral Box */}
                <div className="bg-blue-600 text-white rounded-3xl p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xl font-black uppercase mb-1 flex items-center gap-2 drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                    <Users size={22} /> Refer Squad
                  </h3>
                  <p className="font-bold text-blue-200 text-sm mb-4">
                    Current Multiplier: <span className="text-yellow-400 font-black px-1">{referrals < 5 ? '200' : referrals < 20 ? '300' : '500'} pts</span> per invite
                  </p>
                  
                  <div className="bg-white text-black p-4 rounded-xl border-2 border-black font-mono font-bold text-lg flex items-center justify-between mb-5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
                    <span>{username.toLowerCase()}-based</span>
                    <Copy size={20} className="text-slate-400 cursor-pointer hover:text-slate-600" />
                  </div>

                  <button 
                    onClick={simulateReferral}
                    className="w-full bg-yellow-400 text-black font-black py-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all uppercase text-lg"
                  >
                    Simulate Referral ({referrals})
                  </button>
                </div>
              </div>
            )}

            {/* TAB: QUESTS */}
            {activeTab === 'quests' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-200">
                {['Community', 'Daily Grind', 'Posts & Engagement'].map(category => (
                  <div
                    key={category}
                    className={`rounded-3xl p-5 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${category === 'Community' ? 'bg-yellow-400' : ''}`}
                    style={category !== 'Community' ? { backgroundColor: '#d2d8e6' } : undefined}
                  >
                    <h4 className={`text-xl font-black uppercase mb-4 flex items-center gap-2 ${category === 'Community' ? 'text-black' : 'text-slate-900'}`}>
                      <Star className="text-yellow-400 fill-yellow-400 stroke-black stroke-2" size={24} />
                      {category}
                    </h4>
                    <div className="space-y-3">
                      {TASKS.filter(t => t.category === category)
                        .sort((a, b) => {
                          const aDone = completedTasks.includes(a.id);
                          const bDone = completedTasks.includes(b.id);
                          if (aDone === bDone) return 0;
                          return aDone ? 1 : -1;
                        })
                        .map(task => {
                        const isCompleted = completedTasks.includes(task.id);
                        return (
                          <div 
                            key={task.id}
                            onClick={() => !isCompleted && completeTask(task.id, task.points)}
                            className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                              isCompleted 
                                ? 'bg-slate-100 border-slate-300 opacity-60' 
                                : 'bg-white border-black active:bg-sky-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[3px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-white shrink-0 ${task.color} ${isCompleted && 'grayscale'}`}>
                                <task.icon size={18} />
                              </div>
                              <span className={`font-bold md:text-lg ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                                {task.title}
                              </span>
                            </div>
                            <span className={`font-black shrink-0 ml-2 md:text-lg ${isCompleted ? 'text-slate-400' : 'text-pink-600'}`}>
                              +{task.points}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: LEADERBOARD */}
            {activeTab === 'leaderboard' && (
              <div className="animate-in slide-in-from-bottom-4 fade-in duration-200 space-y-6">
                <div className="space-y-6">
                  {/* Detailed Cutoffs Banner – Refer Squad blue outer, white inner */}
                  <div className="bg-blue-600 border-4 border-black rounded-3xl p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3">
                    <div className="flex justify-between items-center bg-white p-4 rounded-2xl border-2 border-black">
                      <div className="flex items-center gap-3">
                        <Trophy className="text-yellow-500" size={24} />
                        <span className="font-black text-lg">Top 100</span>
                      </div>
                      <div className="text-right">
                        <span className="text-pink-600 font-black block text-lg">$25 Pass</span>
                        <span className="text-slate-500 text-sm font-bold">Cutoff: {CUTOFFS.rank100.toLocaleString()} pts</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center bg-white p-4 rounded-2xl border-2 border-black">
                      <div className="flex items-center gap-3">
                        <Trophy className="text-slate-400" size={24} />
                        <span className="font-black text-lg">Rank 101 - 500</span>
                      </div>
                      <div className="text-right">
                        <span className="text-blue-600 font-black block text-lg">$5 Pass</span>
                        <span className="text-slate-500 text-sm font-bold">Cutoff: {CUTOFFS.rank500.toLocaleString()} pts</span>
                      </div>
                    </div>
                  </div>

                  {/* Leaderboard List */}
                  <div className="bg-white rounded-3xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <div className="p-5 bg-yellow-400 border-b-4 border-black text-center">
                      <h3 className="text-xl font-black uppercase text-black drop-shadow-[1px_1px_0px_rgba(255,255,255,1)]">
                        Global Top 10
                      </h3>
                    </div>
                    <div className="divide-y-2 divide-black/10">
                      {LEADERBOARD_DATA.map((user) => (
                        <div key={user.rank} className="flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <span className={`font-black w-6 text-center text-lg ${user.rank <= 3 ? 'text-pink-600' : 'text-slate-400'}`}>
                              {user.rank}
                            </span>
                            <span className="text-3xl">{user.avatar}</span>
                            <span className="font-bold text-slate-900 text-lg">{user.username}</span>
                          </div>
                          <div className="font-black text-blue-600 text-lg">{user.points.toLocaleString()}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Your rank card – in flow so it doesn’t hide the leaderboard */}
                  <div className="bg-blue-600 border-4 border-black rounded-2xl p-4 flex justify-between items-center text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-3">
                      <span className="font-black text-xl">YOU</span>
                      <span className="text-sm bg-black/20 px-3 py-1.5 rounded-lg font-bold border border-black/30">Rank #{rank}</span>
                    </div>
                    <div className="font-black text-yellow-300 text-xl">{points.toLocaleString()} pts</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PROFILE */}
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-200">
                {/* Twitter Connection */}
                <div className="bg-white rounded-3xl p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="font-black uppercase mb-5 flex items-center gap-2 text-xl">
                    <Twitter className="text-sky-500 fill-sky-500" size={24} /> Twitter Integration
                  </h3>
                  
                  {twitterConnected ? (
                    <div className="flex items-center justify-between bg-sky-50 p-4 rounded-2xl border-2 border-black">
                      <span className="font-black text-lg text-slate-800">@{username}</span>
                      <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full border-2 border-green-500 font-bold text-sm">
                        <CheckCircle2 size={16} /> Connected
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setTwitterConnected(true)} 
                      className="w-full bg-sky-500 text-white font-black py-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all text-lg flex justify-center items-center gap-2"
                    >
                      Connect Twitter Profile
                    </button>
                  )}
                </div>

                {/* Wallet Details */}
                <div className="bg-white rounded-3xl p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="font-black uppercase mb-5 flex items-center gap-2 text-xl">
                    <Wallet className="text-yellow-500" size={24} /> Wallet Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-slate-100 p-4 rounded-2xl border-2 border-black flex justify-between items-center">
                      <span className="font-black text-slate-500 uppercase text-sm">Address</span>
                      <span className="font-mono font-bold text-slate-800">{walletAddress}</span>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-2xl border-2 border-black flex justify-between items-center">
                      <span className="font-black text-slate-500 uppercase text-sm">Network</span>
                      <span className="font-black text-blue-600 flex items-center gap-1">
                        <Zap size={16} className="fill-blue-600" /> Base
                      </span>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-2xl border-2 border-black flex justify-between items-center">
                      <span className="font-black text-slate-500 uppercase text-sm">Balance</span>
                      <span className="font-black text-slate-800">{ethBalance} ETH</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => { setIsRegistered(false); setActiveTab('home'); }}
                    className="w-full mt-6 bg-red-500 text-white font-black py-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all uppercase text-lg"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* --- MOBILE BOTTOM NAVIGATION BAR (Shrink-0 inline layout, no longer absolute) --- */}
        <nav className="md:hidden w-full shrink-0 bg-white border-t-4 border-black p-3 flex justify-around items-center pb-safe shadow-[0_-4px_0_0_rgba(0,0,0,1)] z-50 relative">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 p-2 w-16 transition-all ${activeTab === 'home' ? 'text-pink-600 -translate-y-1' : 'text-slate-400 hover:text-slate-600'}`}>
            <Home size={24} className={activeTab === 'home' ? 'fill-pink-100' : ''} />
            <span className="text-[10px] font-black uppercase tracking-wider">Home</span>
            {activeTab === 'home' && <div className="absolute -bottom-1 w-1.5 h-1.5 bg-pink-600 rounded-full"></div>}
          </button>
          
          <button onClick={() => setActiveTab('quests')} className={`flex flex-col items-center gap-1 p-2 w-16 transition-all ${activeTab === 'quests' ? 'text-blue-600 -translate-y-1' : 'text-slate-400 hover:text-slate-600'}`}>
            <Star size={24} className={activeTab === 'quests' ? 'fill-blue-100' : ''} />
            <span className="text-[10px] font-black uppercase tracking-wider">Quests</span>
            {activeTab === 'quests' && <div className="absolute -bottom-1 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>}
          </button>
          
          <button onClick={() => setActiveTab('leaderboard')} className={`flex flex-col items-center gap-1 p-2 w-16 transition-all ${activeTab === 'leaderboard' ? 'text-yellow-500 -translate-y-1' : 'text-slate-400 hover:text-slate-600'}`}>
            <Trophy size={24} className={activeTab === 'leaderboard' ? 'fill-yellow-100' : ''} />
            <span className="text-[10px] font-black uppercase tracking-wider">Ranks</span>
            {activeTab === 'leaderboard' && <div className="absolute -bottom-1 w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>}
          </button>

          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 p-2 w-16 transition-all ${activeTab === 'profile' ? 'text-green-600 -translate-y-1' : 'text-slate-400 hover:text-slate-600'}`}>
            <User size={24} className={activeTab === 'profile' ? 'fill-green-100' : ''} />
            <span className="text-[10px] font-black uppercase tracking-wider">Profile</span>
            {activeTab === 'profile' && <div className="absolute -bottom-1 w-1.5 h-1.5 bg-green-600 rounded-full"></div>}
          </button>
        </nav>

      </main>
      
      {/* Hide Scrollbar CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 12px); }
      `}} />
    </div>
  );
}