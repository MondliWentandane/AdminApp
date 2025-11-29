import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Save, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { hotelBranches } from '../../data/mockData';

export default function ProfileSettings() {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update user profile
    setUser({ ...user, name: formData.name, email: formData.email });
    alert('Profile updated successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const userBranch = user.hotelBranchId
    ? hotelBranches.find((b) => b.id === user.hotelBranchId)
    : null;

  return (
    <DashboardLayout title="Settings" description="Manage your account settings">
      <div className="max-w-4xl space-y-6">
        {/* Profile Picture */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="mb-4">Profile Picture</h3>
          <div className="flex items-center gap-6">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                <span className="text-[#D4AF37] text-3xl">{user.name.charAt(0)}</span>
              </div>
            )}
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Camera className="w-4 h-4" />
              Change Photo
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
              />
            </div>
            <div>
              <label className="block mb-2">Role</label>
              <input
                type="text"
                value={user.role === 'super-admin' ? 'Super Admin' : 'Branch Admin'}
                disabled
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100"
              />
            </div>
            {user.role === 'branch-admin' && userBranch && (
              <div>
                <label className="block mb-2">Hotel Branch</label>
                <input
                  type="text"
                  value={userBranch.name}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-4 mt-6 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#D4AF37] text-[#2F3640] rounded-lg hover:bg-[#C4A030] transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>

        {/* Change Password */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="mb-4">Change Password</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block mb-2">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#D4AF37] text-[#2F3640] rounded-lg hover:bg-[#C4A030] transition-colors"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
