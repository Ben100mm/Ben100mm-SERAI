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
  Briefcase
} from 'lucide-react';

// Types
interface Message {
  id: string;
  content: string;
  sender: 'partner' | 'support' | 'system' | 'guest';
  timestamp: string;
  isRead: boolean;
  attachments?: string[];
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

interface Conversation {
  id: string;
  contactName: string;
  contactType: 'support' | 'guest' | 'partner' | 'system';
  subject: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'active' | 'closed' | 'pending' | 'escalated';
  contactAvatar: string;
  contactInitial: string;
  isSelected: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'property' | 'general' | 'emergency';
}

interface ContactDetails {
  id: string;
  name: string;
  avatar: string;
  initial: string;
  role: string;
  department: string;
  isVerified: boolean;
  joinedDate: string;
  phoneNumber: string;
  email: string;
  responseTime: string;
  satisfaction: number;
  ticketDetails: {
    ticketId: string;
    category: string;
    priority: string;
    status: string;
    createdDate: string;
    lastUpdated: string;
    assignedTo: string;
  };
  propertyInfo?: {
    propertyName: string;
    propertyId: string;
    address: string;
    propertyType: string;
  };
}

// Mock data for partner communications
const mockConversations: Conversation[] = [
  {
    id: '1',
    contactName: 'Sarah Chen, Serai Support Team',
    contactType: 'support',
    subject: 'Property Performance Optimization',
    lastMessage: 'I\'ve analyzed your property\'s performance data and have some recommendations to increase your revenue by 15-20%. Would you like to schedule a call to discuss?',
    lastMessageTime: '15-12-24',
    unreadCount: 0,
    status: 'active',
    contactAvatar: '',
    contactInitial: 'S',
    isSelected: true,
    priority: 'high',
    category: 'property'
  },
  {
    id: '2',
    contactName: 'Michael Rodriguez, Guest',
    contactType: 'guest',
    subject: 'Check-in Issue - Penthouse Suite',
    lastMessage: 'I\'m having trouble with the smart lock system. The code you provided isn\'t working and I\'ve been waiting outside for 20 minutes.',
    lastMessageTime: '14-12-24',
    unreadCount: 3,
    status: 'urgent',
    contactAvatar: '',
    contactInitial: 'M',
    isSelected: false,
    priority: 'urgent',
    category: 'technical'
  },
  {
    id: '3',
    contactName: 'Jennifer Kim, Billing Department',
    contactType: 'support',
    subject: 'Revenue Share Payment Query',
    lastMessage: 'Your Q4 revenue share payment of $12,450 has been processed and will appear in your account within 2-3 business days.',
    lastMessageTime: '13-12-24',
    unreadCount: 0,
    status: 'closed',
    contactAvatar: '',
    contactInitial: 'J',
    isSelected: false,
    priority: 'medium',
    category: 'billing'
  },
  {
    id: '4',
    contactName: 'David Park, Property Manager',
    contactType: 'partner',
    subject: 'Maintenance Schedule Update',
    lastMessage: 'The quarterly maintenance for your downtown property is scheduled for next Tuesday. I\'ll send you the detailed checklist.',
    lastMessageTime: '12-12-24',
    unreadCount: 1,
    status: 'active',
    contactAvatar: '',
    contactInitial: 'D',
    isSelected: false,
    priority: 'medium',
    category: 'property'
  },
  {
    id: '5',
    contactName: 'Lisa Thompson, Guest',
    contactType: 'guest',
    subject: 'Amazing Stay Experience',
    lastMessage: 'Thank you so much for the incredible hospitality! The suite was perfect and the city views were breathtaking. I\'ll definitely be back!',
    lastMessageTime: '11-12-24',
    unreadCount: 0,
    status: 'closed',
    contactAvatar: '',
    contactInitial: 'L',
    isSelected: false,
    priority: 'low',
    category: 'general'
  },
  {
    id: '6',
    contactName: 'Robert Wilson, Technical Support',
    contactType: 'support',
    subject: 'Smart Home System Upgrade',
    lastMessage: 'The new smart home features are now available for your properties. This includes advanced energy monitoring and automated guest check-in.',
    lastMessageTime: '10-12-24',
    unreadCount: 2,
    status: 'active',
    contactAvatar: '',
    contactInitial: 'R',
    isSelected: false,
    priority: 'high',
    category: 'technical'
  },
  {
    id: '7',
    contactName: 'Amanda Foster, Guest',
    contactType: 'guest',
    subject: 'WiFi Connectivity Issues',
    lastMessage: 'The WiFi keeps dropping in the executive suite. I have an important video conference tomorrow morning. Can someone please help?',
    lastMessageTime: '09-12-24',
    unreadCount: 1,
    status: 'pending',
    contactAvatar: '',
    contactInitial: 'A',
    isSelected: false,
    priority: 'high',
    category: 'technical'
  },
  {
    id: '8',
    contactName: 'James Liu, Partnership Manager',
    contactType: 'partner',
    subject: 'Q1 2025 Growth Strategy',
    lastMessage: 'I\'d like to discuss expanding your portfolio with two additional properties in the financial district. The market analysis looks very promising.',
    lastMessageTime: '08-12-24',
    unreadCount: 0,
    status: 'active',
    contactAvatar: '',
    contactInitial: 'J',
    isSelected: false,
    priority: 'high',
    category: 'property'
  },
  {
    id: '9',
    contactName: 'Maria Garcia, Guest',
    contactType: 'guest',
    subject: 'Late Check-out Request',
    lastMessage: 'Could I please extend my check-out time to 2 PM? I have a late flight and would really appreciate the extra time.',
    lastMessageTime: '07-12-24',
    unreadCount: 0,
    status: 'closed',
    contactAvatar: '',
    contactInitial: 'M',
    isSelected: false,
    priority: 'low',
    category: 'general'
  },
  {
    id: '10',
    contactName: 'System Notification',
    contactType: 'system',
    subject: 'Monthly Performance Report Available',
    lastMessage: 'Your December performance report is now available in the analytics dashboard. Revenue increased by 12% compared to last month.',
    lastMessageTime: '06-12-24',
    unreadCount: 0,
    status: 'closed',
    contactAvatar: '',
    contactInitial: 'S',
    isSelected: false,
    priority: 'low',
    category: 'general'
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hi Sarah! I\'m excited to hear about the performance optimization recommendations. I\'ve been looking at ways to improve our revenue.',
    sender: 'partner',
    timestamp: 'December 14, 2024 2:30 PM',
    isRead: true,
    priority: 'high'
  },
  {
    id: '2',
    content: 'Great! I\'ve analyzed your property\'s performance data and identified several key opportunities. Your downtown penthouse suite is performing well, but there\'s room for improvement in your weekend pricing strategy.',
    sender: 'support',
    timestamp: 'December 14, 2024 2:45 PM',
    isRead: true,
    priority: 'high'
  },
  {
    id: '3',
    content: 'That sounds very promising! What specific changes are you recommending? I\'m particularly interested in the weekend pricing optimization.',
    sender: 'partner',
    timestamp: 'December 14, 2024 3:15 PM',
    isRead: true,
    priority: 'high'
  },
  {
    id: '4',
    content: 'Based on market data, I recommend increasing your weekend rates by 25-30% for Friday and Saturday nights. The demand is consistently high, and you\'re currently underpricing by about $150-200 per night. I also suggest implementing dynamic pricing for special events and holidays.',
    sender: 'support',
    timestamp: 'December 14, 2024 3:32 PM',
    isRead: true,
    priority: 'high'
  },
  {
    id: '5',
    content: 'That makes a lot of sense. I\'ve noticed we do get a lot of weekend bookings. What about the weekday pricing? Should we adjust that as well?',
    sender: 'partner',
    timestamp: 'December 14, 2024 4:10 PM',
    isRead: true,
    priority: 'high'
  },
  {
    id: '6',
    content: 'For weekdays, I suggest a slight decrease of 10-15% to attract more business travelers. The data shows that corporate bookings are price-sensitive, and this adjustment could increase your occupancy rate by 20-25%.',
    sender: 'support',
    timestamp: 'December 14, 2024 4:25 PM',
    isRead: true,
    priority: 'high'
  },
  {
    id: '7',
    content: 'Excellent analysis! I also wanted to ask about the smart home features you mentioned in your last message. Are there any new features that could enhance the guest experience?',
    sender: 'partner',
    timestamp: 'December 14, 2024 4:45 PM',
    isRead: true,
    priority: 'high'
  },
  {
    id: '8',
    content: 'Yes! We\'ve just launched several new smart home features including voice-controlled lighting, automated temperature adjustment based on occupancy, and a mobile app that allows guests to control everything from their phone. These features typically increase guest satisfaction scores by 15-20%.',
    sender: 'support',
    timestamp: 'December 14, 2024 5:15 PM',
    isRead: true,
    priority: 'high'
  },
  {
    id: '9',
    content: 'That sounds amazing! How quickly can we implement these changes? I\'d like to get started with the pricing optimization and smart home features as soon as possible.',
    sender: 'partner',
    timestamp: 'December 14, 2024 5:30 PM',
    isRead: true,
    priority: 'high'
  },
  {
    id: '10',
    content: 'Perfect! I can have the pricing changes implemented within 24 hours, and the smart home features can be installed next week. I\'ll send you a detailed implementation plan and schedule a follow-up call to ensure everything goes smoothly.',
    sender: 'support',
    timestamp: 'December 14, 2024 6:00 PM',
    isRead: true,
    priority: 'high'
  }
];

const mockContactDetails: ContactDetails = {
  id: '1',
  name: 'Sarah Chen',
  avatar: '',
  initial: 'S',
  role: 'Senior Property Performance Specialist',
  department: 'Partner Success Team',
  isVerified: true,
  joinedDate: '2021',
  phoneNumber: '+1-555-0123',
  email: 'sarah.chen@serai.com',
  responseTime: '2 hours',
  satisfaction: 4.8,
  ticketDetails: {
    ticketId: 'SUP-2024-1247',
    category: 'Property Optimization',
    priority: 'High',
    status: 'In Progress',
    createdDate: 'Dec 14, 2024',
    lastUpdated: 'Dec 14, 2024 6:00 PM',
    assignedTo: 'Sarah Chen'
  },
  propertyInfo: {
    propertyName: 'Downtown Penthouse Suite',
    propertyId: 'PROP-2024-089',
    address: '123 Financial District, Toronto, ON',
    propertyType: 'Luxury Apartment'
  }
};

export default function PartnerMessages() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'technical' | 'billing' | 'property' | 'general' | 'emergency'>('all');
  const [translationEnabled, setTranslationEnabled] = useState(false);
  const [contactDetails, setContactDetails] = useState<ContactDetails>(mockContactDetails);

