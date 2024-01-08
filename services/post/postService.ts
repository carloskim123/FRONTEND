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
        console.error('An error occured while retrieving posts:', error);
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
