import React, { useState, useEffect } from "react";

const TextToSpeech = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const toggleSpeaking = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterances = createUtterances(text);
      utterances.forEach((utterance, index) => {
        if (index === utterances.length - 1) {
          utterance.addEventListener("end", handleSpeechEnd);
        }
        window.speechSynthesis.speak(utterance);
      });
      setIsSpeaking(true);
    }
  };

  const handleSpeechEnd = () => {
    setIsSpeaking(false);
  };

  const createUtterances = (text) => {
    const maxChunkLength = 200; // Longitud máxima de cada fragmento
    const chunks = [];
    let currentChunk = "";

    text.split(" ").forEach((word) => {
      if (currentChunk.length + word.length + 1 <= maxChunkLength) {
        currentChunk += word + " ";
      } else {
        chunks.push(currentChunk.trim());
        currentChunk = word + " ";
      }
    });

    chunks.push(currentChunk.trim());

    return chunks.map((chunk) => {
      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.lang = "es-ES"; // Establece el idioma según sea necesario
      return utterance;
    });
  };

  useEffect(() => {
    const handleCancel = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.addEventListener("cancel", handleCancel);

    return () => {
      window.speechSynthesis.removeEventListener("cancel", handleCancel);
    };
  }, []);

  return (
    <button onClick={toggleSpeaking}>
      {isSpeaking ? "Detener lectura" : "Iniciar lectura"}
    </button>
  );
};

export default TextToSpeech;
