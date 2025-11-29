import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Search, Filter, Plus, Eye, Edit, X } from 'lucide-react';
import { reservations, guests, rooms, hotelBranches } from '../../data/mockData';
import { useState } from 'react';
import { Link } from 'wouter';
import { useAuth } from '../../context/AuthContext';

export default function ReservationsList() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'pending' | 'cancelled' | 'completed'>('all');

  // Filter reservations based on user role
  const userReservations = user.role === 'super-admin'
    ? reservations
    : reservations.filter((r) => r.hotelBranchId === user.hotelBranchId);

  const filteredReservations = userReservations.filter((reservation) => {
    const guest = guests.find((g) => g.id === reservation.guestId);
    const matchesSearch = guest?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest?.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
    <DashboardLayout title="Reservations Management" description="Manage all hotel reservations">
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by guest name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <Link href="/reservations/calendar">
              <a className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Calendar View
              </a>
            </Link>
            <Link href="/reservations/create">
              <a className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#2F3640] rounded-lg hover:bg-[#C4A030] transition-colors">
                <Plus className="w-4 h-4" />
                New Reservation
              </a>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-gray-600 mb-1">Total</p>
            <p className="text-[#D4AF37]">{userReservations.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-gray-600 mb-1">Confirmed</p>
            <p className="text-green-600">{userReservations.filter((r) => r.status === 'confirmed').length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-gray-600 mb-1">Pending</p>
            <p className="text-yellow-600">{userReservations.filter((r) => r.status === 'pending').length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-gray-600 mb-1">Cancelled</p>
            <p className="text-red-600">{userReservations.filter((r) => r.status === 'cancelled').length}</p>
          </div>
        </div>

        {/* Reservations Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-gray-600">ID</th>
                  <th className="text-left px-6 py-3 text-gray-600">Guest</th>
                  <th className="text-left px-6 py-3 text-gray-600">Hotel</th>
                  <th className="text-left px-6 py-3 text-gray-600">Room</th>
                  <th className="text-left px-6 py-3 text-gray-600">Check-in</th>
                  <th className="text-left px-6 py-3 text-gray-600">Check-out</th>
                  <th className="text-left px-6 py-3 text-gray-600">Status</th>
                  <th className="text-left px-6 py-3 text-gray-600">Payment</th>
                  <th className="text-right px-6 py-3 text-gray-600">Amount</th>
                  <th className="text-center px-6 py-3 text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((reservation) => {
                  const guest = guests.find((g) => g.id === reservation.guestId);
                  const room = rooms.find((r) => r.id === reservation.roomId);
                  const hotel = hotelBranches.find((h) => h.id === reservation.hotelBranchId);

                  return (
                    <tr key={reservation.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-600">#{reservation.id.slice(-6)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {guest?.avatar && (
                            <img src={guest.avatar} alt={guest.name} className="w-8 h-8 rounded-full" />
                          )}
                          <div>
                            <div>{guest?.name}</div>
                            <div className="text-sm text-gray-500">{guest?.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{hotel?.name}</td>
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
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link href={`/reservations/${reservation.id}`}>
                            <a className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </a>
                          </Link>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
