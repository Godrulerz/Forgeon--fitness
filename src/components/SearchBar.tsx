import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, User, FileText, Settings } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  type: 'athlete' | 'test' | 'equipment' | 'module';
  url?: string;
  onClick?: () => void;
}

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onResultSelect?: (result: SearchResult) => void;
  results?: SearchResult[];
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search tests, athletes, or equipment...",
  onSearch,
  onResultSelect,
  results = [],
  isLoading = false
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'VO₂max Test',
    'Alex Rodriguez',
    'DEXA Scanner'
  ]);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setQuery(result.title);
    setIsOpen(false);
    
    // Add to recent searches
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item !== result.title);
      return [result.title, ...filtered].slice(0, 5);
    });
    
    if (onResultSelect) {
      onResultSelect(result);
    }
  };

  const handleRecentSearchClick = (search: string) => {
    setQuery(search);
    setIsOpen(false);
    if (onSearch) {
      onSearch(search);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'athlete':
        return <User className="w-4 h-4 text-blue-500" />;
      case 'test':
        return <FileText className="w-4 h-4 text-green-500" />;
      case 'equipment':
        return <Settings className="w-4 h-4 text-orange-500" />;
      case 'module':
        return <FileText className="w-4 h-4 text-purple-500" />;
      default:
        return <Search className="w-4 h-4 text-gray-500" />;
    }
  };

  const showResults = isOpen && (query.length > 0 || recentSearches.length > 0);

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          aria-label="Search"
          aria-expanded={showResults}
          aria-haspopup="listbox"
          role="combobox"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {query.length === 0 && recentSearches.length > 0 && (
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                <Clock className="w-3 h-3" />
                <span>Recent Searches</span>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearchClick(search)}
                  className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          )}

          {query.length > 0 && (
            <div className="p-3">
              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              ) : results.length > 0 ? (
                <div role="listbox" aria-label="Search results">
                  {results.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      role="option"
                      aria-selected="false"
                    >
                      {getTypeIcon(result.type)}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {result.title}
                        </div>
                        {result.subtitle && (
                          <div className="text-xs text-gray-500 truncate">
                            {result.subtitle}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 capitalize">
                        {result.type}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <div className="text-sm">No results found for "{query}"</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};