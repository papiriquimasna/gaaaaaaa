import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend: string;
  colorClass?: string;
  bgClass?: string;
}

export default function StatsCard({ 
  label, 
  value, 
  icon: Icon, 
  trend,
  colorClass = 'text-slate-600',
  bgClass = 'bg-slate-50'
}: StatsCardProps) {
  const isPositive = trend.startsWith('+');
  const trendValue = trend.replace('+', '').replace('-', '');

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm font-medium text-slate-600">{label}</p>
        <div className={`p-2 rounded-lg ${bgClass}`}>
          <Icon className={`w-5 h-5 ${colorClass}`} />
        </div>
      </div>
      
      <p className="text-3xl font-bold text-slate-900 mb-2">{value}</p>
      
      <div className="flex items-center gap-1">
        {isPositive ? (
          <TrendingUp className="w-3.5 h-3.5 text-green-600" />
        ) : (
          <TrendingDown className="w-3.5 h-3.5 text-red-600" />
        )}
        <span 
          className={`text-xs font-semibold ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {trendValue}
        </span>
        <span className="text-xs text-slate-400">since last month</span>
      </div>
    </div>
  );
}
