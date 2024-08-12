import React, { useState } from 'react';
import Avatar from 'react-avatar';
import api from '../utils/api';

export default function PhotoUpload({ currentPhoto, onPhotoChange, name }) {
  const [preview, setPreview] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onPhotoChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-[72px] h-[72px] rounded-md overflow-hidden group">
      {preview ? (
        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
      ) : currentPhoto ? (
        <img src={api.getImageUrl(currentPhoto)} alt="Profile" className="w-full h-full object-cover" />
      ) : (
        <Avatar name={name} size="96" round={true} />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <label htmlFor="photo-upload" className="cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </label>
      </div>
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className="hidden"
      />
    </div>
  );
};
