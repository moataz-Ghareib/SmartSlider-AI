# Voice Greeting Audio Setup Instructions

## Current Issue
The voice greeting feature is not working because:
1. The audio file `/public/audio/gulf-greeting.mp3` is missing or incomplete
2. The Web Speech API fallback may not be working properly in some browsers

## Solution Options

### Option 1: Generate Audio File with Azure Text-to-Speech

1. Sign up for Azure Cognitive Services Speech service
2. Get your API key and region
3. Run this command to generate the audio file:

```bash
curl -s -X POST "https://YOUR_REGION.tts.speech.microsoft.com/cognitiveservices/v1" \
  -H "Ocp-Apim-Subscription-Key: YOUR_KEY" \
  -H "Content-Type: application/ssml+xml" \
  -H "X-Microsoft-OutputFormat: audio-48khz-192kbitrate-mono-mp3" \
  --data-binary @- > public/audio/gulf-greeting.mp3 << 'SSML'
<speak version="1.0" xml:lang="ar-SA">
  <voice name="ar-SA-HamedNeural">
    <prosody rate="-5%" pitch="+0%">
      يا هلا والله! معك سمارت ستارت أي آي — مستشارك الذكي باللهجة الخليجية.
      <break time="500ms"/>
      وش تبينا نساعدك فيه اليوم؟ مشروع جديد؟ دراسة جدوى؟ ولا تسويق؟
    </prosody>
  </voice>
</speak>
SSML
```

### Option 2: Use Amazon Polly

1. Sign up for AWS and configure Polly service
2. Use the following command:

```bash
aws polly synthesize-speech \
  --output-format mp3 \
  --text "يا هلا والله! معك سمارت ستارت أي آي — مستشارك الذكي باللهجة الخليجية. وش تبينا نساعدك فيه اليوم؟ مشروع جديد؟ دراسة جدوى؟ ولا تسويق؟" \
  --voice-id "Zeina" \
  --language-code "arb" \
  public/audio/gulf-greeting.mp3
```

### Option 3: Record Your Own Audio

1. Record the following Arabic text with a Gulf/Saudi accent:
   "يا هلا والله! معك سمارت ستارت أي آي — مستشارك الذكي باللهجة الخليجية. وش تبينا نساعدك فيه اليوم؟ مشروع جديد؟ دراسة جدوى؟ ولا تسويق؟"
2. Save it as `public/audio/gulf-greeting.mp3`

## Testing the Audio

After adding the audio file:
1. Clear your browser cache
2. Reload the application
3. The voice greeting should play automatically on first visit

## Browser Compatibility Notes

- Chrome: Best support for Web Speech API
- Firefox: Good support, may require user interaction first
- Safari: Limited support, prefer using audio files
- Edge: Good support for both audio files and Web Speech API

## Fallback Behavior

If the audio file is not available or fails to play, the system will automatically try the Web Speech API. If that also fails, it will show the quick action options directly.