import { useEffect, useState } from "react";
import { GetUsers } from "../../../services/user/userService";
import { Link } from "react-router-dom";
import MotionWrapper from "../../components/navigation/Motion";

function DisplayUsers() {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    // Fetch users data when the component mounts
    const fetchUsers = async () => {
      try {
        const users = await GetUsers(setUsersData);
        return users;
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <MotionWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {usersData.map((user) => (
          <Link to={`/u/${user.username}`} key={user._id} className="bg-white rounded-none shadow-md p-4">
            <img
              className="w-20 h-20 rounded-none-full mx-auto mb-2 hover:cursor-pointer"
              src={user.profilePicture}
              alt={`Profile ${user.username}`}

            />
            <h3 className="text-xl hover:cursor-pointer font-semibold text-center">{user.username}</h3>
            <p className="text-gray-600 hover:cursor-pointer text-center">{user.email}</p>
          </Link>
        ))}
      </div>
    </MotionWrapper>

  );
}

export default DisplayUsers;
