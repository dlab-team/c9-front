import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

const ImagesUploader = ({ onImagesChange }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    onImagesChange(selectedFiles);
  }, [selectedFiles]);

  const handleDeleteImage = indexImage => {
    const newImagesState = selectedFiles.filter(
      (files, currentIndex) => currentIndex !== indexImage
    );
    setSelectedFiles(newImagesState);
  };

  const handleDragEnter = event => {
    event.preventDefault();
  };

  const handleDragOver = event => {
    event.preventDefault();
  };

  const handleDrop = event => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    setSelectedFiles([...selectedFiles, ...files]);
  };

  return (
    <div
      className={`flex flex-col justify-center items-center mt-10 h-72 w-[90%] 
      mx-auto border-2 border-dashed border-secondary text-lg font-bold`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center">
        <p className="hidden md:block">
          Arrastre y suelte la imagen aqui, o haga click en
        </p>
        <label
          htmlFor="images"
          className="mt-2 cursor-pointer border border-solid border-blue-
          bg-blue-600 py-2 px-4 rounded text-white"
        >
          Seleccionar Imagenes
        </label>
        <input
          type="file"
          multiple
          name="images"
          id="images"
          className="hidden"
          onChange={event => {
            setSelectedFiles([...selectedFiles, ...event.target.files]);
          }}
        />
      </div>
      <div className="hidden md:flex flex-wrap gap-4 mt-8">
        {selectedFiles.map((image, index) => (
          <div key={`${index}-images-files`} className="relative h-26">
            <button
              type="button"
              onClick={() => handleDeleteImage(index)}
              className="absolute top-[-5px] right-[-5px] bg-black
                text-white rounded-full h-7 w-7 shadow-white shadow-te-primary
                flex items-center justify-center"
            >
              <FontAwesomeIcon className="h-5" icon={faXmark} />
            </button>
            <img
              src={URL.createObjectURL(image)}
              alt={`Image ${index}`}
              className="h-full object-cover w-32 rounded-md "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesUploader;
