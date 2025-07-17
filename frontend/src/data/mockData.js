import { UserRole, FundStatus, TransactionStatus } from '../types/index.js';

export const mockUsers = [
  {
    _id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    role: UserRole.DONATOR,
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    totalDonated: 2450,
    fundsSupported: 12,
    joinDate: '2024-01-15'
  },
  {
    _id: '2',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    role: UserRole.RAISER,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    fundsRaised: 3,
    totalRaised: 85000,
    joinDate: '2023-11-20'
  }
];

export const mockFunds = [
  {
    _id: '1',
    title: 'Clean Water for Rural Villages',
    description: 'Providing access to clean drinking water for 500 families in remote villages through well construction and water purification systems.',
    category: 'Health',
    targetAmount: 25000,
    currentAmount: 18750,
    donors: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
    imageUrl: 'https://images.pexels.com/photos/1142975/pexels-photo-1142975.jpeg?auto=compress&cs=tinysrgb&w=800',
    organizer: {name: 'Water for Life Foundation'},
    organizerId: '2',
    location: 'Kenya, Africa',
    createdAt: '2024-01-15',
    endDate: '2026-04-15',
    status: FundStatus.ACTIVE,
    story: 'Access to clean water is a fundamental human right, yet millions of people around the world lack this basic necessity. Our project aims to bring clean, safe drinking water to 500 families in rural Kenya by constructing wells and installing water purification systems.',
    updates: [
      {
       _id: '1',
        title: 'First Well Construction Completed',
        content: 'We successfully completed the first well in Makueni Village, providing clean water to 50 families.',
        date: '2024-02-10'
      }
    ]
  },
  {
    _id: '2',
    title: 'Education for Every Child',
    description: 'Building a school and providing educational resources for underprivileged children in urban slums.',
    category: 'Education',
    targetAmount: 50000,
    currentAmount: 32100,
    donors: [1,1,1,1,1,1,1,1,1,1,1,1,11,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
    imageUrl: 'https://images.pexels.com/photos/8197537/pexels-photo-8197537.jpeg?auto=compress&cs=tinysrgb&w=800',
    organizer: {name: 'Future Leaders Academy'},
    organizerId: '2',
    location: 'Mumbai, India',
    createdAt: '2024-01-20',
    endDate: '2024-06-20',
    status: FundStatus.ACTIVE,
    story: 'Education is the key to breaking the cycle of poverty. We are building a school in the heart of Mumbai\'s largest slum to provide quality education to 300 children who currently have no access to schooling.',
    updates: [
      {
       _id: '2',
        title: 'Construction Progress Update',
        content: 'The foundation has been laid and walls are going up. We expect to complete the structure by March.',
        date: '2024-02-15'
      }
    ]
  },
  {
   _id: '3',
    title: 'Reforestation Initiative',
    description: 'Planting 10,000 trees to combat deforestation and create sustainable forest ecosystems.',
    category: 'Environment',
    targetAmount: 15000,
    currentAmount: 12800,
    donors: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
    imageUrl: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=800',
    organizer: {name: 'Green Earth Coalition'},
    organizerId: '2',
    location: 'Amazon Basin, Brazil',
    createdAt: '2024-02-01',
    endDate: '2024-05-01',
    status: FundStatus.ACTIVE,
    story: 'The Amazon rainforest is disappearing at an alarming rate. Our reforestation project aims to plant 10,000 native trees to restore degraded areas and create sustainable forest ecosystems.',
    updates: [
      {
       _id: '3',
        title: '5,000 Trees Planted!',
        content: 'We\'ve reached the halfway mark! Thanks to our amazing volunteers, we\'ve planted 5,000 trees this month.',
        date: '2024-02-20'
      }
    ]
  }
];

export const mockTransactions = [
  {
   _id: '1',
    fundId: '1',
    fundTitle: 'Clean Water for Rural Villages',
    donorId: '1',
    donorName: 'Alex Johnson',
    donorEmail: 'alex.johnson@example.com',
    donorPhone: '+1-555-0123',
    amount: 100,
    date: '2024-02-28',
    type: 'donation',
    status: TransactionStatus.COMPLETED,
    paymentMethod: 'Credit Card',
    transactionId: 'TXN_001'
  },
  {
   _id: '2',
    fundId: '2',
    fundTitle: 'Education for Every Child',
    donorId: '1',
    donorName: 'Alex Johnson',
    donorEmail: 'alex.johnson@example.com',
    donorPhone: '+1-555-0123',
    amount: 250,
    date: '2024-02-25',
    type: 'donation',
    status: TransactionStatus.COMPLETED,
    paymentMethod: 'PayPal',
    transactionId: 'TXN_002'
  },
  {
   _id: '3',
    fundId: '3',
    fundTitle: 'Reforestation Initiative',
    donorId: '3',
    donorName: 'Emily Davis',
    donorEmail: 'emily.davis@example.com',
    donorPhone: '+1-555-0456',
    amount: 50,
    date: '2024-02-20',
    type: 'donation',
    status: TransactionStatus.COMPLETED,
    paymentMethod: 'Bank Transfer',
    transactionId: 'TXN_003'
  }
];

export const categories = ['All', 'Health', 'Education', 'Environment', 'Emergency', 'Animals', 'Community'];