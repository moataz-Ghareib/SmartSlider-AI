// Minimal Hoor API client used by voice demo components
// Replace implementations with real backend calls when available

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function speakWithWebSpeech(text: string): Promise<void> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  // Prefer Arabic voice if available
  const voices = window.speechSynthesis.getVoices();
  const arVoice = voices.find((v) => v.lang?.toLowerCase().startsWith('ar'));
  if (arVoice) utterance.voice = arVoice;
  return new Promise((resolve) => {
    utterance.onend = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}

export const hoorAPI = {
  async chat(userText: string): Promise<string> {
    // Simulate latency
    await wait(800);
    // Very simple canned response for demo
    return `فهمت طلبك: "${userText}"\nسأقترح عليك خطة أولية وخطوات تنفيذية خلال دقائق.`;
  },

  async speak(text: string): Promise<void> {
    // Try Web Speech API, fall back to a timed wait if unavailable
    try {
      await speakWithWebSpeech(text);
    } catch {
      await wait(Math.min(4000, Math.max(1200, text.length * 30)));
    }
  },
};

export default hoorAPI;


