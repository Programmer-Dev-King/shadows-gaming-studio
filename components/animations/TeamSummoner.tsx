'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
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
  autoAdvance?: boolean; // Q2: Auto-advance after first manual summon
  showControls?: boolean;
}

/**
 * TeamSummoner - Interactive team member summoning component
 * Q2: First member summon is manual; subsequent members advance by scroll/keyboard
 */
export const TeamSummoner: React.FC<TeamSummonerProps> = ({
  members,
  autoAdvance = true,
  showControls = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [summonedMembers, setSummonedMembers] = useState<number[]>([]);
  const [isSummoning, setIsSummoning] = useState(false);
  const [manualSummonDone, setManualSummonDone] = useState(false);

  // Handle summon complete
  const handleSummonComplete = useCallback(() => {
    const member = members[currentIndex];
    if (member && !summonedMembers.includes(member.id)) {
      setSummonedMembers((prev) => [...prev, member.id]);
    }
    setIsSummoning(false);

    // Mark manual summon as done after first summon
    if (!manualSummonDone) {
      setManualSummonDone(true);
    }
  }, [currentIndex, members, summonedMembers, manualSummonDone]);

  // Advance to next member
  const advanceToNext = useCallback(() => {
    if (currentIndex < members.length - 1 && !isSummoning) {
      setCurrentIndex((prev) => prev + 1);
      setIsSummoning(true);
    }
  }, [currentIndex, members.length, isSummoning]);

  // Start first summon (manual)
  const startFirstSummon = useCallback(() => {
    if (!isSummoning && summonedMembers.length === 0) {
      setIsSummoning(true);
    }
  }, [isSummoning, summonedMembers.length]);

  // Keyboard and scroll handlers for auto-advance (Q2)
  useEffect(() => {
    if (!autoAdvance || !manualSummonDone) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') && !isSummoning) {
        e.preventDefault();
        advanceToNext();
      }
    };

    const handleScroll = () => {
      if (!isSummoning && window.scrollY > 100) {
        advanceToNext();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [autoAdvance, manualSummonDone, isSummoning, advanceToNext]);

  const currentMember = members[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-shadow-black via-abyss-blue to-shadow-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="anime-text text-5xl mb-4" style={{ textShadow: '0 0 30px #1F6BFF' }}>
            TEAM SUMMONER
          </h1>
          <p className="text-icy-blue text-lg mb-4">
            Summon the legendary team members of Shadows Gaming Studio
          </p>
          <p className="text-silver-white text-sm">
            {!manualSummonDone
              ? 'Click to begin the first summoning'
              : 'Use ↓ Arrow / Space / Scroll to summon next member'}
          </p>
        </motion.div>

        {/* Summoning Animation */}
        {isSummoning && currentMember && (
          <SummoningTimeline
            characterName={currentMember.name}
            role={currentMember.role}
            title={currentMember.title}
            summoningColor={currentMember.summoningColor}
            onComplete={handleSummonComplete}
          />
        )}

        {/* Start Button (for first summon) */}
        {!manualSummonDone && !isSummoning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startFirstSummon}
              className="px-12 py-6 bg-jin-woo-blue text-white font-bold text-xl rounded-lg hover:shadow-lg"
              style={{
                boxShadow: '0 0 30px rgba(31, 107, 255, 0.5)',
              }}
            >
              BEGIN SUMMONING
            </motion.button>
          </motion.div>
        )}

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4 mb-12"
        >
          {members.map((member, idx) => (
            <motion.div
              key={member.id}
              className={`w-4 h-4 rounded-full border-2 transition-all ${
                summonedMembers.includes(member.id)
                  ? 'bg-crystal-green border-crystal-green'
                  : idx === currentIndex && isSummoning
                  ? 'border-jin-woo-blue animate-pulse'
                  : 'border-icy-blue/30'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </motion.div>

        {/* Summoned Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((member) => {
            const isSummoned = summonedMembers.includes(member.id);

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{
                  opacity: isSummoned ? 1 : 0.3,
                  y: isSummoned ? 0 : 50,
                  scale: isSummoned ? 1 : 0.8,
                }}
                transition={{ duration: 0.6 }}
                className={`glass rounded-lg p-8 border-2 h-full ${
                  isSummoned ? '' : 'border-dashed'
                }`}
                style={{ borderColor: isSummoned ? member.summoningColor : 'rgba(165, 199, 255, 0.2)' }}
              >
                {isSummoned ? (
                  <>
                    {/* Avatar Placeholder */}
                    <div
                      className="w-24 h-24 rounded-full mx-auto mb-6 bg-gradient-to-br from-abyss-blue to-shadow-black border-2"
                      style={{
                        borderColor: member.summoningColor,
                        boxShadow: `0 0 20px ${member.summoningColor}`,
                      }}
                    />

                    {/* Member Info */}
                    <h3
                      className="text-2xl font-bold text-center mb-2"
                      style={{ color: member.summoningColor }}
                    >
                      {member.name}
                    </h3>
                    <p className="text-center text-lg font-semibold text-icy-blue mb-2">
                      {member.role}
                    </p>
                    <p className="text-center text-silver-white text-sm mb-4">{member.title}</p>
                    <p className="text-center text-silver-white text-sm leading-relaxed">
                      {member.description}
                    </p>

                    {/* Summoned Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-6 text-center"
                    >
                      <span
                        className="inline-block px-4 py-1 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: `${member.summoningColor}20`,
                          color: member.summoningColor,
                        }}
                      >
                        ★ SUMMONED
                      </span>
                    </motion.div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[300px]">
                    <p className="text-icy-blue text-center">Awaiting summoning...</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Controls */}
        {showControls && manualSummonDone && currentIndex < members.length - 1 && !isSummoning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={advanceToNext}
              className="px-8 py-4 bg-cursed-purple text-white font-bold rounded-lg hover:shadow-lg"
            >
              SUMMON NEXT
            </motion.button>
          </motion.div>
        )}

        {/* All Summoned Message */}
        {summonedMembers.length === members.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <p className="text-crystal-green text-xl font-bold mb-4">
              ✨ All Team Members Summoned!
            </p>
            <p className="text-silver-white">The shadows have assembled.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TeamSummoner;
