import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.min.css";
import { DeletePost, GetPost } from '../../../services/post/postService';
import { User } from '../../../utils/constants';
import { formatDate } from '../../../utils/helpers'

const PostDetail: React.FC = () => {
  const [post, setPost] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const { title } = useParams();

  useEffect(() => {
    const foundPost = GetPost(setPost, title);
    if (foundPost) {
      setPost(foundPost);
    } else {
      setPost(null); 
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

 

  const deletePost = async () => {
    await DeletePost(post._id, setSuccess);

    setTimeout(() => {
      navigate('/')
    },2500)
  };

  useEffect(() => {
    if(success) {
      toast.info("Post Deleted successfully")
    }

  },[success])

 

  return (
    <div className="container mx-auto mt-8 px-4">
      <ToastContainer theme='light' autoClose={1000} position='top-left' />
      {post ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, type: 'easeIn' }}
          className="max-w-3xl mx-auto bg-white rounded-lg overflow-hidden"
        >
          {post.creatorId == User._id && <div className='mb-2 font-bold italic'>Owned by you</div>}
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
              <div className='flex md:flex-row lg:flex-row sm:flex-col flex-col gap-3'>
                <button
                  onClick={sharePost}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Share
                </button>
                <button
                  onClick={savePost}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>

                {post.creatorId == User._id && (
                  <>
                  <button
                      onClick={deletePost}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  
                  <button
                    onClick={() => navigate(`/post/edit/${post.title}`)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
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
