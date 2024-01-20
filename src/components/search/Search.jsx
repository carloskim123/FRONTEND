import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GetLatestPosts } from '../../../services/post/postService';
import PostItem from '../discover/PostItem';

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [results, setResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setSearchQuery(inputText);

    // Clear the previous typing timeout
    clearTimeout(typingTimeout);

    // Set a new typing timeout
    const timeout = setTimeout(() => {
      // Fetch data when typing stops
      fetchData();
    }, 1000); // Adjust the delay as needed

    setTypingTimeout(timeout);
  };

  const handleClear = () => {
    setSearchQuery('');
    setSearchCategory('posts');
    setResults([]); // Clear results when clearing the search
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
    <div className="container mx-auto lg:px-[20px] px-auto mb-[10%]">
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
            onClick={handleClear}
            className="ml-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
          >
            Clear
          </motion.button>
        </div>
      </div>

      {/* Results Display */}
      <section className="mt-[50px]">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-2 md:gap-2 lg:gap-4 ">
          {results.length > 0  && (
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
          )}
          
        </div>
        {results.length == 0 && searchQuery && (
            <div className="text-2xl">0 results matching :  '{searchQuery}'</div>
          )}

      
      </section>
    </div>
  );
};

export default Search;
