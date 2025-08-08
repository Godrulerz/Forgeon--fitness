import React from 'react';
import { CheckCircle, AlertTriangle, Clock, XCircle, Info, AlertCircle } from 'lucide-react';

interface StatusIndicatorProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'pending' | 'active' | 'inactive';
  label: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showDot?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  size = 'md',
  showIcon = true,
  showDot = true
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          dotColor: 'bg-green-500',
          icon: CheckCircle,
          ariaLabel: 'Success'
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          dotColor: 'bg-yellow-500',
          icon: AlertTriangle,
          ariaLabel: 'Warning'
        };
      case 'error':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          dotColor: 'bg-red-500',
          icon: XCircle,
          ariaLabel: 'Error'
        };
      case 'info':
        return {
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          dotColor: 'bg-blue-500',
          icon: Info,
          ariaLabel: 'Information'
        };
      case 'pending':
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          dotColor: 'bg-gray-500',
          icon: Clock,
          ariaLabel: 'Pending'
        };
      case 'active':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          dotColor: 'bg-green-500',
          icon: CheckCircle,
          ariaLabel: 'Active'
        };
      case 'inactive':
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          dotColor: 'bg-gray-500',
          icon: AlertCircle,
          ariaLabel: 'Inactive'
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          dotColor: 'bg-gray-500',
          icon: Info,
          ariaLabel: 'Unknown'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: {
      container: 'px-2 py-1 text-xs',
      icon: 'w-3 h-3',
      dot: 'w-2 h-2'
    },
    md: {
      container: 'px-3 py-1 text-sm',
      icon: 'w-4 h-4',
      dot: 'w-3 h-3'
    },
    lg: {
      container: 'px-4 py-2 text-base',
      icon: 'w-5 h-5',
      dot: 'w-4 h-4'
    }
  };

  return (
    <span 
      className={`inline-flex items-center space-x-2 rounded-full font-medium ${config.bgColor} ${config.textColor} ${sizeClasses[size].container}`}
      role="status"
      aria-label={`${config.ariaLabel}: ${label}`}
    >
      {showDot && (
        <span className={`${config.dotColor} ${sizeClasses[size].dot} rounded-full flex-shrink-0`} aria-hidden="true" />
      )}
      {showIcon && (
        <Icon className={`${sizeClasses[size].icon} flex-shrink-0`} aria-hidden="true" />
      )}
      <span>{label}</span>
    </span>
  );
};