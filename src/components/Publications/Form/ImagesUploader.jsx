import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const ImagesUploader = ({ onImagesChange, imagesUrls }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [croppedImages, setCroppedImages] = useState([]);
  const cropperRef = useRef(null);

  useEffect(() => {
    onImagesChange(croppedImages);
  }, [croppedImages]);

  const handleDeleteImage = (indexImage) => {
    const newImagesState = croppedImages.filter(
      (file, currentIndex) => currentIndex !== indexImage
    );
    setCroppedImages(newImagesState);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleCrop = () => {
    const cropper = cropperRef.current.cropper;
    cropper.getCroppedCanvas().toBlob((blob) => {
      if (blob) {
        const originalFile = selectedFiles[selectedFiles.length - 1];
        const croppedFile = new File([blob], originalFile.name, {
          type: originalFile.type,
        });
        setCroppedImages([...croppedImages, croppedFile]);
      }
    });
  };

  return (
    <div
      className={`flex flex-col justify-center items-center mt-10 p-10 mx-auto border-2 
      border-dashed border-secondary text-lg font-bold`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center">
        <p className="hidden md:block">Arrastre y suelte la imagen aquí, o haga click en</p>
        <label
          htmlFor="images"
          className="mt-2 cursor-pointer border border-solid border-blue-600
          bg-blue-600 py-2 px-4 rounded text-white"
        >
          Seleccionar Imágenes
        </label>
        <input
          type="file"
          multiple
          name="images"
          id="images"
          className="hidden"
          onChange={(event) => {
            setSelectedFiles([...selectedFiles, ...Array.from(event.target.files)]);
          }}
        />
      </div>
      <div className="mt-8 w-full flex flex-col items-center">
        {selectedFiles.length !== 0 && (
          <Cropper
            ref={cropperRef}
            src={URL.createObjectURL(selectedFiles[selectedFiles.length - 1])}
            style={{ height: 400, width: '80%' }}
            aspectRatio={16 / 9}
            guides={false}
          />
        )}
        <button
          onClick={handleCrop}
          className={selectedFiles.length !== 0 ? "mt-4 w-40 bg-green-500 text-white py-2 px-4 rounded" : "hidden"}
        >
          Recortar Imagen
        </button>
      </div>
      <div className="hidden md:flex flex-wrap gap-4 mt-8">
        {croppedImages.length !== 0
          ? croppedImages.map((image, index) => (
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
            ))
          : imagesUrls?.map((url, index) => (
              <div key={`${index}-images-ulrs`} className="relative h-26">
                <img
                  src={url.url}
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
