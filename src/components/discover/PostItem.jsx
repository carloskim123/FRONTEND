import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "react-toastify/ReactToastify.min.css"
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/helpers';


const PostItem = ({ author, title, createdAt, updatedAt, img, content }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };



  return (
    <div  className="cursor-pointer max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-8 relative">
      <img className="w-full h-64 object-cover" src={img} alt={title} onClick={openModal} />
      <div className="absolute bottom-0 left-0 bg-gray-900 bg-opacity-50 text-white p-2 w-full transition duration-300 ease-in-out transform hover:translate-y-0">
        <p className="text-sm">posted on: {formatDate(createdAt)}</p>
        <p className="text-sm">updated on: {formatDate(updatedAt)}</p>

        <h2 className="text-lg font-bold cursor-pointer" onClick={openModal}>
          {title}
        </h2>
        <p className="text-gray-300">{author}</p>
      </div>

      {showModal && (
        <div onClick={closeModal} className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] backdrop-blur-[2px] bg-opacity-75 z-50">
          <div className="bg-white p-6 max-w-lg w-[90%] h-[480px] rounded-lg shadow-xl animate__animated animate__fadeIn fadeIn">
            <div className="text-2xl font-semibold mb-4">{title}</div>
            <img className="w-full h-48 object-cover mb-4 rounded-lg" src={img} alt={title} />
            <div className="text-gray-700">
              <div>
                <span className="font-semibold">Author:</span> {author}
              </div>
              <div className="mt-2">{content}</div>
            </div>
            <div className="mt-4 flex justify-baseline gap-3">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={closeModal}>
                Close
              </button>
              <Link to={"/post/" + title} className="bg-blue-500 text-white px-4 py-2 rounded-lg" >
                See in detail
              </Link>
   
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

PostItem.propTypes = {
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default PostItem;
