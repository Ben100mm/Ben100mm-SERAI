const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// @desc    Global search across all platforms
// @route   GET /api/search
// @access  Public
const globalSearch = async (req, res) => {
  try {
    const {
      q: query,
      type, // properties, experiences, services, routes
      location,
      checkIn,
      checkOut,
      guests,
      priceMin,
      priceMax,
      page = 1,
      limit = 10
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    let results = {
      properties: [],
      experiences: [],
      services: [],
      routes: []
    };

    // Build common where clause
    const buildWhereClause = (baseWhere = {}) => {
      const where = { ...baseWhere, status: 'ACTIVE' };

      if (query) {
        where.OR = [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { city: { contains: query, mode: 'insensitive' } },
          { state: { contains: query, mode: 'insensitive' } },
          { country: { contains: query, mode: 'insensitive' } }
        ];
      }

      if (location) {
        where.OR = [
          { city: { contains: location, mode: 'insensitive' } },
          { state: { contains: location, mode: 'insensitive' } },
          { country: { contains: location, mode: 'insensitive' } }
        ];
      }

      if (priceMin || priceMax) {
        where.basePrice = {};
        if (priceMin) where.basePrice.gte = parseFloat(priceMin);
        if (priceMax) where.basePrice.lte = parseFloat(priceMax);
      }

      return where;
    };

    // Search properties
    if (!type || type === 'properties') {
      const propertyWhere = buildWhereClause();
      
      if (guests) {
        propertyWhere.maxGuests = { gte: parseInt(guests) };
      }

      const [properties, propertyCount] = await Promise.all([
        prisma.property.findMany({
          where: propertyWhere,
          skip,
          take,
          orderBy: { createdAt: 'desc' },
          include: {
            images: {
              orderBy: { order: 'asc' },
              take: 1
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
        prisma.property.count({ where: propertyWhere })
      ]);

      // Calculate average ratings
      const propertiesWithRating = await Promise.all(
        properties.map(async (property) => {
          const avgRating = await prisma.review.aggregate({
            where: { propertyId: property.id },
            _avg: { rating: true }
          });

          return {
            ...property,
            averageRating: avgRating._avg.rating || 0
          };
        })
      );

      results.properties = {
        data: propertiesWithRating,
        count: propertyCount,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(propertyCount / parseInt(limit)),
          totalItems: propertyCount,
          itemsPerPage: parseInt(limit)
        }
      };
    }

    // Search experiences
    if (!type || type === 'experiences') {
      const experienceWhere = buildWhereClause();
      
      if (guests) {
        experienceWhere.maxGuests = { gte: parseInt(guests) };
      }

      const [experiences, experienceCount] = await Promise.all([
        prisma.experience.findMany({
          where: experienceWhere,
          skip,
          take,
          orderBy: { createdAt: 'desc' },
          include: {
            images: {
              orderBy: { order: 'asc' },
              take: 1
            },
            host: {
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
        prisma.experience.count({ where: experienceWhere })
      ]);

      // Calculate average ratings
      const experiencesWithRating = await Promise.all(
        experiences.map(async (experience) => {
          const avgRating = await prisma.review.aggregate({
            where: { experienceId: experience.id },
            _avg: { rating: true }
          });

          return {
            ...experience,
            averageRating: avgRating._avg.rating || 0
          };
        })
      );

      results.experiences = {
        data: experiencesWithRating,
        count: experienceCount,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(experienceCount / parseInt(limit)),
          totalItems: experienceCount,
          itemsPerPage: parseInt(limit)
        }
      };
    }

    // Search services
    if (!type || type === 'services') {
      const serviceWhere = buildWhereClause();
      
      if (guests) {
        serviceWhere.maxGuests = { gte: parseInt(guests) };
      }

      const [services, serviceCount] = await Promise.all([
        prisma.service.findMany({
          where: serviceWhere,
          skip,
          take,
          orderBy: { createdAt: 'desc' },
          include: {
            images: {
              orderBy: { order: 'asc' },
              take: 1
            },
            provider: {
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
        prisma.service.count({ where: serviceWhere })
      ]);

      // Calculate average ratings
      const servicesWithRating = await Promise.all(
        services.map(async (service) => {
          const avgRating = await prisma.review.aggregate({
            where: { serviceId: service.id },
            _avg: { rating: true }
          });

          return {
            ...service,
            averageRating: avgRating._avg.rating || 0
          };
        })
      );

      results.services = {
        data: servicesWithRating,
        count: serviceCount,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(serviceCount / parseInt(limit)),
          totalItems: serviceCount,
          itemsPerPage: parseInt(limit)
        }
      };
    }

    // Search routes
    if (!type || type === 'routes') {
      const routeWhere = buildWhereClause();
      
      if (guests) {
        routeWhere.maxTravelers = { gte: parseInt(guests) };
      }

      const [routes, routeCount] = await Promise.all([
        prisma.route.findMany({
          where: routeWhere,
          skip,
          take,
          orderBy: { createdAt: 'desc' },
          include: {
            images: {
              orderBy: { order: 'asc' },
              take: 1
            },
            creator: {
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
        prisma.route.count({ where: routeWhere })
      ]);

      // Calculate average ratings
      const routesWithRating = await Promise.all(
        routes.map(async (route) => {
          const avgRating = await prisma.review.aggregate({
            where: { routeId: route.id },
            _avg: { rating: true }
          });

          return {
            ...route,
            averageRating: avgRating._avg.rating || 0
          };
        })
      );

      results.routes = {
        data: routesWithRating,
        count: routeCount,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(routeCount / parseInt(limit)),
          totalItems: routeCount,
          itemsPerPage: parseInt(limit)
        }
      };
    }

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Global search error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during search'
    });
  }
};

// @desc    Get search suggestions
// @route   GET /api/search/suggestions
// @access  Public
const getSearchSuggestions = async (req, res) => {
  try {
    const { q: query, limit = 10 } = req.query;

    if (!query || query.length < 2) {
      return res.json({
        success: true,
        data: {
          suggestions: []
        }
      });
    }

    // Get suggestions from all platforms
    const [propertySuggestions, experienceSuggestions, serviceSuggestions, routeSuggestions] = await Promise.all([
      prisma.property.findMany({
        where: {
          status: 'ACTIVE',
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { city: { contains: query, mode: 'insensitive' } },
            { state: { contains: query, mode: 'insensitive' } },
            { country: { contains: query, mode: 'insensitive' } }
          ]
        },
        select: {
          id: true,
          name: true,
          city: true,
          state: true,
          country: true,
          type: true
        },
        take: parseInt(limit)
      }),
      prisma.experience.findMany({
        where: {
          status: 'ACTIVE',
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { city: { contains: query, mode: 'insensitive' } },
            { state: { contains: query, mode: 'insensitive' } },
            { country: { contains: query, mode: 'insensitive' } }
          ]
        },
        select: {
          id: true,
          title: true,
          city: true,
          state: true,
          country: true,
          type: true
        },
        take: parseInt(limit)
      }),
      prisma.service.findMany({
        where: {
          status: 'ACTIVE',
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { serviceArea: { hasSome: [query] } }
          ]
        },
        select: {
          id: true,
          title: true,
          serviceArea: true,
          type: true
        },
        take: parseInt(limit)
      }),
      prisma.route.findMany({
        where: {
          status: 'ACTIVE',
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { startLocation: { path: ['city'], string_contains: query } },
            { endLocation: { path: ['city'], string_contains: query } }
          ]
        },
        select: {
          id: true,
          title: true,
          startLocation: true,
          endLocation: true,
          type: true
        },
        take: parseInt(limit)
      })
    ]);

    const suggestions = [
      ...propertySuggestions.map(item => ({
        id: item.id,
        title: item.name,
        location: `${item.city}, ${item.state}, ${item.country}`,
        type: 'property',
        category: item.type
      })),
      ...experienceSuggestions.map(item => ({
        id: item.id,
        title: item.title,
        location: `${item.city}, ${item.state}, ${item.country}`,
        type: 'experience',
        category: item.type
      })),
      ...serviceSuggestions.map(item => ({
        id: item.id,
        title: item.title,
        location: item.serviceArea.join(', '),
        type: 'service',
        category: item.type
      })),
      ...routeSuggestions.map(item => ({
        id: item.id,
        title: item.title,
        location: `${item.startLocation.city} to ${item.endLocation.city}`,
        type: 'route',
        category: item.type
      }))
    ];

    res.json({
      success: true,
      data: {
        suggestions: suggestions.slice(0, parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while getting suggestions'
    });
  }
};

// @desc    Get popular destinations
// @route   GET /api/search/popular-destinations
// @access  Public
const getPopularDestinations = async (req, res) => {
  try {
    const { limit = 20 } = req.query;

    // Get popular destinations based on booking counts
    const popularDestinations = await prisma.property.groupBy({
      by: ['city', 'state', 'country'],
      where: {
        status: 'ACTIVE'
      },
      _count: {
        bookings: true
      },
      orderBy: {
        _count: {
          bookings: 'desc'
        }
      },
      take: parseInt(limit)
    });

    const destinations = popularDestinations.map(dest => ({
      city: dest.city,
      state: dest.state,
      country: dest.country,
      bookingCount: dest._count.bookings
    }));

    res.json({
      success: true,
      data: {
        destinations
      }
    });
  } catch (error) {
    console.error('Get popular destinations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while getting popular destinations'
    });
  }
};

module.exports = {
  globalSearch,
  getSearchSuggestions,
  getPopularDestinations
};
