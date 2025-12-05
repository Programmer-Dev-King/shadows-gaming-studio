'use client';

import React from 'react';
import { TeamSummoner } from '@/components/animations/TeamSummoner';

// Demo team members data
const DEMO_TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Dev Kingson',
    role: 'Founder',
    title: 'B.Sc. (Hons.) Mathematics',
    description: 'Visionary leader guiding Shadows to legendary heights. The shadow monarch who awakened.',
    summoningColor: '#1F6BFF',
  },
  {
    id: 2,
    name: 'Utsav Chaurasiya',
    role: 'Co-Founder & Creative Director',
    title: 'Visionary Designer',
    description: 'Master of visual storytelling. Brings anime aesthetics to life through cutting-edge design.',
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

export default function TeamDemoPage() {
  return <TeamSummoner members={DEMO_TEAM_MEMBERS} autoAdvance={true} showControls={true} />;
}
