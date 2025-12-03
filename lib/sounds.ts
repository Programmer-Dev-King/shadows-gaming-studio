// lib/sounds.ts

class SoundManager {
    private audioFiles: { [key: string]: HTMLAudioElement } = {};

    constructor() {
        this.loadSounds();
    }

    private loadSounds() {
        const sounds = [
            'gate-opening',
            'portal-enter',
            'summoning-jutsu',
            'glitch-effect',
            'button-click',
            'page-transition',
            'chakra-burst',
            'seal-activate',
            'level-up',
            'error-sound'
        ];
        
        sounds.forEach(sound => {
            this.audioFiles[sound] = new Audio(`path/to/sounds/${sound}.mp3`);
        });
    }

    playSound(sound: string) {
        const audio = this.audioFiles[sound];
        if (audio) {
            audio.currentTime = 0; // Reset to start
            audio.play();
        } else {
            console.warn(`Sound ${sound} not found!`);
        }
    }
}

export default SoundManager;