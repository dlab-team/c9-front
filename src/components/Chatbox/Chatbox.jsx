import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWindowMinimize,
  faWindowMaximize,
  faTimes,
  faRobot,
  faExpand,
  faCompress
} from '@fortawesome/free-solid-svg-icons';
import logoInnova from '../../assets/images/logo_innova_yellow_s.png';

const role = {
  assistant: 'assistant',
  user: 'user'
};

const initialMessage =
  '¡Hola! puedo ayudarte con diversas dudas o tareas relacionadas con la noticia actual. ¿Quieres saber más?';

const Chatbox = ({ publicationContent = '' }) => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([
    { role: role.assistant, content: initialMessage }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Desplazar hacia abajo al enviar un mensaje
    messagesEndRef?.current?.scrollIntoView({
      behavior: 'auto',
      block: 'end'
    });
  }, [messages, isChatboxOpen]);

  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };
  const messagesOptions = [
    '¿ Que tipo de ayuda me puedes ofrecer ?',
    '¿ Puedes listar 5 palabras graves y 5 agudas si las hay ?',
    'Dame los puntos claves de la noticia'
  ];

  const handleSendMessage = async (message) => {
    const newMessage = { role: role.user, content: message };
    setMessages((prevMessagesState) => [...prevMessagesState, newMessage]);
    setIsLoading(true);
    // luego aca hay que gestionar que servicio usar (para estudiantes o profesores)
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/chats/students`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          newMessage: newMessage,
          messages: messages,
          publicationContent: publicationContent
        }),
        method: 'POST'
      }
    );
    const data = await response.json();
    setIsLoading(false);
    if (data.messageResponse) {
      setMessages((prevMessagesState) => [
        ...prevMessagesState,
        data.messageResponse
      ]);
    }
  };

  return (
    <div
      className={`right-0 mr-0.5 z-50 overflow-hidden ${window.innerWidth >= 768 ? 'w-30' : 'w-full'}`}
      style={{position:'fixed', top:'15%'}}

    >
      <div className={`flex gap-1 flex-col items-center`}>
        {isChatboxOpen ? (
          <div
             className={`flex flex-col space-y-1 bg-secondary ${isMaximized ? 'w-full' : 'max-w-[360px]'} w-full min-h-[48px] rounded-[15px]`}
          >
            <div className="flex items-center justify-between w-full p-2">
              <div className="flex items-center">
                <img src={logoInnova} alt="logo de Innova XD" className="w-10" />
                <span className="ml-2 text-l text-white">Innova XD</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={toggleMaximize}
                  className={`p-1 rounded-full bg-orange-300 text-white w-10 h-10 flex items-center justify-center shadow-md hover:opacity-75`}
                >
                  {isMaximized ? (
                    <FontAwesomeIcon icon={faCompress} />
                  ) : (
                    <FontAwesomeIcon icon={faExpand} />
                  )}
                </button>
                <button
                  onClick={toggleChatbox}
                  className={`p-1 rounded-full bg-orange-500 text-white w-10 h-10 flex items-center justify-center shadow-md hover:opacity-75`}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={toggleChatbox}
            className={`p-1 rounded-full bg-secondary text-white w-12 h-12 flex flex-col items-center justify-center shadow-md hover:opacity-75 fixed right-2 top-1/2 mt-10`}
          >
            <FontAwesomeIcon icon={faRobot} />
            <span className="mt-1 text-xs">IA</span>
          </button>
        )}
        {isChatboxOpen && (
          <div
            className={`flex flex-col border rounded-lg ${isMaximized ? 'w-full' : 'max-w-[360px]'}`}
          >
            <div className="bg-white p-4 rounded-lg shadow-md ">
              <div className="mb-2 flex flex-col gap-2 overflow-y-scroll scroll-smooth h-96 py-2">
                {/*muestra el texto ingresado y respuestas de la ia */}
                <p
                  className={
                    'max-w-[90%] w-fit mb-1 bg-white shadow-md border-t border-x-2 p-2 rounded-md text-left text-primary whitespace-pre-line'
                  }
                >
                  {messages[0].content}
                </p>
                <div
                  className={
                    'max-w-[90%] w-fit mb-1 bg-white shadow-md border-t border-x-2 p-2 rounded-md text-left text-primary whitespace-pre-line'
                  }
                >
                  <p>Pidele a la IA lo que necesites 🤗</p>
                  {messagesOptions.map((messageOption, index) => {
                    return (
                      <div
                        className="border bg-gray-100 cursor-pointer shadow-md my-3 p-2 rounded-md hover:bg-gray-400 hover:text-white "
                        key={`msg.option-${index}`}
                        onClick={() => {
                          handleSendMessage(messageOption);
                        }}
                      >
                        {messageOption}
                      </div>
                    );
                  })}
                </div>
                {messages.slice(1).map((message, index) => {
                  const styleMessage =
                    message.role === role.assistant
                      ? 'max-w-[90%] w-fit mb-1 bg-white shadow-md border-t border-x-2 p-2 rounded-md text-left text-primary whitespace-pre-line'
                      : 'max-w-[90%] w-fit mb-1 bg-blue-100 p-2 rounded-md self-end text-primary whitespace-pre-line';
                  return (
                    <p
                      key={`msg-${message.role + index}`}
                      className={styleMessage}
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    ></p>
                  );
                })}
                <span
                  className={`${isLoading ? 'text-sm text-left' : 'hidden'}`}
                >
                  escribiendo...
                </span>
                <div ref={messagesEndRef} />
              </div>
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  placeholder="Escribe tu mensaje..."
                  className="border border-gray-300 p-2 rounded-xl w-4/5 mr-2"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage(messageInput);
                      setMessageInput('');
                    }
                  }}
                />
                <button
                  className="bg-secondary text-white p-2 rounded-xl shadow-md hover:opacity-75 w-1/5"
                  onClick={() => {
                    handleSendMessage(messageInput);
                    setMessageInput('');
                  }}
                >
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
