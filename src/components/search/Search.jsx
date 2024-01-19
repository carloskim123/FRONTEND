import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
// import { GetLatestPosts, GetUsers } from '../../../services';
import PostItem from '../discover/PostItem';
import UserItem from '../user/UserItem';
import { GetLatestPosts } from '../../../services/post/postService';
import { GetUsers } from '../../../services/user/userService';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [searchQuery, setSearchQuery] = useState(queryParams.get('q') || '');
  const [searchCategory, setSearchCategory] = useState(queryParams.get('category') || 'posts');
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleSearch = () => {
    queryParams.set('q', searchQuery);
    queryParams.set('category', searchCategory);
    navigate(`?${queryParams.toString()}`);
  };

  const handleClear = () => {
    setSearchQuery('');
    queryParams.delete('q');
    queryParams.delete('category');

  };

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setSearchQuery(inputText);

    // Clear the previous typing timeout
    clearTimeout(typingTimeout);

    // Set a new typing timeout
    const timeout = setTimeout(() => {
      // Fetch data when typing stops
      fetchData();
    }, 500); // Adjust the delay as needed

    setTypingTimeout(timeout);
  };

  useEffect(() => {
    // Fetch data on component mount
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch all posts from the API and update the state directly
      await GetLatestPosts(setPosts);



      // Filter data based on search query and category
      const filteredResults = posts.filter((item) => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const lowerCaseAuthor = item.author.toLowerCase();
        const lowerCaseTitle = item.title.toLowerCase();
        const lowerCaseContent = item.content.toLowerCase();

        // Check if any of the fields (author, title, content) contains the search query
        return (
          (lowerCaseAuthor.includes(lowerCaseQuery) ||
            lowerCaseTitle.includes(lowerCaseQuery) ||
            lowerCaseContent.includes(lowerCaseQuery)) &&
          (searchCategory === 'posts' || searchCategory === item.category)
        );
      });

      // Update the state with the filtered results
      setResults(filteredResults);
    } catch (error) {
      // Handle error
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mx-auto lg:p-[10px]">
      <h2 className="text-5xl font-semibold text-gray-800 mb-12">Search Vinly</h2>

      <div className="sticky top bg-white z-5">
        <div className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            className="py-2 px-4 border border-gray-500 rounded-md focus:outline-none focus:border-black flex-grow"
            placeholder="Search..."
          />
          <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="ml-4 py-2 px-4 border border-gray-500 rounded-md focus:outline-none focus:border-black"
          >
            <option value="posts">Posts</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSearch}
            className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Search
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClear}
            className="ml-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
          >
            Clear
          </motion.button>
        </div>
      </div>

      {/* Results Display */}
      <section className="mt-[50px]">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-2 md:gap-2 lg:gap-4">
          {results.length > 0 ? (
            results.map((item) => (
              // Render PostItem or UserItem based on the selected category
                <PostItem
                  key={item._id}
                  author={item.author}
                  title={item.title}
                  img={item.img}
                  content={item.content}
                  createdAt={item.createdAt}
                  updatedAt={item.updatedAt}
                />
            ))
          ) : (
            <div className="text-2xl">0 results matching :  '{searchQuery}'</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Search;
