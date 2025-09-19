// import React from 'react';
// import { MapPin } from 'lucide-react';

// const LocationMap = () => (
//     <section id="location" className="py-20 bg-white">
//         <div className="container mx-auto px-6">
//             <div className="text-center mb-12">
//                 <h2 className="text-4xl font-bold text-gray-800">Our Location</h2>
//                 <p className="text-lg text-gray-600 mt-2">Conveniently located in the heart of the student district.</p>
//             </div>
//             <div className="grid md:grid-cols-3 gap-8 items-center">
//                 <div className="md:col-span-2">
//                     <div className="aspect-w-16 aspect-h-9 rounded-xl shadow-lg overflow-hidden">
//                         <iframe
//                             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609803714!2d72.74109965033078!3d19.08219783994614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63a33f9ef2d%3A0x6f7e65c87e4b74f3!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1695198047001!5m2!1sen!2sin"
//                             width="100%"
//                             height="450"
//                             style={{ border: 0 }}
//                             allowFullScreen=""
//                             loading="lazy"
//                             referrerPolicy="no-referrer-when-downgrade"
//                             title="Dormitory Location"
//                         ></iframe>
//                     </div>
//                 </div>
//                 <div className="bg-gray-50 p-6 rounded-lg">
//                     <h3 className="text-2xl font-bold text-gray-800">DormLife Heights</h3>
//                     <p className="text-gray-600 mt-2 flex items-start">
//                         <MapPin className="h-6 w-6 mr-3 mt-1 text-blue-500 flex-shrink-0" />
//                         123 University Lane, Student City, Mumbai, India
//                     </p>
//                     <div className="mt-6 border-t pt-6">
//                         <h4 className="font-semibold text-gray-700 mb-3">Nearby Places:</h4>
//                         <ul className="space-y-2 text-gray-600">
//                             <li>- University of Mumbai (10 min drive)</li>
//                             <li>- Mumbai Central Station (15 min drive)</li>
//                             <li>- Asiatic Library (20 min drive)</li>
//                             <li>- "Café Mondegar" (10 min drive)</li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>
// );

// export default LocationMap;


import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPin } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom dormitory icon
const dormIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [35, 35],
  iconAnchor: [17, 34],
  popupAnchor: [0, -30],
});

const LocationMap = ({ darkMode }) => {
  // Fake dormitory locations in Mumbai (lat, lng)
  const dormLocations = [
    { name: "DormLife Heights - Bandra", coords: [19.0596, 72.8295] },
    { name: "DormLife Heights - Andheri", coords: [19.1197, 72.8468] },
    { name: "DormLife Heights - Colaba", coords: [18.9217, 72.8324] },
  ];

  return (
    <section id="location" className={`py-20 ${darkMode ? 'bg-[#222] text-teal-100' : 'bg-gradient-to-b from-white to-gray-100'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold ${darkMode ? 'text-teal-200' : 'text-gray-800'}`}>Our Location</h2>
          <p className={`text-lg mt-2 ${darkMode ? 'text-teal-50' : 'text-gray-600'}`}>
            Explore our dormitories across Mumbai.
          </p>
        </div>

        {/* Flex Row Layout */}
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          {/* Map (takes most space) */}
    <div className={`flex-[2] rounded-2xl shadow-xl overflow-hidden border ${darkMode ? 'border-[#303030]' : 'border-gray-200'}`}>
            <MapContainer
              center={[19.076, 72.8777]} // Mumbai center
              zoom={12}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%", minHeight: "500px" }}
            >
              {/* Map tiles (OpenStreetMap) */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Fake Dormitory Markers */}
              {dormLocations.map((dorm, index) => (
                <Marker key={index} position={dorm.coords} icon={dormIcon}>
                  <Popup>{dorm.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Info Box (smaller) */}
          <div className={`flex-[1] p-8 rounded-2xl shadow-xl flex flex-col justify-between ${darkMode ? 'bg-[#303030] border-[#303030] text-teal-100' : 'bg-white border border-gray-200'}`}>
            <div>
              <h3 className={`text-3xl font-bold ${darkMode ? 'text-teal-200' : 'text-gray-900'}`}>DormLife Heights</h3>
              <p className={`mt-4 flex items-start ${darkMode ? 'text-teal-100' : 'text-gray-600'}`}>
                <MapPin className={`h-6 w-6 mr-3 mt-1 flex-shrink-0 ${darkMode ? 'text-teal-400' : 'text-emerald-600'}`} />
                123 University Lane, Student City, Mumbai, India
              </p>
            </div>

            <div className="mt-8 border-t pt-6">
              <h4 className={`font-semibold mb-4 text-lg ${darkMode ? 'text-teal-200' : 'text-gray-800'}`}>Nearby Places</h4>
              <ul className={`space-y-3 text-base ${darkMode ? 'text-teal-100' : 'text-gray-600'}`}>
                <li className={darkMode ? 'hover:text-teal-400 transition' : 'hover:text-emerald-600 transition'}>• University of Mumbai (10 min drive)</li>
                <li className={darkMode ? 'hover:text-teal-400 transition' : 'hover:text-emerald-600 transition'}>• Mumbai Central Station (15 min drive)</li>
                <li className={darkMode ? 'hover:text-teal-400 transition' : 'hover:text-emerald-600 transition'}>• Asiatic Library (20 min drive)</li>
                <li className={darkMode ? 'hover:text-teal-400 transition' : 'hover:text-emerald-600 transition'}>• "Café Mondegar" (10 min drive)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;


