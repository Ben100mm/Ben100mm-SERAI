const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get management dashboard overview
const getDashboardOverview = async (req, res) => {
  try {
    const { role } = req.user; // Assuming role is in JWT token
    
    // Get basic counts
    const [
      totalProperties,
      totalPartners,
      totalRevenue,
      totalGuests,
      activeProperties,
      maintenanceIssues,
      pendingInspections,
      recentBookings
    ] = await Promise.all([
      prisma.property.count(),
      prisma.user.count({ where: { role: 'HOST' } }),
      prisma.booking.aggregate({
        _sum: { totalAmount: true },
        where: { status: 'CONFIRMED' }
      }),
      prisma.booking.count({ where: { status: 'CONFIRMED' } }),
      prisma.property.count({ where: { status: 'ACTIVE' } }),
      prisma.property.count({ where: { status: 'MAINTENANCE' } }),
      prisma.property.count({ where: { status: 'PENDING_INSPECTION' } }),
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          property: true,
          user: true
        }
      })
    ]);

    const overview = {
      totalProperties,
      totalPartners,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      totalGuests,
      activeProperties,
      maintenanceIssues,
      pendingInspections,
      recentBookings
    };

    res.json({
      success: true,
      data: overview
    });
  } catch (error) {
    console.error('Error fetching dashboard overview:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard overview',
      error: error.message
    });
  }
};

