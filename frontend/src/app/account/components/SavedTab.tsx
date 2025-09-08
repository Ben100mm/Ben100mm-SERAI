'use client';

import { useState } from 'react';
import { Heart, MapPin, Star, Calendar, Users, DollarSign, Eye, Share2, MoreVertical } from 'lucide-react';

interface SavedItem {
  id: string;
  title: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  pricePerNight: number;
  savedDate: string;
  type: 'property' | 'experience' | 'destination';
  guests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
}

const mockSavedItems: SavedItem[] = [
  {
    id: '1',
    title: 'Luxury Beachfront Villa',
    location: 'Bali, Indonesia',
    image: '/images/serai-images/Amsterdam1.jpg',
    rating: 4.9,
    reviewCount: 127,
    price: 450,
    pricePerNight: 150,
    savedDate: '2024-01-10',
    type: 'property',
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['Pool', 'WiFi', 'Kitchen', 'Parking']
  },
  {
    id: '2',
    title: 'Mountain View Lodge',
    location: 'Swiss Alps, Switzerland',
    image: '/images/serai-images/Mountain View Lodge.jpg',
    rating: 4.8,
    reviewCount: 89,
    price: 320,
    pricePerNight: 160,
    savedDate: '2024-01-08',
    type: 'property',
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['Fireplace', 'WiFi', 'Kitchen', 'Mountain View']
  },
  {
    id: '3',
    title: 'Artisan Pottery Workshop',
    location: 'Kyoto, Japan',
    image: '/images/serai-images/Artisan Pottery Workshop.jpg',
    rating: 4.7,
    reviewCount: 45,
    price: 85,
    pricePerNight: 85,
    savedDate: '2024-01-05',
    type: 'experience',
    guests: 8,
    bedrooms: 0,
    bathrooms: 0,
    amenities: ['Materials Included', 'Expert Instruction', 'Take Home Creation']
  },
  {
    id: '4',
    title: 'Historic Downtown Inn',
    location: 'Quebec City, Canada',
    image: '/images/serai-images/Historic Downtown Inn.jpg',
    rating: 4.6,
    reviewCount: 203,
    price: 180,
    pricePerNight: 90,
    savedDate: '2024-01-03',
    type: 'property',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Historic Building', 'WiFi', 'Breakfast', 'City Center']
  },
  {
    id: '5',
    title: 'Desert Oasis Resort',
    location: 'Marrakech, Morocco',
    image: '/images/serai-images/Desert Oasis Resort.jpg',
    rating: 4.9,
    reviewCount: 156,
    price: 280,
    pricePerNight: 140,
    savedDate: '2024-01-01',
    type: 'property',
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ['Spa', 'Pool', 'WiFi', 'Desert View']
  }
];

export default function SavedTab() {
  const [savedItems, setSavedItems] = useState<SavedItem[]>(mockSavedItems);
  const [filter, setFilter] = useState<'all' | 'property' | 'experience' | 'destination'>('all');

  const filteredItems = savedItems.filter(item => 
    filter === 'all' || item.type === filter
  );

  const handleRemoveSaved = (id: string) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'property':
        return <MapPin className="h-4 w-4" />;
      case 'experience':
        return <Star className="h-4 w-4" />;
      case 'destination':
        return <Calendar className="h-4 w-4" />;
      default:
        return <Heart className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'property':
        return 'bg-serai-forest-100 text-serai-forest-800';
      case 'experience':
        return 'bg-serai-gold-100 text-serai-gold-800';
      case 'destination':
        return 'bg-serai-navy-100 text-serai-navy-800';
      default:
        return 'bg-serai-neutral-100 text-serai-neutral-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-serai-charcoal-900">Saved Items</h2>
          <p className="text-serai-neutral-600 mt-1">
            {savedItems.length} {savedItems.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'property', label: 'Properties' },
          { key: 'experience', label: 'Experiences' },
          { key: 'destination', label: 'Destinations' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key as any)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === key
                ? 'bg-serai-red-500 text-white'
                : 'bg-serai-neutral-100 text-serai-neutral-700 hover:bg-serai-neutral-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Saved Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-serai-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Image */}
              <div className="relative h-48 bg-serai-neutral-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <Share2 className="h-4 w-4 text-serai-charcoal-700" />
                  </button>
                  <button 
                    onClick={() => handleRemoveSaved(item.id)}
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <Heart className="h-4 w-4 text-serai-red-500 fill-current" />
                  </button>
                </div>
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getTypeColor(item.type)}`}>
                    {getTypeIcon(item.type)}
                    <span className="capitalize">{item.type}</span>
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-serai-charcoal-900 line-clamp-1">
                    {item.title}
                  </h3>
                  <button className="p-1 hover:bg-serai-neutral-100 rounded">
                    <MoreVertical className="h-4 w-4 text-serai-neutral-400" />
                  </button>
                </div>

                <div className="flex items-center text-sm text-serai-neutral-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {item.location}
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-serai-gold-500 fill-current" />
                    <span className="text-sm font-medium text-serai-charcoal-900 ml-1">
                      {item.rating}
                    </span>
                    <span className="text-sm text-serai-neutral-500 ml-1">
                      ({item.reviewCount})
                    </span>
                  </div>
                </div>

                {item.type === 'property' && (
                  <div className="flex items-center space-x-4 text-sm text-serai-neutral-600 mb-3">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {item.guests} guests
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">🛏️</span>
                      {item.bedrooms} bedrooms
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">🚿</span>
                      {item.bathrooms} bathrooms
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-serai-charcoal-900">
                      ${item.price}
                    </span>
                    {item.type === 'property' && (
                      <span className="text-sm text-serai-neutral-500 ml-1">
                        / {item.pricePerNight} per night
                      </span>
                    )}
                  </div>
                  <button className="px-4 py-2 bg-serai-red-500 text-white rounded-lg hover:bg-serai-red-600 transition-colors text-sm font-medium">
                    View Details
                  </button>
                </div>

                <div className="mt-3 text-xs text-serai-neutral-500">
                  Saved on {new Date(item.savedDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 text-serai-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-serai-charcoal-900 mb-2">
            No saved items yet
          </h3>
          <p className="text-serai-neutral-600 mb-6">
            Start exploring and save properties, experiences, and destinations you love.
          </p>
          <button className="px-6 py-3 bg-serai-red-500 text-white rounded-lg hover:bg-serai-red-600 transition-colors font-medium">
            Start Exploring
          </button>
        </div>
      )}
    </div>
  );
}
