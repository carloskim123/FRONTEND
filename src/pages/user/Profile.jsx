import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import MotionWrapper from '../../components/navigation/Motion';
import { User } from '../../../utils/constants';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.min.css"
import { DelAccount, UpdateUser } from '../../../services/user/userService';
import { DeletePost, GetUsersPosts } from '../../../services/post/postService';
import PostItem from '../../components/discover/PostItem';
import { clickToCopy } from '../../../utils/helpers';
import { NewPostButton } from '../../components/discover/Fixed';

// DelAccount -> params: none

const Profile = ({
  email = User.email || '',
  username = User.username || '',
  age = User.age || 0,
  lastSignIn = new Date(),
  profilePicture = User.profilePicture,
  bio = User.bio

}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [usersPosts, setUsersPosts] = useState([]);
  const [success, setSuccess] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    email,
    username,
    age,
    bio,
    profilePicture
  });
  const elementRef = useRef();

  const controls = useAnimation();
  const y = useMotionValue(0);

  const handleEditClick = () => {
    setIsEditing(true);
    controls.start({ y: 0 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await UpdateUser(editedInfo);

    setIsEditing(false);
    controls.start({ y: '100vh' });

    toast.info(`${User.username}'s info has been updated`);

    setTimeout(() => {
      window.location.reload();
    },2000)
  };

  const handleGetUserPosts = async () => {
    await GetUsersPosts(setUsersPosts, User._id);
    console.log("User posts retrieved!!")
  }


  const handleDeletePost = async (postId) => {
    console.log("User posts retrieved!!")
    await DeletePost(postId, setSuccess);
  }


  const dragConstraints = { top: 0, bottom: 0 };

  const opacity = useTransform(y, [-100, 0], [0, 1]);
  const translateY = useTransform(y, [0, 100], ['0%', '100%']);


  useEffect(() => {
    handleGetUserPosts();

  },[])

  useEffect(() => {
    if(success) {
      toast.info("Post Deleted")
    }

  },[success])



  useEffect(() => {
    if (elementRef.current) {
      clickToCopy(elementRef.current);
    }
  }, []);

  return (
    <MotionWrapper>
      <ToastContainer theme='light' autoClose={1500} position='top-right' closeOnClick/>


      <div className="flex flex-col min-h-screen mb-[100px]">

        <motion.div
          className="max-w-md w-full bg-white overflow-hidden"
          style={{ y }}
          drag="y"
          dragConstraints={dragConstraints}
        >
            <div className="p-4 flex sm:ml-[10%] ml-[10%] lg:ml-[80px] gap-6">
            <div className="flex items-start justify-center">
        <img
        className="w-full md:w-[250px] lg:w-[300px] h-50px md:h-[170px] sm:h-[50px]rounded-md"
        src={`${User.profilePicture}`}
        alt="Profile"
      />



            </div>
            <section>
                <div className="mt-4">
                  <h1 ref={elementRef} className="text-md sm:text-sm md:text-md lg:text-3xl  font-semibold">{username}</h1>

                </div>
                
                <div className="mt-6">
                  <button
                    className="underline px-4 text-sm m:text-sm md:text-sm lg:text-lg  py-2 rounded-lg"
                    onClick={handleEditClick}
                  >
                    Edit Info
                  </button>
                </div>
            </section>
          </div>

          <div>
            <h1 className="pl-[20%] text-lg text-gray-800 font-semibold">{email}</h1>
            <h1 className="pl-[20%] text-lg text-gray-800 font-extrabold">{bio}</h1>

          </div>


        </motion.div>

        <NewPostButton/>

        <div className="lg:px-24 sm:px-10 px-10 mt-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-2 md:gap-2 lg:gap-6">
          {usersPosts.map(post => (
            <div key={post.id}>
              <PostItem key={post._id} author={post.author} title={post.title} img={post.img} content={post.content} createdAt={post.createdAt} updatedAt={post.updatedAt}/>
            </div>

          ))}
        </div>
        

        {isEditing && (
          <motion.div
            className="fixed bottom-0 left-50 right-0 z-50 bg-white p-6 max-w-lg w-full rounded-lg shadow-xl"
            initial={{ y: '100vh' }}
            animate={controls}
            style={{ opacity, y: translateY }}
            drag="y"
            dragConstraints={dragConstraints}
          >
            <div>
              <h2 className="text-xl font-semibold mb-4">Edit Information</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editedInfo.email}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 outline-slate-950 rounded-md p-2 mt-1"
                  />
                </div>
                  <div className="mb-4">
                  <label htmlFor="bio" className="block text-gray-700">
                    Bio:
                  </label>
                  <input
                    type="text"
                    id="bio"
                    name="bio"
                    value={editedInfo.bio}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 outline-slate-950 rounded-md p-2 mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={editedInfo.username}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 outline-slate-950 rounded-md p-2 mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="age" className="block text-gray-700">
                    Age:
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={editedInfo.age}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 outline-slate-950 rounded-md p-2 mt-1"
                  />
                </div>

            
                <div className="mb-4">
                  <label htmlFor="age" className="block text-gray-700">
                    Profile Picture:
                  </label>
                  <input
                    type="text"
                    id="profilePicture"
                    name="profilePicture"
                    value={editedInfo.profilePicture}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 outline-slate-950 rounded-md p-2 mt-1"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </MotionWrapper>
  );
};

export default Profile;
