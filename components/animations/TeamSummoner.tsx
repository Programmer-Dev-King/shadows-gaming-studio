'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SummoningTimeline } from './SummoningTimeline';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  title: string;
  description: string;
  summoningColor: string;
}

interface TeamSummonerProps {
  members: TeamMember[];
  autoSummonFirst?: boolean;
}

/**
 * TeamSummoner - Component for summoning team members one by one
 * First summon is manual (button click), subsequent via scroll/keyboard
 */
export const TeamSummoner: React.FC<TeamSummonerProps> = ({
  members,
  autoSummonFirst = false,
}) => {
  const [summoningMember, setSummoningMember] = useState<number | null>(null);
  const [summonedMembers, setSummonedMembers] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(autoSummonFirst);

  // Handle first summon (manual trigger)
  const handleFirstSummon = useCallback(() => {
    if (hasStarted || members.length === 0) return;
    setHasStarted(true);
    setSummoningMember(members[0].id);
  }, [hasStarted, members]);

  // Handle subsequent summons via scroll/keyboard
  const handleNextSummon = useCallback(() => {
    if (!hasStarted) return;
    if (summoningMember !== null) return; // Already summoning
    if (currentIndex >= members.length) return; // All summoned

    const nextMember = members[currentIndex];
    if (nextMember && !summonedMembers.includes(nextMember.id)) {
      setSummoningMember(nextMember.id);
    }
  }, [hasStarted, summoningMember, currentIndex, members, summonedMembers]);

  // Handle summon complete
  const handleSummonComplete = useCallback(
    (memberId: number) => {
      setSummonedMembers((prev) => [...prev, memberId]);
      setSummoningMember(null);
      setCurrentIndex((prev) => prev + 1);
    },
    []
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleNextSummon();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSummon]);

  // Scroll detection
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Trigger on scroll down
          if (currentScrollY > lastScrollY + 50) {
            handleNextSummon();
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleNextSummon]);

  return (
    <div className="min-h-screen">
      {/* First Summon Prompt */}
      {!hasStarted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <motion.h2
            className="text-4xl font-black mb-8"
            style={{ color: '#1F6BFF', textShadow: '0 0 30px #1F6BFF' }}
          >
            SUMMON THE TEAM
          </motion.h2>
          <motion.p className="text-icy-blue text-lg mb-8">
            Click to begin the summoning ritual
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFirstSummon}
            className="px-12 py-4 bg-jin-woo-blue text-white font-bold rounded-lg text-xl"
            style={{ boxShadow: '0 0 30px #1F6BFF' }}
          >
            BEGIN SUMMONING
          </motion.button>
        </motion.div>
      )}

      {/* Team Grid */}
      {hasStarted && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          {members.map((member) => {
            const isSummoned = summonedMembers.includes(member.id);
            const isSummoning = summoningMember === member.id;

            return (
              <div key={member.id}>
                {/* Summoned Card */}
                <AnimatePresence>
                  {isSummoned && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 50 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="glass rounded-lg p-8 border-2 h-full"
                      style={{ borderColor: member.summoningColor }}
                    >
                      {/* Avatar */}
                      <motion.div
                        className="w-24 h-24 rounded-full mx-auto mb-6"
                        style={{
                          background: `linear-gradient(135deg, ${member.summoningColor}, ${member.summoningColor}80)`,
                          boxShadow: `0 0 30px ${member.summoningColor}`,
                        }}
                        whileHover={{ scale: 1.1 }}
                      />

                      {/* Info */}
                      <h3
                        className="text-2xl font-bold text-center mb-2"
                        style={{ color: member.summoningColor }}
                      >
                        {member.name}
                      </h3>
                      <p className="text-center text-icy-blue font-semibold mb-1">{member.role}</p>
                      <p className="text-center text-silver-white text-sm mb-4">{member.title}</p>
                      <p className="text-center text-silver-white text-sm">{member.description}</p>

                      {/* Rank Badge */}
                      <div className="mt-6 pt-4 border-t border-opacity-20 text-center">
                        <span
                          className="inline-block px-4 py-1 rounded-full text-sm font-bold"
                          style={{
                            backgroundColor: `${member.summoningColor}30`,
                            color: member.summoningColor,
                          }}
                        >
                          S-RANK
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Waiting State */}
                {!isSummoned && !isSummoning && (
                  <motion.div
                    className="glass rounded-lg p-8 border-2 border-dashed h-full flex items-center justify-center min-h-[300px]"
                    style={{ borderColor: `${member.summoningColor}50`, opacity: 0.5 }}
                  >
                    <p className="text-icy-blue text-center">Awaiting summon...</p>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Scroll Prompt */}
      {hasStarted && currentIndex < members.length && summoningMember === null && (
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <p className="text-icy-blue text-sm mb-2">Scroll or press ↓ to summon next member</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-jin-woo-blue text-2xl"
          >
            ↓
          </motion.div>
        </motion.div>
      )}

      {/* All Summoned */}
      {summonedMembers.length === members.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <p className="text-crystal-green text-2xl font-bold">All warriors summoned!</p>
        </motion.div>
      )}

      {/* Summoning Animation */}
      {summoningMember !== null && (
        <SummoningTimeline
          characterName={members.find((m) => m.id === summoningMember)?.name || ''}
          role={members.find((m) => m.id === summoningMember)?.role || ''}
          title={members.find((m) => m.id === summoningMember)?.title}
          summoningColor={members.find((m) => m.id === summoningMember)?.summoningColor}
          onComplete={() => handleSummonComplete(summoningMember)}
        />
      )}
    </div>
  );
};

export default TeamSummoner;
