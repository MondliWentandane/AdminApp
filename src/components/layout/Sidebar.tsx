import { Home, Users, Bed, Calendar, Settings, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  roles?: ('super-admin' | 'branch-admin')[];
  subItems?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: Home, path: '/' },
  { label: 'Guests', icon: Users, path: '/guests' },
  { label: 'Rooms', icon: Bed, path: '/rooms' },
  { label: 'Reservations', icon: Calendar, path: '/reservations' },
  {
    label: 'Settings',
    icon: Settings,
    path: '/settings',
    subItems: [
      { label: 'Profile', path: '/settings/profile' },
      { label: 'Notifications', path: '/settings/notifications' },
      { label: 'User Access', path: '/settings/users' },
      { label: 'System', path: '/settings/system' },
    ],
  },
];

export function Sidebar() {
  const [location] = useLocation();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>('/settings');

  return (
    <div
      className={`bg-[#2F3640] text-white h-screen flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="p-6 flex items-center justify-between border-b border-[#3d4654]">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-[#D4AF37]" />
            <div>
              <h1 className="text-[#D4AF37]">StayEase</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        )}
        {collapsed && <Building2 className="w-6 h-6 text-[#D4AF37] mx-auto" />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 hover:bg-[#3d4654] rounded absolute right-[-12px] bg-[#2F3640] border border-[#3d4654]"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path || location.startsWith(item.path + '/');
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedItem === item.path;

            return (
              <li key={item.path}>
                {hasSubItems ? (
                  <>
                    <button
                      onClick={() => setExpandedItem(isExpanded ? null : item.path)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[#D4AF37] text-[#2F3640]'
                          : 'text-gray-300 hover:bg-[#3d4654] hover:text-white'
                      } ${collapsed ? 'justify-center' : ''}`}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon className="w-5 h-5" />
                      {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                    </button>
                    {!collapsed && isExpanded && (
                      <ul className="mt-2 ml-4 space-y-1">
                        {item.subItems?.map((subItem) => {
                          const isSubActive = location === subItem.path;
                          // Filter settings items based on role
                          if (subItem.path === '/settings/users' && user.role !== 'super-admin') return null;
                          if (subItem.path === '/settings/system' && user.role !== 'super-admin') return null;
                          
                          return (
                            <li key={subItem.path}>
                              <Link href={subItem.path}>
                                <a
                                  className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                                    isSubActive
                                      ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                                      : 'text-gray-400 hover:bg-[#3d4654] hover:text-white'
                                  }`}
                                >
                                  {subItem.label}
                                </a>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link href={item.path}>
                    <a
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[#D4AF37] text-[#2F3640]'
                          : 'text-gray-300 hover:bg-[#3d4654] hover:text-white'
                      } ${collapsed ? 'justify-center' : ''}`}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon className={collapsed ? 'w-5 h-5' : 'w-5 h-5'} />
                      {!collapsed && <span>{item.label}</span>}
                    </a>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-t border-[#3d4654]">
          <div className="flex items-center gap-3">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center">
                <span className="text-[#2F3640]">{user.name.charAt(0)}</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">
                {user.role === 'super-admin' ? 'Super Admin' : 'Branch Admin'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}