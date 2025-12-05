# Audio Assets

This directory contains audio files for animation sound effects.

## Files

- `portal-open.mp3` - Sound played during portal transitions
- `summon.mp3` - Sound played during team member summoning

## Placeholder Audio

The current audio files are minimal placeholder beeps.
Replace with actual sound effects for production.

## Usage in Code

```tsx
import SoundManager from '@/lib/sounds';

// Load sounds on app init
await SoundManager.loadSound('portal', '/audio/portal-open.mp3');
await SoundManager.loadSound('summon', '/audio/summon.mp3');

// Play sounds after user gesture
SoundManager.playSound('portal');
```

## Recommended Sound Effects

- **Portal**: Whoosh/vortex sound, ~1.5 seconds
- **Summon**: Mystical/jutsu chant, ~2 seconds
- **Gate Opening**: Heavy door mechanism, ~2 seconds
- **UI Click**: Short confirmation beep, ~0.1 seconds

## Audio Guidelines

- Format: MP3 for compatibility, also provide OGG for Firefox
- Sample Rate: 44.1kHz
- Bitrate: 128kbps for effects, 192kbps for music
- Duration: Keep under 5 seconds for UI sounds
- Volume: Normalize to -6dB peak
