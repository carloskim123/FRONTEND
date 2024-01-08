import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.min.css";
import { GetPost } from '../../../services/post/postService';
import { User } from '../../../utils/constants';
import { formatDate } from '../../../utils/helpers'

const PostDetail: React.FC = () => {
  const [post, setPost] = useState(null);
  const { title } = useParams();

  useEffect(() => {
    const foundPost = GetPost(setPost, title);
    if (foundPost) {
      setPost(foundPost);
    } else {
      setPost(null); // Post not found
    }

  
  }, [title]);

  const sharePost = () => {
    alert('Implement your share functionality here');
  };

  const savePost = () => {
    alert('Implement your save functionality here');
  };

  const openFromSource = () => {
    toast.info("Image is about to be opened in a new tab");
    
    setTimeout(() => {
        window.open(post?.img, "_blank")?.focus();
    }, 2000);
  };

 

  const deletePost = () => {
    // Implement your logic to delete the post here
    alert('Implement your delete post functionality here');
  };

 

  return (
    <div className="container mx-auto mt-8 px-4">
      <ToastContainer theme='light' autoClose={1000} position='bottom-left'/>
      {post ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 150 }}
          className="max-w-3xl mx-auto bg-white rounded-lg overflow-hidden"
        >
          <img src={post.img} alt={post.title} onClick={openFromSource} className="w-full h-64 object-cover rounded-t-lg" />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-lg mb-4">{post.content}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-md text-gray-700">Author: {(post.author)}</p>
                <p className="text-md text-gray-700">Posted on: {formatDate(post.createdAt)}</p>
                <p className="text-md text-gray-700">Updated on: {formatDate(post.updatedAt)}</p>
                

              </div>
              <div>
                <button
                  onClick={sharePost}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  Share
                </button>
                <button
                  onClick={savePost}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
                {User.email.includes(post.author) && (
                  <button
                    onClick={deletePost}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-4"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <p className="text-center mt-8">Post not found or loading...</p>
      )}
    </div>
  );
};

export default PostDetail;
