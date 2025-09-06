'use client';

import { useState } from 'react';
import { Lock, Shield, Eye, EyeOff, Smartphone, Clock, MapPin, CheckCircle } from 'lucide-react';

export default function SecurityTab() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginHistory] = useState([
    {
      id: 1,
      device: 'Chrome on MacOS',
      location: 'Montreal, Canada',
      ip: '192.168.1.100',
      timestamp: '2024-01-15 14:30:25',
      status: 'success'
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'Toronto, Canada',
      ip: '192.168.1.101',
      timestamp: '2024-01-14 09:15:42',
      status: 'success'
    },
    {
      id: 3,
      device: 'Firefox on Windows',
      location: 'Vancouver, Canada',
      ip: '192.168.1.102',
      timestamp: '2024-01-13 16:45:18',
      status: 'failed'
    }
  ]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    // Here you would typically validate and save the password
    console.log('Changing password...');
    setIsChangingPassword(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const toggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Security Settings</h2>

      <div className="space-y-6">
        {/* Password Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Lock className="h-5 w-5 mr-2" />
            Password
          </h3>
          
          {!isChangingPassword ? (
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Password</div>
                <div className="text-sm text-gray-500">Last changed 3 months ago</div>
              </div>
              <button
                onClick={() => setIsChangingPassword(true)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Change Password
              </button>
            </div>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Two-Factor Authentication
          </h3>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900">Two-Factor Authentication</div>
              <div className="text-sm text-gray-500">
                {twoFactorEnabled 
                  ? 'Add an extra layer of security to your account' 
                  : 'Add an extra layer of security to your account'
                }
              </div>
            </div>
            <button
              onClick={toggleTwoFactor}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                twoFactorEnabled ? 'bg-red-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {twoFactorEnabled && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <div>
                  <div className="text-sm font-medium text-green-800">Two-Factor Authentication Enabled</div>
                  <div className="text-sm text-green-600">Your account is now protected with 2FA</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Login History */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Recent Login Activity
          </h3>
          
          <div className="space-y-4">
            {loginHistory.map((login) => (
              <div key={login.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full ${
                      login.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{login.device}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {login.location} • {login.ip}
                    </div>
                    <div className="text-xs text-gray-400">{login.timestamp}</div>
                  </div>
                </div>
                <div className={`text-xs font-medium ${
                  login.status === 'success' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {login.status === 'success' ? 'Success' : 'Failed'}
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 text-sm text-red-600 hover:text-red-700 font-medium">
            View All Login History
          </button>
        </div>

        {/* Security Recommendations */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-3">Security Recommendations</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              Use a strong, unique password for your account
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              Enable two-factor authentication for added security
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              Log out from devices you no longer use
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              Report any suspicious activity immediately
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
