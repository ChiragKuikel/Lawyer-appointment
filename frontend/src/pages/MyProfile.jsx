import React, { useState, useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const { user, updateUserProfile, token, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+1 234 567 8900',
    address: user?.address || '123 Main St, New York, NY 10001',
    dob: user?.dob || '1990-01-01',
    gender: user?.gender || 'male',
    barNumber: user?.barNumber || '',
    lawFirm: user?.lawFirm || '',
    practiceAreas: user?.practiceAreas || ''
  });

  if (!token) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Please Login to View Profile</h2>
          <p className="text-gray-500 mb-6">You need to be logged in to see your profile.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    updateUserProfile(profileData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-white px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">My Profile</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-white text-primary rounded-lg hover:bg-opacity-90 transition-all font-medium"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-opacity-90 transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-white text-primary rounded-lg hover:bg-opacity-90 transition-all font-medium"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={assets.profile_pic}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-primary object-cover"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-opacity-90 transition-all">
                  📷
                </button>
              )}
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-800">{profileData.name}</h2>
            <p className="text-gray-600">{profileData.email}</p>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Personal Information</h3>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{profileData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{profileData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{profileData.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    name="dob"
                    value={profileData.dob}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{profileData.dob}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Gender</label>
                {isEditing ? (
                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p className="text-gray-800 font-medium capitalize">{profileData.gender}</p>
                )}
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Professional Information</h3>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Bar Number (if applicable)</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="barNumber"
                    value={profileData.barNumber}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                    placeholder="Enter your bar number"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{profileData.barNumber || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Law Firm / Organization</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lawFirm"
                    value={profileData.lawFirm}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                    placeholder="Enter your law firm"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{profileData.lawFirm || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Practice Areas</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="practiceAreas"
                    value={profileData.practiceAreas}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                    placeholder="e.g., Criminal Law, Family Law"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{profileData.practiceAreas || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Address</label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{profileData.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="mt-8 pt-6 border-t">
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;