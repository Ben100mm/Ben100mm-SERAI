'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Settings, 
  MessageSquare, 
  Phone, 
  Mail, 
  Star, 
  Calendar, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Smile, 
  ChevronDown,
  User,
  Building2,
  Shield,
  HelpCircle,
  Flag,
  CreditCard,
  FileText,
  Download,
  AlertTriangle,
  Globe,
  X,
  Headphones,
  Zap,
  TrendingUp,
  Users,
  Briefcase,
  Bell,
  Archive,
  Tag,
  Filter,
  SortAsc,
  SortDesc
} from 'lucide-react';

// Types
interface Message {
  id: string;
  content: string;
  sender: 'management' | 'partner' | 'guest' | 'support' | 'system';
  timestamp: string;
  isRead: boolean;
  attachments?: string[];
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  category?: 'revenue' | 'operations' | 'compliance' | 'support' | 'general';
}

interface Conversation {
  id: string;
  contactName: string;
  contactType: 'partner' | 'guest' | 'team' | 'support' | 'system';
  subject: string;
  lastMessage: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'revenue' | 'operations' | 'compliance' | 'support' | 'general';
  status: 'active' | 'resolved' | 'pending' | 'escalated';
  unreadCount: number;
  avatar?: string;
  department?: string;
  property?: string;
}

interface ContactDetails {
  id: string;
  name: string;
  type: 'partner' | 'guest' | 'team' | 'support' | 'system';
  email: string;
  phone: string;
  department: string;
  role: string;
  property?: string;
  partnershipModel?: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastActive: string;
  totalRevenue?: number;
  propertiesCount?: number;
  satisfactionScore?: number;
  responseTime?: string;
  escalationLevel?: number;
  assignedTo?: string;
  tags: string[];
  notes: string;
  // Additional fields for enhanced right panel
  avatar?: string;
  timezone?: string;
  language?: string;
  communicationPreference?: 'email' | 'phone' | 'sms' | 'whatsapp';
  priorityLevel?: 'low' | 'medium' | 'high' | 'urgent';
  lastInteraction?: string;
  totalInteractions?: number;
  averageResponseTime?: string;
  escalationHistory?: Array<{
    date: string;
    reason: string;
    resolvedBy: string;
  }>;
  recentActivity?: Array<{
    action: string;
    timestamp: string;
    details: string;
  }>;
  documents?: Array<{
    name: string;
    type: string;
    uploadDate: string;
    size: string;
  }>;
  upcomingEvents?: Array<{
    title: string;
    date: string;
    type: string;
  }>;
  relatedConversations?: number;
  issueHistory?: Array<{
    issue: string;
    status: string;
    date: string;
  }>;
}

// Mock data
const mockConversations: Conversation[] = [
  {
    id: '1',
    contactName: 'Sarah Johnson',
    contactType: 'partner',
    subject: 'Revenue Share Payment Issue',
    lastMessage: 'The payment calculation seems incorrect for Q3. Can we review the breakdown?',
    timestamp: '2 min ago',
    isRead: false,
    priority: 'high',
    category: 'revenue',
    status: 'active',
    unreadCount: 3,
    department: 'Revenue Management',
    property: 'Luxury Resort - Bali'
  },
  {
    id: '2',
    contactName: 'Michael Chen',
    contactType: 'partner',
    subject: 'Property Maintenance Request',
    lastMessage: 'AC unit in Room 205 needs immediate attention. Guest complaints increasing.',
    timestamp: '15 min ago',
    isRead: true,
    priority: 'urgent',
    category: 'operations',
    status: 'escalated',
    unreadCount: 0,
    department: 'Operations',
    property: 'Boutique Hotel - Paris'
  },
  {
    id: '3',
    contactName: 'Emma Wilson',
    contactType: 'guest',
    subject: 'WiFi Connectivity Issues',
    lastMessage: 'Having trouble connecting to WiFi in my room. Can someone help?',
    timestamp: '1 hour ago',
    isRead: false,
    priority: 'medium',
    category: 'support',
    status: 'pending',
    unreadCount: 1,
    property: 'Eco Lodge - Costa Rica'
  },
  {
    id: '4',
    contactName: 'David Rodriguez',
    contactType: 'team',
    subject: 'Compliance Audit Results',
    lastMessage: 'Q3 compliance audit completed. All properties passed with minor recommendations.',
    timestamp: '2 hours ago',
    isRead: true,
    priority: 'low',
    category: 'compliance',
    status: 'resolved',
    unreadCount: 0,
    department: 'Compliance'
  },
  {
    id: '5',
    contactName: 'Lisa Thompson',
    contactType: 'support',
    subject: 'System Performance Alert',
    lastMessage: 'Database performance degraded. Investigating root cause.',
    timestamp: '3 hours ago',
    isRead: false,
    priority: 'high',
    category: 'operations',
    status: 'active',
    unreadCount: 2,
    department: 'Technology'
  },
  {
    id: '6',
    contactName: 'James Wilson',
    contactType: 'partner',
    subject: 'Contract Renewal Discussion',
    lastMessage: 'Ready to discuss contract renewal terms for 2024.',
    timestamp: '4 hours ago',
    isRead: true,
    priority: 'medium',
    category: 'revenue',
    status: 'active',
    unreadCount: 0,
    department: 'Partnership',
    property: 'Urban Suites - New York'
  },
  {
    id: '7',
    contactName: 'Maria Garcia',
    contactType: 'guest',
    subject: 'Late Check-in Request',
    lastMessage: 'Flight delayed. Can we arrange late check-in after midnight?',
    timestamp: '5 hours ago',
    isRead: true,
    priority: 'low',
    category: 'support',
    status: 'resolved',
    unreadCount: 0,
    property: 'Luxury Resort - Bali'
  },
  {
    id: '8',
    contactName: 'Robert Kim',
    contactType: 'team',
    subject: 'Revenue Forecast Update',
    lastMessage: 'Q4 revenue forecast updated. 15% growth projected.',
    timestamp: '6 hours ago',
    isRead: true,
    priority: 'low',
    category: 'revenue',
    status: 'resolved',
    unreadCount: 0,
    department: 'Finance'
  },
  {
    id: '9',
    contactName: 'Jennifer Lee',
    contactType: 'support',
    subject: 'Guest Satisfaction Survey',
    lastMessage: 'Monthly survey results show 4.8/5 average rating.',
    timestamp: '1 day ago',
    isRead: true,
    priority: 'low',
    category: 'general',
    status: 'resolved',
    unreadCount: 0,
    department: 'Guest Services'
  },
  {
    id: '10',
    contactName: 'Alex Martinez',
    contactType: 'partner',
    subject: 'New Property Onboarding',
    lastMessage: 'Ready to begin onboarding process for new property in Miami.',
    timestamp: '2 days ago',
    isRead: true,
    priority: 'medium',
    category: 'operations',
    status: 'pending',
    unreadCount: 0,
    department: 'Partnership',
    property: 'Beach Resort - Miami'
  }
];

