const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');

const prisma = new PrismaClient();

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

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Build where clause
    const where = {
      status: 'ACTIVE'
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { state: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (type) {
      where.type = type;
    }

    if (category) {
      where.category = category;
    }

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    if (state) {
      where.state = { contains: state, mode: 'insensitive' };
    }

    if (country) {
      where.country = { contains: country, mode: 'insensitive' };
    }

    if (minPrice || maxPrice) {
      where.basePrice = {};
      if (minPrice) where.basePrice.gte = parseFloat(minPrice);
      if (maxPrice) where.basePrice.lte = parseFloat(maxPrice);
    }

    if (minGuests) {
      where.maxGuests = { gte: parseInt(minGuests) };
    }

    if (amenities) {
      const amenityArray = Array.isArray(amenities) ? amenities : amenities.split(',');
      where.amenities = { hasSome: amenityArray };
    }

    // Build orderBy clause
    const orderBy = {};
    orderBy[sortBy] = sortOrder;

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        skip,
        take,
        orderBy,
        include: {
          images: {
            orderBy: { order: 'asc' }
          },
          owner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true
            }
          },
          _count: {
            select: {
              reviews: true,
              bookings: true
            }
          }
        }
      }),
      prisma.property.count({ where })
    ]);

    // Calculate average rating for each property
    const propertiesWithRating = await Promise.all(
      properties.map(async (property) => {
        const avgRating = await prisma.review.aggregate({
          where: {
            propertyId: property.id
          },
          _avg: {
            rating: true
          }
        });

        return {
          ...property,
          averageRating: avgRating._avg.rating || 0,
          totalReviews: property._count.reviews
        };
      })
    );

    res.json({
      success: true,
      data: {
        properties: propertiesWithRating,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalItems: total,
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

    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { order: 'asc' }
        },
        videos: {
          orderBy: { order: 'asc' }
        },
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            _count: {
              select: {
                properties: true
              }
            }
          }
        },
        reviews: {
          include: {
            reviewer: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        _count: {
          select: {
            reviews: true,
            bookings: true
          }
        }
      }
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Calculate average rating
    const avgRating = await prisma.review.aggregate({
      where: {
        propertyId: property.id
      },
      _avg: {
        rating: true
      }
    });

    const propertyWithRating = {
      ...property,
      averageRating: avgRating._avg.rating || 0
    };

    res.json({
      success: true,
      data: propertyWithRating
    });
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching property'
    });
  }
};

// @desc    Create property
// @route   POST /api/properties
// @access  Private (Host/Admin)
const createProperty = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const {
      name,
      description,
      type,
      category,
      address,
      city,
      state,
      country,
      postalCode,
      latitude,
      longitude,
      bedrooms,
      bathrooms,
      maxGuests,
      size,
      amenities,
      houseRules,
      basePrice,
      currency,
      images,
      videos
    } = req.body;

    const property = await prisma.property.create({
      data: {
        name,
        description,
        type,
        category,
        address,
        city,
        state,
        country,
        postalCode,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        maxGuests: parseInt(maxGuests),
        size: size ? parseFloat(size) : null,
        amenities: amenities || [],
        houseRules: houseRules || [],
        basePrice: parseFloat(basePrice),
        currency: currency || 'CAD',
        ownerId: req.user.id,
        images: {
          create: images?.map((img, index) => ({
            url: img.url,
            alt: img.alt,
            order: index,
            isPrimary: index === 0
          })) || []
        },
        videos: {
          create: videos?.map((vid, index) => ({
            url: vid.url,
            thumbnail: vid.thumbnail,
            duration: vid.duration,
            order: index
          })) || []
        }
      },
      include: {
        images: true,
        videos: true,
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: property
    });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating property'
    });
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private (Owner/Admin)
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    // Check if property exists and user owns it
    const existingProperty = await prisma.property.findUnique({
      where: { id }
    });

    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    if (existingProperty.ownerId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this property'
      });
    }

    const updateData = { ...req.body };
    
    // Convert numeric fields
    if (updateData.latitude) updateData.latitude = parseFloat(updateData.latitude);
    if (updateData.longitude) updateData.longitude = parseFloat(updateData.longitude);
    if (updateData.bedrooms) updateData.bedrooms = parseInt(updateData.bedrooms);
    if (updateData.bathrooms) updateData.bathrooms = parseInt(updateData.bathrooms);
    if (updateData.maxGuests) updateData.maxGuests = parseInt(updateData.maxGuests);
    if (updateData.size) updateData.size = parseFloat(updateData.size);
    if (updateData.basePrice) updateData.basePrice = parseFloat(updateData.basePrice);

    const property = await prisma.property.update({
      where: { id },
      data: updateData,
      include: {
        images: {
          orderBy: { order: 'asc' }
        },
        videos: {
          orderBy: { order: 'asc' }
        },
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Property updated successfully',
      data: property
    });
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating property'
    });
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private (Owner/Admin)
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if property exists and user owns it
    const existingProperty = await prisma.property.findUnique({
      where: { id }
    });

    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    if (existingProperty.ownerId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this property'
      });
    }

    await prisma.property.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting property'
    });
  }
};

// @desc    Get user's properties
// @route   GET /api/properties/my-properties
// @access  Private
const getMyProperties = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {
      ownerId: req.user.id
    };

    if (status) {
      where.status = status;
    }

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          images: {
            orderBy: { order: 'asc' }
          },
          _count: {
            select: {
              reviews: true,
              bookings: true
            }
          }
        }
      }),
      prisma.property.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        properties,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get my properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching your properties'
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

    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        availability: {
          where: {
            date: {
              gte: new Date(checkIn),
              lte: new Date(checkOut)
            }
          }
        }
      }
    });

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

    // Check availability for each date
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const unavailableDates = [];

    for (let date = new Date(checkInDate); date < checkOutDate; date.setDate(date.getDate() + 1)) {
      const availability = property.availability.find(av => 
        av.date.toDateString() === date.toDateString()
      );

      if (!availability || !availability.isAvailable) {
        unavailableDates.push(date.toISOString().split('T')[0]);
      }
    }

    const isAvailable = unavailableDates.length === 0;

    res.json({
      success: true,
      data: {
        available: isAvailable,
        unavailableDates,
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
  createProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
  checkAvailability
};
