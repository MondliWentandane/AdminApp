import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Save, Building2, DollarSign, Users, Shield } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { hotelBranches } from '../../data/mockData';

export default function SystemSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    maxGuestsPerRoom: '6',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    cancellationPeriod: '24',
    earlyCheckInFee: '50',
    lateCheckOutFee: '50',
    taxRate: '10',
    serviceFee: '5',
    currency: 'USD',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('System settings:', settings);
    alert('System settings saved successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  // Only super admins can access system settings
  if (user.role !== 'super-admin') {
    return (
      <DashboardLayout title="Access Denied" description="You don't have permission to view this page">
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="mb-2">Access Denied</h3>
          <p className="text-gray-600">Only Super Admins can access system settings.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="System Settings" description="Configure global system settings">
      <div className="max-w-4xl space-y-6">
        {/* Hotel Branches */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-[#D4AF37]" />
            <h3>Hotel Branches</h3>
          </div>
          <div className="space-y-3">
            {hotelBranches.map((hotel) => (
              <div key={hotel.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p>{hotel.name}</p>
                  <p className="text-sm text-gray-500">{hotel.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Rooms</p>
                  <p>{hotel.totalRooms}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Booking Rules */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-[#D4AF37]" />
              <h3>Booking Rules</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="maxGuestsPerRoom" className="block mb-2">
                  Maximum Guests per Room
                </label>
                <input
                  type="number"
                  id="maxGuestsPerRoom"
                  name="maxGuestsPerRoom"
                  value={settings.maxGuestsPerRoom}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
                />
              </div>

              <div>
                <label htmlFor="cancellationPeriod" className="block mb-2">
                  Cancellation Period (hours)
                </label>
                <input
                  type="number"
                  id="cancellationPeriod"
                  name="cancellationPeriod"
                  value={settings.cancellationPeriod}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Free cancellation within this period before check-in
                </p>
              </div>

              <div>
                <label htmlFor="checkInTime" className="block mb-2">
                  Standard Check-in Time
                </label>
                <input
                  type="time"
                  id="checkInTime"
                  name="checkInTime"
                  value={settings.checkInTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
                />
              </div>

              <div>
                <label htmlFor="checkOutTime" className="block mb-2">
                  Standard Check-out Time
                </label>
                <input
                  type="time"
                  id="checkOutTime"
                  name="checkOutTime"
                  value={settings.checkOutTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Pricing Rules */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-[#D4AF37]" />
              <h3>Pricing Rules</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="earlyCheckInFee" className="block mb-2">
                  Early Check-in Fee ($)
                </label>
                <input
                  type="number"
                  id="earlyCheckInFee"
                  name="earlyCheckInFee"
                  value={settings.earlyCheckInFee}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
                />
              </div>

              <div>
                <label htmlFor="lateCheckOutFee" className="block mb-2">
                  Late Check-out Fee ($)
                </label>
                <input
                  type="number"
                  id="lateCheckOutFee"
                  name="lateCheckOutFee"
                  value={settings.lateCheckOutFee}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
                />
              </div>

              <div>
                <label htmlFor="taxRate" className="block mb-2">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  id="taxRate"
                  name="taxRate"
                  value={settings.taxRate}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
                />
              </div>

              <div>
                <label htmlFor="serviceFee" className="block mb-2">
                  Service Fee (%)
                </label>
                <input
                  type="number"
                  id="serviceFee"
                  name="serviceFee"
                  value={settings.serviceFee}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
                />
              </div>

              <div>
                <label htmlFor="currency" className="block mb-2">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={settings.currency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#D4AF37] text-[#2F3640] rounded-lg hover:bg-[#C4A030] transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
