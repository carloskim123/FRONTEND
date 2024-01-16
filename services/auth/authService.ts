import Cookies from "js-cookie";

export const RegisterUser = async (userData, setAccountCreated, setError, setSuccess) => {
    try {
        const response = await fetch('http://localhost:7000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();


        if (!response.ok) {
            setError(data.message)
            throw new Error("REGISTRATION FAILED");
        }

        if (!response) {
            setError("Server under maintainance")
        }


        console.log(data.message)

        setSuccess(data.message)

        setAccountCreated(true);

    } catch (error) {
        console.error('Error registering user:', error);
    }
};


export const LoginUser = async (credentials, setAuth, setError, setSuccess) => {
    try {
        const response = await fetch('http://localhost:7000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.message)
            return console.log(data.message)
        }


        setSuccess(data.message)
        console.log('Login successful', data);

        const token = data.authToken;

        setAuth(true);

        const id = data.user._id.replace(/"/g, '');

        // Store static values in Cookies
        Cookies.set('authToken', token, { expires: 5 });
        Cookies.set("username", data.user.username, { expires: 5 })
        Cookies.set("id", id, { expires: 5 })
        Cookies.set("email", data.user.email, { expires: 5 })
        Cookies.set("age", data.user.age, { expires: 5 })
        Cookies.set("profilePicture", data.user.profilePicture, { expires: 5 })
        Cookies.set("bio", data.user.bio, { expires: 5 })

        setTimeout(() => {
            window.location.reload();
        },1500)

    } catch (error) {
        console.error('Error logging in:', error);
        setError("Server under maintainance")

    }
};





