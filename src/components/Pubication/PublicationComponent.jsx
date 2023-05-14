import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "./publication.css";

const PublicationComponent = ({
  publication,
  showAnswer,
  toggleAnswer,
}) => {
  return (
    <div className="max-w-4xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <>
        <h1 className="text-3xl font-bold text-blue-900 mb-2 text-center mx-auto">
          {publication.name}
        </h1>
        <Carousel className="w-50 mx-auto">
          {publication.images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100 custom-carousel-image"
                src={image.url}
                alt={publication.name}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <p className="text-gray-500 text-sm mb-4">
          Publicado por @{publication.author} el {publication.publicationDate}{" "}
        </p>
        <p className="text-gray-700 text-base mb-4">
          {publication.finalContent}
        </p>

        {publication.questions.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
              PREGUNTAS RELACIONADAS
            </h2>
            {publication.questions.map((question, index) => (
              <div key={index} className="mb-2">
                <button
                  onClick={() => toggleAnswer(index)}
                  className={`w-full text-left font-medium text-lg mb-2 rounded-lg focus:outline-none transition-colors duration-150 ${
                    showAnswer[index]
                      ? "bg-gray-300"
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
    </div>
  );
};

export default PublicationComponent;

