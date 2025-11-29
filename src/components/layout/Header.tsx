import { Bell, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { hotelBranches } from '../../data/mockData';

interface HeaderProps {
  title: string;
  description?: string;
}

export function Header({ title, description }: HeaderProps) {
  const { user } = useAuth();

  // Get user's hotel branch
  const userBranch = user.hotelBranchId
    ? hotelBranches.find((b) => b.id === user.hotelBranchId)
    : null;

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1>{title}</h1>
          {description && <p className="text-gray-600 mt-1">{description}</p>}
        </div>

        <div className="flex items-center gap-4">
          {/* Hotel Branch Badge */}
          {user.role === 'branch-admin' && userBranch && (
            <div className="bg-[#D4AF37]/10 text-[#2F3640] px-4 py-2 rounded-lg border border-[#D4AF37]/20">
              <p className="text-sm">{userBranch.name}</p>
            </div>
          )}

          {user.role === 'super-admin' && (
            <div className="bg-[#D4AF37]/10 text-[#2F3640] px-4 py-2 rounded-lg border border-[#D4AF37]/20">
              <p className="text-sm">All Hotels Access</p>
            </div>
          )}

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 bg-gray-50"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
