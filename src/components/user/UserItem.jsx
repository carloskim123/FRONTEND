import React from "react";

const UserItem = ({ username, profilePic }) => {
  return (
    <div className="bg-white p-4 border border-gray-300 rounded-md">
      <div className="flex items-center">
        <img
          src={profilePic}
          alt={`Avatar of ${username}`}
          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <p className="font-semibold">{username}</p>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
