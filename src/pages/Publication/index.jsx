import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Publication = () => {
  const { slug } = useParams();
  const [publication, setPublication] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [showAnswer, setShowAnswer] = useState([]);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/publications/${slug}`
        );
        const { publication } = response.data;
        console.log("publication", publication);
        if (publication) {
          setPublication(publication);
          setShowAnswer(new Array(publication.questions.length).fill(false));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPublication();
  }, [slug]);

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  const toggleAnswer = (index) => {
    setShowAnswer((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="max-w-4xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
      {publication && (
        <>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center mx-auto">
            {publication.name}
          </h1>
          <img
            src={publication.images[0].url}
            alt={publication.name}
            className="w-full rounded-lg"
          />
          <p className="text-gray-500 text-sm mb-4">
            Publicado por @{publication.author} el {publication.publicationDate}{" "}
          </p>
          <p className="text-gray-700 text-base mb-4">
            {publication.finalContent}
          </p>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={toggleAnswers}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
            >
              Ver preguntas y respuestas
            </button>
          </div>

          {showAnswers && (
            <div className="bg-gray-100 p-4 rounded-lg">
              {publication.questions.length > 0 && (
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Preguntas
                </h2>
              )}
              {publication.questions.map((question, index) => (
                <div key={index} className="mb-2">
                  <button
                    onClick={() => toggleAnswer(index)}
                    className={`w-full text-left font-medium text-lg mb-2 rounded-lg focus:outline-none transition-colors duration-150 ${
                      showAnswer[index]
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                    }`}
                  >
                    {question.question}
                  </button>
                  {showAnswer[index] && (
                    <p className="text-gray-700">{question.answer}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Publication;
