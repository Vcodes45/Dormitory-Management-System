import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, Building, Phone, MapPin } from 'lucide-react';

const AdminSignup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        dormitoryName: '',
        ownerName: '',
        phone: '',
        address: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: 'ADMIN',
                dormitoryName: formData.dormitoryName,
                ownerName: formData.ownerName,
                phone: formData.phone,
                address: formData.address
            });

            if (response.status === 200 || response.status === 201) {
                // Success - redirect to login
                navigate('/admin/login', { 
                    state: { 
                        message: 'Account created successfully! Please log in.' 
                    }
                });
            }
        } catch (err) {
            console.error("Signup failed:", err);
            
            if (err.response?.status === 409) {
                setError("Username or email already exists. Please choose another.");
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Signup failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mb-6">
                        <Building className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">Create Admin Account</h2>
                    <p className="text-gray-600">Join our platform and start managing your dormitory</p>
                </div>

                {/* Signup Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border-0">
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center">
                            <div className="text-sm">{error}</div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <User className="inline w-4 h-4 mr-2" />
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    placeholder="Choose a username"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Mail className="inline w-4 h-4 mr-2" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Lock className="inline w-4 h-4 mr-2" />
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                        placeholder="Create password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Lock className="inline w-4 h-4 mr-2" />
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                        placeholder="Confirm password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Dormitory Information */}
                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dormitory Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <Building className="inline w-4 h-4 mr-2" />
                                        Dormitory Name
                                    </label>
                                    <input
                                        type="text"
                                        name="dormitoryName"
                                        value={formData.dormitoryName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                        placeholder="Your dormitory name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <User className="inline w-4 h-4 mr-2" />
                                        Owner Name
                                    </label>
                                    <input
                                        type="text"
                                        name="ownerName"
                                        value={formData.ownerName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                        placeholder="Full name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <Phone className="inline w-4 h-4 mr-2" />
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                        placeholder="+1 (555) 123-4567"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <MapPin className="inline w-4 h-4 mr-2" />
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                        placeholder="Dormitory address"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Creating Account...
                                </div>
                            ) : (
                                'Create Admin Account'
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/admin/login" className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSignup;
