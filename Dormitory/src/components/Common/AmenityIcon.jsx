import React from 'react';
import { Wifi, Wind, Tv, Coffee } from 'lucide-react';

const AmenityIcon = ({ amenity }) => {
    const iconMap = {
        wifi: <Wifi className="h-5 w-5 text-blue-500" />,
        ac: <Wind className="h-5 w-5 text-sky-500" />,
        laundry: <div className="h-5 w-5 text-gray-500 font-bold text-xs flex items-center justify-center">W</div>,
        'study-desk': <Tv className="h-5 w-5 text-gray-700" />, // Placeholder
        tv: <Tv className="h-5 w-5 text-red-500" />,
        'mini-fridge': <Coffee className="h-5 w-5 text-teal-500" />, // Placeholder
    };
    const nameMap = {
        wifi: 'Wi-Fi',
        ac: 'AC',
        laundry: 'Laundry',
        'study-desk': 'Study Desk',
        tv: 'TV',
        'mini-fridge': 'Mini Fridge',
    };
    return (
        <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
            {iconMap[amenity] || null}
            <span className="text-sm text-gray-700">{nameMap[amenity] || amenity}</span>
        </div>
    );
};

export default AmenityIcon;