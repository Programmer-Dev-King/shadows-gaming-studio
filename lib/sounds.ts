// lib/sounds.ts

class SoundManager {
  private audioContext: AudioContext | null = null;
  private audioFiles: Map<string, AudioBuffer> = new Map();
  private isEnabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window. AudioContext || (window as any).webkitAudioContext)();
    }
  }

  async loadSound(name: string, url: string): Promise<void> {
    if (!this. audioContext) return;

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this. audioContext.decodeAudioData(arrayBuffer);
      this. audioFiles.set(name, audioBuffer);
    } catch (error) {
      console.warn(`Failed to load sound: ${name}`);
    }
  }

  playSound(name: string): void {
    if (!this.isEnabled || !this.audioContext) return;

    const audioBuffer = this. audioFiles.get(name);
    if (! audioBuffer) {
      console.warn(`Sound not found: ${name}`);
      return;
    }

    try {
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source. connect(this.audioContext.destination);
      source.start(0);
    } catch (error) {
      console.error(`Failed to play sound: ${name}`, error);
    }
  }

  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  isAudioEnabled(): boolean {
    return this.isEnabled;
  }
}

export default new SoundManager();
