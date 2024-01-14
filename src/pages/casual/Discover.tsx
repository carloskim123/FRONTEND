// Discover.js
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnimation } from 'framer-motion';
import MotionWrapper from '../../components/navigation/Motion';
import { ToastContainer, toast } from 'react-toastify';
import { GetLatestPosts } from '../../../services/post/postService';
import AuthContext from '../../context/AuthContext';
import PostItem from '../../components/discover/PostItem';
import { NewPostButton, RefreshButton } from '../../components/discover/Fixed';

function Discover() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [latestPosts, setLatestPosts] = useState([]);
  const liquidAnimationControls = useAnimation();

  const handleRefresh = async () => {
    try {
      const latestPosts = await GetLatestPosts(setLatestPosts);
      toast.info("Refreshed!");
      return latestPosts;
    } catch (error) {
      console.error('Error fetching latest posts:', error);
    }
  }

  useEffect(() => {
    if (!auth) {
      navigate("/auth/sign-in");
    }
  }, [auth, navigate]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const latestPosts = await GetLatestPosts(setLatestPosts);
        console.log("Feed generated")
        return latestPosts;
      } catch (error) {
        console.error('Error fetching latest posts:', error);
      }
    };

    fetchLatestPosts();
  }, []);

  useEffect(() => {
    const liquidEffect = async () => {
      await liquidAnimationControls.start({
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        backgroundColor: ['#00c6fb', '#005bea', '#ff6b6b'],
        transition: {
        duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
        },
      });
    };

    liquidEffect();
  }, [liquidAnimationControls]);

  return (
    <MotionWrapper className="min-h-screen lg:ml-20 md:ml-4 sm:ml-0">
      <ToastContainer theme='light' autoClose={1500} position='top-right' closeOnClick/>

      <section className="px-4 py-8 relative">
        <style>
          {`
            @keyframes liquidGradient {
              0% {
                background-position: 0% 50%;
                background-color: #00c6fb;
              }
              50% {
                background-position: 100% 50%;
                background-color: #005bea;
              }
              100% {
                background-position: 0% 50%;
                background-color: #ff6b6b;
              }
            }
          `}
        </style>
        <h2 className="text- text-5xl font-semibold text-gray-800 mb-12">Latest Posts</h2>

        <NewPostButton />
        <RefreshButton handleRefresh={handleRefresh} />

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-2 md:gap-2 lg:gap-4">
          {latestPosts.length > 0 ? (
            latestPosts.map(post => (
              <PostItem key={post._id} author={post.author} title={post.title} img={post.img} content={post.content} createdAt={post.createdAt} updatedAt={post.updatedAt} />
            ))) : (
              <div className='text-2xl'>No posts at the moment</div>
            )
          }
        </div>
      </section>
    </MotionWrapper>
  );
}

export default Discover;
