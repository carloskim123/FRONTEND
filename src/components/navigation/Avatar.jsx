import React from "react";
import { User } from "../../../utils/constants";
import { Link } from "react-router-dom";

function Avatar() {
  return (
    <div className="flex items-center mt-3">
      <Link to={"/u/profile"} className="w-8 h-8 rounded-none-full overflow-hidden">
        <img
          src={User.profilePicture}  
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      </Link>
    </div>
  );
}

export default Avatar;
