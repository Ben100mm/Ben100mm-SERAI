'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, MapPin, Clock, DollarSign, Star, Calendar, Filter, Search, Users } from 'lucide-react';
import { SAMPLE_EXPERIENCES } from '@/data/hostsData';

interface ExperienceManagementProps {
  hostType: string;
}

export default function ExperienceManagement({ hostType }: ExperienceManagementProps) {
  const [experiences] = useState(SAMPLE_EXPERIENCES);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredExperiences = experiences.filter(experience => {
    const matchesSearch = experience.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         experience.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || experience.status.toLowerCase() === filterStatus;
    const matchesType = filterType === 'all' || experience.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-serai-forest-100 text-serai-forest-800';
      case 'Draft':
        return 'bg-serai-gold-100 text-serai-gold-800';
      case 'Inactive':
        return 'bg-serai-red-100 text-serai-red-800';
      default:
        return 'bg-serai-neutral-100 text-serai-neutral-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Food & Drink':
        return 'bg-serai-red-100 text-serai-red-800';
      case 'Arts & Culture':
        return 'bg-serai-gold-100 text-serai-gold-800';
      case 'Outdoor':
        return 'bg-serai-forest-100 text-serai-forest-800';
      case 'Wellness':
        return 'bg-serai-navy-100 text-serai-navy-800';
      default:
        return 'bg-serai-neutral-100 text-serai-neutral-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900">Your Experiences</h2>
          <span className="px-2 py-1 text-sm bg-gray-100 text-gray-600 rounded-full">
            {filteredExperiences.length} experiences
          </span>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-serai-red-500 text-white rounded-lg hover:bg-serai-red-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search experiences..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-serai-red-500 focus:border-serai-red-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-serai-red-500 focus:border-serai-red-500 text-gray-900"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-serai-red-500 focus:border-serai-red-500 text-gray-900"
        >
          <option value="all">All Types</option>
          <option value="Food & Drink">Food & Drink</option>
          <option value="Arts & Culture">Arts & Culture</option>
          <option value="Outdoor">Outdoor</option>
          <option value="Wellness">Wellness</option>
        </select>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
          <Filter className="h-4 w-4" />
          <span>More Filters</span>
        </button>
      </div>

      {/* Experiences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiences.map((experience) => (
          <div key={experience.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            {/* Experience Image */}
            <div className="h-48 bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <Star className="h-12 w-12 mx-auto mb-2" />
                  <p className="text-sm">Experience Image</p>
                </div>
              </div>
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(experience.status)}`}>
                  {experience.status}
                </span>
              </div>
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(experience.type)}`}>
                  {experience.type}
                </span>
              </div>
            </div>

            {/* Experience Details */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-lg">{experience.title}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{experience.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{experience.location}</span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>Max 8 guests</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-gray-600" />
                  <span className="text-lg font-semibold text-gray-900">${experience.price}</span>
                  <span className="text-sm text-gray-600 ml-1">/person</span>
                </div>
                <span className="text-sm text-gray-600">{experience.reviews} reviews</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm">View</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Edit className="h-4 w-4" />
                  <span className="text-sm">Edit</span>
                </button>
                <button className="px-3 py-2 border border-serai-red-300 text-serai-red-500 rounded-lg hover:bg-serai-red-50 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredExperiences.length === 0 && (
        <div className="text-center py-12">
          <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No experiences found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterStatus !== 'all' || filterType !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by creating your first experience.'
            }
          </p>
          {!searchTerm && filterStatus === 'all' && filterType === 'all' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-serai-red-500 text-white rounded-lg hover:bg-serai-red-600 transition-colors mx-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Create Your First Experience</span>
            </button>
          )}
        </div>
      )}

      {/* Add Experience Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Experience</h3>
            <p className="text-gray-600 mb-6">This modal would contain the experience creation form.</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 bg-serai-red-500 text-white rounded-lg hover:bg-serai-red-600"
              >
                Create Experience
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
