import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';
import { reservations, rooms, guests } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

export default function ReservationsCalendar() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 1)); // November 2024

  const userReservations = user.role === 'super-admin'
    ? reservations
    : reservations.filter((r) => r.hotelBranchId === user.hotelBranchId);

  const userRooms = user.role === 'super-admin'
    ? rooms
    : rooms.filter((r) => r.hotelBranchId === user.hotelBranchId);

  // Generate days for the month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Check if a room has a reservation on a specific date
  const hasReservation = (roomId: string, date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return userReservations.find((res) => {
      if (res.roomId !== roomId) return false;
      const checkIn = new Date(res.checkIn);
      const checkOut = new Date(res.checkOut);
      const current = new Date(dateStr);
      return current >= checkIn && current <= checkOut;
    });
  };

  const getReservationColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <DashboardLayout title="Reservation Calendar" description="Visual calendar view of all reservations">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/reservations">
            <a className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4" />
              Back to List
            </a>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3>
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm">Confirmed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm">Cancelled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <span className="text-sm">Available</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-600 sticky left-0 bg-gray-50 z-10">Room</th>
                  {days.map((day) => (
                    <th key={day.toISOString()} className="text-center px-2 py-3 text-gray-600 min-w-[40px]">
                      <div>{day.getDate()}</div>
                      <div className="text-xs text-gray-400">
                        {day.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {userRooms.slice(0, 10).map((room) => (
                  <tr key={room.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-2 sticky left-0 bg-white z-10">
                      <div>
                        <span>Room {room.roomNumber}</span>
                        <div className="text-xs text-gray-500">{room.type}</div>
                      </div>
                    </td>
                    {days.map((day) => {
                      const reservation = hasReservation(room.id, day);
                      const guest = reservation ? guests.find((g) => g.id === reservation.guestId) : null;

                      return (
                        <td
                          key={day.toISOString()}
                          className="px-1 py-2 text-center"
                          title={reservation && guest ? `${guest.name} - ${reservation.status}` : 'Available'}
                        >
                          <div
                            className={`h-8 rounded ${
                              reservation
                                ? getReservationColor(reservation.status)
                                : 'bg-gray-100'
                            }`}
                          ></div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-sm text-gray-500 text-center">
          Showing first 10 rooms. Hover over cells to see reservation details.
        </p>
      </div>
    </DashboardLayout>
  );
}
