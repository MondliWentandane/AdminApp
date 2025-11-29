import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'super-admin' | 'branch-admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  hotelBranchId?: string; // Only for branch admins
  avatar?: string;
}

interface AuthContextType {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@stayease.com',
    role: 'super-admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  });

  const logout = () => {
    // Logout logic here
    console.log('Logging out...');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
