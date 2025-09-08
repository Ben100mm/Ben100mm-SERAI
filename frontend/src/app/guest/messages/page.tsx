'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import TopAppBar from '@/components/TopAppBar';
import { MessageSquare, Search, Settings, Phone, Mail, Star, Calendar, DollarSign, Clock, CheckCircle, XCircle, MoreVertical, Send, Paperclip, Smile, ChevronDown, User, Building2, Shield, HelpCircle, Flag, CreditCard, FileText, Download, AlertTriangle, Globe, X } from 'lucide-react';

// Types
interface Message {
  id: string;
  content: string;
  sender: 'host' | 'guest' | 'system';
  timestamp: string;
  isRead: boolean;
  attachments?: string[];
}

interface Conversation {
  id: string;
  guestName: string;
  propertyName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'active' | 'closed' | 'pending';
  guestAvatar: string;
  guestInitial: string;
  isSelected: boolean;
}

interface GuestDetails {
  id: string;
  name: string;
  avatar: string;
  initial: string;
  reviews: number;
  isVerified: boolean;
  joinedDate: string;
  phoneNumber: string;
  email: string;
  bookingDetails: {
    propertyName: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalAmount: number;
    confirmationCode: string;
    bookingDate: string;
    cancellationPolicy: string;
  };
  paymentSummary: {
    roomFee: number;
    serviceFee: number;
    taxes: number;
    total: number;
  };
  hostPayout: {
    roomFee: number;
    serviceFee: number;
    taxes: number;
    total: number;
  };
}

