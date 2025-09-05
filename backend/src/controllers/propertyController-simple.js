// Mock data for demo purposes
const mockProperties = [
  {
    id: '1',
    name: 'Serai Boutique Hotel Montreal',
    description: 'A luxurious boutique hotel in the heart of Montreal with stunning city views and world-class amenities.',
    type: 'BOUTIQUE_HOTEL',
    category: 'LUXURY',
    status: 'ACTIVE',
    address: '123 Rue Saint-Catherine, Montreal, QC',
    city: 'Montreal',
    state: 'Quebec',
    country: 'Canada',
    postalCode: 'H2X 1K4',
    latitude: 45.5017,
    longitude: -73.5673,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    size: 1200,
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Parking', 'Pool', 'Gym'],
    houseRules: ['No smoking', 'No pets', 'Check-in after 3 PM'],
    basePrice: 299,
    currency: 'CAD',
    ownerId: 'owner-1',
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        alt: 'Luxury hotel room',
        order: 0,
        isPrimary: true
      }
    ],
    averageRating: 4.8,
    totalReviews: 127,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Mountain View Chalet',
    description: 'Cozy chalet with breathtaking mountain views, perfect for a romantic getaway.',
    type: 'CHALET',
    category: 'BOUTIQUE',
    status: 'ACTIVE',
    address: '456 Mountain Road, Whistler, BC',
    city: 'Whistler',
    state: 'British Columbia',
    country: 'Canada',
    postalCode: 'V0N 1B0',
    latitude: 50.1163,
    longitude: -122.9574,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    size: 1800,
    amenities: ['WiFi', 'Fireplace', 'Hot Tub', 'Mountain Views', 'Kitchen'],
    houseRules: ['No smoking', 'Pets allowed', 'Check-in after 4 PM'],
    basePrice: 450,
    currency: 'CAD',
    ownerId: 'owner-2',
    images: [
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
        alt: 'Mountain chalet',
        order: 0,
        isPrimary: true
      }
    ],
    averageRating: 4.9,
    totalReviews: 89,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Urban Loft Toronto',
    description: 'Modern loft in downtown Toronto with industrial design and city skyline views.',
    type: 'APARTMENT',
    category: 'MID_RANGE',
    status: 'ACTIVE',
    address: '789 King Street West, Toronto, ON',
    city: 'Toronto',
    state: 'Ontario',
    country: 'Canada',
    postalCode: 'M5V 1J5',
    latitude: 43.6426,
    longitude: -79.3871,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    size: 800,
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'City Views', 'Gym'],
    houseRules: ['No smoking', 'No pets', 'Check-in after 2 PM'],
    basePrice: 199,
    currency: 'CAD',
    ownerId: 'owner-3',
    images: [
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        alt: 'Modern loft interior',
        order: 0,
        isPrimary: true
      }
    ],
    averageRating: 4.6,
    totalReviews: 203,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
const getProperties = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      type,
      category,
      city,
      state,
      country,
      minPrice,
      maxPrice,
      minGuests,
      amenities,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    let filteredProperties = [...mockProperties];

    // Apply filters
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProperties = filteredProperties.filter(property =>
        property.name.toLowerCase().includes(searchLower) ||
        property.description.toLowerCase().includes(searchLower) ||
        property.city.toLowerCase().includes(searchLower) ||
        property.state.toLowerCase().includes(searchLower)
      );
    }

    if (type) {
      filteredProperties = filteredProperties.filter(property => property.type === type);
    }

    if (category) {
      filteredProperties = filteredProperties.filter(property => property.category === category);
    }

    if (city) {
      filteredProperties = filteredProperties.filter(property => 
        property.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (state) {
      filteredProperties = filteredProperties.filter(property => 
        property.state.toLowerCase().includes(state.toLowerCase())
      );
    }

    if (country) {
      filteredProperties = filteredProperties.filter(property => 
        property.country.toLowerCase().includes(country.toLowerCase())
      );
    }

    if (minPrice) {
      filteredProperties = filteredProperties.filter(property => 
        property.basePrice >= parseFloat(minPrice)
      );
    }

    if (maxPrice) {
      filteredProperties = filteredProperties.filter(property => 
        property.basePrice <= parseFloat(maxPrice)
      );
    }

    if (minGuests) {
      filteredProperties = filteredProperties.filter(property => 
        property.maxGuests >= parseInt(minGuests)
      );
    }

    if (amenities) {
      const amenityArray = Array.isArray(amenities) ? amenities : amenities.split(',');
      filteredProperties = filteredProperties.filter(property =>
        amenityArray.some(amenity => property.amenities.includes(amenity))
      );
    }

    // Apply sorting
    filteredProperties.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });

    // Apply pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const paginatedProperties = filteredProperties.slice(skip, skip + parseInt(limit));

    res.json({
      success: true,
      data: {
        properties: paginatedProperties,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(filteredProperties.length / parseInt(limit)),
          totalItems: filteredProperties.length,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching properties'
    });
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
const getProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = mockProperties.find(p => p.id === id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching property'
    });
  }
};

// @desc    Check property availability
// @route   GET /api/properties/:id/availability
// @access  Public
const checkAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut, guests } = req.query;

    if (!checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: 'Check-in and check-out dates are required'
      });
    }

    const property = mockProperties.find(p => p.id === id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if property can accommodate guests
    if (guests && parseInt(guests) > property.maxGuests) {
      return res.json({
        success: true,
        data: {
          available: false,
          reason: 'Property cannot accommodate the requested number of guests'
        }
      });
    }

    // For demo purposes, always return available
    res.json({
      success: true,
      data: {
        available: true,
        property: {
          id: property.id,
          name: property.name,
          maxGuests: property.maxGuests,
          basePrice: property.basePrice,
          currency: property.currency
        }
      }
    });
  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while checking availability'
    });
  }
};

module.exports = {
  getProperties,
  getProperty,
  checkAvailability
};
