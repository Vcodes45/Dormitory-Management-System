import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, Building, Shield } from 'lucide-react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();
    
    // Check for success message from signup
    const successMessage = location.state?.message;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password,
            });

            const jwtToken = response.data.accessToken || response.data.token;

            if (jwtToken) {
                localStorage.setItem('adminToken', jwtToken);
                localStorage.setItem('adminUser', JSON.stringify(response.data.user || { username }));
                navigate('/admin/dashboard'); 
            } else {
                setError("Login successful but no token received.");
            }

        } catch (err) {
            console.error("Login failed:", err);
            
            if (err.response?.status === 401) {
                setError("Invalid username or password. Please check your credentials.");
            } else if (err.code === 'ECONNREFUSED' || err.message.includes('Network Error')) {
                setError("Cannot connect to server. Please ensure the backend is running on port 8080.");
            } else {
                setError("Login failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mb-6">
                        <Shield className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">Admin Portal</h2>
                    <p className="text-gray-600">Sign in to manage your dormitory</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border-0">
                    {/* Success Message */}
                    {successMessage && (
                        <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-center">
                            <div className="text-sm">{successMessage}</div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center">
                            <div className="text-sm">{error}</div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <User className="inline w-4 h-4 mr-2" />
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        
                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <Lock className="inline w-4 h-4 mr-2" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    placeholder="Enter your password"
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
                        
                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Signing In...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Demo Credentials:</h4>
                        <div className="text-xs text-gray-600">
                            <p>Username: <code className="bg-gray-200 px-2 py-1 rounded">admin</code></p>
                            <p>Password: <code className="bg-gray-200 px-2 py-1 rounded">admin123</code></p>
                        </div>
                    </div>

                    {/* Signup Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have an admin account?{' '}
                            <Link to="/admin/signup" className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors">
                                Create one here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;