// Mock data
const mockConversations: Conversation[] = [
  {
    id: '1',
    guestName: 'Sarah Chen - Property Host',
    propertyName: 'Penthouse Suite with City Views',
    lastMessage: 'Hi! I\'m arriving tomorrow and was wondering about the check-in process. Also, is there parking available?',
    lastMessageTime: '15-12-24',
    unreadCount: 0,
    status: 'active',
    guestAvatar: '',
    guestInitial: 'S',
    isSelected: true
  },
  {
    id: '2',
    guestName: 'Michael Rodriguez - Support',
    propertyName: 'Historic Downtown Loft',
    lastMessage: 'Thank you so much for the amazing stay! The room was perfect and the location was exactly what we needed for our business trip.',
    lastMessageTime: '14-12-24',
    unreadCount: 3,
    status: 'active',
    guestAvatar: '',
    guestInitial: 'M',
    isSelected: false
  },
  {
    id: '3',
    guestName: 'Emma Thompson - Guest Services',
    propertyName: 'Modern Studio Apartment',
    lastMessage: 'I\'m having trouble with the WiFi password. Could you please send it again? Also, is there a coffee maker in the room?',
    lastMessageTime: '13-12-24',
    unreadCount: 1,
    status: 'pending',
    guestAvatar: '',
    guestInitial: 'E',
    isSelected: false
  },
  {
    id: '4',
    guestName: 'David Kim - Concierge',
    propertyName: 'Executive Business Suite',
    lastMessage: 'The conference room booking for tomorrow is confirmed. Looking forward to hosting our client meeting in such a professional space.',
    lastMessageTime: '12-12-24',
    unreadCount: 0,
    status: 'active',
    guestAvatar: '',
    guestInitial: 'D',
    isSelected: false
  },
  {
    id: '5',
    guestName: 'Isabella Martinez - Management',
    propertyName: 'Garden Villa with Private Pool',
    lastMessage: 'We\'re celebrating our anniversary and would love to arrange for some flowers and champagne to be in the room when we arrive.',
    lastMessageTime: '11-12-24',
    unreadCount: 2,
    status: 'pending',
    guestAvatar: '',
    guestInitial: 'I',
    isSelected: false
  },
  {
    id: '6',
    guestName: 'Alexander Petrov - Host',
    propertyName: 'Rooftop Penthouse with Terrace',
    lastMessage: 'The view from the terrace is absolutely breathtaking! Thank you for the upgrade. This has been the perfect end to our vacation.',
    lastMessageTime: '10-12-24',
    unreadCount: 0,
    status: 'closed',
    guestAvatar: '',
    guestInitial: 'A',
    isSelected: false
  },
  {
    id: '7',
    guestName: 'Olivia Williams - Support Team',
    propertyName: 'Art Deco Suite with Balcony',
    lastMessage: 'I\'m a bit concerned about the noise level. Are there any construction projects nearby that might affect our stay?',
    lastMessageTime: '09-12-24',
    unreadCount: 1,
    status: 'pending',
    guestAvatar: '',
    guestInitial: 'O',
    isSelected: false
  },
  {
    id: '8',
    guestName: 'Marcus Johnson - Property Manager',
    propertyName: 'Executive Corner Suite',
    lastMessage: 'The business center facilities are excellent. I was able to complete all my work presentations without any issues. Highly recommend!',
    lastMessageTime: '08-12-24',
    unreadCount: 0,
    status: 'closed',
    guestAvatar: '',
    guestInitial: 'M',
    isSelected: false
  },
  {
    id: '9',
    guestName: 'Charlotte Brown - Guest Relations',
    propertyName: 'Historic Mansion Suite',
    lastMessage: 'We\'re planning a small family gathering and wondering if we could use the common areas for a few hours in the evening.',
    lastMessageTime: '07-12-24',
    unreadCount: 4,
    status: 'active',
    guestAvatar: '',
    guestInitial: 'C',
    isSelected: false
  },
  {
    id: '10',
    guestName: 'Ryan O\'Connor - Support',
    propertyName: 'Modern Loft with Industrial Design',
    lastMessage: 'The smart home features are incredible! Being able to control everything from my phone made our stay so convenient.',
    lastMessageTime: '06-12-24',
    unreadCount: 0,
    status: 'closed',
    guestAvatar: '',
    guestInitial: 'R',
    isSelected: false
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hi! I\'m arriving tomorrow and was wondering about the check-in process. Also, is there parking available?',
    sender: 'guest',
    timestamp: 'December 14, 2024 2:30 PM',
    isRead: true
  },
  {
    id: '2',
    content: 'Hello! Thank you for reaching out. Check-in is from 3 PM onwards, so you\'ll be right on time. I\'ll have the keys ready for you at the front desk. The penthouse suite is on the 25th floor with panoramic views of the entire city skyline.',
    sender: 'host',
    timestamp: 'December 14, 2024 2:45 PM',
    isRead: true
  },
  {
    id: '3',
    content: 'That sounds amazing! I have a few questions - is there parking available at the property? I\'ll be driving in from the airport. Also, does the suite have a kitchenette? I might want to prepare some light meals during my stay.',
    sender: 'guest',
    timestamp: 'December 14, 2024 3:15 PM',
    isRead: true
  },
  {
    id: '4',
    content: 'Great questions! Yes, we have valet parking available for $35 per night, or there\'s a self-park garage next door for $25 per night. The penthouse suite has a fully equipped kitchenette with a mini-fridge, microwave, coffee maker, and basic cookware. There\'s also a grocery store just two blocks away if you need anything.',
    sender: 'host',
    timestamp: 'December 14, 2024 3:32 PM',
    isRead: true
  },
  {
    id: '5',
    content: 'Perfect! That\'s exactly what I was hoping for. One more thing - I\'m traveling for business and might need to work from the suite. Is the WiFi reliable? And are there any quiet areas in the building if I need to take calls?',
    sender: 'guest',
    timestamp: 'December 14, 2024 4:10 PM',
    isRead: true
  },
  {
    id: '6',
    content: 'Absolutely! We have high-speed fiber internet throughout the building with speeds up to 1GB. The penthouse suite has a dedicated workspace with a large desk and ergonomic chair. There\'s also a business center on the 10th floor that\'s available 24/7, and several quiet lounges throughout the building. The suite itself is very quiet and soundproofed.',
    sender: 'host',
    timestamp: 'December 14, 2024 4:25 PM',
    isRead: true
  },
  {
    id: '7',
    content: 'Excellent! This sounds like it will be perfect for my needs. I\'m really looking forward to my stay. Is there anything special I should know about the area? Any restaurant recommendations nearby?',
    sender: 'guest',
    timestamp: 'December 14, 2024 4:45 PM',
    isRead: true
  },
  {
    id: '8',
    content: 'The area is fantastic! You\'re in the heart of the financial district with amazing dining options. I\'d recommend "The Sky Lounge" on the 30th floor of our building for cocktails with incredible views, "Bistro Moderne" two blocks away for fine dining, and "Café Central" for casual breakfast and lunch. There\'s also a great coffee shop called "Bean & Brew" right across the street.',
    sender: 'host',
    timestamp: 'December 14, 2024 5:15 PM',
    isRead: true
  },
  {
    id: '9',
    content: 'Wonderful recommendations! I\'ll definitely check out The Sky Lounge - those views sound incredible. I think I have everything I need to know. Thank you so much for being so helpful and detailed in your responses. I\'m really excited about my stay!',
    sender: 'guest',
    timestamp: 'December 14, 2024 5:30 PM',
    isRead: true
  },
  {
    id: '10',
    content: 'You\'re very welcome! I\'m here to make sure your stay is absolutely perfect. If you need anything at all during your visit, just reach out. I\'ll be checking in with you tomorrow after you arrive to make sure everything is to your satisfaction. Have a safe trip!',
    sender: 'host',
    timestamp: 'December 14, 2024 6:00 PM',
    isRead: true
  },
  {
    id: '11',
    content: 'Thank you! I\'ll see you tomorrow at 3 PM. Looking forward to it!',
    sender: 'guest',
    timestamp: 'December 14, 2024 6:15 PM',
    isRead: true
  }
];

