import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';

type Photo = {
  id: string;
  url: string;
  title: string;
  category: string;
};

const categories = ['Tous', 'Mécanique', 'Membrane', 'Optique', 'Ergonomique', 'Gaming'];

const Gallery: React.FC<{ photos: Photo[] }> = ({ photos }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [filteredPhotos, setFilteredPhotos] = useState(photos);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    if (selectedCategory === 'Tous') {
      setFilteredPhotos(photos);
    } else {
      setFilteredPhotos(photos.filter(photo => photo.category === selectedCategory));
    }
  }, [selectedCategory, photos]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {filteredPhotos.map(photo => (
          <div
            key={photo.id}
            className="mb-4 cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img src={photo.url} alt={photo.title} className="w-full rounded-lg shadow-md" />
          </div>
        ))}
      </Masonry>

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-4xl max-h-full p-4">
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="max-w-full max-h-full object-contain"
            />
            <p className="text-white text-center mt-4">{selectedPhoto.title}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;