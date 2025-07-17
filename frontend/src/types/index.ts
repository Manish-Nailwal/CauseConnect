export interface Fund {
  id: string;
  title: string;
  description: string;
  category: string;
  targetAmount: number;
  currentAmount: number;
  donors: number;
  imageUrl: string;
  organizer: string;
  location: string;
  createdAt: string;
  endDate: string;
  story: string;
  updates: FundUpdate[];
}

export interface FundUpdate {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalDonated: number;
  fundsSupported: number;
}

export interface Transaction {
  id: string;
  fundTitle: string;
  amount: number;
  date: string;
  type: 'donation' | 'refund';
  status: 'completed' | 'pending' | 'failed';
}