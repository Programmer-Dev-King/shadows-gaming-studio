'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SummoningSequenceAdvanced } from '@/components/animations/SummoningSequenceAdvanced';
import { useRouter } from 'next/navigation';

interface TeamMemberData {
  id: number;
  name: string;
  role: string;
  title: string;
  description: string;
  summoningColor: string;
}

const TEAM_MEMBERS: TeamMemberData[] = [
  {
    id: 1,
    name: 'Dev Kingson',
    role: 'Founder',
    title: 'B. Sc. (Hons.) Mathematics',
    description: 'Visionary leader guiding Shadows to legendary heights.  The shadow monarch who awakened.',
    summoningColor: '#1F6BFF',
  },
  {
    id: 2,
    name: 'Utsav Chaurasiya',
    role: 'Co-Founder & Creative Director',
    title: 'Visionary Designer',
    description: 'Master of visual storytelling.  Brings anime aesthetics to life through cutting-edge design.',
    summoningColor: '#6F2BFF',
  },
  {
    id: 3,
    name: 'Jitendra Soni',
    role: 'Co-Founder & Technical Lead',
    title: 'Architecture Engineer',
    description: 'Engineering excellence personified. Builds the systems that power our dreams.',
    summoningColor: '#FF6B18',
  },
];

export default function TeamPage() {
  const router = useRouter();
  const [summoningMember, setSummoningMember] = useState<number | null>(null);
  const [summonedMembers, setSummonedMembers] = useState<number[]>([]);
  const [autoSummon, setAutoSummon] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (autoSummon && currentIndex < TEAM_MEMBERS. length && summonedMembers.length === currentIndex) {
      const timer = setTimeout(() => {
        setSummoningMember(TEAM_MEMBERS[currentIndex]. id);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [autoSummon, currentIndex, summonedMembers. length]);

  const handleMemberSummoned = (memberId: number) => {
    if (! summonedMembers.includes(memberId)) {
      setSummonedMembers([...summonedMembers, memberId]);
      setCurrentIndex((prev) => prev + 1);
    }
    setSummoningMember(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-shadow-black via-abyss-blue to-shadow-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="anime-text text-6xl mb-4" style={{ textShadow: '0 0 30px #1F6BFF' }}>
            AWAKENED WARRIORS
          </h1>
          <p className="text-icy-blue text-lg">
            The legends who command the Shadows Gaming Studio
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, idx) => {
            const isSummoned = summonedMembers. includes(member.id);
            const isSummoning = summoningMember === member.id;

            return (
              <div key={member.id}>
                {/* Summoning Sequence */}
                {isSummoning && (
                  <SummoningSequenceAdvanced
                    characterName={member.name}
                    role={member.role}
                    title={member.title}
                    summoningColor={member.summoningColor}
                    onComplete={() => handleMemberSummoned(member.id)}
                  />
                )}

                {/* Team Card */}
                {isSummoned && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="glass rounded-lg p-8 border-2 h-full"
                    style={{ borderColor: member.summoningColor }}
                  >
                    {/* Member Avatar Placeholder */}
                    <div
                      className="w-24 h-24 rounded-full mx-auto mb-6 bg-gradient-to-br from-abyss-blue to-shadow-black border-2"
                      style={{ borderColor: member.summoningColor, boxShadow: `0 0 20px ${member.summoningColor}` }}
                    />

                    {/* Member Info */}
                    <h3
                      className="text-2xl font-bold text-center mb-2"
                      style={{ color: member.summoningColor }}
                    >
                      {member.name}
                    </h3>

                    <p className="text-center text-lg font-semibold text-icy-blue mb-2">{member.role}</p>

                    <p className="text-center text-silver-white text-sm mb-4">{member.title}</p>

                    <p className="text-center text-silver-white text-sm leading-relaxed mb-6">
                      {member.description}
                    </p>

                    {/* Stats */}
                    <div className="border-t border-opacity-20 pt-4">
                      <div className="grid grid-cols-2 gap-4 text-center text-sm">
                        <div>
                          <p className="text-icy-blue font-bold">Level</p>
                          <p style={{ color: member.summoningColor }} className="font-bold">
                            ★★★★★
                          </p>
                        </div>
                        <div>
                          <p className="text-icy-blue font-bold">Power</p>
                          <p style={{ color: member.summoningColor }} className="font-bold">
                            S-RANK
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-4 justify-center mt-6">
                      <button className="px-3 py-1 bg-cursed-purple/30 rounded text-sm hover:bg-cursed-purple/50">
                        LinkedIn
                      </button>
                      <button className="px-3 py-1 bg-neon-cyan/30 rounded text-sm hover:bg-neon-cyan/50 text-neon-cyan">
                        Twitter
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Waiting State */}
                {!isSummoned && ! isSummoning && (
                  <motion.div
                    className="glass rounded-lg p-8 border-2 border-dashed h-full flex items-center justify-center"
                    style={{ borderColor: member.summoningColor, opacity: 0.5 }}
                  >
                    <p className="text-center text-icy-blue">Awaiting summoning...</p>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        {summonedMembers.length === TEAM_MEMBERS.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <p className="text-silver-white text-lg mb-6">All warriors summoned.  Ready to join us?</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-jin-woo-blue text-white font-bold rounded-lg"
            >
              BEGIN YOUR JOURNEY
            </motion.button>
          </motion.div>
        )}
      </div>
    </main>
  );
  }
