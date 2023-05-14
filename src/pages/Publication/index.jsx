import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PublicationComponent from "../../components/Pubication/PublicationComponent";

const Publication = () => {
  // Retrieves the publication slug from the URL
  const { slug } = useParams();

  // Initializes state variables for the publication and answers
  const [publication, setPublication] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [showAnswer, setShowAnswer] = useState([]);

  // Retrieves publication data from the backend API and sets state variables
  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/publications/${slug}`
        );
        const { publication } = response.data;
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

  // Toggles the display of answers for the publication
  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  // Toggles the display of a specific answer for the publication
  const toggleAnswer = (index) => {
    setShowAnswer((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  // Renders the PublicationComponent with publication data and state variables
  return (
    <>
      {publication && (
        <PublicationComponent
          publication={publication}
          showAnswers={showAnswers}
          toggleAnswers={toggleAnswers}
          showAnswer={showAnswer}
          toggleAnswer={toggleAnswer}
        />
      )}
    </>
  );
};

export default Publication;