'use client';

import { LazyGlobe, LazySmartphone, LazySettings, LazyShield } from '@/components/icons/LazyIcons';
import { PARTNERSHIP_RESTRICTIONS } from '@/data/partnershipData';

interface AccessMethodsProps {
  partnershipModel: string;
}

export default function AccessMethods({ partnershipModel }: AccessMethodsProps) {
  const restrictions = PARTNERSHIP_RESTRICTIONS[partnershipModel as keyof typeof PARTNERSHIP_RESTRICTIONS];
  
  const getAccessMethods = () => {
    const allMethods = [
      {
        title: 'Web Application',
        description: 'Direct access via https://serai.com/partner-dashboard',
        icon: <LazyGlobe className="h-6 w-6 text-gray-700" />
      },
      {
        title: 'Mobile Responsive',
        description: 'Fully responsive design for mobile and tablet access',
        icon: <LazySmartphone className="h-6 w-6 text-gray-700" />
      },
      {
        title: 'API Integration',
        description: 'REST API endpoints for third-party integrations',
        icon: <LazySettings className="h-6 w-6 text-gray-700" />
      },
      {
        title: 'Role-Based Access',
        description: 'HOST role authentication with secure session management',
        icon: <LazyShield className="h-6 w-6 text-gray-700" />
      }
    ];

    return allMethods.filter(method => 
      restrictions.accessMethods.includes(method.title.toLowerCase().replace(' ', '-').replace(' responsive', '').replace(' integration', ''))
    );
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Access Methods</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {getAccessMethods().map((method, index) => {
          const greyShades = ['bg-gray-100', 'bg-gray-200', 'bg-gray-300', 'bg-gray-400'];
          const borderShades = ['border-gray-300', 'border-gray-400', 'border-gray-500', 'border-gray-600'];
          const iconShades = ['text-gray-700', 'text-gray-700', 'text-gray-800', 'text-gray-800'];
          
          return (
            <div key={index} className={`flex items-start space-x-3 p-4 ${greyShades[index % 4]} ${borderShades[index % 4]} border rounded-lg`}>
              <div className={iconShades[index % 4]}>
                {method.icon}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{method.title}</h4>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
