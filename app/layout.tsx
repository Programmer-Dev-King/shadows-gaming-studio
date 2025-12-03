import React from 'react';
import { AnimationProvider } from 'some-animation-library'; // Adjust the import according to the animation library being used

export const metadata = {
  title: 'Shadows Gaming Studio',
  description: 'Your gaming studio for shadowy adventures',
};

const RootLayout = ({ children }) => {
  return (
    <AnimationProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AnimationProvider>
  );
};

export default RootLayout;