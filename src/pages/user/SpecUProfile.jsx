import React, { useEffect, useState, useRef } from 'react';
import { GetUser } from '../../../services/user/userService';
import { useParams } from 'react-router-dom';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import { clickToCopy } from '../../../utils/helpers';
import PostItem from '../../components/discover/PostItem';
import { GetUsersPosts } from '../../../services/post/postService';
import MotionWrapper from '../../components/navigation/Motion';
import Notification from '../../helpers/Notification';

const SpecUProfile = () => {
  const [userData, setUserData] = useState(null);
  const [usersPosts, setUsersPosts] = useState([]);
  const { username } = useParams();

  const controls = useAnimation();
  const y = useMotionValue(0);
  const elementRef = useRef();
  const notify = Notification();

  const handleGetUserPosts = async () => {
    try {
      // Fetch user posts
      const posts = await GetUsersPosts(setUsersPosts, userData?._id);

      // Check the length of posts immediately
      if (!posts.length) {
        notify.displayInfo("User has no posts");
      }

    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await GetUser(username, setUserData);


      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  useEffect(() => {
    if (elementRef.current) {
      clickToCopy(elementRef.current, notify);
    }
  }, []);

  const dragConstraints = { top: 0, bottom: 0 };
  const opacity = useTransform(y, [-100, 0], [0, 1]);
  const translateY = useTransform(y, [0, 100], ['0%', '100%']);

  return (
    <MotionWrapper>

      <div className="flex flex-col min-h-screen mb-[100px]">
        <ToastContainer theme="light" autoClose={1500} position="top-right" closeOnClick />
        <button
          onClick={handleGetUserPosts}
          className="bg-transparent border border-black light:text-black w-full p-4 rounded-none-none"
        >
          Get User Posts
        </button>


        <div className="p-4 flex sm:ml-[10%] ml-[10%] lg:ml-[80px] gap-6">
          <div className="flex items-start justify-center">
            <img
              className="w-full md:w-[250px] lg:w-[200px] h-[130px] md:h-40 lg:h-50 rounded-none-none"

              src={`${userData?.profilePicture}`}
              alt="Profile"
            />
          </div>
          <section>
            <div className="mt-4">
              <h1 ref={elementRef} className="text-3xl font-semibold">
                {username}
              </h1>
            </div>

            <div className="mt-6"></div>
          </section>
        </div>



        <div>
          <div className="lg:px-24 sm:px-10 px-10 mt-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-2 md:gap-2 lg:gap-6">
            {usersPosts.map((post) => (
              <div key={post.id}>
                <PostItem
                  key={post._id}
                  author={post.author}
                  title={post.title}
                  img={post.img}
                  content={post.content}
                  createdAt={post.createdAt}
                  updatedAt={post.updatedAt}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MotionWrapper>

  );
};

export default SpecUProfile;