const mockMessages: { [key: string]: Message[] } = {
  '1': [
    {
      id: '1-1',
      content: 'Hi Sarah, I received the Q3 revenue share payment but the calculation seems off. Can we review the breakdown together?',
      sender: 'partner',
      timestamp: '2 min ago',
      isRead: true,
      priority: 'high',
      category: 'revenue'
    },
    {
      id: '1-2',
      content: 'Of course! Let me pull up the detailed breakdown for your properties. I can see the payment was calculated based on 65% occupancy rate and $180 average daily rate.',
      sender: 'management',
      timestamp: '1 min ago',
      isRead: true,
      priority: 'high',
      category: 'revenue'
    },
    {
      id: '1-3',
      content: 'That seems low compared to our actual occupancy. We had 78% occupancy in Q3 according to our internal records. Can you double-check the data source?',
      sender: 'partner',
      timestamp: '30 sec ago',
      isRead: false,
      priority: 'high',
      category: 'revenue'
    }
  ],
  '2': [
    {
      id: '2-1',
      content: 'Urgent: AC unit in Room 205 is not working. Guest has complained multiple times and is requesting a room change.',
      sender: 'partner',
      timestamp: '15 min ago',
      isRead: true,
      priority: 'urgent',
      category: 'operations'
    },
    {
      id: '2-2',
      content: 'I\'ve escalated this to our maintenance team. They should be there within 30 minutes. I\'ll also arrange for a room change if needed.',
      sender: 'management',
      timestamp: '10 min ago',
      isRead: true,
      priority: 'urgent',
      category: 'operations'
    },
    {
      id: '2-3',
      content: 'Maintenance team is on-site. They found a faulty compressor. Will need to replace it, estimated 2 hours. Guest has been moved to Room 210.',
      sender: 'partner',
      timestamp: '5 min ago',
      isRead: false,
      priority: 'urgent',
      category: 'operations'
    }
  ],
  '3': [
    {
      id: '3-1',
      content: 'Hi! I\'m having trouble connecting to WiFi in my room. Can someone help me troubleshoot this?',
      sender: 'guest',
      timestamp: '1 hour ago',
      isRead: true,
      priority: 'medium',
      category: 'support'
    },
    {
      id: '3-2',
      content: 'Hello Emma! I\'m sorry to hear about the WiFi issues. Let me help you troubleshoot this. Can you try restarting your device first?',
      sender: 'management',
      timestamp: '45 min ago',
      isRead: true,
      priority: 'medium',
      category: 'support'
    },
    {
      id: '3-3',
      content: 'I\'ve tried restarting my phone and laptop, but still no luck. The network shows up but won\'t connect.',
      sender: 'guest',
      timestamp: '30 min ago',
      isRead: false,
      priority: 'medium',
      category: 'support'
    }
  ],
  '4': [
    {
      id: '4-1',
      content: 'Q3 compliance audit completed successfully. All properties passed with minor recommendations for improvement.',
      sender: 'team',
      timestamp: '2 hours ago',
      isRead: true,
      priority: 'low',
      category: 'compliance'
    },
    {
      id: '4-2',
      content: 'Excellent work David! Can you share the detailed report and recommendations with the property managers?',
      sender: 'management',
      timestamp: '1.5 hours ago',
      isRead: true,
      priority: 'low',
      category: 'compliance'
    },
    {
      id: '4-3',
      content: 'Will do! I\'ll schedule individual meetings with each property manager to discuss their specific recommendations.',
      sender: 'team',
      timestamp: '1 hour ago',
      isRead: false,
      priority: 'low',
      category: 'compliance'
    }
  ],
  '5': [
    {
      id: '5-1',
      content: 'System Alert: Database performance has degraded significantly. Response times are 3x slower than normal.',
      sender: 'support',
      timestamp: '3 hours ago',
      isRead: true,
      priority: 'high',
      category: 'operations'
    },
    {
      id: '5-2',
      content: 'I\'m investigating the root cause. Initial analysis suggests high query load during peak hours. Monitoring additional metrics now.',
      sender: 'management',
      timestamp: '2.5 hours ago',
      isRead: true,
      priority: 'high',
      category: 'operations'
    },
    {
      id: '5-3',
      content: 'Found the issue - a complex query is causing table locks. Implementing query optimization and adding indexes.',
      sender: 'support',
      timestamp: '1 hour ago',
      isRead: false,
      priority: 'high',
      category: 'operations'
    }
  ],
  '6': [
    {
      id: '6-1',
      content: 'Hi James! Ready to discuss our 2024 contract renewal. I\'ve prepared the updated terms and revenue projections.',
      sender: 'partner',
      timestamp: '4 hours ago',
      isRead: true,
      priority: 'medium',
      category: 'revenue'
    },
    {
      id: '6-2',
      content: 'Perfect timing! I\'ve reviewed your Q3 performance and I\'m impressed with the growth. Let\'s schedule a call to discuss the new terms.',
      sender: 'management',
      timestamp: '3 hours ago',
      isRead: true,
      priority: 'medium',
      category: 'revenue'
    },
    {
      id: '6-3',
      content: 'Great! I\'m available tomorrow at 2 PM EST. I\'ll send over the updated contract draft for your review.',
      sender: 'partner',
      timestamp: '2 hours ago',
      isRead: false,
      priority: 'medium',
      category: 'revenue'
    }
  ],
  '7': [
    {
      id: '7-1',
      content: 'Hi! My flight has been delayed and I won\'t arrive until after midnight. Is it possible to arrange a late check-in?',
      sender: 'guest',
      timestamp: '5 hours ago',
      isRead: true,
      priority: 'low',
      category: 'support'
    },
    {
      id: '7-2',
      content: 'Of course Maria! We\'ll arrange for a late check-in. I\'ll notify the night staff and leave your key at the front desk.',
      sender: 'management',
      timestamp: '4 hours ago',
      isRead: true,
      priority: 'low',
      category: 'support'
    },
    {
      id: '7-3',
      content: 'Thank you so much! I\'ll call when I arrive at the airport to confirm the arrangements.',
      sender: 'guest',
      timestamp: '3 hours ago',
      isRead: false,
      priority: 'low',
      category: 'support'
    }
  ],
  '8': [
    {
      id: '8-1',
      content: 'Q4 revenue forecast updated. We\'re projecting 15% growth compared to Q3, driven by strong holiday bookings.',
      sender: 'team',
      timestamp: '6 hours ago',
      isRead: true,
      priority: 'low',
      category: 'revenue'
    },
    {
      id: '8-2',
      content: 'Excellent news Robert! This aligns well with our strategic goals. Can you break down the growth by property and market?',
      sender: 'management',
      timestamp: '5 hours ago',
      isRead: true,
      priority: 'low',
      category: 'revenue'
    },
    {
      id: '8-3',
      content: 'I\'ll prepare a detailed breakdown by property and market segment. The strongest growth is coming from our luxury properties.',
      sender: 'team',
      timestamp: '4 hours ago',
      isRead: false,
      priority: 'low',
      category: 'revenue'
    }
  ],
  '9': [
    {
      id: '9-1',
      content: 'Monthly guest satisfaction survey results are in! We achieved a 4.8/5 average rating across all properties.',
      sender: 'support',
      timestamp: '1 day ago',
      isRead: true,
      priority: 'low',
      category: 'general'
    },
    {
      id: '9-2',
      content: 'Outstanding results Jennifer! This is our highest rating yet. What were the key drivers of satisfaction?',
      sender: 'management',
      timestamp: '20 hours ago',
      isRead: true,
      priority: 'low',
      category: 'general'
    },
    {
      id: '9-3',
      content: 'Guest service quality and property cleanliness scored highest. We also saw improvement in check-in experience.',
      sender: 'support',
      timestamp: '18 hours ago',
      isRead: false,
      priority: 'low',
      category: 'general'
    }
  ],
  '10': [
    {
      id: '10-1',
      content: 'Hi Alex! Ready to begin the onboarding process for your Miami Beach Resort property. Welcome to the SERAI family!',
      sender: 'partner',
      timestamp: '2 days ago',
      isRead: true,
      priority: 'medium',
      category: 'operations'
    },
    {
      id: '10-2',
      content: 'Thank you! I\'m excited to get started. I\'ve submitted all the required documentation and property photos.',
      sender: 'management',
      timestamp: '1.5 days ago',
      isRead: true,
      priority: 'medium',
      category: 'operations'
    },
    {
      id: '10-3',
      content: 'Perfect! I\'ve reviewed your documentation. Let\'s schedule the property inspection and training sessions for next week.',
      sender: 'partner',
      timestamp: '1 day ago',
      isRead: false,
      priority: 'medium',
      category: 'operations'
    }
  ]
};

