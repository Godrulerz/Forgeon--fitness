import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate?: (item: BreadcrumbItem) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onNavigate }) => {
  const handleClick = (item: BreadcrumbItem, e: React.MouseEvent) => {
    e.preventDefault();
    if (item.onClick) {
      item.onClick();
    } else if (onNavigate) {
      onNavigate(item);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      <button
        onClick={(e) => handleClick({ label: 'Home', onClick: () => onNavigate?.({ label: 'Home' }) }, e)}
        className="flex items-center space-x-1 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
        aria-label="Go to dashboard"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </button>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
          {item.current ? (
            <span className="font-medium text-gray-900" aria-current="page">
              {item.label}
            </span>
          ) : (
            <button
              onClick={(e) => handleClick(item, e)}
              className="hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label={`Go to ${item.label}`}
            >
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};