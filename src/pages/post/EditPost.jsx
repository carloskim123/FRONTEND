import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetPost, UpdatePost } from '../../../services/post/postService';
import { motion } from 'framer-motion';
import { User } from '../../../utils/constants';
import AuthContext from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.min.css";


const EditPost = () => {
  const { auth } = useContext(AuthContext)
  const { title } = useParams();
  const [post, setPost] = useState(null);
  const [updatedPost, setUpdatedPost] = useState({});
  const [showMask, setShowMask] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const foundPost = await GetPost(setPost, title);
      if (foundPost) {
        setPost(foundPost);
        setUpdatedPost({
          title: foundPost.title,
          content: foundPost.content,
          author: foundPost.author,
          img: foundPost.img,
        });
     

      } else {
        // Handle post not found
      }
    };

    fetchPost();
  }, [ title]);

  useEffect(() => {
    if(!auth) {
        navigate(-1);
    }
  },[auth, navigate])

  const handleChange = (fieldName, value) => {
    setUpdatedPost((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const updatePost = async (e) => {
    e.preventDefault();

    console.log(post._id);
    // Call the UpdatePost service function with updated data
    await UpdatePost(post._id, updatedPost);

    toast.info("Post updated");
    setTimeout(() => {
        navigate('/post/' + post.title)
    }, 1500);
  };


  return (
    <div className="container mx-auto mt-8 px-4">
      <ToastContainer theme='light' autoClose={1000} position='top-left' />

      {showMask ? (
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">You are not allowed to edit this post.</h2>
          <p>Please make sure you own this post before attempting to edit.</p>
        </div>
      ) : (
        <>
          <h2 className="text-4xl font-bold mb-4 text-center">Update Post</h2>
          {post && (
            <motion.form
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={(e) => updatePost(e)}
              className="max-w-md mx-auto"
            >
              <div className="grid grid-cols-1 gap-4">
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={updatedPost.title || post.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
                    Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={updatedPost.content || post.content}
                    onChange={(e) => handleChange('content', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-all duration-300 h-[150px] overflow-auto"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={updatedPost.author || post.author}
                    onChange={(e) => handleChange('author', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="img" className="block text-gray-700 text-sm font-bold mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="img"
                    name="img"
                    value={updatedPost.img || post.img}
                    onChange={(e) => handleChange('img', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300"
                  />
                </div>
                <div className="mb-6 flex gap-5">
                  <button
                    type="submit"
                    className="bg-indigo-700 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 w-full"
                  >
                    Update Post
                  </button>
                  <button
                    onClick={() => navigate(-1)}
                    className="bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 w-full"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.form>
          )}
        </>
      )}
    </div>
  );
};

export default EditPost;
