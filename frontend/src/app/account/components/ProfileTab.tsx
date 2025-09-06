'use client';

import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X, Shield, AlertTriangle, FileText, CheckCircle } from 'lucide-react';

export default function ProfileTab() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-15',
    address: '123 Main Street',
    city: 'Montreal',
    province: 'Quebec',
    postalCode: 'H1A 1A1',
    country: 'Canada',
    // Mailing address
    mailingAddress: '456 Mailing Street',
    mailingCity: 'Montreal',
    mailingProvince: 'Quebec',
    mailingPostalCode: 'H2B 2B2',
    mailingCountry: 'Canada',
    // Emergency contact
    emergencyContactName: 'Jane Doe',
    emergencyContactPhone: '+1 (555) 987-6543',
    emergencyContactRelationship: 'Spouse',
    emergencyContactEmail: 'jane.doe@example.com',
    // Identity verification
    identityVerified: false,
    idType: 'Driver License',
    idNumber: 'DL123456789',
    idExpiryDate: '2025-12-31'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log('Saving profile data:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Profile Information</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Edit3 className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Personal Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Mail className="h-5 w-5 mr-2" />
            Contact Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Residential Address */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Residential Address
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Province/State
                </label>
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-500"
              >
                <option value="Canada">Canada</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mailing Address */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Mailing Address
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mailing Street Address
              </label>
              <input
                type="text"
                name="mailingAddress"
                value={formData.mailingAddress}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="mailingCity"
                  value={formData.mailingCity}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Province/State
                </label>
                <input
                  type="text"
                  name="mailingProvince"
                  value={formData.mailingProvince}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="mailingPostalCode"
                  value={formData.mailingPostalCode}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                name="mailingCountry"
                value={formData.mailingCountry}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-500"
              >
                <option value="Canada">Canada</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Emergency Contact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relationship
              </label>
              <select
                name="emergencyContactRelationship"
                value={formData.emergencyContactRelationship}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-500"
              >
                <option value="Spouse">Spouse</option>
                <option value="Parent">Parent</option>
                <option value="Sibling">Sibling</option>
                <option value="Child">Child</option>
                <option value="Friend">Friend</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="emergencyContactEmail"
                value={formData.emergencyContactEmail}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Identity Verification */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Identity Verification
          </h3>
          
          {/* Verification Status */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                formData.identityVerified 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {formData.identityVerified ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <FileText className="h-5 w-5" />
                )}
                <span className="font-medium">
                  {formData.identityVerified ? 'Verified' : 'Pending Verification'}
                </span>
              </div>
            </div>
            {!formData.identityVerified && (
              <p className="text-sm text-gray-600 mb-4">
                Complete your identity verification to access all features and ensure secure transactions.
              </p>
            )}
          </div>

          {/* Identity Document Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID Type
                </label>
                <select
                  name="idType"
                  value={formData.idType}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-500"
                >
                  <option value="Driver License">Driver License</option>
                  <option value="Passport">Passport</option>
                  <option value="National ID">National ID</option>
                  <option value="Health Card">Health Card</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID Number
                </label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                name="idExpiryDate"
                value={formData.idExpiryDate}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            
            {/* Upload Section */}
            {isEditing && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Upload a clear photo of your ID document
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Supported formats: JPG, PNG, PDF (Max 10MB)
                </p>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
                >
                  Choose File
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
