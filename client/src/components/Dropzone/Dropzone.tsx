import React from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone: React.FC = () => {
  const { getRootProps, getInputProps } = useDropzone();

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Перетащите сюда файлы или кликните, чтобы выбрать файлы для загрузки.</p>
    </div>
  );
};

export default Dropzone;