const mockContactDetails: { [key: string]: ContactDetails } = {
  '1': {
    id: '1',
    name: 'Sarah Johnson',
    type: 'partner',
    email: 'sarah.johnson@luxuryresort.com',
    phone: '+1 (555) 123-4567',
    department: 'Revenue Management',
    role: 'Property Manager',
    property: 'Luxury Resort - Bali',
    partnershipModel: 'Revenue Share',
    status: 'active',
    joinDate: '2022-03-15',
    lastActive: '2 minutes ago',
    totalRevenue: 125000,
    propertiesCount: 3,
    satisfactionScore: 4.8,
    responseTime: '1.2 hours',
    escalationLevel: 0,
    assignedTo: 'Revenue Team',
    tags: ['VIP Partner', 'Revenue Share', 'High Performer'],
    notes: 'Excellent partner with consistent performance. Quick to respond to issues.'
  },
  '2': {
    id: '2',
    name: 'Michael Chen',
    type: 'partner',
    email: 'michael.chen@boutiquehotel.com',
    phone: '+33 1 23 45 67 89',
    department: 'Operations',
    role: 'Operations Manager',
    property: 'Boutique Hotel - Paris',
    partnershipModel: 'Master Lease',
    status: 'active',
    joinDate: '2021-11-08',
    lastActive: '15 minutes ago',
    totalRevenue: 89000,
    propertiesCount: 1,
    satisfactionScore: 4.6,
    responseTime: '2.1 hours',
    escalationLevel: 1,
    assignedTo: 'Operations Team',
    tags: ['Master Lease', 'Paris Market', 'Maintenance Focus'],
    notes: 'Strong operational focus. Sometimes needs escalation for urgent issues.'
  }
};

