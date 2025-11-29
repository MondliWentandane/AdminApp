import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ArrowLeft, User, Bed, Calendar, CreditCard, CheckCircle, XCircle, Edit } from 'lucide-react';
import { reservations, guests, rooms, hotelBranches } from '../../data/mockData';
import { useRoute, Link } from 'wouter';

export default function ReservationDetails() {
  const [, params] = useRoute('/reservations/:id');
  const reservation = reservations.find((r) => r.id === params?.id);

  if (!reservation) {
    return (
      <DashboardLayout title="Reservation Not Found" description="The reservation you're looking for doesn't exist">
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Reservation not found</p>
          <Link href="/reservations">
            <a className="text-[#D4AF37] hover:text-[#C4A030]">← Back to Reservations</a>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const guest = guests.find((g) => g.id === reservation.guestId);
  const room = rooms.find((r) => r.id === reservation.roomId);
  const hotel = hotelBranches.find((h) => h.id === reservation.hotelBranchId);

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

  // Calculate nights
  const checkIn = new Date(reservation.checkIn);
  const checkOut = new Date(reservation.checkOut);
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <DashboardLayout title="Reservation Details" description="View and manage reservation information">
      <div className="space-y-6">
        {/* Back Button */}
        <Link href="/reservations">
          <a className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Reservations
          </a>
        </Link>

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="mb-2">Reservation #{reservation.id.slice(-8).toUpperCase()}</h2>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(reservation.status)}`}>
                  {reservation.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(reservation.paymentStatus)}`}>
                  Payment: {reservation.paymentStatus}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {reservation.status === 'pending' && (
                <>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <XCircle className="w-4 h-4" />
                    Cancel
                  </button>
                </>
              )}
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Edit className="w-4 h-4" />
                Modify
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Guest Information */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-[#D4AF37]" />
                <h3>Guest Information</h3>
              </div>
              {guest && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    {guest.avatar && (
                      <img src={guest.avatar} alt={guest.name} className="w-16 h-16 rounded-full" />
                    )}
                    <div>
                      <p>{guest.name}</p>
                      <p className="text-gray-600">{guest.email}</p>
                      <p className="text-gray-600">{guest.phone}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500">Nationality</p>
                      <p>{guest.nationality}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ID Number</p>
                      <p>{guest.idNumber}</p>
                    </div>
                  </div>
                  <Link href={`/guests/${guest.id}`}>
                    <a className="text-[#D4AF37] hover:text-[#C4A030] text-sm">View full profile →</a>
                  </Link>
                </div>
              )}
            </div>

            {/* Room Information */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bed className="w-5 h-5 text-[#D4AF37]" />
                <h3>Room Information</h3>
              </div>
              {room && (
                <div className="space-y-4">
                  {room.images[0] && (
                    <div className="h-48 rounded-lg overflow-hidden">
                      <img src={room.images[0]} alt={`Room ${room.roomNumber}`} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div>
                    <h4>Room {room.roomNumber}</h4>
                    <p className="text-gray-600">{room.type}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Hotel</p>
                      <p>{hotel?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Floor</p>
                      <p>{room.floor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Capacity</p>
                      <p>{room.capacity} guests</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Price per night</p>
                      <p>${room.price}</p>
                    </div>
                  </div>
                  <Link href={`/rooms/${room.id}`}>
                    <a className="text-[#D4AF37] hover:text-[#C4A030] text-sm">View room details →</a>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Dates */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-[#D4AF37]" />
                <h3>Stay Details</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Check-in</p>
                  <p>{reservation.checkIn}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Check-out</p>
                  <p>{reservation.checkOut}</p>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Total Nights</p>
                  <p>{nights} {nights === 1 ? 'night' : 'nights'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Booked On</p>
                  <p>{reservation.createdAt}</p>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                <h3>Payment Summary</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Room rate × {nights}</span>
                  <span>${room ? room.price * nights : 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Service charge</span>
                  <span>$0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>$0</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-[#D4AF37]">${reservation.totalAmount.toLocaleString()}</span>
                </div>
                <div className="pt-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(reservation.paymentStatus)}`}>
                    {reservation.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            {reservation.specialRequests && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="mb-3">Special Requests</h4>
                <p className="text-gray-600 text-sm">{reservation.specialRequests}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
