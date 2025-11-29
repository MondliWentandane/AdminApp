import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: string;
    isPositive: boolean;
  };
  subtitle?: string;
}

export function KPICard({ title, value, icon: Icon, change, subtitle }: KPICardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 mb-2">{title}</p>
          <h2 className="mb-1">{value}</h2>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          {change && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={`text-sm ${
                  change.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {change.isPositive ? '↑' : '↓'} {change.value}
              </span>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        <div className="bg-[#D4AF37]/10 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-[#D4AF37]" />
        </div>
      </div>
    </div>
  );
}