const mockGuestDetails: GuestDetails = {
  id: '1',
  name: 'Emma Thompson',
  avatar: '',
  initial: 'E',
  reviews: 1,
  isVerified: true,
  joinedDate: '2022',
  phoneNumber: '+1-555-0123',
  email: 'emma.thompson@example.com',
  bookingDetails: {
    propertyName: 'Penthouse Suite with City Views',
    checkIn: 'Mon, Dec 16, 2024',
    checkOut: 'Wed, Dec 18, 2024',
    guests: 1,
    totalAmount: 450.00,
    confirmationCode: 'SERAI2024',
    bookingDate: 'Sat, Dec 14, 2024',
    cancellationPolicy: 'Flexible'
  },
  paymentSummary: {
    roomFee: 300.00,
    serviceFee: 45.00,
    taxes: 105.00,
    total: 450.00
  },
  hostPayout: {
    roomFee: 300.00,
    serviceFee: -9.00,
    taxes: 105.00,
    total: 396.00
  }
};

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [translationEnabled, setTranslationEnabled] = useState(true);
  const [guestDetails, setGuestDetails] = useState<GuestDetails>(mockGuestDetails);

  // Generate different guest details for each conversation
  const generateGuestDetailsForConversation = (conversationId: string): GuestDetails => {
    const guestDetailsSets: { [key: string]: GuestDetails } = {
      '1': { // Sarah Chen - Property Host
        id: '1',
        name: 'Sarah Chen',
        avatar: 'SC',
        initial: 'SC',
        reviews: 12,
        isVerified: true,
        joinedDate: '2021',
        phoneNumber: '+1 (555) 123-4567',
        email: 'sarah.chen@email.com',
        bookingDetails: {
          propertyName: 'Luxury Downtown Suite',
          checkIn: 'Mon, Dec 16, 2024',
          checkOut: 'Wed, Dec 18, 2024',
          guests: 2,
          totalAmount: 450.00,
          confirmationCode: 'SERAI2024',
          bookingDate: 'Sat, Dec 14, 2024',
          cancellationPolicy: 'Flexible'
        },
        paymentSummary: {
          roomFee: 300.00,
          serviceFee: 45.00,
          taxes: 105.00,
          total: 450.00
        }
      },
      '2': { // Michael Rodriguez - Support
        id: '2',
        name: 'Michael Rodriguez',
        avatar: 'MR',
        initial: 'MR',
        reviews: 8,
        isVerified: true,
        joinedDate: '2022',
        phoneNumber: '+1 (555) 234-5678',
        email: 'michael.rodriguez@email.com',
        bookingDetails: {
          propertyName: 'Business Executive Suite',
          checkIn: 'Mon, Dec 9, 2024',
          checkOut: 'Wed, Dec 11, 2024',
          guests: 1,
          totalAmount: 320.00,
          confirmationCode: 'SERAI2023',
          bookingDate: 'Fri, Dec 6, 2024',
          cancellationPolicy: 'Moderate'
        },
        paymentSummary: {
          roomFee: 280.00,
          serviceFee: 40.00,
          taxes: 0.00,
          total: 320.00
        }
      },
      '3': { // Emma Thompson - Guest Services
        id: '3',
        name: 'Emma Thompson',
        avatar: 'ET',
        initial: 'ET',
        reviews: 15,
        isVerified: true,
        joinedDate: '2022',
        phoneNumber: '+1 (555) 345-6789',
        email: 'emma.thompson@email.com',
        bookingDetails: {
          propertyName: 'Penthouse Suite with City Views',
          checkIn: 'Mon, Dec 16, 2024',
          checkOut: 'Wed, Dec 18, 2024',
          guests: 1,
          totalAmount: 450.00,
          confirmationCode: 'SERAI2024',
          bookingDate: 'Sat, Dec 14, 2024',
          cancellationPolicy: 'Flexible'
        },
        paymentSummary: {
          roomFee: 300.00,
          serviceFee: 45.00,
          taxes: 105.00,
          total: 450.00
        }
      },
      '4': { // David Kim - Concierge
        id: '4',
        name: 'David Kim',
        avatar: 'DK',
        initial: 'DK',
        reviews: 6,
        isVerified: true,
        joinedDate: '2023',
        phoneNumber: '+1 (555) 456-7890',
        email: 'david.kim@email.com',
        bookingDetails: {
          propertyName: 'Conference Center Suite',
          checkIn: 'Tue, Dec 17, 2024',
          checkOut: 'Thu, Dec 19, 2024',
          guests: 4,
          totalAmount: 680.00,
          confirmationCode: 'SERAI2025',
          bookingDate: 'Sun, Dec 15, 2024',
          cancellationPolicy: 'Strict'
        },
        paymentSummary: {
          roomFee: 600.00,
          serviceFee: 80.00,
          taxes: 0.00,
          total: 680.00
        }
      },
      '5': { // Isabella Martinez - Management
        id: '5',
        name: 'Isabella Martinez',
        avatar: 'IM',
        initial: 'IM',
        reviews: 20,
        isVerified: true,
        joinedDate: '2020',
        phoneNumber: '+1 (555) 567-8901',
        email: 'isabella.martinez@email.com',
        bookingDetails: {
          propertyName: 'Romantic Anniversary Suite',
          checkIn: 'Fri, Dec 20, 2024',
          checkOut: 'Sun, Dec 22, 2024',
          guests: 2,
          totalAmount: 520.00,
          confirmationCode: 'SERAI2026',
          bookingDate: 'Mon, Dec 16, 2024',
          cancellationPolicy: 'Flexible'
        },
        paymentSummary: {
          roomFee: 400.00,
          serviceFee: 60.00,
          taxes: 60.00,
          total: 520.00
        }
      },
      '6': { // Alexander Petrov - Host
        id: '6',
        name: 'Alexander Petrov',
        avatar: 'AP',
        initial: 'AP',
        reviews: 25,
        isVerified: true,
        joinedDate: '2019',
        phoneNumber: '+1 (555) 678-9012',
        email: 'alexander.petrov@email.com',
        bookingDetails: {
          propertyName: 'Terrace View Penthouse',
          checkIn: 'Sat, Dec 7, 2024',
          checkOut: 'Mon, Dec 9, 2024',
          guests: 2,
          totalAmount: 750.00,
          confirmationCode: 'SERAI2027',
          bookingDate: 'Wed, Dec 4, 2024',
          cancellationPolicy: 'Flexible'
        },
        paymentSummary: {
          roomFee: 600.00,
          serviceFee: 75.00,
          taxes: 75.00,
          total: 750.00
        }
      },
      '7': { // Olivia Williams - Support Team
        id: '7',
        name: 'Olivia Williams',
        avatar: 'OW',
        initial: 'OW',
        reviews: 10,
        isVerified: true,
        joinedDate: '2021',
        phoneNumber: '+1 (555) 789-0123',
        email: 'olivia.williams@email.com',
        bookingDetails: {
          propertyName: 'Family-Friendly Suite',
          checkIn: 'Wed, Dec 11, 2024',
          checkOut: 'Fri, Dec 13, 2024',
          guests: 3,
          totalAmount: 380.00,
          confirmationCode: 'SERAI2028',
          bookingDate: 'Sun, Dec 8, 2024',
          cancellationPolicy: 'Moderate'
        },
        paymentSummary: {
          roomFee: 320.00,
          serviceFee: 60.00,
          taxes: 0.00,
          total: 380.00
        }
      },
      '8': { // Marcus Johnson - Property Manager
        id: '8',
        name: 'Marcus Johnson',
        avatar: 'MJ',
        initial: 'MJ',
        reviews: 18,
        isVerified: true,
        joinedDate: '2020',
        phoneNumber: '+1 (555) 890-1234',
        email: 'marcus.johnson@email.com',
        bookingDetails: {
          propertyName: 'Business Center Suite',
          checkIn: 'Mon, Dec 2, 2024',
          checkOut: 'Wed, Dec 4, 2024',
          guests: 1,
          totalAmount: 280.00,
          confirmationCode: 'SERAI2029',
          bookingDate: 'Fri, Nov 29, 2024',
          cancellationPolicy: 'Strict'
        },
        paymentSummary: {
          roomFee: 240.00,
          serviceFee: 40.00,
          taxes: 0.00,
          total: 280.00
        }
      },
      '9': { // Charlotte Brown - Guest Relations
        id: '9',
        name: 'Charlotte Brown',
        avatar: 'CB',
        initial: 'CB',
        reviews: 14,
        isVerified: true,
        joinedDate: '2021',
        phoneNumber: '+1 (555) 901-2345',
        email: 'charlotte.brown@email.com',
        bookingDetails: {
          propertyName: 'Family Gathering Suite',
          checkIn: 'Sat, Dec 14, 2024',
          checkOut: 'Sun, Dec 15, 2024',
          guests: 8,
          totalAmount: 420.00,
          confirmationCode: 'SERAI2030',
          bookingDate: 'Wed, Dec 11, 2024',
          cancellationPolicy: 'Flexible'
        },
        paymentSummary: {
          roomFee: 360.00,
          serviceFee: 60.00,
          taxes: 0.00,
          total: 420.00
        }
      },
      '10': { // Ryan O'Connor - Support
        id: '10',
        name: 'Ryan O\'Connor',
        avatar: 'RO',
        initial: 'RO',
        reviews: 7,
        isVerified: true,
        joinedDate: '2023',
        phoneNumber: '+1 (555) 012-3456',
        email: 'ryan.oconnor@email.com',
        bookingDetails: {
          propertyName: 'Smart Home Technology Suite',
          checkIn: 'Thu, Dec 5, 2024',
          checkOut: 'Sat, Dec 7, 2024',
          guests: 4,
          totalAmount: 480.00,
          confirmationCode: 'SERAI2031',
          bookingDate: 'Mon, Dec 2, 2024',
          cancellationPolicy: 'Moderate'
        },
        paymentSummary: {
          roomFee: 400.00,
          serviceFee: 80.00,
          taxes: 0.00,
          total: 480.00
        }
      }
    };
    
    return guestDetailsSets[conversationId] || guestDetailsSets['1'];
  };

  // Load initial conversation messages and guest details
  useEffect(() => {
    if (selectedConversation) {
      const conversationMessages = generateMessagesForConversation(selectedConversation.id);
      setMessages(conversationMessages);
      
      const conversationGuestDetails = generateGuestDetailsForConversation(selectedConversation.id);
      setGuestDetails(conversationGuestDetails);
    }
  }, [selectedConversation]);

  // Generate different chat content for each conversation
  const generateMessagesForConversation = (conversationId: string): Message[] => {
    const messageSets: { [key: string]: Message[] } = {
      '1': [ // Sarah Chen - Property Host
        {
          id: '1',
          content: 'Hi! I\'m arriving tomorrow and was wondering about the check-in process. Also, is there parking available?',
          sender: 'guest',
          timestamp: 'December 14, 2024 2:30 PM',
          isRead: true
        },
        {
          id: '2',
          content: 'Hello! Thank you for reaching out. Check-in is from 3 PM onwards, so you\'ll be right on time. I\'ll have the keys ready for you at the front desk.',
          sender: 'host',
          timestamp: 'December 14, 2024 2:45 PM',
          isRead: true
        },
        {
          id: '3',
          content: 'That sounds amazing! I have a few questions - is there parking available at the property? I\'ll be driving in from the airport.',
          sender: 'guest',
          timestamp: 'December 14, 2024 3:15 PM',
          isRead: true
        },
        {
          id: '4',
          content: 'Great questions! Yes, we have valet parking available for $35 per night, or there\'s a self-park garage next door for $25 per night.',
          sender: 'host',
          timestamp: 'December 14, 2024 3:32 PM',
          isRead: true
        }
      ],
      '2': [ // Michael Rodriguez - Support
        {
          id: '1',
          content: 'Thank you so much for the amazing stay! The room was perfect and the location was exactly what we needed for our business trip.',
          sender: 'guest',
          timestamp: 'December 13, 2024 4:20 PM',
          isRead: true
        },
        {
          id: '2',
          content: 'We\'re thrilled to hear you enjoyed your stay! Your feedback means everything to us. We\'ve noted your positive comments about the room and location.',
          sender: 'host',
          timestamp: 'December 13, 2024 4:35 PM',
          isRead: true
        },
        {
          id: '3',
          content: 'I\'ll definitely be recommending this place to my colleagues. The business center was particularly helpful for our meetings.',
          sender: 'guest',
          timestamp: 'December 13, 2024 4:45 PM',
          isRead: true
        },
        {
          id: '4',
          content: 'That\'s wonderful to hear! We\'re always happy to accommodate business travelers. Thank you for choosing us!',
          sender: 'host',
          timestamp: 'December 13, 2024 5:00 PM',
          isRead: true
        }
      ],
      '3': [ // Emma Thompson - Guest Services
        {
          id: '1',
          content: 'I\'m having trouble with the WiFi password. Could you please send it again? Also, is there a coffee maker in the room?',
          sender: 'guest',
          timestamp: 'December 12, 2024 3:15 PM',
          isRead: true
        },
        {
          id: '2',
          content: 'I\'ve sent you the WiFi password via email. The coffee maker is located in the kitchenette. Is there anything else I can help you with?',
          sender: 'host',
          timestamp: 'December 12, 2024 3:30 PM',
          isRead: true
        },
        {
          id: '3',
          content: 'Perfect! The WiFi is working now. One more thing - how do I control the air conditioning?',
          sender: 'guest',
          timestamp: 'December 12, 2024 3:45 PM',
          isRead: true
        },
        {
          id: '4',
          content: 'The thermostat is on the wall next to the TV. You can adjust both temperature and fan speed from there.',
          sender: 'host',
          timestamp: 'December 12, 2024 4:00 PM',
          isRead: true
        }
      ],
      '4': [ // David Kim - Concierge
        {
          id: '1',
          content: 'The conference room booking for tomorrow is confirmed. Looking forward to hosting our client meeting in such a professional space.',
          sender: 'guest',
          timestamp: 'December 11, 2024 2:00 PM',
          isRead: true
        },
        {
          id: '2',
          content: 'Perfect! Your conference room is all set for tomorrow. We\'ve prepared everything for your client meeting. Looking forward to hosting you.',
          sender: 'host',
          timestamp: 'December 11, 2024 2:15 PM',
          isRead: true
        },
        {
          id: '3',
          content: 'Will there be refreshments available? We\'d like to offer coffee and light snacks to our clients.',
          sender: 'guest',
          timestamp: 'December 11, 2024 2:30 PM',
          isRead: true
        },
        {
          id: '4',
          content: 'Absolutely! We can arrange coffee service and light refreshments. I\'ll coordinate with our catering team.',
          sender: 'host',
          timestamp: 'December 11, 2024 2:45 PM',
          isRead: true
        }
      ],
      '5': [ // Isabella Martinez - Management
        {
          id: '1',
          content: 'We\'re celebrating our anniversary and would love to arrange for some flowers and champagne to be in the room when we arrive.',
          sender: 'guest',
          timestamp: 'December 10, 2024 1:30 PM',
          isRead: true
        },
        {
          id: '2',
          content: 'We\'d be delighted to arrange flowers and champagne for your anniversary! I\'ll coordinate with our team to have everything ready for your arrival.',
          sender: 'host',
          timestamp: 'December 10, 2024 1:45 PM',
          isRead: true
        },
        {
          id: '3',
          content: 'That would be perfect! Do you have any restaurant recommendations for a romantic dinner?',
          sender: 'guest',
          timestamp: 'December 10, 2024 2:00 PM',
          isRead: true
        },
        {
          id: '4',
          content: 'I\'d recommend "The Sky Lounge" for a romantic dinner with city views, or "Bistro Moderne" for fine dining. Both are within walking distance.',
          sender: 'host',
          timestamp: 'December 10, 2024 2:15 PM',
          isRead: true
        }
      ],
      '6': [ // Alexander Petrov - Host
        {
          id: '1',
          content: 'The view from the terrace is absolutely breathtaking! Thank you for the upgrade. This has been the perfect end to our vacation.',
          sender: 'guest',
          timestamp: 'December 9, 2024 6:00 PM',
          isRead: true
        },
        {
          id: '2',
          content: 'We\'re thrilled you enjoyed the upgrade and the terrace views! It was our pleasure to make your vacation special. Thank you for choosing Serai!',
          sender: 'host',
          timestamp: 'December 9, 2024 6:15 PM',
          isRead: true
        },
        {
          id: '3',
          content: 'We\'ll definitely be back next year. This has been one of our best vacations ever!',
          sender: 'guest',
          timestamp: 'December 9, 2024 6:30 PM',
          isRead: true
        },
        {
          id: '4',
          content: 'We can\'t wait to welcome you back! Safe travels home!',
          sender: 'host',
          timestamp: 'December 9, 2024 6:45 PM',
          isRead: true
        }
      ],
      '7': [ // Olivia Williams - Support Team
        {
          id: '1',
          content: 'I\'m a bit concerned about the noise level. Are there any construction projects nearby that might affect our stay?',
          sender: 'guest',
          timestamp: 'December 8, 2024 11:00 AM',
          isRead: true
        },
        {
          id: '2',
          content: 'I understand your concern about noise. There are no construction projects nearby, but I\'ll personally check the area to ensure your stay is peaceful.',
          sender: 'host',
          timestamp: 'December 8, 2024 11:15 AM',
          isRead: true
        },
        {
          id: '3',
          content: 'Thank you for checking. We have a baby with us, so quiet is really important.',
          sender: 'guest',
          timestamp: 'December 8, 2024 11:30 AM',
          isRead: true
        },
        {
          id: '4',
          content: 'Absolutely understood! I\'ve noted that you have a baby and will ensure the room is in the quietest area of the building.',
          sender: 'host',
          timestamp: 'December 8, 2024 11:45 AM',
          isRead: true
        }
      ],
      '8': [ // Marcus Johnson - Property Manager
        {
          id: '1',
          content: 'The business center facilities are excellent. I was able to complete all my work presentations without any issues. Highly recommend!',
          sender: 'guest',
          timestamp: 'December 7, 2024 5:30 PM',
          isRead: true
        },
        {
          id: '2',
          content: 'Thank you for the wonderful feedback! We\'re delighted the business center met your needs. Your recommendation means everything to us.',
          sender: 'host',
          timestamp: 'December 7, 2024 5:45 PM',
          isRead: true
        },
        {
          id: '3',
          content: 'The printing services were particularly helpful. Everything worked seamlessly.',
          sender: 'guest',
          timestamp: 'December 7, 2024 6:00 PM',
          isRead: true
        },
        {
          id: '4',
          content: 'We\'re glad our business amenities exceeded your expectations. Thank you for choosing us for your business needs!',
          sender: 'host',
          timestamp: 'December 7, 2024 6:15 PM',
          isRead: true
        }
      ],
      '9': [ // Charlotte Brown - Guest Relations
        {
          id: '1',
          content: 'We\'re planning a small family gathering and wondering if we could use the common areas for a few hours in the evening.',
          sender: 'guest',
          timestamp: 'December 6, 2024 3:00 PM',
          isRead: true
        },
        {
          id: '2',
          content: 'We\'d be happy to accommodate your family gathering! I\'ll check the common areas availability and get back to you with the details.',
          sender: 'host',
          timestamp: 'December 6, 2024 3:15 PM',
          isRead: true
        },
        {
          id: '3',
          content: 'That would be wonderful! We\'re expecting about 8 people. Is there a fee for using the common areas?',
          sender: 'guest',
          timestamp: 'December 6, 2024 3:30 PM',
          isRead: true
        },
        {
          id: '4',
          content: 'There\'s no additional fee for common area use. I\'ve reserved the main lounge for you from 6-9 PM. Does that work?',
          sender: 'host',
          timestamp: 'December 6, 2024 3:45 PM',
          isRead: true
        }
      ],
      '10': [ // Ryan O'Connor - Support
        {
          id: '1',
          content: 'The smart home features are incredible! Being able to control everything from my phone made our stay so convenient.',
          sender: 'guest',
          timestamp: 'December 5, 2024 7:00 PM',
          isRead: true
        },
        {
          id: '2',
          content: 'We\'re so glad you enjoyed the smart home features! It\'s wonderful to hear that the technology enhanced your stay experience.',
          sender: 'host',
          timestamp: 'December 5, 2024 7:15 PM',
          isRead: true
        },
        {
          id: '3',
          content: 'The voice control was particularly impressive. My kids loved asking the room to change the lights!',
          sender: 'guest',
          timestamp: 'December 5, 2024 7:30 PM',
          isRead: true
        },
        {
          id: '4',
          content: 'That\'s exactly what we hoped for! We love when families enjoy our smart features. Thank you for the great feedback!',
          sender: 'host',
          timestamp: 'December 5, 2024 7:45 PM',
          isRead: true
        }
      ]
    };
    
    return messageSets[conversationId] || messageSets['1'];
  };

  const handleConversationSelect = (conversation: Conversation) => {
    setConversations(prev => 
      prev.map(conv => ({
        ...conv,
        isSelected: conv.id === conversation.id
      }))
    );
    setSelectedConversation(conversation);
    
    // Generate different chat content based on conversation
    const conversationMessages = generateMessagesForConversation(conversation.id);
    setMessages(conversationMessages);
    
    // Generate different guest details based on conversation
    const conversationGuestDetails = generateGuestDetailsForConversation(conversation.id);
    setGuestDetails(conversationGuestDetails);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender: 'host',
        timestamp: new Date().toLocaleString(),
        isRead: true
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const filteredConversations = conversations.filter(conv => 
    filter === 'all' || (filter === 'unread' && conv.unreadCount > 0)
  );

  return (
    <div className="h-screen bg-white flex flex-col">
      <TopAppBar 
        backHref="/tabs" 
        logoHref="/tabs" 
        showListingButton={false} 
        showLanguageButton={true} 
        showMenuButton={true}
        hiddenDropdownItems={[]}
      />
      
      <div className="flex-1 flex overflow-hidden pt-16">
        {/* Left Panel - Conversations List */}
        <div className="w-80 border-r border-gray-200 flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
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
                      {conversation.guestInitial}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-serai-charcoal-900 truncate">
                        {conversation.guestName}
                      </h3>
                      <span className="text-xs text-serai-neutral-500">
                        {conversation.lastMessageTime}
                      </span>
                    </div>
                    <p className="text-xs text-serai-neutral-500 truncate mt-1">
                      {conversation.propertyName}
                    </p>
                    <p className="text-sm text-serai-neutral-600 truncate mt-1">
                      {conversation.lastMessage}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        conversation.status === 'active' 
                          ? 'bg-serai-forest-100 text-serai-forest-800'
                          : conversation.status === 'pending'
                          ? 'bg-serai-gold-100 text-serai-gold-800'
                          : 'bg-serai-neutral-100 text-serai-neutral-800'
                      }`}>
                        {conversation.status === 'active' ? 'Active' : 
                         conversation.status === 'pending' ? 'Pending' : 'Closed'}
                      </span>
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
        <div className="flex-1 flex flex-col h-full">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-serai-neutral-200 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-serai-navy-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-serai-navy-700">
                        {selectedConversation.guestInitial}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-serai-charcoal-900">
                        {selectedConversation.guestName}
                      </h3>
                      <p className="text-sm text-serai-neutral-500">
                        {selectedConversation.propertyName}
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
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'guest' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'guest'
                          ? 'bg-serai-red-500 text-white'
                          : 'bg-gray-100 text-serai-charcoal-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'guest' ? 'text-serai-red-100' : 'text-serai-neutral-500'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-serai-neutral-200 flex-shrink-0 bg-white">
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
                  This conversation is closed. Learn more
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

        {/* Right Panel - Guest Details */}
        <div className="w-80 border-l border-serai-neutral-200 flex flex-col h-full overflow-y-auto">
          {selectedConversation ? (
            <>
              {/* Guest Header */}
              <div className="p-4 border-b border-serai-neutral-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-serai-charcoal-900">My Reservation</h3>
                  <button className="p-1 hover:bg-serai-cream-100 rounded">
                    <X className="h-4 w-4 text-serai-neutral-500" />
                  </button>
                </div>
              </div>

              {/* Guest Info */}
              <div className="p-4 border-b border-serai-neutral-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-serai-navy-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-medium text-serai-navy-700">
                      {guestDetails.initial}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-serai-charcoal-900">
                      {guestDetails.name}
                    </h4>
                    <p className="text-sm text-serai-neutral-500">
                      {guestDetails.bookingDetails.propertyName}
                    </p>
                    <p className="text-sm text-serai-neutral-500">
                      {guestDetails.bookingDetails.checkIn} - {guestDetails.bookingDetails.checkOut}
                    </p>
                    <p className="text-sm text-serai-neutral-500">
                      {guestDetails.bookingDetails.guests} guest - ${guestDetails.bookingDetails.totalAmount}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-serai-gold-500" />
                    <span className="text-serai-neutral-600">{guestDetails.reviews} review</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-serai-forest-500" />
                    <span className="text-serai-forest-600">Identity verified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-serai-neutral-400" />
                    <span className="text-serai-neutral-600">Joined Serai in {guestDetails.joinedDate}</span>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-serai-cream-100 text-serai-charcoal-700 rounded-lg hover:bg-serai-cream-200">
                  Show profile
                </button>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-b border-serai-neutral-200 space-y-2">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-serai-cream-100 text-serai-charcoal-700 rounded-lg hover:bg-serai-cream-200">
                  <CreditCard className="h-4 w-4" />
                  <span>View payment details</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-serai-cream-100 text-serai-charcoal-700 rounded-lg hover:bg-serai-cream-200">
                  <Phone className="h-4 w-4" />
                  <span>Call support</span>
                </button>
              </div>

              {/* Booking Details */}
              <div className="p-4 border-b border-serai-neutral-200">
                <h4 className="text-sm font-semibold text-serai-charcoal-900 mb-3">Booking Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-serai-neutral-600">Guests:</span>
                    <span className="text-serai-charcoal-700">{guestDetails.bookingDetails.guests} adult</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-serai-neutral-600">Check-in:</span>
                    <span className="text-serai-charcoal-700">{guestDetails.bookingDetails.checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-serai-neutral-600">Checkout:</span>
                    <span className="text-serai-charcoal-700">{guestDetails.bookingDetails.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-serai-neutral-600">Booking date:</span>
                    <span className="text-serai-charcoal-700">{guestDetails.bookingDetails.bookingDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-serai-neutral-600">Confirmation code:</span>
                    <span className="font-mono text-serai-charcoal-700">{guestDetails.bookingDetails.confirmationCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-serai-neutral-600">Cancellation policy:</span>
                    <span className="text-serai-charcoal-700">{guestDetails.bookingDetails.cancellationPolicy}</span>
                  </div>
                  <button className="text-serai-red-600 hover:text-serai-red-800 text-sm">
                    Show calendar
                  </button>
                </div>
              </div>

              {/* Payment Breakdown */}
              <div className="p-4 border-b border-serai-neutral-200">
                <h4 className="text-sm font-semibold text-serai-charcoal-900 mb-3">Payment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-serai-neutral-600">Room fee (2 nights):</span>
                    <span className="text-serai-charcoal-700">${guestDetails.paymentSummary?.roomFee?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-serai-neutral-600">Service fee:</span>
                    <span className="text-serai-charcoal-700">${guestDetails.paymentSummary?.serviceFee?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-serai-neutral-600">Taxes:</span>
                    <span className="text-serai-charcoal-700">${guestDetails.paymentSummary?.taxes?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t border-serai-neutral-200 pt-2">
                    <span className="text-serai-charcoal-900">Total paid:</span>
                    <span className="text-serai-charcoal-900">${guestDetails.paymentSummary?.total?.toFixed(2) || '0.00'}</span>
                  </div>
                  <button className="text-serai-red-600 hover:text-serai-red-800 text-sm">
                    View receipt
                  </button>
                </div>
              </div>

              {/* Calendar Note */}
              <div className="p-4 border-b border-serai-neutral-200">
                <h4 className="text-sm font-semibold text-serai-charcoal-900 mb-3">
                  Add a private reminder for these dates that only you can view
                </h4>
                <textarea
                  placeholder="Write a note"
                  className="w-full p-2 bg-white border border-serai-neutral-300 rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-serai-red-500"
                  rows={3}
                />
                <button className="mt-2 px-3 py-1 bg-serai-cream-100 text-serai-charcoal-700 rounded text-sm hover:bg-serai-cream-200">
                  Save
                </button>
              </div>

              {/* Support Options */}
              <div className="p-4 space-y-3">
                <div className="bg-serai-navy-50 p-3 rounded">
                  <h4 className="text-sm font-semibold text-serai-navy-900 mb-2">Guest Support</h4>
                  <p className="text-xs text-serai-navy-700 mb-2">
                    Need help with your stay? We're here to assist you.
                  </p>
                  <button className="text-serai-navy-600 hover:text-serai-navy-800 text-sm">
                    Contact support
                  </button>
                </div>

                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-serai-neutral-600 hover:text-serai-charcoal-800">
                    Modify reservation
                  </button>
                  <button className="w-full text-left text-sm text-serai-neutral-600 hover:text-serai-charcoal-800">
                    Visit the Help Centre
                  </button>
                </div>

                <div className="text-xs text-serai-neutral-500 space-y-1">
                  <p>Common Questions</p>
                  <p>Check-in process and amenities</p>
                  <button className="text-serai-red-600 hover:text-serai-red-800">
                    Read more
                  </button>
                </div>

                <button className="w-full text-left text-sm text-serai-neutral-600 hover:text-serai-charcoal-800">
                  Request refund
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <User className="h-12 w-12 text-serai-neutral-400 mx-auto mb-4" />
                <p className="text-serai-neutral-500">Select a conversation to view guest details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
