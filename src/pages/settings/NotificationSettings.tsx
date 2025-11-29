import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Save } from 'lucide-react';
import { useState } from 'react';

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNewReservation: true,
    emailCancellation: true,
    emailPayment: true,
    emailGuestCheckIn: false,
    smsNewReservation: false,
    smsCancellation: true,
    smsPayment: false,
    smsGuestCheckIn: false,
    bookingUpdates: true,
    maintenanceAlerts: true,
    systemUpdates: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Notification settings:', settings);
    alert('Notification settings saved successfully!');
  };

  return (
    <DashboardLayout title="Notification Settings" description="Manage your notification preferences">
      <div className="max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Notifications */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="mb-4">Email Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p>New Reservations</p>
                  <p className="text-sm text-gray-500">Receive emails when a new reservation is made</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNewReservation}
                    onChange={() => handleToggle('emailNewReservation')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D4AF37]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p>Cancellations</p>
                  <p className="text-sm text-gray-500">Receive emails when a reservation is cancelled</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailCancellation}
                    onChange={() => handleToggle('emailCancellation')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D4AF37]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p>Payment Updates</p>
                  <p className="text-sm text-gray-500">Receive emails for payment confirmations and issues</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailPayment}
                    onChange={() => handleToggle('emailPayment')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D4AF37]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p>Guest Check-ins</p>
                  <p className="text-sm text-gray-500">Receive emails when guests check in</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailGuestCheckIn}
                    onChange={() => handleToggle('emailGuestCheckIn')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D4AF37]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* SMS Notifications */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="mb-4">SMS Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p>New Reservations</p>
                  <p className="text-sm text-gray-500">Receive SMS when a new reservation is made</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.smsNewReservation}
                    onChange={() => handleToggle('smsNewReservation')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D4AF37]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p>Cancellations</p>
                  <p className="text-sm text-gray-500">Receive SMS when a reservation is cancelled</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.smsCancellation}
                    onChange={() => handleToggle('smsCancellation')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D4AF37]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* General Notifications */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="mb-4">Booking Updates</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p>Booking Updates</p>
                  <p className="text-sm text-gray-500">Notifications about booking modifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.bookingUpdates}
                    onChange={() => handleToggle('bookingUpdates')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D4AF37]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p>Maintenance Alerts</p>
                  <p className="text-sm text-gray-500">Important room maintenance notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceAlerts}
                    onChange={() => handleToggle('maintenanceAlerts')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D4AF37]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p>System Updates</p>
                  <p className="text-sm text-gray-500">Updates about new features and improvements</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.systemUpdates}
                    onChange={() => handleToggle('systemUpdates')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D4AF37]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                </label>
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
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
