import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ArrowLeft, Mail, Phone, MapPin, CreditCard, Calendar, Edit, Ban, Trash2 } from 'lucide-react';
import { guests, reservations, rooms, hotelBranches } from '../../data/mockData';
import { useRoute, Link } from 'wouter';

export default function GuestDetails() {
  const [, params] = useRoute('/guests/:id');
  const guest = guests.find((g) => g.id === params?.id);

  if (!guest) {
    return (
      <DashboardLayout title="Guest Not Found" description="The guest you're looking for doesn't exist">
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Guest not found</p>
          <Link href="/guests">
            <a className="text-[#D4AF37] hover:text-[#C4A030]">← Back to Guests</a>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  // Get guest's reservations
  const guestReservations = reservations.filter((r) => r.guestId === guest.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout title="Guest Details" description="View and manage guest information">
      <div className="space-y-6">
        {/* Back Button */}
        <Link href="/guests">
          <a className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Guests
          </a>
        </Link>

        {/* Guest Info Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div>
              {guest.avatar ? (
                <img src={guest.avatar} alt={guest.name} className="w-32 h-32 rounded-full" />
              ) : (
                <div className="w-32 h-32 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                  <span className="text-[#D4AF37] text-4xl">{guest.name.charAt(0)}</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="mb-2">{guest.name}</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      guest.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {guest.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                    <Ban className="w-4 h-4" />
                    Block
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{guest.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{guest.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Nationality</p>
                    <p>{guest.nationality}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">ID Number</p>
                    <p>{guest.idNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Joined Date</p>
                    <p>{guest.joinedDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Last Visit</p>
                    <p>{guest.lastVisit}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-500 mb-1">Total Bookings</p>
              <p className="text-[#D4AF37]">{guest.totalBookings}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 mb-1">Total Spent</p>
              <p className="text-[#D4AF37]">${guest.totalSpent.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 mb-1">Average per Booking</p>
              <p className="text-[#D4AF37]">
                ${guest.totalBookings > 0 ? Math.round(guest.totalSpent / guest.totalBookings).toLocaleString() : 0}
              </p>
            </div>
          </div>
        </div>

        {/* Reservation History */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3>Reservation History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-gray-600">Hotel</th>
                  <th className="text-left px-6 py-3 text-gray-600">Room</th>
                  <th className="text-left px-6 py-3 text-gray-600">Check-in</th>
                  <th className="text-left px-6 py-3 text-gray-600">Check-out</th>
                  <th className="text-left px-6 py-3 text-gray-600">Status</th>
                  <th className="text-left px-6 py-3 text-gray-600">Payment</th>
                  <th className="text-right px-6 py-3 text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {guestReservations.length > 0 ? (
                  guestReservations.map((reservation) => {
                    const hotel = hotelBranches.find((h) => h.id === reservation.hotelBranchId);
                    const room = rooms.find((r) => r.id === reservation.roomId);

                    return (
                      <tr key={reservation.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-4">{hotel?.name}</td>
                        <td className="px-6 py-4 text-gray-600">{room?.roomNumber} - {room?.type}</td>
                        <td className="px-6 py-4 text-gray-600">{reservation.checkIn}</td>
                        <td className="px-6 py-4 text-gray-600">{reservation.checkOut}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(reservation.status)}`}>
                            {reservation.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(reservation.paymentStatus)}`}>
                            {reservation.paymentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">${reservation.totalAmount.toLocaleString()}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No reservations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
