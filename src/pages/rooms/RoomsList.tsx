import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Search, Filter, Plus, Eye, Edit, Wrench } from 'lucide-react';
import { rooms, hotelBranches } from '../../data/mockData';
import { useState } from 'react';
import { Link } from 'wouter';
import { useAuth } from '../../context/AuthContext';

export default function RoomsList() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'occupied' | 'maintenance' | 'reserved'>('all');
  const [hotelFilter, setHotelFilter] = useState<string>('all');

  // Filter rooms based on user role
  const userRooms = user.role === 'super-admin' 
    ? rooms 
    : rooms.filter((r) => r.hotelBranchId === user.hotelBranchId);

  const filteredRooms = userRooms.filter((room) => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    const matchesHotel = hotelFilter === 'all' || room.hotelBranchId === hotelFilter;
    return matchesSearch && matchesStatus && matchesHotel;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-red-100 text-red-800';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout title="Rooms Management" description="Manage all rooms across hotel branches">
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by room number or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="reserved">Reserved</option>
                <option value="maintenance">Maintenance</option>
              </select>

              {user.role === 'super-admin' && (
                <select
                  value={hotelFilter}
                  onChange={(e) => setHotelFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
                >
                  <option value="all">All Hotels</option>
                  {hotelBranches.map((hotel) => (
                    <option key={hotel.id} value={hotel.id}>
                      {hotel.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Add Room Button */}
          <Link href="/rooms/add">
            <a className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#2F3640] rounded-lg hover:bg-[#C4A030] transition-colors">
              <Plus className="w-4 h-4" />
              Add Room
            </a>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-gray-600 mb-1">Total Rooms</p>
            <p className="text-[#D4AF37]">{userRooms.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-gray-600 mb-1">Available</p>
            <p className="text-green-600">{userRooms.filter((r) => r.status === 'available').length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-gray-600 mb-1">Occupied</p>
            <p className="text-blue-600">{userRooms.filter((r) => r.status === 'occupied').length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-gray-600 mb-1">Maintenance</p>
            <p className="text-red-600">{userRooms.filter((r) => r.status === 'maintenance').length}</p>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => {
            const hotel = hotelBranches.find((h) => h.id === room.hotelBranchId);

            return (
              <div key={room.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                {/* Room Image */}
                <div className="h-48 overflow-hidden bg-gray-200">
                  {room.images[0] && (
                    <img src={room.images[0]} alt={`Room ${room.roomNumber}`} className="w-full h-full object-cover" />
                  )}
                </div>

                {/* Room Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4>Room {room.roomNumber}</h4>
                      <p className="text-gray-600">{room.type}</p>
                      {user.role === 'super-admin' && (
                        <p className="text-sm text-gray-500 mt-1">{hotel?.name}</p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(room.status)}`}>
                      {room.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Price per night</span>
                      <span className="text-[#D4AF37]">${room.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Capacity</span>
                      <span>{room.capacity} guests</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Floor</span>
                      <span>{room.floor}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                    <Link href={`/rooms/${room.id}`}>
                      <a className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        <Eye className="w-4 h-4" />
                        View
                      </a>
                    </Link>
                    <Link href={`/rooms/${room.id}/edit`}>
                      <a className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        <Edit className="w-4 h-4" />
                        Edit
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRooms.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500">No rooms found matching your criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
