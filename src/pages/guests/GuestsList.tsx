import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Search, Filter, Plus, Eye, Edit, Ban } from 'lucide-react';
import { guests } from '../../data/mockData';
import { useState } from 'react';
import { Link } from 'wouter';

export default function GuestsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'blocked'>('all');

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch =
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || guest.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <DashboardLayout title="Guests Management" description="Manage all guest information and bookings">
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search guests by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>

          {/* Add Guest Button */}
          <Link href="/guests/add">
            <a className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#2F3640] rounded-lg hover:bg-[#C4A030] transition-colors">
              <Plus className="w-4 h-4" />
              Add Guest
            </a>
          </Link>
        </div>

        {/* Guests Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-gray-600">Guest</th>
                  <th className="text-left px-6 py-3 text-gray-600">Contact</th>
                  <th className="text-left px-6 py-3 text-gray-600">Nationality</th>
                  <th className="text-left px-6 py-3 text-gray-600">Total Bookings</th>
                  <th className="text-left px-6 py-3 text-gray-600">Total Spent</th>
                  <th className="text-left px-6 py-3 text-gray-600">Status</th>
                  <th className="text-left px-6 py-3 text-gray-600">Last Visit</th>
                  <th className="text-center px-6 py-3 text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map((guest) => (
                  <tr key={guest.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {guest.avatar ? (
                          <img src={guest.avatar} alt={guest.name} className="w-10 h-10 rounded-full" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                            <span className="text-[#D4AF37]">{guest.name.charAt(0)}</span>
                          </div>
                        )}
                        <span>{guest.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-600">
                        <div>{guest.email}</div>
                        <div className="text-sm">{guest.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{guest.nationality}</td>
                    <td className="px-6 py-4 text-gray-600">{guest.totalBookings}</td>
                    <td className="px-6 py-4 text-gray-600">${guest.totalSpent.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(guest.status)}`}>
                        {guest.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{guest.lastVisit}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/guests/${guest.id}`}>
                          <a className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </a>
                        </Link>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Block">
                          <Ban className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
