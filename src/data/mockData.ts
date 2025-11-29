export interface HotelBranch {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  totalRooms: number;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  idNumber: string;
  status: 'active' | 'blocked';
  totalBookings: number;
  totalSpent: number;
  joinedDate: string;
  lastVisit: string;
  avatar?: string;
}

export interface Room {
  id: string;
  hotelBranchId: string;
  roomNumber: string;
  type: 'Single' | 'Double' | 'Suite' | 'Deluxe' | 'Presidential';
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  price: number;
  capacity: number;
  description: string;
  amenities: string[];
  images: string[];
  floor: number;
}

export interface Reservation {
  id: string;
  guestId: string;
  roomId: string;
  hotelBranchId: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  totalAmount: number;
  specialRequests?: string;
  createdAt: string;
}

export const hotelBranches: HotelBranch[] = [
  {
    id: 'hotel-1',
    name: 'StayEase Downtown',
    location: 'New York, NY',
    address: '123 Broadway Street, New York, NY 10001',
    phone: '+1 (555) 123-4567',
    email: 'downtown@stayease.com',
    totalRooms: 120,
  },
  {
    id: 'hotel-2',
    name: 'StayEase Beachside',
    location: 'Miami, FL',
    address: '456 Ocean Drive, Miami, FL 33139',
    phone: '+1 (555) 234-5678',
    email: 'beachside@stayease.com',
    totalRooms: 80,
  },
  {
    id: 'hotel-3',
    name: 'StayEase Mountain View',
    location: 'Denver, CO',
    address: '789 Summit Road, Denver, CO 80202',
    phone: '+1 (555) 345-6789',
    email: 'mountainview@stayease.com',
    totalRooms: 95,
  },
  {
    id: 'hotel-4',
    name: 'StayEase Airport',
    location: 'Los Angeles, CA',
    address: '321 Airport Blvd, Los Angeles, CA 90045',
    phone: '+1 (555) 456-7890',
    email: 'airport@stayease.com',
    totalRooms: 150,
  },
  {
    id: 'hotel-5',
    name: 'StayEase Historic District',
    location: 'Boston, MA',
    address: '654 Heritage Lane, Boston, MA 02108',
    phone: '+1 (555) 567-8901',
    email: 'historic@stayease.com',
    totalRooms: 75,
  },
];

export const guests: Guest[] = [
  {
    id: 'guest-1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 111-2222',
    nationality: 'United States',
    idNumber: 'P1234567',
    status: 'active',
    totalBookings: 12,
    totalSpent: 8450,
    joinedDate: '2023-01-15',
    lastVisit: '2024-11-10',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
  },
  {
    id: 'guest-2',
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    phone: '+1 (555) 222-3333',
    nationality: 'United Kingdom',
    idNumber: 'P9876543',
    status: 'active',
    totalBookings: 8,
    totalSpent: 6200,
    joinedDate: '2023-03-22',
    lastVisit: '2024-10-28',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
  },
  {
    id: 'guest-3',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 333-4444',
    nationality: 'Canada',
    idNumber: 'P5555555',
    status: 'active',
    totalBookings: 15,
    totalSpent: 11800,
    joinedDate: '2022-11-08',
    lastVisit: '2024-11-20',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
  },
  {
    id: 'guest-4',
    name: 'Sofia Rodriguez',
    email: 'sofia.rodriguez@email.com',
    phone: '+1 (555) 444-5555',
    nationality: 'Spain',
    idNumber: 'P7777777',
    status: 'active',
    totalBookings: 5,
    totalSpent: 3900,
    joinedDate: '2024-02-14',
    lastVisit: '2024-11-15',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
  },
  {
    id: 'guest-5',
    name: 'David Brown',
    email: 'david.brown@email.com',
    phone: '+1 (555) 555-6666',
    nationality: 'Australia',
    idNumber: 'P3333333',
    status: 'blocked',
    totalBookings: 3,
    totalSpent: 1500,
    joinedDate: '2024-06-01',
    lastVisit: '2024-08-20',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  },
];

