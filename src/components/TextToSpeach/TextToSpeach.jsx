import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPlayCircle,
  faStop,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const TextToSpeech = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const readingSpeed = 1; //define la velo de lectura
  const [cleanedText, setCleanedText] = useState("");

  const toggleSpeaking = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterances = createUtterances(cleanedText);
      utterances.forEach((utterance, index) => {
        if (index === utterances.length - 1) {
          utterance.addEventListener("end", handleSpeechEnd);
        }
        utterance.rate = readingSpeed; //define la velo de lectura
        window.speechSynthesis.speak(utterance);
      });
      setIsSpeaking(true);
    }
  };

  const handleSpeechEnd = () => {
    setIsSpeaking(false);
  };

  const createUtterances = (text) => {
    const maxChunkLength = 200; //tamaño maximo para almacenar por lectura
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
      utterance.lang = "es-ES";
      return utterance;
    });
  };

  const cleanText = (text) => {
    //limpia el texto de caracteres especiales para la correcta lectura
    if (!text) {
      return "";
    }
    const cleaned = text.replace(/<[^>]+>/g, "");
    return cleaned;
  };

  useEffect(() => {
    const cleaned = cleanText(text);
    setCleanedText(cleaned);
  }, [text]);

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
      <FontAwesomeIcon
        icon={isSpeaking ? faPause : faPlayCircle}
        size="2x"
        style={{ color: "#00235c" }}
      />
    </button>
  );
};

export default TextToSpeech;
