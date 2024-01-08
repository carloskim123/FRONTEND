import { Link, useNavigate } from 'react-router-dom';
import MotionWrapper from '../../components/navigation/Motion';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { GetLatestPosts } from '../../../services/post/postService'
import PostItem from '../../components/discover/PostItem';

function Discover() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [latestPosts, setLatestPosts] = useState([]);



  useEffect(() => {
    if(!auth) {
        navigate("/auth/sign-in")
    }

  },[auth, navigate])

 
  useEffect(() => {
    // Fetch users data when the component mounts
    const fetchLatestPosts = async () => {
      try {
        const latestPosts = await GetLatestPosts(setLatestPosts);
        return latestPosts;
      } catch (error) {
        console.error('Error fetching latest posts:', error);
      }
    };

    fetchLatestPosts();
  }, []);

  

  return (
    <MotionWrapper className="min-h-screen">
      <section className="px-4 py-8">
      <h2 className="text-center text-5xl font-semibold text-gray-800 mb-12 ">Lastest Posts</h2>
      <Link to={"/post/new"}><button className='bg-blue-500 text-white rounded-md p-2 mb-4 w-[120px]'>New Post +</button></Link>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-2 md:gap-2 lg:gap-4">
          {
            latestPosts.map(post => (
              <PostItem key={post._id} author={post.author} title={post.title} img={post.img} content={post.content} createdAt={post.createdAt} updatedAt={post.updatedAt}/>
            ))
          }
        </div>
      </section>
    </MotionWrapper>
  );
}

export default Discover;
