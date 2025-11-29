import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ArrowLeft, Save } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { hotelBranches, guests, rooms } from '../../data/mockData';

export default function CreateReservation() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    hotelBranchId: user.hotelBranchId || '',
    guestId: '',
    roomId: '',
    checkIn: '',
    checkOut: '',
    specialRequests: '',
  });

  // Filter rooms based on selected hotel
  const availableRooms = formData.hotelBranchId
    ? rooms.filter((r) => r.hotelBranchId === formData.hotelBranchId && r.status === 'available')
    : [];

  const selectedRoom = rooms.find((r) => r.id === formData.roomId);

  // Calculate nights and total
  const calculateTotal = () => {
    if (!formData.checkIn || !formData.checkOut || !selectedRoom) return 0;
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights * selectedRoom.price : 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = calculateTotal();
    console.log('Reservation data:', { ...formData, totalAmount: total });
    alert('Reservation created successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <DashboardLayout title="Create Reservation" description="Create a new hotel reservation">
      <div className="space-y-6">
        <Link href="/reservations">
          <a className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Reservations
          </a>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="space-y-6">
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

                {/* Guest Selection */}
                <div>
                  <label htmlFor="guestId" className="block mb-2">
                    Guest *
                  </label>
                  <select
                    id="guestId"
                    name="guestId"
                    required
                    value={formData.guestId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
                  >
                    <option value="">Select Guest</option>
                    {guests.filter((g) => g.status === 'active').map((guest) => (
                      <option key={guest.id} value={guest.id}>
                        {guest.name} - {guest.email}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 mt-1">
                    Don't see the guest? <Link href="/guests/add"><a className="text-[#D4AF37] hover:text-[#C4A030]">Add new guest</a></Link>
                  </p>
                </div>

                {/* Room Selection */}
                <div>
                  <label htmlFor="roomId" className="block mb-2">
                    Room *
                  </label>
                  <select
                    id="roomId"
                    name="roomId"
                    required
                    value={formData.roomId}
                    onChange={handleChange}
                    disabled={!formData.hotelBranchId}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white disabled:bg-gray-100"
                  >
                    <option value="">Select Room</option>
                    {availableRooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        Room {room.roomNumber} - {room.type} - ${room.price}/night
                      </option>
                    ))}
                  </select>
                  {!formData.hotelBranchId && (
                    <p className="text-sm text-gray-500 mt-1">Please select a hotel first</p>
                  )}
                </div>

                {/* Check-in Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="checkIn" className="block mb-2">
                      Check-in Date *
                    </label>
                    <input
                      type="date"
                      id="checkIn"
                      name="checkIn"
                      required
                      value={formData.checkIn}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
                    />
                  </div>

                  {/* Check-out Date */}
                  <div>
                    <label htmlFor="checkOut" className="block mb-2">
                      Check-out Date *
                    </label>
                    <input
                      type="date"
                      id="checkOut"
                      name="checkOut"
                      required
                      value={formData.checkOut}
                      onChange={handleChange}
                      min={formData.checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label htmlFor="specialRequests" className="block mb-2">
                    Special Requests
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    rows={4}
                    value={formData.specialRequests}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
                    placeholder="Any special requirements or preferences..."
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 mt-6 pt-6 border-t border-gray-200">
                <Link href="/reservations">
                  <a className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    Cancel
                  </a>
                </Link>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-[#D4AF37] text-[#2F3640] rounded-lg hover:bg-[#C4A030] transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Create Reservation
                </button>
              </div>
            </form>
          </div>

          {/* Summary Sidebar */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sticky top-6">
              <h3 className="mb-4">Booking Summary</h3>
              {selectedRoom ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Room</p>
                    <p>Room {selectedRoom.roomNumber}</p>
                    <p className="text-sm text-gray-600">{selectedRoom.type}</p>
                  </div>
                  {formData.checkIn && formData.checkOut && (
                    <>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p>
                          {Math.ceil(
                            (new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}{' '}
                          nights
                        </p>
                      </div>
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                        <p className="text-[#D4AF37]">${calculateTotal().toLocaleString()}</p>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Select a room to see booking summary</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
