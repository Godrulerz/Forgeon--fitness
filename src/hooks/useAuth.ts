import { useState } from 'react';

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: 'athlete' | 'coach';
  avatar_url?: string;
}

// Simple password hashing function (use bcrypt in production)
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const useAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple password validation (in real app, compare with hashed password)
    if (!password || password.length < 6) {
      setLoading(false);
      throw new Error('Invalid password');
    }
    
    // Mock user data based on email
    const mockUser: UserProfile = email.includes('coach') ? {
      id: '1',
      full_name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@forgeron.com',
      role: 'coach',
      avatar_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400'
    } : {
      id: '2',
      full_name: 'Mike Thompson',
      email: 'mike.thompson@forgeron.com',
      role: 'athlete',
      avatar_url: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
    };
    
    console.log('🔄 Setting auth state...');
    setIsAuthenticated(true);
    setUser(mockUser);
    setLoading(false);
    console.log('✅ Login successful:', mockUser);
    console.log('🔍 Auth state after login:', { isAuthenticated: true, user: mockUser });
  };

  const signUp = async (data: any) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Password validation
    if (!data.password || data.password.length < 6) {
      setLoading(false);
      throw new Error('Password must be at least 6 characters');
    }
    
    // In real app, hash the password before storing
    const hashedPassword = await hashPassword(data.password);
    console.log('🔐 Password hashed:', hashedPassword.substring(0, 20) + '...');
    
    const newUser: UserProfile = {
      id: Date.now().toString(),
      full_name: data.fullName,
      email: data.email,
      role: data.role,
      avatar_url: 'https://images.pexels.com/photos/1472099645785/pexels-photo-1472099645785.jpeg?auto=compress&cs=tinysrgb&w=400'
    };
    
    setIsAuthenticated(true);
    setUser(newUser);
    setLoading(false);
    console.log('✅ Signup successful:', newUser);
  };

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    profile: user, // Alias for compatibility
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated
  };
};
