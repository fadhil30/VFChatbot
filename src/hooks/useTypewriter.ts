// src/hooks/useTypewriter.ts
import { useState, useEffect } from 'react';

// Phrases to cycle through
const PHRASES = [
  "How to upgrade my subscription?",
  "Do you have any active offers?",
  "What are your support hours?",
  "Can I change my plan?",
];

export function useTypewriter() {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100); // Faster for typing

  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];

    const handleTyping = () => {
      // 1. Deleting Logic
      if (isDeleting) {
        setText(currentPhrase.substring(0, text.length - 1));
        setTypingSpeed(50); // Faster speed for deleting
      } 
      // 2. Typing Logic
      else {
        setText(currentPhrase.substring(0, text.length + 1));
        setTypingSpeed(100 + Math.random() * 50); // Natural typing variation
      }

      // 3. Check if finished typing a phrase
      if (!isDeleting && text === currentPhrase) {
        // Pause at the end before deleting
        setTimeout(() => setIsDeleting(true), 2000); 
      } 
      // 4. Check if finished deleting a phrase
      else if (isDeleting && text === '') {
        setIsDeleting(false);
        // Move to next phrase (loop back to start if at end)
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);

  }, [text, isDeleting, phraseIndex, typingSpeed]);

  return text;
}