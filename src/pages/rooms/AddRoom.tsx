import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { hotelBranches } from '../../data/mockData';

export default function AddRoom() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    hotelBranchId: user.hotelBranchId || '',
    roomNumber: '',
    type: 'Single',
    floor: '1',
    capacity: '1',
    price: '',
    description: '',
    status: 'available',
  });

  const [amenities, setAmenities] = useState<string[]>(['WiFi', 'TV', 'AC']);
  const [newAmenity, setNewAmenity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Room data:', { ...formData, amenities });
    alert('Room added successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity.trim())) {
      setAmenities([...amenities, newAmenity.trim()]);
      setNewAmenity('');
    }
  };

  const removeAmenity = (amenity: string) => {
    setAmenities(amenities.filter((a) => a !== amenity));
  };

  return (
    <DashboardLayout title="Add New Room" description="Register a new room in the system">
      <div className="space-y-6">
        <Link href="/rooms">
          <a className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Rooms
          </a>
        </Link>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hotel Branch */}
            <div>
              <label htmlFor="hotelBranchId" className="block mb-2">
                Hotel Branch *
              </label>
              <select
                id="hotelBranchId"
                name="hotelBranchId"
                required
                value={formData.hotelBranchId}
                onChange={handleChange}
                disabled={user.role === 'branch-admin'}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white disabled:bg-gray-100"
              >
                <option value="">Select Hotel</option>
                {hotelBranches.map((hotel) => (
                  <option key={hotel.id} value={hotel.id}>
                    {hotel.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Room Number */}
            <div>
              <label htmlFor="roomNumber" className="block mb-2">
                Room Number *
              </label>
              <input
                type="text"
                id="roomNumber"
                name="roomNumber"
                required
                value={formData.roomNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
                placeholder="e.g., 101, 205"
              />
            </div>

            {/* Room Type */}
            <div>
              <label htmlFor="type" className="block mb-2">
                Room Type *
              </label>
              <select
                id="type"
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
              >
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Presidential">Presidential</option>
              </select>
            </div>

            {/* Floor */}
            <div>
              <label htmlFor="floor" className="block mb-2">
                Floor *
              </label>
              <input
                type="number"
                id="floor"
                name="floor"
                required
                min="1"
                value={formData.floor}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
              />
            </div>

            {/* Capacity */}
            <div>
              <label htmlFor="capacity" className="block mb-2">
                Capacity (Guests) *
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                required
                min="1"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block mb-2">
                Price per Night ($) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
                placeholder="e.g., 120.00"
              />
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block mb-2">
                Initial Status *
              </label>
              <select
                id="status"
                name="status"
                required
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
              >
                <option value="available">Available</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
                placeholder="Describe the room features and highlights..."
              />
            </div>

            {/* Amenities */}
            <div className="md:col-span-2">
              <label className="block mb-2">Amenities</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
                  placeholder="Add amenity (e.g., Mini Bar, Safe, Balcony)"
                />
                <button
                  type="button"
                  onClick={addAmenity}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 text-[#2F3640] rounded-full"
                  >
                    {amenity}
                    <button
                      type="button"
                      onClick={() => removeAmenity(amenity)}
                      className="hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 mt-6 pt-6 border-t border-gray-200">
            <Link href="/rooms">
              <a className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </a>
            </Link>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#D4AF37] text-[#2F3640] rounded-lg hover:bg-[#C4A030] transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Room
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
