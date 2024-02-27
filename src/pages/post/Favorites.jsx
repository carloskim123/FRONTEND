import { useEffect, useState } from "react";
import { GetSavedPosts } from "../../../services/user/userService";
import PostItem from "../../components/discover/PostItem";
import MotionWrapper from "../../components/navigation/Motion";

export default function Favorites() {
  const [savedPosts, setSavedPosts] = useState([]);
  const [message, setMessage] = useState(null);


  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const latestPosts = await GetSavedPosts(setMessage, setSavedPosts);
        console.log("retrieved saved posts")
        return latestPosts;
      } catch (error) {
        console.error('Error fetching latest posts:', error);
      }
    };

    fetchSavedPosts();
  }, []);


  return (
    <MotionWrapper className="min-h-screen lg:ml-20 md:ml-4 sm:ml-0">
      <section className="px-4 py-8 relative">

        <div>
          <h2 className="text- text-5xl font-semibold text-gray-800 mb-12">Saved Posts</h2>
          <div className='mb-2 text-green-800 font-bold'><i>Saved posts are now synced to your account</i></div>

        </div>
        <div className=" w-screen grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-2 md:gap-2 lg:gap-4">
          {savedPosts.length > 0 ? (
            savedPosts.map(post => (
              <PostItem key={post._id} author={post.author} title={post.title} img={post.img} content={post.content} createdAt={post.createdAt} updatedAt={post.updatedAt} />
            ))) : (
            <div className='text-2xl'>You have no saved posts</div>
          )
          }
        </div>
      </section>

    </MotionWrapper>
  )
}
