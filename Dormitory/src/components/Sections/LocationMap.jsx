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
                <li className={darkMode ? 'hover:text-teal-400 transition' : 'hover:text-emerald-600 transition'}>• Café Mondegar (10 min drive)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;