// Get partner management data
const getPartnerManagement = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, partnershipModel, status } = req.query;
    const skip = (page - 1) * limit;

    const where = {
      role: 'HOST',
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } }
        ]
      }),
      ...(status && { status })
    };

    const [partners, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: parseInt(limit),
        include: {
          properties: {
            include: {
              bookings: {
                where: { status: 'CONFIRMED' },
                select: { totalAmount: true, createdAt: true }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ]);

    // Calculate partner metrics
    const partnersWithMetrics = partners.map(partner => {
      const totalRevenue = partner.properties.reduce((sum, property) => {
        return sum + property.bookings.reduce((propSum, booking) => propSum + booking.totalAmount, 0);
      }, 0);

      const propertyCount = partner.properties.length;
      const averageRating = 4.5; // This would come from reviews table

      return {
        ...partner,
        metrics: {
          totalRevenue,
          propertyCount,
          averageRating,
          partnershipModel: partnershipModel || 'Revenue Share' // Default for now
        }
      };
    });

    res.json({
      success: true,
      data: {
        partners: partnersWithMetrics,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching partner management data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch partner management data',
      error: error.message
    });
  }
};

// Get property operations data
const getPropertyOperations = async (req, res) => {
  try {
    const { status, propertyType, location } = req.query;

    const where = {
      ...(status && { status }),
      ...(propertyType && { type: propertyType }),
      ...(location && { location: { contains: location, mode: 'insensitive' } })
    };

    const [properties, statusCounts] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          owner: {
            select: { firstName: true, lastName: true, email: true }
          },
          bookings: {
            where: { status: 'CONFIRMED' },
            select: { totalAmount: true, createdAt: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.property.groupBy({
        by: ['status'],
        _count: { status: true }
      })
    ]);

    // Calculate property metrics
    const propertiesWithMetrics = properties.map(property => {
      const totalRevenue = property.bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
      const bookingCount = property.bookings.length;
      const occupancyRate = 85; // This would be calculated from actual booking data

      return {
        ...property,
        metrics: {
          totalRevenue,
          bookingCount,
          occupancyRate
        }
      };
    });

    res.json({
      success: true,
      data: {
        properties: propertiesWithMetrics,
        statusCounts: statusCounts.reduce((acc, item) => {
          acc[item.status] = item._count.status;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    console.error('Error fetching property operations data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch property operations data',
      error: error.message
    });
  }
};

// Get revenue and financial data
const getRevenueFinancial = async (req, res) => {
  try {
    const { period = 'month', startDate, endDate } = req.query;
    
    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      };
    } else {
      // Default to current month
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      
      dateFilter = {
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth
        }
      };
    }

    const [revenueData, partnerPayouts, platformFees] = await Promise.all([
      prisma.booking.aggregate({
        where: {
          status: 'CONFIRMED',
          ...dateFilter
        },
        _sum: { totalAmount: true },
        _count: { id: true }
      }),
      prisma.booking.aggregate({
        where: {
          status: 'CONFIRMED',
          ...dateFilter
        },
        _sum: { totalAmount: true }
      }),
      prisma.booking.aggregate({
        where: {
          status: 'CONFIRMED',
          ...dateFilter
        },
        _sum: { totalAmount: true }
      })
    ]);

    const totalRevenue = revenueData._sum.totalAmount || 0;
    const totalBookings = revenueData._count.id || 0;
    const partnerPayoutAmount = totalRevenue * 0.75; // 75% to partners
    const platformFeeAmount = totalRevenue * 0.25; // 25% platform fee
    const profitMargin = ((platformFeeAmount - (totalRevenue * 0.07)) / totalRevenue) * 100; // Assuming 7% operational costs

    res.json({
      success: true,
      data: {
        totalRevenue,
        totalBookings,
        partnerPayouts: partnerPayoutAmount,
        platformFees: platformFeeAmount,
        profitMargin,
        averageBookingValue: totalBookings > 0 ? totalRevenue / totalBookings : 0,
        period,
        dateRange: {
          start: dateFilter.createdAt?.gte,
          end: dateFilter.createdAt?.lte
        }
      }
    });
  } catch (error) {
    console.error('Error fetching revenue financial data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch revenue financial data',
      error: error.message
    });
  }
};

// Get guest experience data
const getGuestExperience = async (req, res) => {
  try {
    const { period = 'month' } = req.query;

    // Mock data for now - in real implementation, this would come from reviews and support tickets
    const guestExperienceData = {
      overallSatisfaction: 4.8,
      responseTime: 2.3, // minutes
      issueResolution: 94, // percentage
      reviewScore: 4.7,
      totalReviews: 1247,
      recentReviews: [
        {
          id: 1,
          guestName: 'Sarah M.',
          rating: 5,
          comment: 'Amazing experience! The property was exactly as described and the service was exceptional.',
          propertyName: 'Luxury Resort - Bali',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
        },
        {
          id: 2,
          guestName: 'Michael R.',
          rating: 4,
          comment: 'Great location and comfortable stay. Minor issue with WiFi but resolved quickly.',
          propertyName: 'Boutique Hotel - Paris',
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
        }
      ],
      supportTickets: [
        {
          id: 1,
          priority: 'high',
          title: 'AC not working - Room 205',
          status: 'open',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
          id: 2,
          priority: 'medium',
          title: 'WiFi connectivity issues',
          status: 'in_progress',
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
        },
        {
          id: 3,
          priority: 'low',
          title: 'Late check-in request',
          status: 'resolved',
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      ]
    };

    res.json({
      success: true,
      data: guestExperienceData
    });
  } catch (error) {
    console.error('Error fetching guest experience data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch guest experience data',
      error: error.message
    });
  }
};

// Get operations management data
const getOperationsManagement = async (req, res) => {
  try {
    // Mock data for now - in real implementation, this would come from task management system
    const operationsData = {
      taskCompletion: 94,
      staffPerformance: 89,
      qualityScore: 4.6,
      efficiencyMetrics: 87,
      activeTasks: [
        {
          id: 1,
          title: 'Urgent: AC Repair',
          description: 'Luxury Resort - Bali • Room 205',
          priority: 'high',
          status: 'in_progress',
          dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
          assignedTo: 'James Wilson'
        },
        {
          id: 2,
          title: 'Housekeeping Inspection',
          description: 'Boutique Hotel - Paris • All rooms',
          priority: 'medium',
          status: 'pending',
          dueDate: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
          assignedTo: 'Maria Rodriguez'
        },
        {
          id: 3,
          title: 'Pool Maintenance',
          description: 'Eco Lodge - Costa Rica • Completed',
          priority: 'low',
          status: 'completed',
          dueDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          assignedTo: 'David Chen'
        }
      ],
      staffSchedule: [
        {
          id: 1,
          name: 'Maria Rodriguez',
          role: 'Housekeeping Manager',
          shift: '8:00 AM - 4:00 PM',
          status: 'on_duty'
        },
        {
          id: 2,
          name: 'James Wilson',
          role: 'Maintenance Technician',
          shift: '6:00 AM - 2:00 PM',
          status: 'break'
        },
        {
          id: 3,
          name: 'Sarah Chen',
          role: 'Guest Services',
          shift: '12:00 PM - 8:00 PM',
          status: 'starting_soon'
        }
      ]
    };

    res.json({
      success: true,
      data: operationsData
    });
  } catch (error) {
    console.error('Error fetching operations management data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch operations management data',
      error: error.message
    });
  }
};

// Get business intelligence data
const getBusinessIntelligence = async (req, res) => {
  try {
    // Mock data for now - in real implementation, this would come from analytics service
    const businessIntelligenceData = {
      marketShare: 23,
      revenueGrowth: 18,
      customerAcquisition: 1247,
      predictiveScore: 87,
      marketTrends: [
        {
          segment: 'Luxury Segment Growth',
          growth: 15,
          percentage: 75
        },
        {
          segment: 'Boutique Hotel Demand',
          growth: 8,
          percentage: 60
        },
        {
          segment: 'Eco-Tourism Interest',
          growth: 22,
          percentage: 85
        }
      ],
      predictiveInsights: [
        {
          type: 'revenue_opportunity',
          title: 'Revenue Opportunity',
          description: 'Bali properties could increase rates by 12% during peak season',
          priority: 'high'
        },
        {
          type: 'growth_prediction',
          title: 'Growth Prediction',
          description: 'Paris market shows 18% growth potential for Q2',
          priority: 'medium'
        },
        {
          type: 'risk_alert',
          title: 'Risk Alert',
          description: 'Costa Rica properties may face weather-related cancellations',
          priority: 'high'
        }
      ]
    };

    res.json({
      success: true,
      data: businessIntelligenceData
    });
  } catch (error) {
    console.error('Error fetching business intelligence data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch business intelligence data',
      error: error.message
    });
  }
};

