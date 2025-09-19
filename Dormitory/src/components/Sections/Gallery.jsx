import React, { useState } from 'react';
import { X } from 'lucide-react';
import { galleryImages } from '../../constants/mockdata';

const ImageModal = ({ imageUrl, onClose }) => {
    if (!imageUrl) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-[60] flex justify-center items-center p-4" onClick={onClose}>
            <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300">
                <X size={32} />
            </button>
            <img src={imageUrl} alt="Enlarged view" className="max-w-full max-h-full rounded-lg" onClick={e => e.stopPropagation()} />
        </div>
    );
};

const Gallery = () => {
    const [activeCategory, setActiveCategory] = useState('Common Areas');
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section id="gallery" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800">Explore Our Campus</h2>
                    <p className="text-lg text-gray-600 mt-2">A glimpse into the life and facilities at DormLife.</p>
                </div>
                <div className="flex justify-center space-x-2 md:space-x-4 mb-8">
                    {Object.keys(galleryImages).map(category => (
                        <button key={category} onClick={() => setActiveCategory(category)} className={`px-4 py-2 rounded-full font-semibold transition-colors ${activeCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                            {category}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {galleryImages[activeCategory].map((image, index) => (
                        <div key={index} className="overflow-hidden rounded-lg shadow-md cursor-pointer group" onClick={() => setSelectedImage(image)}>
                            <img src={image} alt={`${activeCategory} ${index + 1}`} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" />
                        </div>
                    ))}
                </div>
            </div>
            <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
        </section>
    );
};

export default Gallery;