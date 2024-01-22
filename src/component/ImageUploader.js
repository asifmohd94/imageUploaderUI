import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [boldWords, setBoldWords] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/api/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setImageUrl(`data:image/jpeg;base64, ${response.data.imageData}`);
      setExtractedText(response.data.extractedText);
      setBoldWords(response.data.boldWords);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h2>Image Uploader</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {imageUrl && (
        <div>
          <h3>Uploaded Image</h3>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )}

      {extractedText && (
        <div>
          <h3>Extracted Text</h3>
          <p>{extractedText}</p>
        </div>
      )}

      {boldWords && (
        <div>
          <h3>Bold Words</h3>
          <p>{boldWords}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
