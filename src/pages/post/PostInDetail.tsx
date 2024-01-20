import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import Modal from 'react-modal';
import { DeletePost, GetPost } from '../../../services/post/postService';
import { User } from '../../../utils/constants';
import { formatDate } from '../../../utils/helpers';
import { GetUser, RemoveFromSavedPosts, SavePost } from '../../../services/user/userService';

// Make sure to set appElement to avoid accessibility issues
Modal.setAppElement('#root');

const PostDetail: React.FC = () => {
  const [post, setPost] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const { title } = useParams();

  useEffect(() => {
    GetPost(setPost, title);
  }, [title]);

  


  const savePost = async () => {
    try {
    await SavePost(post._id, setMessage)
      
    } catch (error) {
      toast.error(error.message)

    }    
  };

  const unSavePost = async () => {
    try {
     await RemoveFromSavedPosts(post._id, setMessage);
      
    } catch (error) {
      toast.error(error.message)
      
    }    
  };







  const navigateToEdit = () => {
    navigate(`/post/edit/${post.title}`);
  };

  const openFromSource = () => {
    toast.info('Image is about to be opened in a new tab');

    setTimeout(() => {
      window.open(post?.img, '_blank')?.focus();
    }, 2000);
  };

  const deletePost = async () => {
    await DeletePost(post._id, setSuccess);

    setTimeout(() => {
      navigate('/');
    }, 2500);
  };

  const copyUrl = async () => {
    const currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl);

    toast.info("Url copied to clipboard")
    
  }


useEffect(() => {
  if (success) {
    toast.success('Post Deleted successfully');
  }
}, [success]);

useEffect(() => {
  if (message) {
    toast.info(message);
  }
}, [message]);

  return (
    <div className="container mx-auto mt-8 px-2">
      <ToastContainer theme="light" autoClose={3000} position="top-left" />
      {post ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, type: 'easeIn' }}
          className="max-w-3xl mx-auto  bg-white rounded-lg overflow-hidden"
        >
          {post.creatorId === User._id && <div className="mb-2 font-bold italic">Owned by you</div>}
          {post.creatorId != User._id &&  <div className="mb-2 font-bold italic">Owned by {`${post.author}`}</div>}
          <img
            src={post.img}
            alt={post.title}
            onClick={openFromSource}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-lg mb-4">{post.content}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-md text-gray-700">Author: {(post.author)}</p>
                <p className="text-md text-gray-700">Posted: {formatDate(post.createdAt)}</p>
                <p className="text-md text-gray-700">Updated: {formatDate(post.updatedAt)}</p>
              </div>
              <div className="flex md:flex-row lg:flex-row sm:flex-col flex-col gap-3">
                <button
                  onClick={copyUrl}
                  className="bg-blue-500 hover:bg-blue-600 dark:text-white font-bold py-2 px-4 rounded"
                >
                  Url
                </button>
                <button
                  onClick={savePost}
                  className={`bg-yellow-500 hover:bg-yellow-600 dark:text-white font-bold py-2 px-4 rounded`}
                >
                  Save
                </button>
                 <button
                  onClick={unSavePost}
                  className={`bg-blue-500 hover:bg-blue-600 dark:text-white font-bold py-2 px-4 rounded`}
                >
                  remove
                </button>
                {post.creatorId === User._id && (
                  <>
                    <button
                      onClick={deletePost}
                      className="bg-red-500 hover:bg-red-600 dark:text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={navigateToEdit}
                      className="bg-indigo-500 hover:bg-indigo-600 dark:text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                  </>
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
