import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import Modal from 'react-modal';
import { DeletePost, GetPost } from '../../../services/post/postService';
import { User } from '../../../utils/constants';
import { formatDate } from '../../../utils/helpers';
import { RemoveFromSavedPosts, SavePost } from '../../../services/user/userService';

// Make sure to set appElement to avoid accessibility issues
Modal.setAppElement('#root');

const PostDetail: React.FC = () => {
  const [post, setPost] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const { title } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    GetPost(setPost, title);
  }, [title]);

  const savePost = async () => {
    try {
      await SavePost(post._id, setMessage);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const unSavePost = async () => {
    try {
      await RemoveFromSavedPosts(post._id, setMessage);
    } catch (error) {
      toast.error(error.message);
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

  const handleDeleteConfirmation = () => {
    // Show the delete confirmation modal
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    // Hide the delete confirmation modal
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    // Perform the delete operation
    await DeletePost(post._id, setSuccess);

    // Hide the delete confirmation modal
    setShowDeleteModal(false);

    setTimeout(() => {
      navigate('/');
    }, 2500);
  };

  const copyUrl = async () => {
    const currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl);

    toast.info('Url copied to clipboard');
  };

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
          className="max-w-3xl mx-auto  bg-white rounded-none-none overflow-hidden"
        >
          {post.creatorId === User._id && (
            <div className="mb-2 font-bold italic">Owned by you</div>
          )}
          {post.creatorId !== User._id && (
            <div className="mb-2 font-bold italic">
              Owned by {`${post.author}`}
            </div>
          )}
          <img
            src={post.img}
            alt={post.title}
            onClick={openFromSource}
            className="w-full h-64 object-cover rounded-none-none"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-lg mb-4">{post.content}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-md text-gray-700">
                  Author: {post.author}
                </p>
                <p className="text-md text-gray-700">
                  Posted: {formatDate(post.createdAt)}
                </p>
                <p className="text-md text-gray-700">
                  Updated: {formatDate(post.updatedAt)}
                </p>
              </div>
              <div className="flex md:flex-row lg:flex-row sm:flex-col flex-col gap-3">
                <button
                  onClick={copyUrl}
                  className="bg-blue-500 hover:bg-blue-600 dark:text-white font-bold py-2 px-4 "
                >
                  Url
                </button>
                {post.creatorId !== User._id && (
                  <>
                    <button
                      onClick={savePost}
                      className={`bg-yellow-500 hover:bg-yellow-600 dark:text-white font-bold py-2 px-4 `}
                    >
                      Save
                    </button>
                    <button
                      onClick={unSavePost}
                      className={`bg-blue-500 hover:bg-blue-600 dark:text-white font-bold py-2 px-4 `}
                    >
                      remove
                    </button>
                  </>
                )}
                {post.creatorId === User._id && (
                  <>
                    <button
                      onClick={handleDeleteConfirmation}
                      className="bg-red-500 hover:bg-red-600 dark:text-white font-bold py-2 px-4"
                    >
                      Delete
                    </button>
                    <button
                      onClick={navigateToEdit}
                      className="bg-indigo-500 hover:bg-indigo-600 dark:text-white font-bold py-2 px-4"
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

      {/* Delete Confirmation Modal */}
<Modal
  isOpen={showDeleteModal}
  onRequestClose={handleCancelDelete}
  contentLabel="Delete Confirmation"
  className="h-[100%] fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] backdrop-blur-[1px] bg-opacity-75"
>
  <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Delete</h2>
    <p className="text-gray-700 mb-6">Are you sure you want to delete this post?</p>
    <div className="flex justify-center">
      <button
        onClick={handleCancelDelete}
        className="text-gray-700 hover:text-gray-800 font-bold px-4 py-2 rounded border border-gray-300 mr-2"
      >
        Cancel
      </button>
      <button
        onClick={handleConfirmDelete}
        className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded"
      >
        Delete
      </button>
    </div>
  </div>
</Modal>

    </div>
  );
};

export default PostDetail;
