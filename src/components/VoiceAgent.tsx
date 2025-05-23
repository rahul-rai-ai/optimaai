import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1seGZrcXVjb3BweXhsZ3Z5cndrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NjQ8MTQsImV4cCI6MjA2MTI0MDgxNH0.0qVoA8T8KUU-tFOZKc1bw_9RiE2C91C9k9JbhfSJ8W4'
);
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

interface Message {
  text: string;
  isUser: boolean;
}

const VoiceAgent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (transcript) {
      handleUserInput(transcript);
      resetTranscript();
    }
  }, [transcript]);

  const playAudio = async (text: string) => {
    if (isMuted || isPlaying) return;

    try {
      setIsPlaying(true);
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': import.meta.env.VITE_ELEVENLABS_API_KEY || '',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      });

      if (!response.ok) throw new Error('Failed to generate speech');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handleUserInput = async (input: string) => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { 
          message: input.trim(),
          lang: i18n.language 
        },
      });

      if (error) throw error;

      const botResponse = { text: data.response, isUser: false };
      setMessages(prev => [...prev, botResponse]);
      await playAudio(data.response);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { text: t('chatbot.error'), isUser: false };
      setMessages(prev => [...prev, errorMessage]);
      await playAudio(t('chatbot.error'));
    }
  };

  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true, language: i18n.language === 'de' ? 'de-DE' : 'en-US' });
    }
    setIsListening(!isListening);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      URL.revokeObjectURL(audioRef.current.src);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="text-center p-4 bg-red-50 text-red-600 rounded-lg">
        {t('voice.browserNotSupported')}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto">
      <audio ref={audioRef} onEnded={handleAudioEnd} />
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{t('voice.title')}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-full transition-colors ${
              isMuted ? 'bg-gray-200' : 'bg-primary/10 text-primary'
            }`}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <button
            onClick={toggleListening}
            className={`p-2 rounded-full transition-colors ${
              isListening ? 'bg-primary text-white' : 'bg-gray-200'
            }`}
          >
            {isListening ? <Mic size={20} /> : <MicOff size={20} />}
          </button>
        </div>
      </div>

      <div className="h-64 overflow-y-auto mb-4 space-y-2 bg-gray-50 p-4 rounded-lg">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-2 rounded-lg ${
                message.isUser
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-sm text-gray-500">
        {isListening ? t('voice.listening') : t('voice.clickToStart')}
      </div>
    </div>
  );
};

export default VoiceAgent;
