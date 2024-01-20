import Cookies from "js-cookie";



export const Routes: RouteInterface[] = [
     {
        path: "/posts/search",
        pathname: "Search"
    },
    {
        path: "/",
        pathname: "Discover"
    },
    {
        path: "/auth/sign-in",
        pathname: "Sign In"
    },
    {
        path: "/auth/sign-up",
        pathname: "Sign Up"
    },
    {
        path: "/users",
        pathname: "View All Users"
    },
    {
        path: "/u/saved",
        pathname: "Saved"
    }
]

interface UserInterface {
    _id: number;
    username:string;
    email:string;
    age:number;
    bio: string;
    authToken:string;
    profilePicture:string;
}

export const User: UserInterface = {
    _id: Cookies.get("id"),
    username: Cookies.get("username"),
    email: Cookies.get("email"),
    age: Cookies.get("age"),
    authToken: Cookies.get("authToken"),
    profilePicture: Cookies.get("profilePicture"),
    bio: Cookies.get("bio")
}