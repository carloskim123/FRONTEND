import { User } from '../../utils/constants'


export const GetLatestPosts = async (setLatestPosts) => {
    try {
        const response = await fetch(`http://localhost:7000/posts/latest`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${User.authToken}`
            },
        });

        if (!response.ok) {
            throw new Error("posts retrieval failed");
        }

        const data = await response.json();

        setLatestPosts(data.posts);
    } catch (error) {
        console.error('An error occured while retrieving latest posts:', error);
    }
};

export const GetPost = async (setPostData, postTitle) => {
    try {
        const response = await fetch(`http://localhost:7000/posts/post/${postTitle}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${User.authToken}`
            }
        });

        console.log('Response status:', response.status); // Log the HTTP response status

        const data = await response.json();

        if (!response.ok) {
            throw new Error("post retrieval failed");
        }

        setPostData(data.post);
    } catch (error) {
        console.error('An error occurred while retrieving post:', error);
    }
};

export const UpdatePost = async (id, updatedPost) => {
    try {
        const response = await fetch(`http://localhost:7000/posts/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${User.authToken}`
            },
            body: JSON.stringify(updatedPost)
        });

        console.log('Response status:', response.status); // Log the HTTP response status

        const data = await response.json();
        return data.message;
        if (!response.ok) {
            throw new Error("post update failed");
        }

    } catch (error) {
        console.error('An error occurred while updating post:', error);
    }
};

export const GetUsersPosts = async (setUsersPosts, creatorId) => {
    try {
        const response = await fetch(`http://localhost:7000/posts/creator/${creatorId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${User.authToken}`
            },
        });

        if (!response.ok) {
            throw new Error("posts retrieval failed");
        }

        const data = await response.json();

        setUsersPosts(data.posts);
    } catch (error) {
        console.error('An error occured while retrieving posts:', error);
    }
};

export const NewPost = async (newPostData, setSuccess) => {
    try {
        const response = await fetch(`http://localhost:7000/posts/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${User.authToken}`
            },
            body: JSON.stringify(newPostData)
        });

        console.log('Response status:', response.status); 


        
        if(response.ok){
            setSuccess(true);
        } 

        if (!response.ok) {
            throw new Error("Post creation failed");
        }

    } catch (error) {
        console.error('An error occurred while creating post:', error);
    }
};


export const DeletePost = async (postToDeleteId, setSuccess) => {
    try {
        const response = await fetch(`http://localhost:7000/posts/delete/${postToDeleteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${User.authToken}`
            },
        });

        console.log('Response status:', response.status);


        if (response.ok) {
            setSuccess(true);
        }

        if (!response.ok) {
            throw new Error("Post deletion failed");
        }

    } catch (error) {
        console.error('An error occurred while deleting post:', error);
    }
};

export const GetByIds = async (setPosts, postIds) => {
    try {
        const response = await fetch('http://localhost:7000/posts/getByIds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${User.authToken}`
            },
            body: JSON.stringify({ postIds: postIds }) // Ensure postIds is wrapped in an object
        });

        if (!response.ok) {
            throw new Error('Posts retrieval failed');
        }

        const data = await response.json();

        setPosts(data.posts);
    } catch (error) {
        console.error('An error occurred while retrieving posts:', error);
    }
};
