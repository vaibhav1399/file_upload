// src/components/FileUpload.js
import React, { useState } from 'react';
import './FileUpload.css'; // Import the CSS file

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [filePaths, setFilePaths] = useState([]);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (files.length === 0) {
      alert('Please select files to upload.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response = await fetch('http://localhost:5000/upload', { // Update with your server URL
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFilePaths(data.filePaths);
        alert('Files uploaded successfully!');
      } else {
        alert('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files.');
    }
  };

  return (
    <div className="container">
      <h1>File Upload</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
      {filePaths.length > 0 && (
        <div>
          <h3>Uploaded File Paths:</h3>
          <ul>
            {filePaths.map((path, index) => (
              <li key={index}>{path}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
