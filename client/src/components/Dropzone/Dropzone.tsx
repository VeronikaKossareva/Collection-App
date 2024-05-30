import React from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone: React.FC = () => {
  const { getRootProps, getInputProps } = useDropzone();

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p></p>
    </div>
  );
};

export default Dropzone;
