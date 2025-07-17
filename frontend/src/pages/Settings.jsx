import React, { useContext, useEffect, useState } from 'react';
import { User, Bell, Shield, CreditCard, Globe, Moon, Sun, Smartphone, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext, } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Settings = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    toast.info("We are working on it!");
    navigate('/profile');
  })
  const { user, updateUser } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    donationsVisible: false,
    contactInfo: false
  });
  const [language, setLanguage] = useState('en');

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: Globe }
  ];

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateUser(profileData);
    // Show success message
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Update password logic
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Settings</h1>
          <p className="text-lg text-gray-600 dark:text-dark-300">
            Manage your account preferences and security settings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-dark-700">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-linear-to-r from-emerald-500 to-green-600 text-white shadow-md'
                        : 'text-gray-700 dark:text-dark-300 hover:bg-emerald-50 dark:hover:bg-dark-700 hover:text-emerald-600'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-8 border border-gray-100 dark:border-dark-700">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Information</h2>
                  
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="flex items-center space-x-6 mb-8">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-24 h-24 rounded-full object-cover ring-4 ring-emerald-100 dark:ring-emerald-800"
                      />
                      <div>
                        <button
                          type="button"
                          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          Change Photo
                        </button>
                        <p className="text-sm text-gray-500 dark:text-dark-400 mt-2">JPG, GIF or PNG. 1MB max.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                          placeholder="City, Country"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        rows={4}
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={profileData.website}
                        onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-linear-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </form>

                  {/* Password Change Section */}
                  <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-600">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Change Password</h3>
                    
                    <form onSubmit={handlePasswordUpdate} className="space-y-6 max-w-md">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                            className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                          New Password
                        </label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-emerald-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">Email Notifications</h3>
                          <p className="text-sm text-gray-600 dark:text-dark-300">Receive updates via email</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.email}
                          onChange={() => handleNotificationChange('email')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-hidden peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-5 w-5 text-emerald-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">Push Notifications</h3>
                          <p className="text-sm text-gray-600 dark:text-dark-300">Receive push notifications in browser</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.push}
                          onChange={() => handleNotificationChange('push')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-hidden peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-5 w-5 text-emerald-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">SMS Notifications</h3>
                          <p className="text-sm text-gray-600 dark:text-dark-300">Receive text messages for important updates</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.sms}
                          onChange={() => handleNotificationChange('sms')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-hidden peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-emerald-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">Marketing Emails</h3>
                          <p className="text-sm text-gray-600 dark:text-dark-300">Receive newsletters and promotional content</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.marketing}
                          onChange={() => handleNotificationChange('marketing')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-hidden peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Privacy & Security</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Visibility</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-xl">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Public Profile</h4>
                            <p className="text-sm text-gray-600 dark:text-dark-300">Allow others to view your profile</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={privacy.profileVisible}
                              onChange={() => handlePrivacyChange('profileVisible')}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-hidden peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-xl">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Show Donations</h4>
                            <p className="text-sm text-gray-600 dark:text-dark-300">Display your donation history publicly</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={privacy.donationsVisible}
                              onChange={() => handlePrivacyChange('donationsVisible')}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-hidden peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-xl">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Contact Information</h4>
                            <p className="text-sm text-gray-600 dark:text-dark-300">Allow others to see your contact details</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={privacy.contactInfo}
                              onChange={() => handlePrivacyChange('contactInfo')}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-hidden peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security Actions</h3>
                      <div className="space-y-3">
                        <button className="w-full text-left p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-red-900 dark:text-red-400">Delete Account</h4>
                              <p className="text-sm text-red-600 dark:text-red-500">Permanently delete your account and all data</p>
                            </div>
                            <Lock className="h-5 w-5 text-red-600 dark:text-red-500" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Tab */}
              {activeTab === 'payment' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Payment Methods</h2>
                  
                  <div className="space-y-6">
                    <div className="border border-gray-200 dark:border-dark-600 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Saved Payment Methods</h3>
                        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                          Add New
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <CreditCard className="h-6 w-6 text-gray-600 dark:text-dark-300" />
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
                              <p className="text-sm text-gray-600 dark:text-dark-300">Expires 12/25</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 dark:border-dark-600 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Billing Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                            Billing Address
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                            placeholder="123 Main St"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                            placeholder="San Francisco"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Preferences</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => setTheme('light')}
                          className={`flex items-center space-x-2 px-4 py-3 rounded-xl border-2 transition-colors ${
                            theme === 'light' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-200 dark:border-dark-600 hover:border-emerald-300'
                          }`}
                        >
                          <Sun className="h-5 w-5" />
                          <span className="text-gray-900 dark:text-white">Light</span>
                        </button>
                        <button
                          onClick={() => setTheme('dark')}
                          className={`flex items-center space-x-2 px-4 py-3 rounded-xl border-2 transition-colors ${
                            theme === 'dark' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-200 dark:border-dark-600 hover:border-emerald-300'
                          }`}
                        >
                          <Moon className="h-5 w-5" />
                          <span className="text-gray-900 dark:text-white">Dark</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Language</h3>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full max-w-xs px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="zh">中文</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;