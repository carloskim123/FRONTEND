import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion'
import MotionWrapper from '../../components/navigation/Motion'
import { User } from '../../../utils/constants'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/ReactToastify.min.css"
import { DelAccount, UpdateUser } from '../../../services/user/userService'
import { GetUsersPosts } from '../../../services/post/postService'
import PostItem from '../../components/discover/PostItem'
import { clickToCopy } from '../../../utils/helpers'
import { NewPostButton } from '../../components/discover/Fixed'
import { useNavigate } from 'react-router-dom'

// DelAccount -> params: none

const Profile = ({
  email = User.email || '',
  username = User.username || '',
  age = User.age || 0,
  lastSignIn = new Date(),
  profilePicture = User.profilePicture,
  bio = User.bio
}) => {
  const [usersPosts, setUsersPosts] = useState([])
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const elementRef = useRef()

  // Fetch user posts
  const handleGetUserPosts = async () => {
    await GetUsersPosts(setUsersPosts, User._id)
    console.log("User posts retrieved!!")
  }

  // Effect to fetch user posts on component mount
  useEffect(() => {
    handleGetUserPosts()
  }, [])

  // Effect to copy the username to clipboard
  useEffect(() => {
    if (elementRef.current) {
      clickToCopy(elementRef.current)
    }
  }, [])

  return (
    <MotionWrapper>
      <ToastContainer theme='light' autoClose={1500} position='top-right' closeOnClick />

      <div className={`flex flex-col min-h-screen mb-[100px]  `}>
        <motion.div
          className="max-w-screen-2xl w-full bg-white overflow-hidden"
          drag="y"
        >
          <div className="p-4 flex sm:ml-0 ml-[4%] lg:ml-[7%] md:ml-[3%] lh gap-6">
            <div className="flex items-start justify-center">
              <img
                className="w-full md:w-[250px] lg:w-[200px] h-[130px] md:h-40 lg:h-50 rounded-none-none"
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
                  className="underline px-4 text-sm m:text-sm md:text-sm lg:text-lg  py-2 rounded-none-lg"
                  onClick={() => navigate("/u/profile/edit")}
                >
                  Edit Info
                </button>
                <button
                  className="underline text-red-500 px-4 text-sm m:text-sm md:text-sm lg:text-lg  py-2 rounded-none-lg"
                  onClick={() => navigate('/auth/logout')}
                >
                  Logout
                </button>

              </div>
            </section>
          </div>

        </motion.div>

        <NewPostButton />
        {usersPosts.length > 0 ? (
          <div className="lg:px-24 sm:px-10 px-10 mt-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-2 md:gap-2 lg:gap-6">
            {usersPosts.map(post => (
              <div key={post._id}>
                <PostItem key={post._id} author={post.author} title={post.title} img={post.img} content={post.content} createdAt={post.createdAt} updatedAt={post.updatedAt} />
              </div>
            ))}
          </div>
        ) : (
          <div className='mt-[3rem] text-2xl text-center font-bold'>You haven't posted anything yet</div>
        )}



      </div>
    </MotionWrapper>
  )
}

export default Profile