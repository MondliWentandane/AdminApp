import { DashboardLayout } from '../components/layout/DashboardLayout';
import { KPICard } from '../components/dashboard/KPICard';
import { Users, Calendar, Bed, CheckCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { reservations, guests, rooms, hotelBranches } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { Link } from 'wouter';

// Mock chart data
const bookingTrendsData = [
  { month: 'Jun', bookings: 45 },
  { month: 'Jul', bookings: 52 },
  { month: 'Aug', bookings: 61 },
  { month: 'Sep', bookings: 58 },
  { month: 'Oct', bookings: 70 },
  { month: 'Nov', bookings: 65 },
];

const occupancyData = [
  { month: 'Jun', rate: 75 },
  { month: 'Jul', rate: 82 },
  { month: 'Aug', rate: 88 },
  { month: 'Sep', rate: 79 },
  { month: 'Oct', rate: 85 },
  { month: 'Nov', rate: 81 },
];

const revenueData = [
  { month: 'Jun', revenue: 45000 },
  { month: 'Jul', revenue: 52000 },
  { month: 'Aug', revenue: 61000 },
  { month: 'Sep', revenue: 58000 },
  { month: 'Oct', revenue: 70000 },
  { month: 'Nov', revenue: 65000 },
];

export default function Dashboard() {
  const { user } = useAuth();

  // Filter data based on user role
  const filteredReservations = user.role === 'super-admin'
    ? reservations
    : reservations.filter((r) => r.hotelBranchId === user.hotelBranchId);

  const filteredRooms = user.role === 'super-admin'
    ? rooms
    : rooms.filter((r) => r.hotelBranchId === user.hotelBranchId);

  // Calculate KPIs
  const totalGuests = guests.filter((g) => g.status === 'active').length;
  const totalReservations = filteredReservations.length;
  const occupiedRooms = filteredRooms.filter((r) => r.status === 'occupied').length;
  const availableRooms = filteredRooms.filter((r) => r.status === 'available').length;
  const totalRooms = filteredRooms.length;
  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

  // Get recent reservations (last 5)
  const recentReservations = [...filteredReservations]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

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
    <DashboardLayout title="Dashboard" description="Overview of your hotel management system">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Guests"
          value={totalGuests}
          icon={Users}
          change={{ value: '+12%', isPositive: true }}
        />
        <KPICard
          title="Total Reservations"
          value={totalReservations}
          icon={Calendar}
          change={{ value: '+8%', isPositive: true }}
        />
        <KPICard
          title="Room Occupancy"
          value={`${occupancyRate}%`}
          icon={CheckCircle}
          subtitle={`${occupiedRooms} of ${totalRooms} rooms occupied`}
          change={{ value: '+5%', isPositive: true }}
        />
        <KPICard
          title="Available Rooms"
          value={availableRooms}
          icon={Bed}
          subtitle={`Ready for booking`}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Booking Trends */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="mb-4">Booking Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={bookingTrendsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Area type="monotone" dataKey="bookings" stroke="#D4AF37" fill="#D4AF37" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Occupancy Rate */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="mb-4">Occupancy Rate (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="#2F3640" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
        <h3 className="mb-4">Revenue Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Bar dataKey="revenue" fill="#D4AF37" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Reservations */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3>Recent Reservations</h3>
          <Link href="/reservations">
            <a className="text-[#D4AF37] hover:text-[#C4A030] transition-colors">View All</a>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-gray-600">Guest</th>
                <th className="text-left px-6 py-3 text-gray-600">Hotel</th>
                <th className="text-left px-6 py-3 text-gray-600">Check-in</th>
                <th className="text-left px-6 py-3 text-gray-600">Check-out</th>
                <th className="text-left px-6 py-3 text-gray-600">Status</th>
                <th className="text-right px-6 py-3 text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentReservations.map((reservation) => {
                const guest = guests.find((g) => g.id === reservation.guestId);
                const hotel = hotelBranches.find((h) => h.id === reservation.hotelBranchId);
                
                return (
                  <tr key={reservation.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {guest?.avatar && (
                          <img src={guest.avatar} alt={guest.name} className="w-8 h-8 rounded-full" />
                        )}
                        <span>{guest?.name || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{hotel?.name}</td>
                    <td className="px-6 py-4 text-gray-600">{reservation.checkIn}</td>
                    <td className="px-6 py-4 text-gray-600">{reservation.checkOut}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(reservation.status)}`}>
                        {reservation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">${reservation.totalAmount.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