  // Load initial contact details for the first conversation
  useEffect(() => {
    if (selectedConversation) {
      const conversationContactDetails = generateContactDetailsForConversation(selectedConversation.id);
      setContactDetails(conversationContactDetails);
    }
  }, [selectedConversation]);

  // Generate different contact details for each conversation
  const generateContactDetailsForConversation = (conversationId: string): ContactDetails => {
    const contactDetailsSets: { [key: string]: ContactDetails } = {
      '1': { // Sarah Chen, Serai Support Team
        id: '1',
        name: 'Sarah Chen',
        avatar: '',
        initial: 'S',
        role: 'Senior Property Performance Specialist',
        department: 'Partner Success Team',
        isVerified: true,
        joinedDate: '2021',
        phoneNumber: '+1-555-0123',
        email: 'sarah.chen@serai.com',
        responseTime: '2 hours',
        satisfaction: 4.8,
        ticketDetails: {
          ticketId: 'SUP-2024-1247',
          category: 'Property Optimization',
          priority: 'High',
          status: 'In Progress',
          createdDate: 'Dec 14, 2024',
          lastUpdated: 'Dec 14, 2024 6:00 PM',
          assignedTo: 'Sarah Chen'
        },
        propertyInfo: {
          propertyName: 'Downtown Penthouse Suite',
          propertyId: 'PROP-2024-089',
          address: '123 Financial District, Toronto, ON',
          propertyType: 'Luxury Apartment'
        }
      },
      '2': { // Michael Rodriguez, Guest
        id: '2',
        name: 'Michael Rodriguez',
        avatar: '',
        initial: 'M',
        role: 'Guest',
        department: 'Guest Services',
        isVerified: true,
        joinedDate: '2023',
        phoneNumber: '+1-555-0234',
        email: 'michael.rodriguez@email.com',
        responseTime: '15 minutes',
        satisfaction: 4.2,
        ticketDetails: {
          ticketId: 'GUEST-2024-0891',
          category: 'Technical Support',
          priority: 'Urgent',
          status: 'Escalated',
          createdDate: 'Dec 14, 2024',
          lastUpdated: 'Dec 14, 2024 3:45 PM',
          assignedTo: 'Technical Team'
        },
        propertyInfo: {
          propertyName: 'Penthouse Suite with City Views',
          propertyId: 'PROP-2024-089',
          address: '123 Financial District, Toronto, ON',
          propertyType: 'Luxury Apartment'
        }
      },
      '3': { // Jennifer Kim, Billing Department
        id: '3',
        name: 'Jennifer Kim',
        avatar: '',
        initial: 'J',
        role: 'Billing Specialist',
        department: 'Finance Department',
        isVerified: true,
        joinedDate: '2020',
        phoneNumber: '+1-555-0345',
        email: 'jennifer.kim@serai.com',
        responseTime: '4 hours',
        satisfaction: 4.6,
        ticketDetails: {
          ticketId: 'BILL-2024-0456',
          category: 'Payment Processing',
          priority: 'Medium',
          status: 'Closed',
          createdDate: 'Dec 13, 2024',
          lastUpdated: 'Dec 13, 2024 5:30 PM',
          assignedTo: 'Jennifer Kim'
        }
      },
      '4': { // David Park, Property Manager
        id: '4',
        name: 'David Park',
        avatar: '',
        initial: 'D',
        role: 'Property Manager',
        department: 'Property Operations',
        isVerified: true,
        joinedDate: '2019',
        phoneNumber: '+1-555-0456',
        email: 'david.park@serai.com',
        responseTime: '1 hour',
        satisfaction: 4.7,
        ticketDetails: {
          ticketId: 'PROP-2024-0789',
          category: 'Maintenance',
          priority: 'Medium',
          status: 'Active',
          createdDate: 'Dec 12, 2024',
          lastUpdated: 'Dec 12, 2024 4:20 PM',
          assignedTo: 'David Park'
        },
        propertyInfo: {
          propertyName: 'Historic Downtown Loft',
          propertyId: 'PROP-2024-090',
          address: '456 Heritage Street, Toronto, ON',
          propertyType: 'Historic Apartment'
        }
      },
      '5': { // Lisa Thompson, Guest
        id: '5',
        name: 'Lisa Thompson',
        avatar: '',
        initial: 'L',
        role: 'Guest',
        department: 'Guest Services',
        isVerified: true,
        joinedDate: '2024',
        phoneNumber: '+1-555-0567',
        email: 'lisa.thompson@email.com',
        responseTime: '30 minutes',
        satisfaction: 5.0,
        ticketDetails: {
          ticketId: 'GUEST-2024-1234',
          category: 'General Feedback',
          priority: 'Low',
          status: 'Closed',
          createdDate: 'Dec 11, 2024',
          lastUpdated: 'Dec 11, 2024 2:15 PM',
          assignedTo: 'Guest Services'
        },
        propertyInfo: {
          propertyName: 'Garden Villa with Private Pool',
          propertyId: 'PROP-2024-091',
          address: '789 Garden Lane, Toronto, ON',
          propertyType: 'Luxury Villa'
        }
      },
      '6': { // Robert Wilson, Technical Support
        id: '6',
        name: 'Robert Wilson',
        avatar: '',
        initial: 'R',
        role: 'Technical Support Engineer',
        department: 'Technology Team',
        isVerified: true,
        joinedDate: '2021',
        phoneNumber: '+1-555-0678',
        email: 'robert.wilson@serai.com',
        responseTime: '1 hour',
        satisfaction: 4.9,
        ticketDetails: {
          ticketId: 'TECH-2024-2345',
          category: 'System Upgrade',
          priority: 'High',
          status: 'Active',
          createdDate: 'Dec 10, 2024',
          lastUpdated: 'Dec 10, 2024 3:30 PM',
          assignedTo: 'Robert Wilson'
        },
        propertyInfo: {
          propertyName: 'Smart Home Technology Suite',
          propertyId: 'PROP-2024-092',
          address: '321 Tech Avenue, Toronto, ON',
          propertyType: 'Smart Apartment'
        }
      },
      '7': { // Amanda Foster, Guest
        id: '7',
        name: 'Amanda Foster',
        avatar: '',
        initial: 'A',
        role: 'Guest',
        department: 'Guest Services',
        isVerified: true,
        joinedDate: '2023',
        phoneNumber: '+1-555-0789',
        email: 'amanda.foster@email.com',
        responseTime: '20 minutes',
        satisfaction: 4.1,
        ticketDetails: {
          ticketId: 'GUEST-2024-3456',
          category: 'Technical Support',
          priority: 'High',
          status: 'Pending',
          createdDate: 'Dec 9, 2024',
          lastUpdated: 'Dec 9, 2024 11:45 AM',
          assignedTo: 'Technical Team'
        },
        propertyInfo: {
          propertyName: 'Executive Business Suite',
          propertyId: 'PROP-2024-093',
          address: '654 Business Plaza, Toronto, ON',
          propertyType: 'Business Suite'
        }
      },
      '8': { // James Liu, Partnership Manager
        id: '8',
        name: 'James Liu',
        avatar: '',
        initial: 'J',
        role: 'Partnership Manager',
        department: 'Business Development',
        isVerified: true,
        joinedDate: '2018',
        phoneNumber: '+1-555-0890',
        email: 'james.liu@serai.com',
        responseTime: '3 hours',
        satisfaction: 4.8,
        ticketDetails: {
          ticketId: 'PART-2024-4567',
          category: 'Partnership Growth',
          priority: 'High',
          status: 'Active',
          createdDate: 'Dec 8, 2024',
          lastUpdated: 'Dec 8, 2024 2:00 PM',
          assignedTo: 'James Liu'
        },
        propertyInfo: {
          propertyName: 'Financial District Portfolio',
          propertyId: 'PROP-2024-094',
          address: '987 Finance Street, Toronto, ON',
          propertyType: 'Commercial Complex'
        }
      },
      '9': { // Maria Garcia, Guest
        id: '9',
        name: 'Maria Garcia',
        avatar: '',
        initial: 'M',
        role: 'Guest',
        department: 'Guest Services',
        isVerified: true,
        joinedDate: '2024',
        phoneNumber: '+1-555-0901',
        email: 'maria.garcia@email.com',
        responseTime: '45 minutes',
        satisfaction: 4.5,
        ticketDetails: {
          ticketId: 'GUEST-2024-5678',
          category: 'General Request',
          priority: 'Low',
          status: 'Closed',
          createdDate: 'Dec 7, 2024',
          lastUpdated: 'Dec 7, 2024 1:30 PM',
          assignedTo: 'Guest Services'
        },
        propertyInfo: {
          propertyName: 'Art Deco Suite with Balcony',
          propertyId: 'PROP-2024-095',
          address: '147 Art District, Toronto, ON',
          propertyType: 'Historic Apartment'
        }
      },
      '10': { // System Notification
        id: '10',
        name: 'System Notification',
        avatar: '',
        initial: 'S',
        role: 'Automated System',
        department: 'System Operations',
        isVerified: true,
        joinedDate: '2020',
        phoneNumber: 'N/A',
        email: 'system@serai.com',
        responseTime: 'Instant',
        satisfaction: 4.0,
        ticketDetails: {
          ticketId: 'SYS-2024-6789',
          category: 'Performance Report',
          priority: 'Low',
          status: 'Closed',
          createdDate: 'Dec 6, 2024',
          lastUpdated: 'Dec 6, 2024 9:00 AM',
          assignedTo: 'System'
        },
        propertyInfo: {
          propertyName: 'All Properties',
          propertyId: 'PROP-ALL',
          address: 'Multiple Locations',
          propertyType: 'Portfolio'
        }
      }
    };
    
    return contactDetailsSets[conversationId] || contactDetailsSets['1'];
  };

