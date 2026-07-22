import React from 'react';
import { Search } from 'lucide-react';

interface SearchBoxProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ searchQuery, onSearchChange }) => (
  <div className="search-box">
    <Search size={16} className="search-icon" />
    <input
      type="text"
      placeholder="Search enquiries..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="search-input"
    />
  </div>
);

export default SearchBox;