export const rooms: Room[] = [
  {
    id: 'room-1',
    hotelBranchId: 'hotel-1',
    roomNumber: '101',
    type: 'Single',
    status: 'available',
    price: 120,
    capacity: 1,
    description: 'Cozy single room with city view, perfect for solo travelers.',
    amenities: ['WiFi', 'TV', 'AC', 'Desk', 'Mini Fridge'],
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop',
    ],
    floor: 1,
  },
  {
    id: 'room-2',
    hotelBranchId: 'hotel-1',
    roomNumber: '205',
    type: 'Double',
    status: 'occupied',
    price: 180,
    capacity: 2,
    description: 'Spacious double room with king-size bed and modern amenities.',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Safe', 'Balcony'],
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
    ],
    floor: 2,
  },
  {
    id: 'room-3',
    hotelBranchId: 'hotel-1',
    roomNumber: '310',
    type: 'Suite',
    status: 'reserved',
    price: 350,
    capacity: 4,
    description: 'Luxurious suite with separate living area and premium amenities.',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Safe', 'Kitchenette', 'Jacuzzi'],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
    ],
    floor: 3,
  },
  {
    id: 'room-4',
    hotelBranchId: 'hotel-2',
    roomNumber: '102',
    type: 'Deluxe',
    status: 'available',
    price: 280,
    capacity: 3,
    description: 'Deluxe room with ocean view and premium bedding.',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Safe', 'Ocean View', 'Balcony'],
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop',
    ],
    floor: 1,
  },
  {
    id: 'room-5',
    hotelBranchId: 'hotel-2',
    roomNumber: '501',
    type: 'Presidential',
    status: 'maintenance',
    price: 650,
    capacity: 6,
    description: 'Presidential suite with panoramic views and exclusive amenities.',
    amenities: ['WiFi', 'TV', 'AC', 'Full Kitchen', 'Private Pool', 'Butler Service', 'Spa'],
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
    ],
    floor: 5,
  },
];

export const reservations: Reservation[] = [
  {
    id: 'res-1',
    guestId: 'guest-1',
    roomId: 'room-2',
    hotelBranchId: 'hotel-1',
    checkIn: '2024-11-25',
    checkOut: '2024-11-28',
    status: 'confirmed',
    paymentStatus: 'paid',
    totalAmount: 540,
    specialRequests: 'Late check-in after 10 PM',
    createdAt: '2024-11-15',
  },
  {
    id: 'res-2',
    guestId: 'guest-2',
    roomId: 'room-3',
    hotelBranchId: 'hotel-1',
    checkIn: '2024-12-01',
    checkOut: '2024-12-05',
    status: 'pending',
    paymentStatus: 'pending',
    totalAmount: 1400,
    specialRequests: 'High floor preferred',
    createdAt: '2024-11-20',
  },
  {
    id: 'res-3',
    guestId: 'guest-3',
    roomId: 'room-1',
    hotelBranchId: 'hotel-1',
    checkIn: '2024-11-20',
    checkOut: '2024-11-23',
    status: 'completed',
    paymentStatus: 'paid',
    totalAmount: 360,
    createdAt: '2024-11-10',
  },
  {
    id: 'res-4',
    guestId: 'guest-4',
    roomId: 'room-4',
    hotelBranchId: 'hotel-2',
    checkIn: '2024-12-10',
    checkOut: '2024-12-15',
    status: 'confirmed',
    paymentStatus: 'paid',
    totalAmount: 1400,
    specialRequests: 'Ocean view room',
    createdAt: '2024-11-18',
  },
  {
    id: 'res-5',
    guestId: 'guest-5',
    roomId: 'room-1',
    hotelBranchId: 'hotel-1',
    checkIn: '2024-11-10',
    checkOut: '2024-11-12',
    status: 'cancelled',
    paymentStatus: 'refunded',
    totalAmount: 240,
    createdAt: '2024-11-05',
  },
];

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'super-admin' | 'branch-admin';
  hotelBranchId?: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

export const admins: Admin[] = [
  {
    id: 'admin-1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@stayease.com',
    role: 'super-admin',
    status: 'active',
    lastLogin: '2024-11-26',
    createdAt: '2022-01-15',
  },
  {
    id: 'admin-2',
    name: 'James Martinez',
    email: 'james.martinez@stayease.com',
    role: 'branch-admin',
    hotelBranchId: 'hotel-1',
    status: 'active',
    lastLogin: '2024-11-25',
    createdAt: '2022-06-20',
  },
  {
    id: 'admin-3',
    name: 'Lisa Wang',
    email: 'lisa.wang@stayease.com',
    role: 'branch-admin',
    hotelBranchId: 'hotel-2',
    status: 'active',
    lastLogin: '2024-11-24',
    createdAt: '2023-02-10',
  },
  {
    id: 'admin-4',
    name: 'Robert Taylor',
    email: 'robert.taylor@stayease.com',
    role: 'branch-admin',
    hotelBranchId: 'hotel-3',
    status: 'active',
    lastLogin: '2024-11-26',
    createdAt: '2023-05-15',
  },
];
