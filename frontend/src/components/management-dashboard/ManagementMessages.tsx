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

  const filteredConversations = mockConversations.filter(conv => {
    const matchesStatus = filterStatus === 'all' || conv.status === filterStatus;
    const matchesSearch = conv.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const activeMessages = mockMessages[activeConversation] || [];
  const activeContact = mockContactDetails[activeConversation];

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
    <div className="h-screen bg-white flex overflow-hidden">
      {/* Left Panel - Conversations List */}
      <div className="w-80 border-r border-serai-neutral-200 flex flex-col sticky top-0 h-screen">
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
        <div className="flex-1 overflow-y-auto min-h-0">
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
      <div className="flex-1 flex flex-col sticky top-0 h-screen">
        {/* Chat Header */}
        <div className="p-4 border-b border-serai-neutral-200 bg-white">
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

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
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

        {/* Message Input */}
        <div className="p-4 border-t border-serai-neutral-200 bg-white">
          <div className="flex items-center space-x-2">
            <button className="p-2 text-serai-neutral-400 hover:text-serai-neutral-600">
              <Paperclip className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 bg-white border border-serai-neutral-300 rounded-lg focus:ring-2 focus:ring-serai-red-500 focus:border-transparent"
            />
            <button className="p-2 text-serai-neutral-400 hover:text-serai-neutral-600">
              <Smile className="h-5 w-5" />
            </button>
            <button className="px-4 py-2 bg-serai-red-500 text-white rounded-lg hover:bg-serai-red-600">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Contact Details */}
      <div className="w-80 border-l border-serai-neutral-200 flex flex-col sticky top-0 h-screen overflow-y-auto">
        {activeContact ? (
          <>
            {/* Contact Header */}
            <div className="p-4 border-b border-serai-neutral-200">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-serai-navy-100 flex items-center justify-center">
                  {getContactTypeIcon(activeContact.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-serai-charcoal-900">{activeContact.name}</h3>
                  <p className="text-sm text-serai-neutral-500">{activeContact.role}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(activeContact.status)}`}>
                      {activeContact.status}
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

            {/* Contact Info */}
            <div className="p-4 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-serai-charcoal-900 mb-2">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-serai-neutral-400" />
                    <span className="text-sm text-serai-neutral-600">{activeContact.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-serai-neutral-400" />
                    <span className="text-sm text-serai-neutral-600">{activeContact.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-serai-neutral-400" />
                    <span className="text-sm text-serai-neutral-600">{activeContact.property}</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              {activeContact.type === 'partner' && (
                <div>
                  <h4 className="text-sm font-semibold text-serai-charcoal-900 mb-2">Performance Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-serai-neutral-600">Total Revenue:</span>
                      <span className="text-sm font-semibold text-serai-charcoal-900">
                        ${activeContact.totalRevenue?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-serai-neutral-600">Properties:</span>
                      <span className="text-sm font-semibold text-serai-charcoal-900">
                        {activeContact.propertiesCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-serai-neutral-600">Satisfaction:</span>
                      <span className="text-sm font-semibold text-serai-charcoal-900">
                        {activeContact.satisfactionScore}/5
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-serai-neutral-600">Response Time:</span>
                      <span className="text-sm font-semibold text-serai-charcoal-900">
                        {activeContact.responseTime}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div>
                <h4 className="text-sm font-semibold text-serai-charcoal-900 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-1">
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
                <h4 className="text-sm font-semibold text-serai-charcoal-900 mb-2">Notes</h4>
                <p className="text-sm text-serai-neutral-600">{activeContact.notes}</p>
              </div>

              {/* Quick Actions */}
              <div>
                <h4 className="text-sm font-semibold text-serai-charcoal-900 mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-serai-red-500 text-white rounded-lg hover:bg-serai-red-600">
                    <Phone className="h-4 w-4" />
                    <span>Call</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-serai-forest-500 text-white rounded-lg hover:bg-serai-forest-600">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-serai-gold-500 text-white rounded-lg hover:bg-serai-gold-600">
                    <Flag className="h-4 w-4" />
                    <span>Escalate</span>
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
