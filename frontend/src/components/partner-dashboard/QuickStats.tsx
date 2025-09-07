'use client';

import { LazyDollarSign, LazyCheckCircle, LazyShield, LazyCalendar, LazyBuilding2, LazyBarChart3, LazyUsers } from '@/components/icons/LazyIcons';
import { PARTNERSHIP_RESTRICTIONS } from '@/data/partnershipData';

interface QuickStatsProps {
  partnershipModel: string;
}

export default function QuickStats({ partnershipModel }: QuickStatsProps) {
  const restrictions = PARTNERSHIP_RESTRICTIONS[partnershipModel as keyof typeof PARTNERSHIP_RESTRICTIONS];
  const stats = restrictions.quickStats;
  
  const getQuickStats = () => {
    if (partnershipModel === 'Master Lease') {
      return [
        {
          label: stats[0],
          value: '$8,500',
          color: 'blue',
          icon: <LazyDollarSign className="h-8 w-8" />
        },
        {
          label: stats[1],
          value: 'Active',
          color: 'green',
          icon: <LazyCheckCircle className="h-8 w-8" />
        },
        {
          label: stats[2],
          value: 'Compliant',
          color: 'yellow',
          icon: <LazyShield className="h-8 w-8" />
        },
        {
          label: stats[3],
          value: 'Dec 15',
          color: 'purple',
          icon: <LazyCalendar className="h-8 w-8" />
        }
      ];
    }
    
    return [
      {
        label: stats[0],
        value: '$12,450',
        color: 'blue',
        icon: <LazyBuilding2 className="h-8 w-8" />
      },
      {
        label: stats[1],
        value: partnershipModel === 'Franchise Model' ? '95%' : '87%',
        color: 'green',
        icon: <LazyBarChart3 className="h-8 w-8" />
      },
      {
        label: stats[2],
        value: '87%',
        color: 'yellow',
        icon: <LazyCalendar className="h-8 w-8" />
      },
      {
        label: stats[3],
        value: '4.8',
        color: 'purple',
        icon: <LazyUsers className="h-8 w-8" />
      }
    ];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {getQuickStats().map((stat, index) => {
        const greyShades = ['bg-gray-100', 'bg-gray-200', 'bg-gray-300', 'bg-gray-400'];
        const borderShades = ['border-gray-300', 'border-gray-400', 'border-gray-500', 'border-gray-600'];
        const textShades = ['text-gray-600', 'text-gray-600', 'text-gray-700', 'text-gray-700'];
        const valueShades = ['text-gray-900', 'text-gray-900', 'text-gray-900', 'text-gray-900'];
        const iconShades = ['text-gray-700', 'text-gray-700', 'text-gray-800', 'text-gray-800'];
        
        return (
          <div key={index} className={`${greyShades[index % 4]} ${borderShades[index % 4]} border p-4 rounded-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${textShades[index % 4]}`}>{stat.label}</p>
                <p className={`text-2xl font-bold ${valueShades[index % 4]}`}>{stat.value}</p>
              </div>
              <div className={iconShades[index % 4]}>
                {stat.icon}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
