'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { redirect } from 'next/navigation';

interface Game {
  id: string;
  title: string;
  description: string;
  status: string;
  engineType?: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  summoningColor: string;
}

type WelcomeMessageType = {
  id?: number;
  message: string;
} | string;

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [games, setGames] = useState<Game[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [messages, setMessages] = useState<WelcomeMessageType[]>([]);
  const [activeTab, setActiveTab] = useState<'games' | 'team' | 'messages'>('games');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    if (! session || session.user?.role !== 'admin') {
      redirect('/dashboard');
    }

    fetchData();
  }, [session, status]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [gamesRes, teamRes, messagesRes] = await Promise.all([
        fetch('/api/games'),
        fetch('/api/team'),
        fetch('/api/messages'),
      ]);

      if (gamesRes.ok) setGames(await gamesRes. json());
      if (teamRes.ok) setTeam(await teamRes.json());
      if (messagesRes.ok) setMessages(await messagesRes.json());
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGame = async () => {
    const title = prompt('Game Title:');
    const description = prompt('Description:');
    const engineType = prompt('Engine (Unreal/Unity/Custom):');

    if (title && description && engineType) {
      try {
        const res = await fetch('/api/games', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description, engineType }),
        });
        if (res.ok) {
          fetchData();
          alert('Game added successfully!');
        }
      } catch (error) {
        alert('Failed to add game');
      }
    }
  };

  const handleAddMessage = async () => {
    const message = prompt('Welcome Message:');
    if (message) {
      try {
        const res = await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message }),
        });
        if (res. ok) {
          fetchData();
          alert('Message added successfully! ');
        }
      } catch (error) {
        alert('Failed to add message');
      }
    }
  };

  const handleDeleteMessage = async (message: string) => {
    if (confirm('Delete this message?')) {
      try {
        const res = await fetch('/api/messages', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message }),
        });
        if (res.ok) {
          fetchData();
          alert('Message deleted successfully!');
        }
      } catch (error) {
        alert('Failed to delete message');
      }
    }
  };

  if (status === 'loading') {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-shadow-black via-abyss-blue to-shadow-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="anime-text text-6xl glow-blue text-center mb-12">ADMIN PANEL</h1>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-12 justify-center flex-wrap">
            {(['games', 'team', 'messages'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-jin-woo-blue text-white shadow-lg'
                    : 'bg-abyss-blue border border-jin-woo-blue text-jin-woo-blue hover:bg-jin-woo-blue/20'
                }`}
              >
                {tab. charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Games Tab */}
          {activeTab === 'games' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-8">
                <button
                  onClick={handleAddGame}
                  className="px-6 py-3 bg-chakra-orange text-white rounded font-bold hover:shadow-lg"
                >
                  + Add Game
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {games. map((game) => (
                  <motion.div
                    key={game.id}
                    className="glass rounded-lg p-6 border-2 border-jin-woo-blue"
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="text-2xl font-bold text-jin-woo-blue mb-2">{game.title}</h3>
                    <p className="text-silver-white mb-3">{game.description}</p>
                    <p className="text-icy-blue text-sm">Engine: {game. engineType || 'N/A'}</p>
                    <p className="text-neon-cyan text-sm mt-2">Status: {game.status}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {team.map((member) => (
                  <motion.div
                    key={member.id}
                    className="glass rounded-lg p-6 border-2"
                    style={{ borderColor: member.summoningColor }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="text-2xl font-bold mb-2" style={{ color: member.summoningColor }}>
                      {member.name}
                    </h3>
                    <p className="text-silver-white">{member.role}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-8">
                <button
                  onClick={handleAddMessage}
                  className="px-6 py-3 bg-crystal-green text-shadow-black rounded font-bold hover:shadow-lg"
                >
                  + Add Message
                </button>
              </div>

              <div className="space-y-4">
                {messages.map((msg, idx) => {
                  const messageText = typeof msg === 'string' ? msg : msg.message;
                  return (
                    <motion.div
                      key={idx}
                      className="glass rounded-lg p-4 border border-crystal-green flex justify-between items-center"
                      whileHover={{ x: 10 }}
                    >
                      <p className="text-silver-white">{messageText}</p>
                      <button
                        onClick={() => handleDeleteMessage(messageText)}
                        className="px-4 py-2 bg-cursed-purple text-white rounded hover:bg-cursed-purple/80"
                      >
                        Delete
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {loading && <p className="text-center text-silver-white mt-8">Loading...</p>}
        </motion.div>
      </div>
    </main>
  );
}
