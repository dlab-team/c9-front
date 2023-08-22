import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faWindowMinimize,
  faWindowMaximize,
  faTimes,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";
import logoInnova from "../../assets/images/logo_innova_yellow_s.png";

const Chatbox = () => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <div
      className={`fixed right-0 top-1/2 transform -translate-y-1/5 mr-2 mt-10`}
    >
      <div className={`flex gap-1 flex-col items-center`}>
        {isChatboxOpen ? (
          <div
            className={`flex flex-col space-y-1 bg-secondary`}
            style={{
              marginTop: "-210px",
              width: "100vw",
              maxWidth: isMaximized ? "80vw" : "360px",
              minHeight: "48px",
              borderRadius: "15px"
            }}
          >
            <div className="flex items-center justify-between w-full p-2">
              <div className="flex items-center">
                <img src={logoInnova} alt="logo de innovaXD" className="w-10" />
                <span className="ml-2 text-l text-white">Innova XD</span>
              </div>
              <div className="flex gap-1">
              <button
                    onClick={toggleMaximize}
                    className={`p-1 rounded-full bg-orange-500 text-white w-12 h-12 flex items-center justify-center shadow-md hover:opacity-75`}
                  >
                    {isMaximized ? (
                      <FontAwesomeIcon icon={faWindowMinimize} />
                    ) : (
                      <FontAwesomeIcon icon={faWindowMaximize} />
                    )}
                  </button>
                  <button
                    onClick={toggleChatbox}
                    className={`p-1 rounded-full bg-orange-500 text-white w-12 h-12 flex items-center justify-center shadow-md hover:opacity-75`}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={toggleChatbox}
            className={`p-1 rounded-full bg-secondary text-white w-12 h-12 flex flex-col items-center justify-center shadow-md hover:opacity-75`}
          >
            <FontAwesomeIcon icon={faRobot} />
            <span className="mt-1 text-xs">IA</span>
          </button>
        )}

        {isChatboxOpen && (
          <div
            className={`flex flex-col space-y-1 border rounded-lg`}
            style={{ width: "100vw",
            maxWidth: isMaximized ? "80vw" : "360px", }}
          >
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="mb-2" style={{ minHeight: "40vh" }}>
                {/* aqui habria que ir mostrando el texto ingresado y respuestas de la ia */}
                <div className="bg-blue-200 text-white p-2 rounded-md">
                  Mensaje del usuario
                </div>

                <div className="bg-green-200 text-white p-2 rounded-md text-right">
                  Respuesta de la IA
                </div>
              </div>
              <div className="flex justify-center items-center" >
                  <input
                    type="text"
                    placeholder="Escribe tu mensaje..."
                    className="border border-gray-300 p-2 rounded-xl w-4/5 mr-2"
                  />
                  <button className="bg-secondary text-white p-2 rounded-xl shadow-md hover:opacity-75 w-1/5">
                  ▲
                  </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbox;
