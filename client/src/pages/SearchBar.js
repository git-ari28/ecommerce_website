import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery) {
            // Navigate to the recommendations page with the search query as a parameter
            navigate(`/search?query=${searchQuery}`);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
