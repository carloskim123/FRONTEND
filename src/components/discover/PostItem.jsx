import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/helpers';

const PostItem = ({ author, title, createdAt, updatedAt, img, content }) => {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderShortenedContent = () => {
    // Set the maximum length for the displayed content
    const maxLength = 40;

    // Check if the content length exceeds the maximum length
    if (content.length > maxLength) {
      // If yes, display the shortened content with "..."
      return `${content.substring(0, maxLength)}...`;
    }

    // If not, display the full content
    return content;
  };

  return (
    <div
      className={`cursor-pointer max-w-lg mx-auto bg-white rounded-none-none shadow-md overflow-hidden mb-8 relative ${isHovered ? 'hovered' : ''
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className={`w-[600px] h-64 object-cover transform transition-transform duration-300 ease-in-out ${isHovered ? 'hover:scale-105' : ''
          }`}
        src={img}
        alt={title}
        onClick={openModal}
      />
      <div className="absolute bottom-0 left-0 bg-gray-900 bg-opacity-50 text-white p-2 w-full transition duration-300 ease-in-out transform hover:translate-y-0">
        <p className="text-sm">{formatDate(createdAt)}</p>

        <h2 className="text-lg font-bold cursor-pointer" onClick={openModal}>
          {title}
        </h2>
        <p className="text-gray-300">{author}</p>
      </div>

      {showModal && (
        <div onClick={closeModal} className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] backdrop-blur-[2px] bg-opacity-75 z-50">
          <div className="bg-white p-6 w-[90%] h-[450px] max-w-[450px] rounded-none-none shadow-xl animate__animated animate__fadeIn fadeIn">
            <div className="text-2xl font-semibold mb-4">{title}</div>
            <img className="w-full h-48 object-cover mb-4 rounded-none-none" src={img} alt={title} loading='lazy' />
            <div className="text-gray-700">
              <div>
                <span className="font-semibold">Author:</span> {author}
              </div>
              <div className="mt-2">{renderShortenedContent()}</div>
            </div>
            <div className="mt-4 flex justify-baseline gap-3">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-none-none" onClick={closeModal}>
                Close
              </button>
              <Link to={"/post/" + title} className="bg-blue-500 text-white px-4 py-2 rounded-none-none">
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
