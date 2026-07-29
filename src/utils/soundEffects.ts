// Classic telephone ring sound effect generator using Web Audio API
let audioCtx: AudioContext | null = null;
let lastPlayed = 0;

export const playClassicPhoneRing = () => {
  const now = Date.now();
  if (now - lastPlayed < 1000) return; // Throttle sound triggers
  lastPlayed = now;

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(440, audioCtx.currentTime); // Standard ringback tone 1
    osc2.frequency.setValueAtTime(480, audioCtx.currentTime); // Standard ringback tone 2

    // Dual-ring pulse: 200ms ring, 100ms pause, 200ms ring
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.02);
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime + 0.18);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.2);

    gain.gain.setValueAtTime(0, audioCtx.currentTime + 0.28);
    gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime + 0.48);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioCtx.destination);

    osc1.start(audioCtx.currentTime);
    osc2.start(audioCtx.currentTime);

    osc1.stop(audioCtx.currentTime + 0.52);
    osc2.stop(audioCtx.currentTime + 0.52);
  } catch (e) {
    // Ignore audio autoplay restrictions gracefully
  }
};
