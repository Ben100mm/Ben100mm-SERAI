'use client';

import { useState } from 'react';
import { Plus, Building2, Star, Settings, DollarSign, Users, Calendar, TrendingUp } from 'lucide-react';
import { SAMPLE_PROPERTIES, SAMPLE_EXPERIENCES, SAMPLE_SERVICES } from '@/data/hostsData';

interface HostsOverviewProps {
  hostType: string;
  setHostType: (type: string) => void;
}

export default function HostsOverview({ hostType, setHostType }: HostsOverviewProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const getQuickStats = () => {
    const stats = {
      'Property Host': [
        { label: 'Active Properties', value: '3', icon: <Building2 className="h-8 w-8" />, color: 'bg-serai-navy-100 text-serai-navy-500' },
        { label: 'Monthly Revenue', value: '$2,400', icon: <DollarSign className="h-8 w-8" />, color: 'bg-serai-red-100 text-serai-red-500' },
        { label: 'Occupancy Rate', value: '87%', icon: <TrendingUp className="h-8 w-8" />, color: 'bg-serai-gold-100 text-serai-gold-500' },
        { label: 'Guest Rating', value: '4.8', icon: <Star className="h-8 w-8" />, color: 'bg-serai-forest-100 text-serai-forest-500' }
      ],
      'Experience Host': [
        { label: 'Active Experiences', value: '2', icon: <Star className="h-8 w-8" />, color: 'bg-serai-gold-100 text-serai-gold-500' },
        { label: 'Monthly Bookings', value: '24', icon: <Calendar className="h-8 w-8" />, color: 'bg-serai-navy-100 text-serai-navy-500' },
        { label: 'Guest Satisfaction', value: '4.8', icon: <Users className="h-8 w-8" />, color: 'bg-serai-red-100 text-serai-red-500' },
        { label: 'Average Rating', value: '4.8', icon: <Star className="h-8 w-8" />, color: 'bg-serai-forest-100 text-serai-forest-500' }
      ],
      'Service Host': [
        { label: 'Active Services', value: '2', icon: <Settings className="h-8 w-8" />, color: 'bg-serai-charcoal-100 text-serai-charcoal-500' },
        { label: 'Monthly Bookings', value: '18', icon: <Calendar className="h-8 w-8" />, color: 'bg-serai-navy-100 text-serai-navy-500' },
        { label: 'Service Rating', value: '4.8', icon: <Star className="h-8 w-8" />, color: 'bg-serai-gold-100 text-serai-gold-500' },
        { label: 'Repeat Customers', value: '65%', icon: <Users className="h-8 w-8" />, color: 'bg-serai-red-100 text-serai-red-500' }
      ],
      'Multi-Host': [
        { label: 'Total Listings', value: '7', icon: <Building2 className="h-8 w-8" />, color: 'bg-serai-navy-100 text-serai-navy-500' },
        { label: 'Monthly Revenue', value: '$3,200', icon: <DollarSign className="h-8 w-8" />, color: 'bg-serai-red-100 text-serai-red-500' },
        { label: 'Overall Rating', value: '4.8', icon: <Star className="h-8 w-8" />, color: 'bg-serai-gold-100 text-serai-gold-500' },
        { label: 'Active Bookings', value: '42', icon: <Calendar className="h-8 w-8" />, color: 'bg-serai-forest-100 text-serai-forest-500' }
      ]
    };
    return stats[hostType as keyof typeof stats] || stats['Multi-Host'];
  };

  const renderRecentListings = () => {
    const properties = SAMPLE_PROPERTIES.slice(0, 2);
    const experiences = SAMPLE_EXPERIENCES.slice(0, 2);
    const services = SAMPLE_SERVICES.slice(0, 2);

    if (hostType === 'Property Host') {
      return properties.map(property => (
        <div key={property.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{property.title}</h4>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              property.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {property.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{property.type} • {property.location}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">${property.price}/night</span>
            <span className="text-gray-600">{property.rating} ⭐ ({property.reviews} reviews)</span>
          </div>
        </div>
      ));
    } else if (hostType === 'Experience Host') {
      return experiences.map(experience => (
        <div key={experience.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{experience.title}</h4>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              experience.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {experience.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{experience.type} • {experience.location}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">${experience.price}/person</span>
            <span className="text-gray-600">{experience.rating} ⭐ ({experience.reviews} reviews)</span>
          </div>
        </div>
      ));
    } else if (hostType === 'Service Host') {
      return services.map(service => (
        <div key={service.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{service.title}</h4>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              service.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {service.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{service.type} • {service.location}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">${service.price}/service</span>
            <span className="text-gray-600">{service.rating} ⭐ ({service.reviews} reviews)</span>
          </div>
        </div>
      ));
    } else {
      // Multi-Host: show mix of all types
      return [...properties.slice(0, 1), ...experiences.slice(0, 1), ...services.slice(0, 1)].map((item, index) => (
        <div key={`${item.id}-${index}`} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{item.title}</h4>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {item.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{item.type} • {item.location}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">${item.price}/{index === 0 ? 'night' : index === 1 ? 'person' : 'service'}</span>
            <span className="text-gray-600">{item.rating} ⭐ ({item.reviews} reviews)</span>
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {getQuickStats().map((stat, index) => (
          <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={stat.color}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Recent Listings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Listings</h3>
          <button className="text-sm text-serai-navy-600 hover:text-serai-navy-900 font-medium">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderRecentListings()}
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Bookings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="text-sm font-medium text-gray-900">Luxury Downtown Apartment</p>
                <p className="text-xs text-gray-500">Check-in: Tomorrow</p>
              </div>
              <span className="text-sm font-semibold text-gray-900">$150/night</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="text-sm font-medium text-gray-900">Wine Tasting Tour</p>
                <p className="text-xs text-gray-500">Saturday, 2:00 PM</p>
              </div>
              <span className="text-sm font-semibold text-gray-900">$85/person</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