// Send notification to partners
const sendPartnerNotification = async (req, res) => {
  try {
    const { partnerIds, title, message, type = 'info' } = req.body;

    if (!partnerIds || !title || !message) {
      return res.status(400).json({
        success: false,
        message: 'Partner IDs, title, and message are required'
      });
    }

    // In real implementation, this would send notifications via WebSocket, email, SMS, etc.
    const notification = {
      id: Date.now(),
      partnerIds: Array.isArray(partnerIds) ? partnerIds : [partnerIds],
      title,
      message,
      type,
      createdAt: new Date(),
      status: 'sent'
    };

    // Here you would integrate with your notification service
    console.log('Sending notification to partners:', notification);

    res.json({
      success: true,
      data: notification,
      message: 'Notification sent successfully'
    });
  } catch (error) {
    console.error('Error sending partner notification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send notification',
      error: error.message
    });
  }
};

// Update partner data
const updatePartnerData = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const updateData = req.body;

    const updatedPartner = await prisma.user.update({
      where: { id: partnerId },
      data: updateData,
      include: {
        properties: true
      }
    });

    res.json({
      success: true,
      data: updatedPartner,
      message: 'Partner updated successfully'
    });
  } catch (error) {
    console.error('Error updating partner data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update partner data',
      error: error.message
    });
  }
};

// Update property data
const updatePropertyData = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const updateData = req.body;

    const updatedProperty = await prisma.property.update({
      where: { id: propertyId },
      data: updateData,
      include: {
        owner: true
      }
    });

    res.json({
      success: true,
      data: updatedProperty,
      message: 'Property updated successfully'
    });
  } catch (error) {
    console.error('Error updating property data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update property data',
      error: error.message
    });
  }
};

module.exports = {
  getDashboardOverview,
  getPartnerManagement,
  getPropertyOperations,
  getRevenueFinancial,
  getGuestExperience,
  getOperationsManagement,
  getBusinessIntelligence,
  sendPartnerNotification,
  updatePartnerData,
  updatePropertyData
};
