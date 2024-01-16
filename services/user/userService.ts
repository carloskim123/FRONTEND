import Cookies from 'js-cookie';
import { User } from '../../utils/constants'

export const UpdateUser = async (updatedUserData) => {
    try {
        const response = await fetch(`http://localhost:7000/users/edit/${User._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${User.authToken}`
            },
            body: JSON.stringify(updatedUserData),
        });

        if (!response.ok) {
            throw new Error("Updating user info failed");
        }

        const data = await response.json();

        // remove specific user cookies
        Cookies.remove("username");
        Cookies.remove("email")
        Cookies.remove("age")
        Cookies.remove("profilePicture")
        Cookies.remove("bio");


        // Set the user cookies back again

        Cookies.set("username", data.user.username, { expires: 5 })
        Cookies.set("email", data.user.email, { expires: 5 })
        Cookies.set("age", data.user.age, { expires: 5 })
        Cookies.set("profilePicture", data.user.profilePicture, { expires: 5 })
        Cookies.set("bio", data.user.bio, { expires: 5 })

    } catch (error) {
        console.error('Error updating user:', error);
    }
};


export const GetUser = async (username, setUserData) => {
    try {
        const response = await fetch(`http://localhost:7000/users/one/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${User.authToken}`
            },
        });

        if (!response.ok) {
            throw new Error("user retrieval failed");
        }

        const data = await response.json();

        setUserData(data.user);

        console.log(data.user._id)

    } catch (error) {
        console.error(`Error retrieving user with username: ${username} :`, error);
    }
};

export const GetUsers = async (setUsersData) => {
    try {
        const response = await fetch(`http://localhost:7000/users/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${User.authToken}`
            },
        });

        if (!response.ok) {
            throw new Error("user retrieval failed");
        }

        const data = await response.json();

        setUsersData(data.users)
    } catch (error) {
        console.error('Error retrieving users:', error);
    }
};

export const DelAccount = async () => {
    try {
        const response = await fetch(`http://localhost:7000/users/del/${User._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${User.authToken}`
            },
        });

        if (!response.ok) {
            throw new Error("user deletion failed");
        }


    } catch (error) {
        console.error('Error deleting user:', error);
    }
};



export const SavePost = async (postId, setMessage) => {
    try {
        const response = await fetch(`http://localhost:7000/users/savePost/${User._id}/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${User.authToken}`
            },
        });

       

        const data = await response.json();

        if(response.ok) {
            setMessage(data.message)
        } else {
            setMessage(data.message)

        }


    } catch (error) {
        setMessage('Error retrieving users:', error);
    }
};

export const GetSavedPosts = async (setMessage, setSavedPosts) => {
    try {
        const response = await fetch(`http://localhost:7000/users/savedPosts/${User._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${User.authToken}`
            },
        });

        if (!response.ok) {
            throw new Error("posts saved retreival failed");
        }

        const data = await response.json();
        setSavedPosts(data.savedPosts)
        setMessage(data.message);

        console.log(data.message)
    } catch (error) {
        console.error('Error retrieving users saved posts:', error);
    }
};


export const RemoveFromSavedPosts = async (postId, setMessage) => {
    try {
        const response = await fetch(`http://localhost:7000/users/removeSavedPost/${User._id}/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${User.authToken}`
            },
        });

        if (!response.ok) {
            throw new Error("error while removing from saved");
        }

        const data = await response.json();
        setMessage(data.message)
    } catch (error) {
        console.error('Error removing from users saved posts:', error);
    }
};