  const handleConversationSelect = (conversation: Conversation) => {
    setConversations(prev => 
      prev.map(conv => ({
        ...conv,
        isSelected: conv.id === conversation.id
      }))
    );
    setSelectedConversation(conversation);
    
    // Generate different contact details based on conversation
    const conversationContactDetails = generateContactDetailsForConversation(conversation.id);
    setContactDetails(conversationContactDetails);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender: 'partner',
        timestamp: new Date().toLocaleString(),
        isRead: true,
        priority: 'medium'
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && conv.unreadCount > 0) ||
      (filter === 'urgent' && conv.priority === 'urgent');
    
    const matchesCategory = categoryFilter === 'all' || conv.category === categoryFilter;
    
    return matchesFilter && matchesCategory;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-serai-red-100 text-serai-red-800';
      case 'high': return 'bg-serai-gold-100 text-serai-gold-800';
      case 'medium': return 'bg-serai-forest-100 text-serai-forest-800';
      case 'low': return 'bg-serai-navy-100 text-serai-navy-800';
      default: return 'bg-serai-neutral-100 text-serai-neutral-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-serai-forest-100 text-serai-forest-800';
      case 'pending': return 'bg-serai-gold-100 text-serai-gold-800';
      case 'escalated': return 'bg-serai-red-100 text-serai-red-800';
      case 'closed': return 'bg-serai-neutral-100 text-serai-neutral-800';
      default: return 'bg-serai-neutral-100 text-serai-neutral-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <Zap className="h-4 w-4" />;
      case 'billing': return <CreditCard className="h-4 w-4" />;
      case 'property': return <Building2 className="h-4 w-4" />;
      case 'emergency': return <AlertTriangle className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="h-screen bg-white flex overflow-hidden">
      {/* Left Panel - Conversations List */}
      <div className="w-80 border-r border-gray-200 flex flex-col sticky top-0 h-screen">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Communication & Support</h2>
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <Search className="h-4 w-4 text-gray-500" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Settings className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="space-y-2">
            <div className="flex space-x-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-sm font-medium rounded ${
                  filter === 'all' 
                    ? 'bg-serai-red-500 text-white' 
                    : 'text-serai-neutral-500 hover:text-serai-neutral-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 py-1 text-sm font-medium rounded ${
                  filter === 'unread' 
                    ? 'bg-serai-red-500 text-white' 
                    : 'text-serai-neutral-500 hover:text-serai-neutral-700'
                }`}
              >
                Unread
              </button>
              <button
                onClick={() => setFilter('urgent')}
                className={`px-3 py-1 text-sm font-medium rounded ${
                  filter === 'urgent' 
                    ? 'bg-serai-red-500 text-white' 
                    : 'text-serai-neutral-500 hover:text-serai-neutral-700'
                }`}
              >
                Urgent
              </button>
            </div>
            
            <div className="flex space-x-1">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-2 py-1 text-xs font-medium rounded ${
                  categoryFilter === 'all' 
                    ? 'bg-serai-navy-100 text-serai-navy-700' 
                    : 'text-serai-neutral-500 hover:text-serai-neutral-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setCategoryFilter('technical')}
                className={`px-2 py-1 text-xs font-medium rounded ${
                  categoryFilter === 'technical' 
                    ? 'bg-serai-navy-100 text-serai-navy-700' 
                    : 'text-serai-neutral-500 hover:text-serai-neutral-700'
                }`}
              >
                Tech
              </button>
              <button
                onClick={() => setCategoryFilter('billing')}
                className={`px-2 py-1 text-xs font-medium rounded ${
                  categoryFilter === 'billing' 
                    ? 'bg-serai-navy-100 text-serai-navy-700' 
                    : 'text-serai-neutral-500 hover:text-serai-neutral-700'
                }`}
              >
                Billing
              </button>
              <button
                onClick={() => setCategoryFilter('property')}
                className={`px-2 py-1 text-xs font-medium rounded ${
                  categoryFilter === 'property' 
                    ? 'bg-serai-navy-100 text-serai-navy-700' 
                    : 'text-serai-neutral-500 hover:text-serai-neutral-700'
                }`}
              >
                Property
              </button>
            </div>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => handleConversationSelect(conversation)}
              className={`p-4 border-b border-serai-neutral-200 cursor-pointer hover:bg-serai-cream-50 ${
                conversation.isSelected ? 'bg-serai-cream-100' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-serai-navy-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-serai-navy-700">
                    {conversation.contactInitial}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-serai-charcoal-900 truncate">
                      {conversation.contactName}
                    </h3>
                    <span className="text-xs text-serai-neutral-500">
                      {conversation.lastMessageTime}
                    </span>
                  </div>
                  <p className="text-xs text-serai-neutral-500 truncate mt-1">
                    {conversation.subject}
                  </p>
                  <p className="text-sm text-serai-neutral-600 truncate mt-1">
                    {conversation.lastMessage}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(conversation.priority)}`}>
                        {conversation.priority}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(conversation.status)}`}>
                        {conversation.status}
                      </span>
                      <div className="flex items-center text-serai-neutral-400">
                        {getCategoryIcon(conversation.category)}
                      </div>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <span className="bg-serai-red-500 text-white text-xs rounded-full px-2 py-1">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Panel - Active Conversation */}
      <div className="flex-1 flex flex-col sticky top-0 h-screen">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-serai-neutral-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-serai-navy-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-serai-navy-700">
                      {selectedConversation.contactInitial}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-serai-charcoal-900">
                      {selectedConversation.contactName}
                    </h3>
                    <p className="text-sm text-serai-neutral-500">
                      {selectedConversation.subject}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setTranslationEnabled(!translationEnabled)}
                    className={`px-3 py-1 text-sm rounded ${
                      translationEnabled 
                        ? 'bg-serai-navy-100 text-serai-navy-700' 
                        : 'bg-serai-neutral-100 text-serai-neutral-700'
                    }`}
                  >
                    <Globe className="h-4 w-4 inline mr-1" />
                    Translation {translationEnabled ? 'on' : 'off'}
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'partner' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'partner'
                        ? 'bg-serai-red-500 text-white'
                        : message.sender === 'support'
                        ? 'bg-gray-100 text-serai-charcoal-900'
                        : message.sender === 'system'
                        ? 'bg-serai-navy-500 text-white'
                        : 'bg-serai-cream-100 text-serai-charcoal-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'partner' ? 'text-serai-red-100' : 
                      message.sender === 'support' ? 'text-serai-neutral-500' :
                      message.sender === 'system' ? 'text-serai-navy-100' : 'text-serai-neutral-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-serai-neutral-200">
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-serai-cream-100 rounded">
                  <Paperclip className="h-5 w-5 text-serai-neutral-500" />
                </button>
                <div className="flex-1">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full px-3 py-2 bg-white border border-serai-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serai-red-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                </div>
                <button className="p-2 hover:bg-serai-cream-100 rounded">
                  <Smile className="h-5 w-5 text-serai-neutral-500" />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-serai-red-500 text-white rounded-lg hover:bg-serai-red-600"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-serai-neutral-500 mt-2">
                This conversation is active. Response time: {contactDetails.responseTime}
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-serai-neutral-400 mx-auto mb-4" />
              <p className="text-serai-neutral-500">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Contact Details */}
      <div className="w-80 border-l border-serai-neutral-200 flex flex-col sticky top-0 h-screen overflow-y-auto">
        {selectedConversation ? (
          <>
            {/* Contact Header */}
            <div className="p-4 border-b border-serai-neutral-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-serai-charcoal-900">Contact Details</h3>
                <button className="p-1 hover:bg-serai-cream-100 rounded">
                  <X className="h-4 w-4 text-serai-neutral-500" />
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="p-4 border-b border-serai-neutral-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-serai-navy-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium text-serai-navy-700">
                    {contactDetails.initial}
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-serai-charcoal-900">
                    {contactDetails.name}
                  </h4>
                  <p className="text-sm text-serai-neutral-500">
                    {contactDetails.role}
                  </p>
                  <p className="text-sm text-serai-neutral-500">
                    {contactDetails.department}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-serai-gold-500" />
                  <span className="text-serai-neutral-600">{contactDetails.satisfaction}/5.0 satisfaction</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-serai-forest-500" />
                  <span className="text-serai-forest-600">Verified support agent</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-serai-neutral-400" />
                  <span className="text-serai-neutral-600">Avg response: {contactDetails.responseTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-serai-neutral-400" />
                  <span className="text-serai-neutral-600">Joined Serai in {contactDetails.joinedDate}</span>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-serai-cream-100 text-serai-charcoal-700 rounded-lg hover:bg-serai-cream-200">
                View full profile
              </button>
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-b border-serai-neutral-200 space-y-2">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-serai-cream-100 text-serai-charcoal-700 rounded-lg hover:bg-serai-cream-200">
                <Phone className="h-4 w-4" />
                <span>Call {contactDetails.phoneNumber}</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-serai-cream-100 text-serai-charcoal-700 rounded-lg hover:bg-serai-cream-200">
                <Mail className="h-4 w-4" />
                <span>Email {contactDetails.email}</span>
              </button>
            </div>

            {/* Ticket Details */}
            <div className="p-4 border-b border-serai-neutral-200">
              <h4 className="text-sm font-semibold text-serai-charcoal-900 mb-3">Ticket Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-serai-neutral-600">Ticket ID:</span>
                  <span className="font-mono text-serai-charcoal-700">{contactDetails.ticketDetails.ticketId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-serai-neutral-600">Category:</span>
                  <span className="text-serai-charcoal-700">{contactDetails.ticketDetails.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-serai-neutral-600">Priority:</span>
                  <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(contactDetails.ticketDetails.priority.toLowerCase())}`}>
                    {contactDetails.ticketDetails.priority}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-serai-neutral-600">Status:</span>
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(contactDetails.ticketDetails.status.toLowerCase())}`}>
                    {contactDetails.ticketDetails.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-serai-neutral-600">Created:</span>
                  <span className="text-serai-charcoal-700">{contactDetails.ticketDetails.createdDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-serai-neutral-600">Last Updated:</span>
                  <span className="text-serai-charcoal-700">{contactDetails.ticketDetails.lastUpdated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-serai-neutral-600">Assigned To:</span>
                  <span className="text-serai-charcoal-700">{contactDetails.ticketDetails.assignedTo}</span>
                </div>
              </div>
            </div>

            {/* Property Information */}
            {contactDetails.propertyInfo && (
              <div className="p-4 border-b border-serai-neutral-200">
                <h4 className="text-sm font-semibold text-serai-charcoal-900 mb-3">Property Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-serai-neutral-600">Property:</span>
                    <span className="text-serai-charcoal-700">{contactDetails.propertyInfo.propertyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-serai-neutral-600">Property ID:</span>
                    <span className="font-mono text-serai-charcoal-700">{contactDetails.propertyInfo.propertyId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-serai-neutral-600">Address:</span>
                    <span className="text-right text-serai-charcoal-700">{contactDetails.propertyInfo.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-serai-neutral-600">Type:</span>
                    <span className="text-serai-charcoal-700">{contactDetails.propertyInfo.propertyType}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Support Options */}
            <div className="p-4 space-y-3">
              <div className="bg-serai-navy-50 p-3 rounded">
                <h4 className="text-sm font-semibold text-serai-navy-900 mb-2">Partner Support</h4>
                <p className="text-xs text-serai-navy-700 mb-2">
                  Get help with your partnership, properties, and revenue optimization
                </p>
                <button className="text-serai-navy-600 hover:text-serai-navy-800 text-sm">
                  Start a support request
                </button>
              </div>

              <div className="space-y-2">
                <button className="w-full text-left text-sm text-serai-neutral-600 hover:text-serai-charcoal-800">
                  Escalate this conversation
                </button>
                <button className="w-full text-left text-sm text-serai-neutral-600 hover:text-serai-charcoal-800">
                  Visit the Partner Help Centre
                </button>
                <button className="w-full text-left text-sm text-serai-neutral-600 hover:text-serai-charcoal-800">
                  Schedule a call
                </button>
              </div>

              <div className="text-xs text-serai-neutral-500 space-y-1">
                <p>Quick Actions</p>
                <p>View property performance</p>
                <button className="text-serai-red-600 hover:text-serai-red-800">
                  Open analytics
                </button>
              </div>

              <button className="w-full text-left text-sm text-serai-neutral-600 hover:text-serai-charcoal-800">
                Rate this conversation
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <User className="h-12 w-12 text-serai-neutral-400 mx-auto mb-4" />
              <p className="text-serai-neutral-500">Select a conversation to view contact details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