export default function ManagementMessages() {
  const [activeConversation, setActiveConversation] = useState<string>('1');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newMessage, setNewMessage] = useState<string>('');

  // Generate different contact details for each conversation
  const generateContactDetailsForConversation = (conversationId: string): ContactDetails => {
    const contactDetailsSets: { [key: string]: ContactDetails } = {
      '1': { // Sarah Johnson - Revenue Share Payment Issue
        id: '1',
        name: 'Sarah Johnson',
        type: 'partner',
        email: 'sarah.johnson@luxuryresort.com',
        phone: '+1 (555) 123-4567',
        department: 'Revenue Management',
        role: 'Property Manager',
        property: 'Luxury Resort - Bali',
        partnershipModel: 'Revenue Share',
        status: 'active',
        joinDate: '2022-03-15',
        lastActive: '2 minutes ago',
        totalRevenue: 125000,
        propertiesCount: 3,
        satisfactionScore: 4.8,
        responseTime: '1.2 hours',
        escalationLevel: 0,
        assignedTo: 'Revenue Team',
        tags: ['VIP Partner', 'Revenue Share', 'High Performer'],
        notes: 'Excellent partner with consistent performance. Quick to respond to issues.',
        timezone: 'Asia/Jakarta',
        language: 'English',
        communicationPreference: 'email',
        priorityLevel: 'high',
        lastInteraction: '2 minutes ago',
        totalInteractions: 47,
        averageResponseTime: '1.2 hours',
        escalationHistory: [
          { date: '2024-01-15', reason: 'Payment discrepancy', resolvedBy: 'Finance Team' }
        ],
        recentActivity: [
          { action: 'Payment Query', timestamp: '2 min ago', details: 'Q3 revenue share calculation review' },
          { action: 'Document Upload', timestamp: '1 hour ago', details: 'Updated occupancy reports' },
          { action: 'Meeting Scheduled', timestamp: '2 hours ago', details: 'Monthly review call' }
        ],
        documents: [
          { name: 'Q3 Revenue Report.pdf', type: 'PDF', uploadDate: '2024-01-15', size: '2.3 MB' },
          { name: 'Occupancy Data.xlsx', type: 'Excel', uploadDate: '2024-01-14', size: '1.1 MB' }
        ],
        upcomingEvents: [
          { title: 'Monthly Revenue Review', date: '2024-01-20', type: 'Meeting' },
          { title: 'Q4 Planning Session', date: '2024-01-25', type: 'Conference' }
        ],
        relatedConversations: 3,
        issueHistory: [
          { issue: 'Payment Calculation Error', status: 'Resolved', date: '2024-01-15' },
          { issue: 'Occupancy Data Sync', status: 'In Progress', date: '2024-01-10' }
        ]
      },
      '2': { // Michael Chen - Property Maintenance Request
        id: '2',
        name: 'Michael Chen',
        type: 'partner',
        email: 'michael.chen@boutiquehotel.com',
        phone: '+33 1 23 45 67 89',
        department: 'Operations',
        role: 'Operations Manager',
        property: 'Boutique Hotel - Paris',
        partnershipModel: 'Master Lease',
        status: 'active',
        joinDate: '2021-11-08',
        lastActive: '15 minutes ago',
        totalRevenue: 89000,
        propertiesCount: 1,
        satisfactionScore: 4.6,
        responseTime: '2.1 hours',
        escalationLevel: 1,
        assignedTo: 'Operations Team',
        tags: ['Master Lease', 'Paris Market', 'Maintenance Focus'],
        notes: 'Strong operational focus. Sometimes needs escalation for urgent issues.',
        timezone: 'Europe/Paris',
        language: 'French',
        communicationPreference: 'phone',
        priorityLevel: 'urgent',
        lastInteraction: '15 minutes ago',
        totalInteractions: 23,
        averageResponseTime: '2.1 hours',
        escalationHistory: [
          { date: '2024-01-14', reason: 'AC unit failure', resolvedBy: 'Maintenance Team' },
          { date: '2024-01-10', reason: 'Guest complaint', resolvedBy: 'Operations Manager' }
        ],
        recentActivity: [
          { action: 'Maintenance Request', timestamp: '15 min ago', details: 'AC unit in Room 205 needs immediate attention' },
          { action: 'Guest Complaint', timestamp: '30 min ago', details: 'Room change requested due to AC issues' },
          { action: 'Escalation', timestamp: '45 min ago', details: 'Issue escalated to maintenance team' }
        ],
        documents: [
          { name: 'Maintenance Log.pdf', type: 'PDF', uploadDate: '2024-01-14', size: '856 KB' },
          { name: 'Room Status Report.xlsx', type: 'Excel', uploadDate: '2024-01-13', size: '1.2 MB' }
        ],
        upcomingEvents: [
          { title: 'Maintenance Review', date: '2024-01-18', type: 'Meeting' },
          { title: 'Equipment Inspection', date: '2024-01-22', type: 'Site Visit' }
        ],
        relatedConversations: 2,
        issueHistory: [
          { issue: 'AC Unit Failure', status: 'In Progress', date: '2024-01-14' },
          { issue: 'Guest Complaint', status: 'Resolved', date: '2024-01-10' }
        ]
      },
      '3': { // Emma Wilson - WiFi Connectivity Issues
        id: '3',
        name: 'Emma Wilson',
        type: 'guest',
        email: 'emma.wilson@email.com',
        phone: '+1 (555) 234-5678',
        department: 'Guest Services',
        role: 'Guest',
        property: 'Eco Lodge - Costa Rica',
        status: 'active',
        joinDate: '2024-01-15',
        lastActive: '1 hour ago',
        satisfactionScore: 4.2,
        responseTime: '30 minutes',
        escalationLevel: 0,
        assignedTo: 'Guest Services Team',
        tags: ['VIP Guest', 'Technical Issues', 'Eco Lodge'],
        notes: 'Frequent guest with technical support needs. Usually resolved quickly.',
        timezone: 'America/Costa_Rica',
        language: 'English',
        communicationPreference: 'whatsapp',
        priorityLevel: 'medium',
        lastInteraction: '1 hour ago',
        totalInteractions: 8,
        averageResponseTime: '30 minutes',
        escalationHistory: [],
        recentActivity: [
          { action: 'WiFi Issue Report', timestamp: '1 hour ago', details: 'Unable to connect to WiFi in room' },
          { action: 'Support Request', timestamp: '1.5 hours ago', details: 'Technical support ticket created' },
          { action: 'Check-in', timestamp: '2 days ago', details: 'Arrived at Eco Lodge - Costa Rica' }
        ],
        documents: [
          { name: 'WiFi Troubleshooting Guide.pdf', type: 'PDF', uploadDate: '2024-01-15', size: '1.2 MB' }
        ],
        upcomingEvents: [
          { title: 'Check-out', date: '2024-01-18', type: 'Departure' }
        ],
        relatedConversations: 1,
        issueHistory: [
          { issue: 'WiFi Connectivity', status: 'In Progress', date: '2024-01-15' }
        ]
      },
      '4': { // David Rodriguez - Compliance Audit Results
        id: '4',
        name: 'David Rodriguez',
        type: 'team',
        email: 'david.rodriguez@serai.com',
        phone: '+1 (555) 345-6789',
        department: 'Compliance',
        role: 'Compliance Manager',
        status: 'active',
        joinDate: '2020-06-10',
        lastActive: '2 hours ago',
        satisfactionScore: 4.9,
        responseTime: '45 minutes',
        escalationLevel: 0,
        assignedTo: 'Compliance Team',
        tags: ['Internal Team', 'Compliance', 'Audit Expert'],
        notes: 'Excellent compliance manager. Very thorough and detail-oriented.',
        timezone: 'America/New_York',
        language: 'English',
        communicationPreference: 'email',
        priorityLevel: 'low',
        lastInteraction: '2 hours ago',
        totalInteractions: 156,
        averageResponseTime: '45 minutes',
        escalationHistory: [],
        recentActivity: [
          { action: 'Audit Report', timestamp: '2 hours ago', details: 'Q3 compliance audit completed successfully' },
          { action: 'Document Review', timestamp: '4 hours ago', details: 'Reviewed all property compliance documents' },
          { action: 'Team Meeting', timestamp: '1 day ago', details: 'Compliance team weekly standup' }
        ],
        documents: [
          { name: 'Q3 Compliance Audit.pdf', type: 'PDF', uploadDate: '2024-01-15', size: '3.2 MB' },
          { name: 'Compliance Checklist.xlsx', type: 'Excel', uploadDate: '2024-01-14', size: '1.8 MB' }
        ],
        upcomingEvents: [
          { title: 'Q4 Audit Planning', date: '2024-01-22', type: 'Meeting' },
          { title: 'Compliance Training', date: '2024-01-28', type: 'Workshop' }
        ],
        relatedConversations: 5,
        issueHistory: [
          { issue: 'Q3 Audit', status: 'Resolved', date: '2024-01-15' }
        ]
      },
      '5': { // Lisa Thompson - System Performance Alert
        id: '5',
        name: 'Lisa Thompson',
        type: 'support',
        email: 'lisa.thompson@serai.com',
        phone: '+1 (555) 456-7890',
        department: 'Technology',
        role: 'System Administrator',
        status: 'active',
        joinDate: '2019-09-12',
        lastActive: '3 hours ago',
        satisfactionScore: 4.7,
        responseTime: '15 minutes',
        escalationLevel: 0,
        assignedTo: 'Technology Team',
        tags: ['Internal Team', 'Technology', 'System Admin'],
        notes: 'Critical system administrator. Handles all technical emergencies.',
        timezone: 'America/New_York',
        language: 'English',
        communicationPreference: 'phone',
        priorityLevel: 'high',
        lastInteraction: '3 hours ago',
        totalInteractions: 89,
        averageResponseTime: '15 minutes',
        escalationHistory: [],
        recentActivity: [
          { action: 'System Alert', timestamp: '3 hours ago', details: 'Database performance degradation detected' },
          { action: 'Investigation', timestamp: '3.5 hours ago', details: 'Started root cause analysis' },
          { action: 'Monitoring', timestamp: '4 hours ago', details: 'Set up additional performance monitoring' }
        ],
        documents: [
          { name: 'System Performance Report.pdf', type: 'PDF', uploadDate: '2024-01-15', size: '2.1 MB' },
          { name: 'Database Metrics.xlsx', type: 'Excel', uploadDate: '2024-01-14', size: '1.5 MB' }
        ],
        upcomingEvents: [
          { title: 'System Maintenance', date: '2024-01-20', type: 'Maintenance' },
          { title: 'Tech Team Review', date: '2024-01-24', type: 'Meeting' }
        ],
        relatedConversations: 4,
        issueHistory: [
          { issue: 'Database Performance', status: 'In Progress', date: '2024-01-15' }
        ]
      },
      '6': { // James Wilson - Contract Renewal Discussion
        id: '6',
        name: 'James Wilson',
        type: 'partner',
        email: 'james.wilson@urbansuites.com',
        phone: '+1 (555) 567-8901',
        department: 'Partnership',
        role: 'Partnership Manager',
        property: 'Urban Suites - New York',
        partnershipModel: 'Revenue Share',
        status: 'active',
        joinDate: '2021-04-20',
        lastActive: '4 hours ago',
        totalRevenue: 156000,
        propertiesCount: 2,
        satisfactionScore: 4.5,
        responseTime: '3.5 hours',
        escalationLevel: 0,
        assignedTo: 'Partnership Team',
        tags: ['Partnership', 'Contract Renewal', 'New York Market'],
        notes: 'Key partner for NYC market. Contract renewal discussions ongoing.',
        timezone: 'America/New_York',
        language: 'English',
        communicationPreference: 'email',
        priorityLevel: 'medium',
        lastInteraction: '4 hours ago',
        totalInteractions: 34,
        averageResponseTime: '3.5 hours',
        escalationHistory: [],
        recentActivity: [
          { action: 'Contract Discussion', timestamp: '4 hours ago', details: 'Ready to discuss 2024 contract renewal terms' },
          { action: 'Revenue Review', timestamp: '1 day ago', details: 'Analyzed Q3 performance metrics' },
          { action: 'Meeting Request', timestamp: '2 days ago', details: 'Scheduled contract renewal meeting' }
        ],
        documents: [
          { name: 'Contract Renewal Terms.pdf', type: 'PDF', uploadDate: '2024-01-14', size: '1.8 MB' },
          { name: 'Revenue Analysis.xlsx', type: 'Excel', uploadDate: '2024-01-13', size: '2.1 MB' }
        ],
        upcomingEvents: [
          { title: 'Contract Renewal Meeting', date: '2024-01-19', type: 'Meeting' },
          { title: 'Q4 Performance Review', date: '2024-01-26', type: 'Review' }
        ],
        relatedConversations: 2,
        issueHistory: [
          { issue: 'Contract Renewal', status: 'In Progress', date: '2024-01-14' }
        ]
      },
      '7': { // Maria Garcia - Late Check-in Request
        id: '7',
        name: 'Maria Garcia',
        type: 'guest',
        email: 'maria.garcia@email.com',
        phone: '+1 (555) 678-9012',
        department: 'Guest Services',
        role: 'Guest',
        property: 'Luxury Resort - Bali',
        status: 'active',
        joinDate: '2024-02-28',
        lastActive: '5 hours ago',
        satisfactionScore: 4.8,
        responseTime: '20 minutes',
        escalationLevel: 0,
        assignedTo: 'Guest Services Team',
        tags: ['VIP Guest', 'Bali Resort', 'Flexible Requests'],
        notes: 'Regular guest at Bali resort. Very understanding and flexible.',
        timezone: 'Asia/Jakarta',
        language: 'Spanish',
        communicationPreference: 'whatsapp',
        priorityLevel: 'low',
        lastInteraction: '5 hours ago',
        totalInteractions: 12,
        averageResponseTime: '20 minutes',
        escalationHistory: [],
        recentActivity: [
          { action: 'Late Check-in Request', timestamp: '5 hours ago', details: 'Flight delayed, requesting late check-in after midnight' },
          { action: 'Booking Confirmation', timestamp: '1 week ago', details: 'Confirmed 3-night stay at Bali resort' },
          { action: 'Special Request', timestamp: '1 week ago', details: 'Requested ocean view room' }
        ],
        documents: [
          { name: 'Flight Itinerary.pdf', type: 'PDF', uploadDate: '2024-01-10', size: '456 KB' }
        ],
        upcomingEvents: [
          { title: 'Check-in', date: '2024-01-16', type: 'Arrival' },
          { title: 'Check-out', date: '2024-01-19', type: 'Departure' }
        ],
        relatedConversations: 1,
        issueHistory: [
          { issue: 'Late Check-in', status: 'Resolved', date: '2024-01-15' }
        ]
      },
      '8': { // Robert Kim - Revenue Forecast Update
        id: '8',
        name: 'Robert Kim',
        type: 'team',
        email: 'robert.kim@serai.com',
        phone: '+1 (555) 789-0123',
        department: 'Finance',
        role: 'Financial Analyst',
        status: 'active',
        joinDate: '2022-01-15',
        lastActive: '6 hours ago',
        satisfactionScore: 4.6,
        responseTime: '1 hour',
        escalationLevel: 0,
        assignedTo: 'Finance Team',
        tags: ['Internal Team', 'Finance', 'Forecasting'],
        notes: 'Excellent financial analyst. Provides accurate revenue forecasts.',
        timezone: 'America/New_York',
        language: 'English',
        communicationPreference: 'email',
        priorityLevel: 'low',
        lastInteraction: '6 hours ago',
        totalInteractions: 78,
        averageResponseTime: '1 hour',
        escalationHistory: [],
        recentActivity: [
          { action: 'Forecast Update', timestamp: '6 hours ago', details: 'Q4 revenue forecast updated with 15% growth projection' },
          { action: 'Data Analysis', timestamp: '8 hours ago', details: 'Completed market trend analysis' },
          { action: 'Report Generation', timestamp: '1 day ago', details: 'Generated monthly financial reports' }
        ],
        documents: [
          { name: 'Q4 Revenue Forecast.pdf', type: 'PDF', uploadDate: '2024-01-15', size: '2.8 MB' },
          { name: 'Market Analysis.xlsx', type: 'Excel', uploadDate: '2024-01-14', size: '3.2 MB' }
        ],
        upcomingEvents: [
          { title: 'Monthly Finance Review', date: '2024-01-18', type: 'Meeting' },
          { title: 'Q1 Planning', date: '2024-01-25', type: 'Planning Session' }
        ],
        relatedConversations: 3,
        issueHistory: [
          { issue: 'Q4 Forecast', status: 'Resolved', date: '2024-01-15' }
        ]
      },
      '9': { // Jennifer Lee - Guest Satisfaction Survey
        id: '9',
        name: 'Jennifer Lee',
        type: 'support',
        email: 'jennifer.lee@serai.com',
        phone: '+1 (555) 890-1234',
        department: 'Guest Services',
        role: 'Guest Experience Manager',
        status: 'active',
        joinDate: '2021-08-30',
        lastActive: '1 day ago',
        satisfactionScore: 4.8,
        responseTime: '2 hours',
        escalationLevel: 0,
        assignedTo: 'Guest Services Team',
        tags: ['Internal Team', 'Guest Experience', 'Surveys'],
        notes: 'Manages guest satisfaction programs. Excellent at improving ratings.',
        timezone: 'America/New_York',
        language: 'English',
        communicationPreference: 'email',
        priorityLevel: 'low',
        lastInteraction: '1 day ago',
        totalInteractions: 67,
        averageResponseTime: '2 hours',
        escalationHistory: [],
        recentActivity: [
          { action: 'Survey Results', timestamp: '1 day ago', details: 'Monthly survey shows 4.8/5 average rating' },
          { action: 'Report Analysis', timestamp: '2 days ago', details: 'Analyzed guest feedback trends' },
          { action: 'Improvement Plan', timestamp: '3 days ago', details: 'Created action plan for low-rated areas' }
        ],
        documents: [
          { name: 'Guest Satisfaction Report.pdf', type: 'PDF', uploadDate: '2024-01-14', size: '1.9 MB' },
          { name: 'Feedback Analysis.xlsx', type: 'Excel', uploadDate: '2024-01-13', size: '2.3 MB' }
        ],
        upcomingEvents: [
          { title: 'Guest Experience Review', date: '2024-01-21', type: 'Meeting' },
          { title: 'Survey Design Workshop', date: '2024-01-29', type: 'Workshop' }
        ],
        relatedConversations: 4,
        issueHistory: [
          { issue: 'Monthly Survey', status: 'Resolved', date: '2024-01-14' }
        ]
      },
      '10': { // Alex Martinez - New Property Onboarding
        id: '10',
        name: 'Alex Martinez',
        type: 'partner',
        email: 'alex.martinez@beachresort.com',
        phone: '+1 (305) 123-4567',
        department: 'Partnership',
        role: 'Property Owner',
        property: 'Beach Resort - Miami',
        partnershipModel: 'Revenue Share',
        status: 'active',
        joinDate: '2024-03-01',
        lastActive: '2 days ago',
        totalRevenue: 0,
        propertiesCount: 1,
        satisfactionScore: 4.0,
        responseTime: '4 hours',
        escalationLevel: 0,
        assignedTo: 'Partnership Team',
        tags: ['New Partner', 'Miami Market', 'Onboarding'],
        notes: 'New partner in Miami market. Currently in onboarding process.',
        timezone: 'America/New_York',
        language: 'Spanish',
        communicationPreference: 'phone',
        priorityLevel: 'medium',
        lastInteraction: '2 days ago',
        totalInteractions: 15,
        averageResponseTime: '4 hours',
        escalationHistory: [],
        recentActivity: [
          { action: 'Onboarding Start', timestamp: '2 days ago', details: 'Ready to begin onboarding process for Miami property' },
          { action: 'Document Submission', timestamp: '3 days ago', details: 'Submitted property documentation' },
          { action: 'Initial Meeting', timestamp: '1 week ago', details: 'Completed initial partnership discussion' }
        ],
        documents: [
          { name: 'Property Documentation.pdf', type: 'PDF', uploadDate: '2024-01-13', size: '4.2 MB' },
          { name: 'Onboarding Checklist.xlsx', type: 'Excel', uploadDate: '2024-01-12', size: '1.1 MB' }
        ],
        upcomingEvents: [
          { title: 'Onboarding Session', date: '2024-01-17', type: 'Training' },
          { title: 'Property Inspection', date: '2024-01-23', type: 'Site Visit' }
        ],
        relatedConversations: 1,
        issueHistory: [
          { issue: 'Property Onboarding', status: 'In Progress', date: '2024-01-13' }
        ]
      }
    };
    
    return contactDetailsSets[conversationId] || contactDetailsSets['1'];
  };

  const filteredConversations = mockConversations.filter(conv => {
    const matchesStatus = filterStatus === 'all' || conv.status === filterStatus;
    const matchesSearch = conv.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const activeMessages = mockMessages[activeConversation] || [];
  const activeContact = generateContactDetailsForConversation(activeConversation);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender: 'management',
        timestamp: new Date().toLocaleString(),
        isRead: true,
        priority: 'medium',
        category: 'general'
      };
      
      // In a real app, this would be handled by proper state management
      // For now, we'll just clear the input
      setNewMessage('');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-serai-red-800 bg-serai-red-100';
      case 'high': return 'text-serai-gold-800 bg-serai-gold-100';
      case 'medium': return 'text-serai-forest-800 bg-serai-forest-100';
      case 'low': return 'text-serai-navy-800 bg-serai-navy-100';
      default: return 'text-serai-neutral-800 bg-serai-neutral-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-serai-forest-800 bg-serai-forest-100';
      case 'resolved': return 'text-serai-navy-800 bg-serai-navy-100';
      case 'pending': return 'text-serai-gold-800 bg-serai-gold-100';
      case 'escalated': return 'text-serai-red-800 bg-serai-red-100';
      default: return 'text-serai-neutral-800 bg-serai-neutral-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'revenue': return <DollarSign className="h-4 w-4" />;
      case 'operations': return <Settings className="h-4 w-4" />;
      case 'compliance': return <Shield className="h-4 w-4" />;
      case 'support': return <HelpCircle className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getContactTypeIcon = (type: string) => {
    switch (type) {
      case 'partner': return <Building2 className="h-4 w-4" />;
      case 'guest': return <User className="h-4 w-4" />;
      case 'team': return <Users className="h-4 w-4" />;
      case 'support': return <Headphones className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="h-full bg-white flex">
      {/* Left Panel - Conversations List */}
      <div className="w-80 border-r border-serai-neutral-200 flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-serai-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-serai-charcoal-900">Management Messages</h2>
            <button className="p-2 text-serai-neutral-400 hover:text-serai-neutral-600">
              <Settings className="h-5 w-5" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-serai-neutral-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-serai-neutral-300 rounded-lg focus:ring-2 focus:ring-serai-red-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {['all', 'active', 'pending', 'resolved', 'escalated'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  filterStatus === status
                    ? 'bg-serai-red-500 text-white'
                    : 'bg-serai-neutral-100 text-serai-neutral-700 hover:bg-serai-neutral-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ maxHeight: 'calc(100vh - 240px)' }}>
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setActiveConversation(conversation.id)}
              className={`p-4 border-b border-serai-neutral-200 cursor-pointer hover:bg-serai-cream-50 ${
                activeConversation === conversation.id ? 'bg-serai-cream-100 border-l-4 border-l-serai-red-500' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-serai-navy-100 flex items-center justify-center">
                    {getContactTypeIcon(conversation.contactType)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-serai-charcoal-900 truncate">
                      {conversation.contactName}
                    </p>
                    <div className="flex items-center space-x-1">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(conversation.priority)}`}>
                        {conversation.priority}
                      </span>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-serai-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-serai-neutral-600 truncate">{conversation.subject}</p>
                  <p className="text-xs text-serai-neutral-500 truncate">{conversation.lastMessage}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-serai-neutral-500">{conversation.timestamp}</span>
                    <div className="flex items-center space-x-1">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(conversation.status)}`}>
                        {conversation.status}
                      </span>
                      {getCategoryIcon(conversation.category)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Panel - Active Conversation */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Chat Header - Fixed */}
        <div className="flex-shrink-0 p-4 border-b border-serai-neutral-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-serai-navy-100 flex items-center justify-center">
                {activeContact && getContactTypeIcon(activeContact.type)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-serai-charcoal-900">
                  {activeContact?.name || 'Select a conversation'}
                </h3>
                <p className="text-sm text-serai-neutral-500">
                  {activeContact?.department || 'Department'} • {activeContact?.property || 'Property'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-serai-neutral-400 hover:text-serai-neutral-600">
                <Phone className="h-5 w-5" />
              </button>
              <button className="p-2 text-serai-neutral-400 hover:text-serai-neutral-600">
                <Mail className="h-5 w-5" />
              </button>
              <button className="p-2 text-serai-neutral-400 hover:text-serai-neutral-600">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages - Scrollable with explicit height */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ height: 'calc(100vh - 240px)', maxHeight: 'calc(100vh - 240px)' }}>
          {activeMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'management' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'management'
                    ? 'bg-serai-red-500 text-white'
                    : 'bg-gray-100 text-serai-charcoal-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-xs ${message.sender === 'management' ? 'text-serai-red-100' : 'text-serai-neutral-500'}`}>
                    {message.timestamp}
                  </span>
                  {message.priority && (
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(message.priority)}`}>
                      {message.priority}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input - Sticky at Bottom */}
        <div className="sticky bottom-0 p-4 border-t border-serai-neutral-200 bg-white z-10">
          <div className="flex items-center space-x-2">
            <button className="p-2 text-serai-neutral-400 hover:text-serai-neutral-600">
              <Paperclip className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 bg-white border border-serai-neutral-300 rounded-lg focus:ring-2 focus:ring-serai-red-500 focus:border-transparent"
            />
            <button className="p-2 text-serai-neutral-400 hover:text-serai-neutral-600">
              <Smile className="h-5 w-5" />
            </button>
            <button 
              onClick={handleSendMessage}
              className="px-4 py-2 bg-serai-red-500 text-white rounded-lg hover:bg-serai-red-600"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Enhanced Contact Details */}
      <div className="w-80 border-l border-serai-neutral-200 flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ maxHeight: '100vh' }}>
        {activeContact ? (
          <>
            {/* Contact Header */}
            <div className="p-4 border-b border-serai-neutral-200 bg-gradient-to-r from-serai-cream-50 to-white">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-serai-navy-100 flex items-center justify-center">
                  {getContactTypeIcon(activeContact.type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-serai-charcoal-900">{activeContact.name}</h3>
                  <p className="text-sm text-serai-neutral-500">{activeContact.role}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(activeContact.status)}`}>
                      {activeContact.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(activeContact.priorityLevel || 'medium')}`}>
                      {activeContact.priorityLevel || 'medium'}
                    </span>
                    {activeContact.escalationLevel && activeContact.escalationLevel > 0 && (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-serai-red-100 text-serai-red-800">
                        Escalated
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Contact Details */}
            <div className="p-4 space-y-6">
              {/* Contact Information */}
              <div>
                <h4 className="text-sm font-semibold text-serai-charcoal-900 mb-3 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Contact Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-serai-neutral-400" />
                    <div className="flex-1">
                      <span className="text-sm text-serai-neutral-600">{activeContact.email}</span>
                      <div className="text-xs text-serai-neutral-400">Email</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-serai-neutral-400" />
                    <div className="flex-1">
                      <span className="text-sm text-serai-neutral-600">{activeContact.phone}</span>
                      <div className="text-xs text-serai-neutral-400">Phone</div>
                    </div>
                  </div>
                  {activeContact.property && (
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-4 w-4 text-serai-neutral-400" />
                      <div className="flex-1">
                        <span className="text-sm text-serai-neutral-600">{activeContact.property}</span>
                        <div className="text-xs text-serai-neutral-400">Property</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <Globe className="h-4 w-4 text-serai-neutral-400" />
                    <div className="flex-1">
                      <span className="text-sm text-serai-neutral-600">{activeContact.timezone || 'UTC'}</span>
                      <div className="text-xs text-serai-neutral-400">Timezone</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="h-4 w-4 text-serai-neutral-400" />
                    <div className="flex-1">
                      <span className="text-sm text-serai-neutral-600 capitalize">{activeContact.communicationPreference || 'email'}</span>
                      <div className="text-xs text-serai-neutral-400">Preferred Contact</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              {(activeContact.type === 'partner' || activeContact.type === 'team' || activeContact.type === 'support') && (
                <div>
                  <h4 className="text-sm font-semibold text-serai-charcoal-900 mb-3 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Performance Metrics
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {activeContact.totalRevenue && (
                      <div className="bg-serai-cream-50 p-3 rounded-lg">
                        <div className="text-xs text-serai-neutral-500">Total Revenue</div>
                        <div className="text-sm font-semibold text-serai-charcoal-900">
                          ${activeContact.totalRevenue.toLocaleString()}
                        </div>
                      </div>
                    )}
                    {activeContact.propertiesCount && (
                      <div className="bg-serai-cream-50 p-3 rounded-lg">
                        <div className="text-xs text-serai-neutral-500">Properties</div>
                        <div className="text-sm font-semibold text-serai-charcoal-900">
                          {activeContact.propertiesCount}
                        </div>
                      </div>
                    )}
                    <div className="bg-serai-cream-50 p-3 rounded-lg">
                      <div className="text-xs text-serai-neutral-500">Satisfaction</div>
                      <div className="text-sm font-semibold text-serai-charcoal-900">
                        {activeContact.satisfactionScore}/5
                      </div>
                    </div>
                    <div className="bg-serai-cream-50 p-3 rounded-lg">
                      <div className="text-xs text-serai-neutral-500">Response Time</div>
                      <div className="text-sm font-semibold text-serai-charcoal-900">
                        {activeContact.averageResponseTime || activeContact.responseTime}
                      </div>
                    </div>
                    <div className="bg-serai-cream-50 p-3 rounded-lg">
                      <div className="text-xs text-serai-neutral-500">Interactions</div>
                      <div className="text-sm font-semibold text-serai-charcoal-900">
                        {activeContact.totalInteractions || 0}
                      </div>
                    </div>
                    <div className="bg-serai-cream-50 p-3 rounded-lg">
                      <div className="text-xs text-serai-neutral-500">Last Active</div>
                      <div className="text-sm font-semibold text-serai-charcoal-900">
                        {activeContact.lastInteraction || activeContact.lastActive}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Activity */}
              {activeContact.recentActivity && activeContact.recentActivity.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-serai-charcoal-900 mb-3 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Recent Activity
                  </h4>
                  <div className="space-y-2">
                    {activeContact.recentActivity.slice(0, 3).map((activity, index) => (
                      <div key={index} className="bg-serai-neutral-50 p-3 rounded-lg">
                        <div className="text-sm font-medium text-serai-charcoal-900">{activity.action}</div>
                        <div className="text-xs text-serai-neutral-500 mt-1">{activity.details}</div>
                        <div className="text-xs text-serai-neutral-400 mt-1">{activity.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents */}
              {activeContact.documents && activeContact.documents.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-serai-charcoal-900 mb-3 flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </h4>
                  <div className="space-y-2">
                    {activeContact.documents.slice(0, 3).map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-serai-neutral-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-serai-neutral-400" />
                          <div>
                            <div className="text-sm text-serai-charcoal-900">{doc.name}</div>
                            <div className="text-xs text-serai-neutral-500">{doc.type} • {doc.size}</div>
                          </div>
                        </div>
                        <Download className="h-4 w-4 text-serai-neutral-400 hover:text-serai-red-500 cursor-pointer" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upcoming Events */}
              {activeContact.upcomingEvents && activeContact.upcomingEvents.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-serai-charcoal-900 mb-3 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Upcoming Events
                  </h4>
                  <div className="space-y-2">
                    {activeContact.upcomingEvents.slice(0, 2).map((event, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-serai-forest-50 rounded-lg">
                        <div>
                          <div className="text-sm font-medium text-serai-charcoal-900">{event.title}</div>
                          <div className="text-xs text-serai-neutral-500">{event.type}</div>
                        </div>
                        <div className="text-xs text-serai-neutral-500">{event.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Issue History */}
              {activeContact.issueHistory && activeContact.issueHistory.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-serai-charcoal-900 mb-3 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Issue History
                  </h4>
                  <div className="space-y-2">
                    {activeContact.issueHistory.slice(0, 3).map((issue, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-serai-neutral-50 rounded-lg">
                        <div>
                          <div className="text-sm text-serai-charcoal-900">{issue.issue}</div>
                          <div className="text-xs text-serai-neutral-500">{issue.date}</div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          issue.status === 'Resolved' ? 'bg-serai-forest-100 text-serai-forest-800' :
                          issue.status === 'In Progress' ? 'bg-serai-gold-100 text-serai-gold-800' :
                          'bg-serai-red-100 text-serai-red-800'
                        }`}>
                          {issue.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div>
                <h4 className="text-sm font-semibold text-serai-charcoal-900 mb-3 flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeContact.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium bg-serai-cream-100 text-serai-charcoal-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h4 className="text-sm font-semibold text-serai-charcoal-900 mb-3 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Notes
                </h4>
                <p className="text-sm text-serai-neutral-600 bg-serai-neutral-50 p-3 rounded-lg">{activeContact.notes}</p>
              </div>

              {/* Quick Actions */}
              <div>
                <h4 className="text-sm font-semibold text-serai-charcoal-900 mb-3 flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  Quick Actions
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center space-x-2 px-3 py-2 bg-serai-navy-500 text-white rounded-lg hover:bg-serai-navy-600 text-sm">
                    <Phone className="h-4 w-4" />
                    <span>Call</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 px-3 py-2 bg-serai-navy-500 text-white rounded-lg hover:bg-serai-navy-600 text-sm">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 px-3 py-2 bg-serai-navy-500 text-white rounded-lg hover:bg-serai-navy-600 text-sm">
                    <Flag className="h-4 w-4" />
                    <span>Escalate</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 px-3 py-2 bg-serai-navy-500 text-white rounded-lg hover:bg-serai-navy-600 text-sm">
                    <MessageSquare className="h-4 w-4" />
                    <span>Message</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-4 text-center text-serai-neutral-500">
            <MessageSquare className="h-12 w-12 mx-auto mb-2 text-serai-neutral-300" />
            <p>Select a conversation to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
