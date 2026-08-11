class GeoFenceSirenAudioEngine {
  private audioCtx: AudioContext | null = null;
  private osc: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private sirenInterval: any = null;
  private isPlaying: boolean = false;

  public playSiren() {
    if (this.isPlaying) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioContextClass();

      this.osc = this.audioCtx.createOscillator();
      this.gainNode = this.audioCtx.createGain();

      this.osc.type = 'sawtooth';
      this.gainNode.gain.value = 0.15; // Safe volume

      this.osc.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);

      this.osc.start();
      this.isPlaying = true;

      // Pulse frequency between 600Hz and 1200Hz (Dual-tone Police Siren)
      let high = false;
      this.sirenInterval = setInterval(() => {
        if (this.osc && this.audioCtx) {
          const targetFreq = high ? 1200 : 650;
          this.osc.frequency.setTargetAtTime(targetFreq, this.audioCtx.currentTime, 0.15);
          high = !high;
        }
      }, 300);
    } catch (e) {
      console.warn('Web Audio Siren Error:', e);
    }
  }

  public stopSiren() {
    if (!this.isPlaying) return;

    if (this.sirenInterval) {
      clearInterval(this.sirenInterval);
      this.sirenInterval = null;
    }

    try {
      if (this.osc) {
        this.osc.stop();
        this.osc.disconnect();
        this.osc = null;
      }
      if (this.audioCtx) {
        this.audioCtx.close();
        this.audioCtx = null;
      }
    } catch (e) {
      console.warn(e);
    }

    this.isPlaying = false;
  }
}

export const sirenEngine = new GeoFenceSirenAudioEngine();
