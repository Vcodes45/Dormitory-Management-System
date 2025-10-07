import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Building, 
    Users, 
    DollarSign, 
    TrendingUp, 
    Plus, 
    Edit, 
    Trash2, 
    Eye,
    LogOut,
    Home,
    Phone,
    Mail,
    MapPin,
    Bed,
    Wifi,
    Car,
    Coffee,
    Dumbbell,
    Gamepad2,
    Utensils,
    Shield,
    Settings,
    Calendar,
    BarChart3
} from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [dormitories, setDormitories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingDormitory, setEditingDormitory] = useState(null);
    
    // Get user info from localStorage
    const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
    const token = localStorage.getItem('adminToken');

    const [newDormitory, setNewDormitory] = useState({
        name: '',
        type: 'shared',
        price: '',
        availability: '',
        description: '',
        amenities: [],
        address: '',
        phone: '',
        email: '',
        images: []
    });

    const amenityOptions = [
        { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
        { id: 'parking', label: 'Parking', icon: Car },
        { id: 'meals', label: 'Meals', icon: Utensils },
        { id: 'gym', label: 'Gym', icon: Dumbbell },
        { id: 'games', label: 'Game Room', icon: Gamepad2 },
        { id: 'cafe', label: 'Cafeteria', icon: Coffee },
        { id: 'security', label: '24/7 Security', icon: Shield },
        { id: 'laundry', label: 'Laundry', icon: Home }
    ];

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchDormitories();
    }, [token, navigate]);

    const fetchDormitories = async () => {
        try {
            // Mock data for now since we don't have the backend endpoint yet
            const mockDormitories = [
                {
                    id: 1,
                    name: 'Sunrise Student Housing',
                    type: 'shared',
                    price: 8500,
                    availability: 15,
                    description: 'Modern shared rooms with excellent amenities',
                    amenities: ['wifi', 'meals', 'gym', 'security'],
                    address: '123 College Street, Mumbai',
                    phone: '+91 98765 43210',
                    email: 'contact@sunrise.com',
                    totalRooms: 50,
                    occupancyRate: 70
                },
                {
                    id: 2,
                    name: 'Elite Private Suites',
                    type: 'private',
                    price: 15000,
                    availability: 8,
                    description: 'Luxury private rooms for premium living',
                    amenities: ['wifi', 'parking', 'gym', 'cafe', 'security'],
                    address: '456 University Road, Delhi',
                    phone: '+91 87654 32109',
                    email: 'info@elitesuites.com',
                    totalRooms: 30,
                    occupancyRate: 85
                }
            ];
            setDormitories(mockDormitories);
        } catch (error) {
            console.error('Error fetching dormitories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    };

    const handleAddDormitory = async (e) => {
        e.preventDefault();
        try {
            // Mock adding dormitory
            const newId = dormitories.length + 1;
            const dormitoryWithId = {
                ...newDormitory,
                id: newId,
                totalRooms: parseInt(newDormitory.availability) + 10,
                occupancyRate: Math.floor(Math.random() * 40) + 60
            };
            
            setDormitories([...dormitories, dormitoryWithId]);
            setShowAddModal(false);
            resetForm();
        } catch (error) {
            console.error('Error adding dormitory:', error);
        }
    };

    const handleEditDormitory = (dormitory) => {
        setEditingDormitory(dormitory);
        setNewDormitory({ ...dormitory });
        setShowAddModal(true);
    };

    const handleDeleteDormitory = (id) => {
        if (window.confirm('Are you sure you want to delete this dormitory?')) {
            setDormitories(dormitories.filter(d => d.id !== id));
        }
    };

    const resetForm = () => {
        setNewDormitory({
            name: '',
            type: 'shared',
            price: '',
            availability: '',
            description: '',
            amenities: [],
            address: '',
            phone: '',
            email: '',
            images: []
        });
        setEditingDormitory(null);
    };

    const toggleAmenity = (amenityId) => {
        setNewDormitory(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenityId)
                ? prev.amenities.filter(a => a !== amenityId)
                : [...prev.amenities, amenityId]
        }));
    };

    // Dashboard Stats
    const stats = [
        {
            title: 'Total Dormitories',
            value: dormitories.length,
            icon: Building,
            color: 'bg-blue-500'
        },
        {
            title: 'Total Rooms',
            value: dormitories.reduce((sum, d) => sum + (d.totalRooms || 0), 0),
            icon: Bed,
            color: 'bg-emerald-500'
        },
        {
            title: 'Available Rooms',
            value: dormitories.reduce((sum, d) => sum + d.availability, 0),
            icon: Users,
            color: 'bg-yellow-500'
        },
        {
            title: 'Monthly Revenue',
            value: `₹${dormitories.reduce((sum, d) => sum + (d.price * (d.totalRooms - d.availability)), 0).toLocaleString()}`,
            icon: DollarSign,
            color: 'bg-purple-500'
        }
    ];

    const renderOverview = () => (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Recent Activity
                    </h3>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        <div className="flex items-center p-3 bg-emerald-50 rounded-lg">
                            <div className="bg-emerald-500 p-2 rounded-full mr-3">
                                <Users className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">New booking received</p>
                                <p className="text-sm text-gray-600">Elite Private Suites - Room 101</p>
                            </div>
                        </div>
                        <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                            <div className="bg-blue-500 p-2 rounded-full mr-3">
                                <DollarSign className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Payment received</p>
                                <p className="text-sm text-gray-600">₹15,000 from John Doe</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderDormitoryList = () => (
        <div className="space-y-6">
            {/* Header with Add Button */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Manage Dormitories</h2>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Dormitory
                </button>
            </div>

            {/* Dormitories Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {dormitories.map((dormitory) => (
                    <div key={dormitory.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{dormitory.name}</h3>
                                    <p className="text-sm text-gray-600 capitalize">{dormitory.type} Room</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEditDormitory(dormitory)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteDormitory(dormitory.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Price:</span>
                                    <span className="font-semibold text-emerald-600">₹{dormitory.price}/month</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Available Rooms:</span>
                                    <span className="font-semibold">{dormitory.availability}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Occupancy Rate:</span>
                                    <span className="font-semibold text-blue-600">{dormitory.occupancyRate}%</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-2">Amenities:</p>
                                <div className="flex flex-wrap gap-1">
                                    {dormitory.amenities.map((amenity) => {
                                        const amenityInfo = amenityOptions.find(a => a.id === amenity);
                                        const Icon = amenityInfo?.icon;
                                        return (
                                            <span
                                                key={amenity}
                                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                                            >
                                                {Icon && <Icon className="h-3 w-3 mr-1" />}
                                                {amenityInfo?.label}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {dormitory.address}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <Building className="h-8 w-8 text-emerald-600 mr-3" />
                            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">Welcome, {adminUser.username || 'Admin'}</span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
                            >
                                <LogOut className="h-5 w-5 mr-1" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'overview'
                                    ? 'border-emerald-500 text-emerald-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <BarChart3 className="h-4 w-4 inline mr-2" />
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('dormitories')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'dormitories'
                                    ? 'border-emerald-500 text-emerald-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <Building className="h-4 w-4 inline mr-2" />
                            Dormitories
                        </button>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                    </div>
                ) : (
                    <>
                        {activeTab === 'overview' && renderOverview()}
                        {activeTab === 'dormitories' && renderDormitoryList()}
                    </>
                )}
            </main>

            {/* Add/Edit Dormitory Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {editingDormitory ? 'Edit Dormitory' : 'Add New Dormitory'}
                            </h3>
                        </div>
                        
                        <form onSubmit={handleAddDormitory} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Dormitory Name
                                    </label>
                                    <input
                                        type="text"
                                        value={newDormitory.name}
                                        onChange={(e) => setNewDormitory({ ...newDormitory, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Room Type
                                    </label>
                                    <select
                                        value={newDormitory.type}
                                        onChange={(e) => setNewDormitory({ ...newDormitory, type: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    >
                                        <option value="shared">Shared Room</option>
                                        <option value="private">Private Room</option>
                                        <option value="studio">Studio</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Monthly Price (₹)
                                    </label>
                                    <input
                                        type="number"
                                        value={newDormitory.price}
                                        onChange={(e) => setNewDormitory({ ...newDormitory, price: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Available Rooms
                                    </label>
                                    <input
                                        type="number"
                                        value={newDormitory.availability}
                                        onChange={(e) => setNewDormitory({ ...newDormitory, availability: parseInt(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={newDormitory.description}
                                    onChange={(e) => setNewDormitory({ ...newDormitory, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    value={newDormitory.address}
                                    onChange={(e) => setNewDormitory({ ...newDormitory, address: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={newDormitory.phone}
                                        onChange={(e) => setNewDormitory({ ...newDormitory, phone: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={newDormitory.email}
                                        onChange={(e) => setNewDormitory({ ...newDormitory, email: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Amenities
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {amenityOptions.map((amenity) => {
                                        const Icon = amenity.icon;
                                        return (
                                            <label
                                                key={amenity.id}
                                                className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                                    newDormitory.amenities.includes(amenity.id)
                                                        ? 'border-emerald-500 bg-emerald-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={newDormitory.amenities.includes(amenity.id)}
                                                    onChange={() => toggleAmenity(amenity.id)}
                                                    className="sr-only"
                                                />
                                                <Icon className="h-5 w-5 mr-2 text-gray-600" />
                                                <span className="text-sm">{amenity.label}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        resetForm();
                                    }}
                                    className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all"
                                >
                                    {editingDormitory ? 'Update' : 'Add'} Dormitory
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;