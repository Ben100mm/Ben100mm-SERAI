'use client';

import { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Plane, Car, Star, Eye, Download, Share2, MoreVertical, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Trip {
  id: string;
  title: string;
  location: string;
  image: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'upcoming' | 'current' | 'completed' | 'cancelled';
  totalPrice: number;
  propertyName: string;
  propertyType: string;
  rating?: number;
  reviewCount?: number;
  bookingId: string;
  confirmationCode: string;
  amenities: string[];
  hostName: string;
  hostAvatar?: string;
  cancellationPolicy: string;
  specialRequests?: string;
  experiences?: Array<{
    id: string;
    name: string;
    date: string;
    time: string;
    price: number;
  }>;
}

const mockTrips: Trip[] = [
  {
    id: '1',
    title: 'Bali Beach Getaway',
    location: 'Bali, Indonesia',
    image: '/images/serai-images/Amsterdam1.jpg',
    checkIn: '2024-02-15',
    checkOut: '2024-02-20',
    guests: 2,
    status: 'upcoming',
    totalPrice: 750,
    propertyName: 'Luxury Beachfront Villa',
    propertyType: 'Entire Villa',
    rating: 4.9,
    reviewCount: 127,
    bookingId: 'BK-2024-001',
    confirmationCode: 'ABC123',
    amenities: ['Pool', 'WiFi', 'Kitchen', 'Parking'],
    hostName: 'Sarah Chen',
    cancellationPolicy: 'Free cancellation until Feb 10',
    specialRequests: 'Late check-in requested',
    experiences: [
      {
        id: 'exp-1',
        name: 'Sunset Yoga Session',
        date: '2024-02-16',
        time: '6:00 PM',
        price: 45
      },
      {
        id: 'exp-2',
        name: 'Traditional Cooking Class',
        date: '2024-02-18',
        time: '10:00 AM',
        price: 65
      }
    ]
  },
  {
    id: '2',
    title: 'Swiss Mountain Retreat',
    location: 'Swiss Alps, Switzerland',
    image: '/images/serai-images/Mountain View Lodge.jpg',
    checkIn: '2024-01-20',
    checkOut: '2024-01-25',
    guests: 4,
    status: 'current',
    totalPrice: 800,
    propertyName: 'Mountain View Lodge',
    propertyType: 'Entire Cabin',
    rating: 4.8,
    reviewCount: 89,
    bookingId: 'BK-2024-002',
    confirmationCode: 'DEF456',
    amenities: ['Fireplace', 'WiFi', 'Kitchen', 'Mountain View'],
    hostName: 'Hans Mueller',
    cancellationPolicy: 'Moderate cancellation policy',
    experiences: [
      {
        id: 'exp-3',
        name: 'Skiing Lesson',
        date: '2024-01-22',
        time: '9:00 AM',
        price: 120
      }
    ]
  },
  {
    id: '3',
    title: 'Kyoto Cultural Experience',
    location: 'Kyoto, Japan',
    image: '/images/serai-images/Artisan Pottery Workshop.jpg',
    checkIn: '2023-12-10',
    checkOut: '2023-12-15',
    guests: 2,
    status: 'completed',
    totalPrice: 425,
    propertyName: 'Traditional Ryokan',
    propertyType: 'Entire Ryokan',
    rating: 4.7,
    reviewCount: 203,
    bookingId: 'BK-2023-156',
    confirmationCode: 'GHI789',
    amenities: ['Traditional Bath', 'WiFi', 'Breakfast', 'Garden View'],
    hostName: 'Yuki Tanaka',
    cancellationPolicy: 'Strict cancellation policy',
    experiences: [
      {
        id: 'exp-4',
        name: 'Tea Ceremony Experience',
        date: '2023-12-12',
        time: '2:00 PM',
        price: 35
      },
      {
        id: 'exp-5',
        name: 'Temple Tour',
        date: '2023-12-13',
        time: '10:00 AM',
        price: 25
      }
    ]
  },
  {
    id: '4',
    title: 'Quebec City Winter',
    location: 'Quebec City, Canada',
    image: '/images/serai-images/Historic Downtown Inn.jpg',
    checkIn: '2023-11-25',
    checkOut: '2023-11-28',
    guests: 2,
    status: 'completed',
    totalPrice: 270,
    propertyName: 'Historic Downtown Inn',
    propertyType: 'Private Room',
    rating: 4.6,
    reviewCount: 156,
    bookingId: 'BK-2023-134',
    confirmationCode: 'JKL012',
    amenities: ['Historic Building', 'WiFi', 'Breakfast', 'City Center'],
    hostName: 'Marie Dubois',
    cancellationPolicy: 'Free cancellation until Nov 20'
  },
  {
    id: '5',
    title: 'Marrakech Desert Adventure',
    location: 'Marrakech, Morocco',
    image: '/images/serai-images/Desert Oasis Resort.jpg',
    checkIn: '2024-03-10',
    checkOut: '2024-03-15',
    guests: 2,
    status: 'cancelled',
    totalPrice: 560,
    propertyName: 'Desert Oasis Resort',
    propertyType: 'Entire Villa',
    rating: 4.9,
    reviewCount: 98,
    bookingId: 'BK-2024-003',
    confirmationCode: 'MNO345',
    amenities: ['Spa', 'Pool', 'WiFi', 'Desert View'],
    hostName: 'Ahmed Al-Rashid',
    cancellationPolicy: 'Moderate cancellation policy'
  }
];

export default function TripsTab() {
  const [trips, setTrips] = useState<Trip[]>(mockTrips);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'current' | 'completed' | 'cancelled'>('all');

  const filteredTrips = trips.filter(trip => 
    filter === 'all' || trip.status === filter
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="h-4 w-4 text-serai-gold-500" />;
      case 'current':
        return <CheckCircle className="h-4 w-4 text-serai-forest-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-serai-navy-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-serai-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-serai-neutral-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-serai-gold-100 text-serai-gold-800';
      case 'current':
        return 'bg-serai-forest-100 text-serai-forest-800';
      case 'completed':
        return 'bg-serai-navy-100 text-serai-navy-800';
      case 'cancelled':
        return 'bg-serai-red-100 text-serai-red-800';
      default:
        return 'bg-serai-neutral-100 text-serai-neutral-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntilTrip = (checkIn: string) => {
    const today = new Date();
    const tripDate = new Date(checkIn);
    const diffTime = tripDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-serai-charcoal-900">Your Trips</h2>
          <p className="text-serai-neutral-600 mt-1">
            {trips.length} {trips.length === 1 ? 'trip' : 'trips'} total
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        {[
          { key: 'all', label: 'All Trips' },
          { key: 'upcoming', label: 'Upcoming' },
          { key: 'current', label: 'Current' },
          { key: 'completed', label: 'Completed' },
          { key: 'cancelled', label: 'Cancelled' }
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

      {/* Trips List */}
      {filteredTrips.length > 0 ? (
        <div className="space-y-4">
          {filteredTrips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-lg shadow-sm border border-serai-neutral-200 overflow-hidden">
              <div className="flex">
                {/* Image */}
                <div className="w-64 h-48 bg-serai-neutral-100 flex-shrink-0">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-semibold text-serai-charcoal-900">
                          {trip.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(trip.status)}`}>
                          {getStatusIcon(trip.status)}
                          <span className="capitalize">{trip.status}</span>
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-serai-neutral-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {trip.location}
                      </div>

                      <div className="text-sm text-serai-neutral-600 mb-2">
                        {trip.propertyName} • {trip.propertyType}
                      </div>

                      {trip.status === 'upcoming' && (
                        <div className="text-sm text-serai-gold-600 font-medium mb-2">
                          {getDaysUntilTrip(trip.checkIn)} days until check-in
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <button className="p-2 hover:bg-serai-neutral-100 rounded-lg">
                        <Share2 className="h-4 w-4 text-serai-neutral-400" />
                      </button>
                      <button className="p-2 hover:bg-serai-neutral-100 rounded-lg">
                        <Download className="h-4 w-4 text-serai-neutral-400" />
                      </button>
                      <button className="p-2 hover:bg-serai-neutral-100 rounded-lg">
                        <MoreVertical className="h-4 w-4 text-serai-neutral-400" />
                      </button>
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-serai-neutral-500">Check-in</div>
                      <div className="font-medium text-serai-charcoal-900">
                        {formatDate(trip.checkIn)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-serai-neutral-500">Check-out</div>
                      <div className="font-medium text-serai-charcoal-900">
                        {formatDate(trip.checkOut)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-serai-neutral-500">Guests</div>
                      <div className="font-medium text-serai-charcoal-900 flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {trip.guests}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-serai-neutral-500">Total</div>
                      <div className="font-medium text-serai-charcoal-900">
                        ${trip.totalPrice}
                      </div>
                    </div>
                  </div>

                  {/* Booking Info */}
                  <div className="flex items-center justify-between text-sm text-serai-neutral-600 mb-4">
                    <div>
                      Booking ID: {trip.bookingId} • Confirmation: {trip.confirmationCode}
                    </div>
                    <div>
                      Host: {trip.hostName}
                    </div>
                  </div>

                  {/* Experiences */}
                  {trip.experiences && trip.experiences.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm font-medium text-serai-charcoal-900 mb-2">
                        Booked Experiences:
                      </div>
                      <div className="space-y-1">
                        {trip.experiences.map((exp) => (
                          <div key={exp.id} className="flex items-center justify-between text-sm">
                            <span className="text-serai-neutral-700">
                              {exp.name} - {formatDate(exp.date)} at {exp.time}
                            </span>
                            <span className="font-medium text-serai-charcoal-900">
                              ${exp.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-serai-red-500 text-white rounded-lg hover:bg-serai-red-600 transition-colors text-sm font-medium">
                      View Details
                    </button>
                    {trip.status === 'upcoming' && (
                      <button className="px-4 py-2 border border-serai-neutral-300 text-serai-charcoal-700 rounded-lg hover:bg-serai-neutral-50 transition-colors text-sm font-medium">
                        Modify Booking
                      </button>
                    )}
                    {trip.status === 'completed' && (
                      <button className="px-4 py-2 border border-serai-neutral-300 text-serai-charcoal-700 rounded-lg hover:bg-serai-neutral-50 transition-colors text-sm font-medium">
                        Leave Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-serai-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-serai-charcoal-900 mb-2">
            No trips found
          </h3>
          <p className="text-serai-neutral-600 mb-6">
            {filter === 'all' 
              ? "You haven't booked any trips yet. Start exploring amazing places to stay!"
              : `No ${filter} trips found.`
            }
          </p>
          <button className="px-6 py-3 bg-serai-red-500 text-white rounded-lg hover:bg-serai-red-600 transition-colors font-medium">
            Start Planning
          </button>
        </div>
      )}
    </div>
  );
}
