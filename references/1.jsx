import React, { useState } from 'react';
import { 
  Wallet, Share2, Trophy, Ticket, Users, Twitter, 
  MessageCircle, Repeat, Heart, CheckCircle2, Copy, Star, Zap, Home
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

const TASKS = [
  { id: 't1', category: 'Community', title: 'Follow @abc (Twitter)', points: 250, icon: Twitter, color: 'bg-sky-500' },
  { id: 't2', category: 'Community', title: 'Follow @abc (BaseApp)', points: 250, icon: Zap, color: 'bg-blue-600' },
  { id: 't3', category: 'Community', title: 'Join Discord', points: 250, icon: MessageCircle, color: 'bg-indigo-500' },
  { id: 't4', category: 'Community', title: 'Join Telegram', points: 250, icon: Share2, color: 'bg-blue-400' },
  
  { id: 't5', category: 'One-Time Boosts', title: 'Original Post (Twitter)', points: 300, icon: Twitter, color: 'bg-sky-500' },
  { id: 't6', category: 'One-Time Boosts', title: 'Original Post (BaseApp)', points: 300, icon: Zap, color: 'bg-blue-600' },
  { id: 't7', category: 'One-Time Boosts', title: 'Quote Tweet (Twitter)', points: 200, icon: Repeat, color: 'bg-sky-500' },
  { id: 't8', category: 'One-Time Boosts', title: 'Quote Tweet (BaseApp)', points: 200, icon: Repeat, color: 'bg-blue-600' },
  { id: 't9', category: 'One-Time Boosts', title: 'Retweet (Twitter)', points: 150, icon: Repeat, color: 'bg-sky-500' },
  { id: 't10', category: 'One-Time Boosts', title: 'Retweet (BaseApp)', points: 150, icon: Repeat, color: 'bg-blue-600' },
  
  { id: 't15', category: 'Daily Grind', title: 'Daily Check-in', points: 50, icon: CheckCircle2, color: 'bg-green-500' },
  { id: 't16', category: 'Daily Grind', title: 'Daily Post (Twitter)', points: 250, icon: Twitter, color: 'bg-sky-500' },
  { id: 't17', category: 'Daily Grind', title: 'Daily Post (BaseApp)', points: 250, icon: Zap, color: 'bg-blue-600' },
];

export default function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [username, setUsername] = useState('');
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'quests', 'leaderboard'
  
  // User Stats
  const [points, setPoints] = useState(0);
  const [rank, setRank] = useState('Unranked');
  const [completedTasks, setCompletedTasks] = useState([]);
  const [referrals, setReferrals] = useState(0);

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
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-slate-900 selection:bg-pink-500 selection:text-white">
        <div className="w-full max-w-md bg-white text-slate-900 p-8 rounded-3xl border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-400 rounded-full border-4 border-black z-0"></div>
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-400 rounded-full border-4 border-black z-0"></div>
          
          <div className="relative z-10">
            <h1 className="text-5xl font-black mb-2 tracking-tight text-blue-600 uppercase drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              BASED<br/>GAMES
            </h1>
            <p className="font-bold text-lg mb-8 text-slate-700">The most chaotic tournament on Base.</p>

            <form onSubmit={handleConnect} className="space-y-4">
              <input 
                type="text" 
                placeholder="Enter your Username" 
                className="w-full p-4 text-xl font-bold rounded-xl border-4 border-black outline-none focus:ring-4 focus:ring-pink-400 focus:border-black transition-all bg-sky-50 text-center"
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

  // --- DASHBOARD (MOBILE LAYOUT) ---
  return (
    <div className="min-h-screen bg-slate-200 flex justify-center font-sans text-slate-900">
      {/* Mobile Container Simulator */}
      <div className="w-full max-w-md bg-sky-50 min-h-screen border-x-4 border-black relative shadow-[8px_0_15px_rgba(0,0,0,0.2)] flex flex-col">
        
        {/* Header */}
        <header className="bg-white border-b-4 border-black p-4 flex justify-between items-center sticky top-0 z-40 shadow-[0_4px_0_0_rgba(0,0,0,1)]">
          <h1 className="text-2xl font-black italic text-blue-600 uppercase">BASED</h1>
          <div className="bg-sky-100 border-2 border-black px-3 py-1.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse border border-black"></div>
            {username}
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 pb-28 custom-scrollbar">
          
          {/* TAB: HOME */}
          {activeTab === 'home' && (
            <div className="space-y-6 animate-in slide-in-from-left-4 fade-in duration-200">
              {/* Shareable Card */}
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-5 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay"></div>
                
                <div className="flex justify-between items-start relative z-10 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-white rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-3xl">
                      {getAvatar()}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white drop-shadow-[1px_1px_0px_rgba(0,0,0,1)] leading-none mb-1">{username}</h2>
                      <p className="font-bold text-yellow-300 drop-shadow-[1px_1px_0px_rgba(0,0,0,1)] text-sm">Rank #{rank}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5 relative z-10">
                  <div className="bg-black/20 p-2.5 rounded-xl border-2 border-black/30 backdrop-blur-sm">
                    <p className="text-blue-100 text-[10px] font-black uppercase tracking-wider mb-0.5">Total Points</p>
                    <p className="text-xl font-black text-white">{points.toLocaleString()}</p>
                  </div>
                  <div className="bg-black/20 p-2.5 rounded-xl border-2 border-black/30 backdrop-blur-sm">
                    <p className="text-blue-100 text-[10px] font-black uppercase tracking-wider mb-0.5">Tickets</p>
                    <div className="flex items-center gap-1">
                      <Ticket className="text-pink-400 w-5 h-5" />
                      <p className="text-xl font-black text-white">{tickets}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-400 text-black p-2 rounded-xl border-2 border-black font-black text-center relative z-10 transform -rotate-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-sm">
                  STACK POINTS. WIN PASSES.
                </div>

                <button 
                  onClick={handleShare}
                  className="mt-5 w-full bg-pink-500 text-white font-black py-3 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all flex justify-center items-center gap-2"
                >
                  <Twitter size={18} /> Share to X
                </button>
              </div>

              {/* Lottery Progress Widget */}
              <div className="bg-white rounded-3xl p-5 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-black uppercase flex items-center gap-2 text-lg">
                    <Ticket className="text-pink-500" size={20} /> Next Ticket
                  </h3>
                  <span className="font-black text-pink-500 text-sm">{points % 500} / 500</span>
                </div>
                <div className="w-full bg-sky-100 rounded-full h-4 border-2 border-black overflow-hidden relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
                  <div 
                    className="bg-pink-500 h-full border-r-2 border-black transition-all duration-500 ease-out"
                    style={{ width: `${(points % 500) / 5}%` }}
                  ></div>
                </div>
                <p className="text-xs font-bold text-slate-500 mt-2 text-center">Every 500 pts = 1 Raffle Entry for $25/$5 Passes</p>
              </div>

              {/* Referral Box */}
              <div className="bg-blue-600 text-white rounded-3xl p-5 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-xl font-black uppercase mb-1 flex items-center gap-2 drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                  <Users size={20} /> Refer Squad
                </h3>
                <p className="font-bold text-blue-200 text-xs mb-4">
                  Current Multiplier: <span className="text-yellow-400 font-black">{referrals < 5 ? '200' : referrals < 20 ? '300' : '500'} pts</span>
                </p>
                
                <div className="bg-white text-black p-3 rounded-xl border-2 border-black font-mono font-bold text-sm flex items-center justify-between mb-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
                  <span>{username.toLowerCase()}-based</span>
                  <Copy size={16} className="text-slate-400" />
                </div>

                <button 
                  onClick={simulateReferral}
                  className="w-full bg-yellow-400 text-black font-black py-3 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all uppercase text-sm"
                >
                  Simulate Referral ({referrals})
                </button>
              </div>
            </div>
          )}

          {/* TAB: QUESTS */}
          {activeTab === 'quests' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-200">
              {['Community', 'One-Time Boosts', 'Daily Grind'].map(category => (
                <div key={category} className="bg-white rounded-3xl p-5 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <h4 className="text-lg font-black text-black uppercase mb-4 flex items-center gap-2">
                    <Star className="text-yellow-400 fill-yellow-400 stroke-black stroke-2" size={20} />
                    {category}
                  </h4>
                  <div className="space-y-3">
                    {TASKS.filter(t => t.category === category).map(task => {
                      const isCompleted = completedTasks.includes(task.id);
                      return (
                        <div 
                          key={task.id}
                          onClick={() => !isCompleted && completeTask(task.id, task.points)}
                          className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all cursor-pointer ${
                            isCompleted 
                              ? 'bg-slate-100 border-slate-300 opacity-60' 
                              : 'bg-white border-black active:bg-sky-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-white shrink-0 ${task.color} ${isCompleted && 'grayscale'}`}>
                              <task.icon size={14} />
                            </div>
                            <span className={`font-bold text-sm ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                              {task.title}
                            </span>
                          </div>
                          <span className={`font-black shrink-0 ml-2 ${isCompleted ? 'text-slate-400' : 'text-pink-600'}`}>
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
            <div className="animate-in slide-in-from-bottom-4 fade-in duration-200 space-y-4">
              
              {/* Cutoffs Banner */}
              <div className="bg-sky-100 border-4 border-black rounded-2xl p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm font-bold flex flex-col gap-2">
                <div className="flex justify-between items-center bg-white p-2 rounded-lg border-2 border-black">
                  <span>🏆 Top 100:</span>
                  <span className="text-pink-600 font-black">{CUTOFFS.rank100.toLocaleString()} pts</span>
                </div>
                <div className="flex justify-between items-center bg-white p-2 rounded-lg border-2 border-black">
                  <span>🏅 Top 500:</span>
                  <span className="text-pink-600 font-black">{CUTOFFS.rank500.toLocaleString()} pts</span>
                </div>
              </div>

              {/* Leaderboard List */}
              <div className="bg-white rounded-3xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <div className="p-4 bg-yellow-400 border-b-4 border-black text-center">
                  <h3 className="text-lg font-black uppercase text-black drop-shadow-[1px_1px_0px_rgba(255,255,255,1)]">
                    Global Top 10
                  </h3>
                </div>
                <div className="divide-y-2 divide-black/10">
                  {LEADERBOARD_DATA.map((user) => (
                    <div key={user.rank} className="flex items-center justify-between p-3 bg-white">
                      <div className="flex items-center gap-3">
                        <span className={`font-black w-5 text-center text-sm ${user.rank <= 3 ? 'text-pink-600' : 'text-slate-400'}`}>
                          {user.rank}
                        </span>
                        <span className="text-xl">{user.avatar}</span>
                        <span className="font-bold text-sm text-slate-900">{user.username}</span>
                      </div>
                      <div className="font-black text-sm text-blue-600">{user.points.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- BOTTOM NAVIGATION BAR --- */}
        <nav className="absolute bottom-0 w-full bg-white border-t-4 border-black p-3 flex justify-around items-center pb-safe shadow-[0_-4px_0_0_rgba(0,0,0,1)] z-50">
          
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 p-2 w-20 transition-all ${activeTab === 'home' ? 'text-pink-600 -translate-y-1' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Home size={24} className={activeTab === 'home' ? 'fill-pink-100' : ''} />
            <span className="text-[10px] font-black uppercase tracking-wider">Home</span>
            {activeTab === 'home' && <div className="absolute -bottom-1 w-1 h-1 bg-pink-600 rounded-full"></div>}
          </button>
          
          <button 
            onClick={() => setActiveTab('quests')}
            className={`flex flex-col items-center gap-1 p-2 w-20 transition-all ${activeTab === 'quests' ? 'text-blue-600 -translate-y-1' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Star size={24} className={activeTab === 'quests' ? 'fill-blue-100' : ''} />
            <span className="text-[10px] font-black uppercase tracking-wider">Quests</span>
            {activeTab === 'quests' && <div className="absolute -bottom-1 w-1 h-1 bg-blue-600 rounded-full"></div>}
          </button>
          
          <button 
            onClick={() => setActiveTab('leaderboard')}
            className={`flex flex-col items-center gap-1 p-2 w-20 transition-all ${activeTab === 'leaderboard' ? 'text-yellow-500 -translate-y-1' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Trophy size={24} className={activeTab === 'leaderboard' ? 'fill-yellow-100' : ''} />
            <span className="text-[10px] font-black uppercase tracking-wider">Ranks</span>
            {activeTab === 'leaderboard' && <div className="absolute -bottom-1 w-1 h-1 bg-yellow-500 rounded-full"></div>}
          </button>
        </nav>

        {/* Sticky User Rank overlay on Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="absolute bottom-20 left-4 right-4 bg-blue-600 border-4 border-black rounded-xl p-3 flex justify-between items-center text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-40 animate-in slide-in-from-bottom-8">
            <div className="flex items-center gap-2">
              <span className="font-black">YOU</span>
              <span className="text-xs bg-black/20 px-2 py-1 rounded-md font-bold border border-black/30">Rank #{rank}</span>
            </div>
            <div className="font-black text-yellow-300">{points.toLocaleString()} pts</div>
          </div>
        )}

      </div>
      
      {/* Hide Scrollbar for cleaner mobile look */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 12px); }
      `}} />
    </div>
  );
}