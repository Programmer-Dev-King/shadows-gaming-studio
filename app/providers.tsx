'use client';

import React from 'react';
import { AnimationProvider } from '@/components/animations/AnimationProvider';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AnimationProvider>
        {children}
      </AnimationProvider>
    </SessionProvider>
  );
}
