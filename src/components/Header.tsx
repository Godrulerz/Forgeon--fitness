import React from 'react';
import { Bell, Settings, User, LogOut, Search } from 'lucide-react';
import { User as UserType } from '../types';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  currentUser: UserType;
}

export const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // TODO: Implement actual search functionality
  };

  const handleResultSelect = (result: any) => {
    console.log('Selected result:', result);
    // TODO: Navigate to selected result
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ForgeOn</h1>
              <p className="text-sm text-gray-500">Fitness Assessment Platform</p>
            </div>
          </div>
          
          <div className="hidden md:block w-96">
            <SearchBar
              onSearch={handleSearch}
              onResultSelect={handleResultSelect}
              placeholder="Search tests, athletes, or equipment..."
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full" aria-label="3 new notifications"></span>
          </button>
          
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
              <p className="text-xs text-gray-600 capitalize">{currentUser.role.replace('_', ' ')}</p>
            </div>
            {currentUser.avatar ? (
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-700" />
              </div>
            )}
            <button className="p-1 text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded" aria-label="Sign out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};