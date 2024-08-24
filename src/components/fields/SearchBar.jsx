import { useState } from 'react';

const SearchBar = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');

    const handleFilter = () => {
        onFilter({
            category: selectedCategory,
            searchTerm,
            sortBy
        });
    };
    return (
        <div className='flex flex-row bg-white border-solid border-x-2 border-b-2 p-4'>
            <div className="form-control">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search Post"
                        className="input input-bordered w-24 md:w-auto pl-12 mr-10 border-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-ghost btn-circle absolute left-0 top-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <select
                className="select select-primary w-full max-w-xs float-right ml-auto"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">All Categories</option>
                <option value="Historical">Historical</option>
                <option value="Nature">Nature</option>
                <option value="Scenery">Scenery</option>
                <option value="Food">Food</option>
                <option value="Adventure">Adventure</option>
            </select>

            <select
                className="select select-primary w-full max-w-xs float-right ml-10"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="">Sort By</option>
                <option value="Latest">Latest</option>
                <option value="Oldest">Oldest</option>
                <option value="Most Liked">Most Liked</option>
            </select>
            <button className="btn bg-[#7091E6] text-white ml-5" onClick={handleFilter}>Filter</button>
        </div>
    )
}

export default SearchBar