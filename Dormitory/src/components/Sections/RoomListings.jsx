import React, { useState, useMemo } from 'react';
import { X, Sparkles } from 'lucide-react';
import { initialRooms } from '../../constants/mockData';
import AmenityIcon from '../Common/AmenityIcon';
import { generateContent } from '../../api/geminiAPI';

const RoomModal = ({ room, onClose, darkMode }) => {
    if (!room) return null;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [generatedDescription, setGeneratedDescription] = useState(room.description);
    const [isGenerating, setIsGenerating] = useState(false);

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((i) => (i + 1) % room.images.length);
    }
    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((i) => (i - 1 + room.images.length) % room.images.length);
    }

    const generateRoomDescription = async () => {
        setIsGenerating(true);
        const prompt = `Write a creative and appealing one-paragraph description for a student dormitory room with the following details. Be enthusiastic and highlight the benefits for a student.
        - Room Name: ${room.name}
        - Type: ${room.type}
        - Price: ₹${room.price}/month
        - Amenities: ${room.amenities.join(', ')}`;

        const newDescription = await generateContent(prompt);
        setGeneratedDescription(newDescription || "Could not generate a new description at this time.");
        setIsGenerating(false);
    };

    return (
        <div className={`fixed inset-0 z-[60] flex justify-center items-center p-4 ${darkMode ? 'bg-[#222]/90' : 'bg-black bg-opacity-75'}`} onClick={onClose}>
            <div className={`rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-[#303030] text-teal-100' : 'bg-emerald-100 text-emerald-600'}`} onClick={e => e.stopPropagation()}>
                <div className="p-6 relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10">
                        <X size={24} />
                    </button>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <div className="relative">
                                <img src={room.images[currentImageIndex]} alt={room.name} className="w-full h-80 object-cover rounded-lg shadow-lg" />
                                {room.images.length > 1 && (
                                    <>
                                        <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white text-lg font-bold">‹</button>
                                        <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white text-lg font-bold">›</button>
                                    </>
                                )}
                            </div>
                            <div className="flex justify-center mt-2 space-x-2">
                                {room.images.map((img, index) => (
                                    <img key={index} src={img} alt={`${room.name} thumbnail ${index + 1}`} onClick={() => setCurrentImageIndex(index)} className={`w-16 h-12 object-cover rounded cursor-pointer border-2 ${index === currentImageIndex ? 'border-emerald-500' : 'border-transparent'}`} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2 className={`text-3xl font-bold ${darkMode ? 'text-teal-200' : 'text-gray-800'}`}>{room.name}</h2>
                            <p className={`text-xl font-semibold mt-2 ${darkMode ? 'text-teal-300' : 'text-emerald-600'}`}>₹{room.price.toLocaleString()}<span className={`text-sm font-normal ${darkMode ? 'text-teal-100' : 'text-gray-500'}`}> / month</span></p>
                            <span className={`mt-2 inline-block px-3 py-1 text-sm font-semibold rounded-full ${room.availability > 0 ? (darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') : (darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800')}`}>
                                {room.availability > 0 ? `${room.availability} beds left` : 'Sold Out'}
                            </span>

                            <div className="mt-4">
                                <div className="flex justify-between items-center">
                                    <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-teal-200' : ''}`}>Description</h3>
                                    <button onClick={generateRoomDescription} disabled={isGenerating} className={`flex items-center gap-2 text-sm font-semibold disabled:opacity-50 disabled:cursor-wait ${darkMode ? 'text-teal-300 hover:text-teal-100' : 'text-emerald-600 hover:text-emerald-800'}`}>
                                        <Sparkles size={16} /> {isGenerating ? 'Generating...' : '✨ Regenerate'}
                                    </button>
                                </div>
                                <p className={darkMode ? 'text-teal-100' : 'text-gray-600'}>{generatedDescription}</p>
                            </div>

                            <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? 'text-teal-200' : ''}`}>Amenities</h3>
                            <div className="flex flex-wrap gap-2">
                                {room.amenities.map(amenity => <AmenityIcon key={amenity} amenity={amenity} />)}
                            </div>
                            <button disabled={room.availability === 0} className={`mt-8 w-full py-3 rounded-lg font-semibold transition duration-300 ${darkMode ? (room.availability > 0 ? 'bg-teal-700 text-white hover:bg-teal-800' : 'bg-gray-700 text-gray-400') : (room.availability > 0 ? 'bg-blue-emerald text-white hover:bg-emerald-500' : 'bg-gray-400 text-white')}`}>{room.availability > 0 ? 'Inquire Now' : 'Not Available'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const RoomListings = ({ darkMode }) => {
    const [rooms, setRooms] = useState(initialRooms);
    const [filters, setFilters] = useState({ price: 16000, amenities: [] });
    const [sortBy, setSortBy] = useState('price-asc');
    const [selectedRoom, setSelectedRoom] = useState(null);

    const availableAmenities = useMemo(() => {
        const allAmenities = new Set(initialRooms.flatMap(room => room.amenities));
        return Array.from(allAmenities);
    }, []);

    const handleAmenityToggle = (amenity) => {
        setFilters(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    const filteredAndSortedRooms = useMemo(() => {
        return rooms
            .filter(room => room.price <= filters.price)
            .filter(room => filters.amenities.every(amenity => room.amenities.includes(amenity)))
            .sort((a, b) => {
                switch (sortBy) {
                    case 'price-asc': return a.price - b.price;
                    case 'price-desc': return b.price - a.price;
                    case 'availability': return b.availability - a.availability;
                    default: return 0;
                }
            });
    }, [rooms, filters, sortBy]);

    return (
        <section id="rooms" className={`py-20 ${darkMode ? 'bg-[#222]' : 'bg-gray-50'}`}> 
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className={`text-4xl font-bold ${darkMode ? 'text-teal-200' : 'text-gray-800'}`}>Find Your Space</h2>
                    <p className={`text-lg mt-2 ${darkMode ? 'text-teal-100' : 'text-gray-600'}`}>Browse our variety of rooms tailored for your comfort and needs.</p>
                </div>

                <div className={`p-6 rounded-lg shadow-lg mb-8 ${darkMode ? 'bg-[#303030] text-teal-100' : 'bg-white'}`}> 
                    <div className="grid md:grid-cols-3 gap-6 items-center">
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Max Price: ₹{filters.price.toLocaleString()}</label>
                            <input type="range" id="price" min="5000" max="16000" step="500" value={filters.price} onChange={e => setFilters({ ...filters, price: Number(e.target.value) })} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                            <div className="flex flex-wrap gap-2">
                                {availableAmenities.map(amenity => (
                                    <button key={amenity} onClick={() => handleAmenityToggle(amenity)} className={`px-3 py-1 text-sm rounded-full border transition-colors capitalize ${filters.amenities.includes(amenity) ? (darkMode ? 'bg-teal-700 text-white border-teal-700' : 'bg-blue-500 text-white border-emerald-500') : (darkMode ? 'bg-[#222] text-teal-100 border-teal-700' : 'bg-white text-gray-600 border-gray-300')}`}>
                                        {amenity.replace('-', ' ')}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="sort" className="block text-sm font-medium text-gray-700">Sort By</label>
                            <select id="sort" value={sortBy} onChange={e => setSortBy(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md">
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="availability">Availability</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAndSortedRooms.map(room => (
                        <div key={room.id} className={`rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group ${darkMode ? 'bg-[#303030] text-teal-100' : 'bg-white'}`}>
                            <div className="relative">
                                <img src={room.images[0]} alt={room.name} className="w-full h-56 object-cover" />
                                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${darkMode ? 'bg-[#222] text-teal-200' : 'bg-white text-gray-800'}`}>{room.type}</div>
                                <div className={`absolute top-4 right-4 px-3 py-1 text-sm font-semibold rounded-full ${room.availability > 0 ? (darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') : (darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800')}`}>
                                    {room.availability > 0 ? `${room.availability} left` : 'Full'}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className={`text-xl font-bold ${darkMode ? 'text-teal-200' : 'text-gray-800'}`}>{room.name}</h3>
                                <p className={`text-lg font-semibold mt-2 ${darkMode ? 'text-teal-300' : 'text-emerald-600'}`}>₹{room.price.toLocaleString()} <span className={`text-sm font-normal ${darkMode ? 'text-teal-100' : 'text-gray-500'}`}>/ month</span></p>
                                <p className={`mt-2 h-12 overflow-hidden ${darkMode ? 'text-teal-100' : 'text-gray-600'}`}>{room.description}</p>
                                <div className="mt-4 flex flex-wrap gap-2 items-center">
                                    {room.amenities.slice(0, 3).map(amenity => <AmenityIcon key={amenity} amenity={amenity} />)}
                                    {room.amenities.length > 3 && <span className="text-sm text-gray-500 p-1">+ {room.amenities.length - 3} more</span>}
                                </div>
                                <button onClick={() => setSelectedRoom(room)} className={`mt-6 w-full font-semibold py-2 rounded-lg transition duration-300 ${darkMode ? 'bg-teal-700 text-white hover:bg-teal-800' : 'bg-emerald-100 text-emerald-500 hover:bg-emerald-200'}`}>
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {filteredAndSortedRooms.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">No rooms match your criteria. Try adjusting your filters.</p>
                    </div>
                )}
            </div>
            <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} darkMode={darkMode} />
        </section>
    );
};

export default RoomListings;