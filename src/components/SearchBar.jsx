import { useState, useEffect } from 'react';

export const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(searches);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  const handleRecentSearch = (search) => {
    setCity(search);
    onSearch(search);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          list="recent-searches"
        />
        <datalist id="recent-searches">
          {recentSearches.map((search, index) => (
            <option key={index} value={search} />
          ))}
        </datalist>
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      <button
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                onSearch(pos.coords.latitude, pos.coords.longitude, true);
              },
              (err) => {
                console.error('Geolocation error:', err);
              }
            );
          }
        }}
        className="p-3 bg-secondary-light dark:bg-secondary-dark text-white rounded-lg hover:bg-opacity-90 transition-colors"
        title="Use my location"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};