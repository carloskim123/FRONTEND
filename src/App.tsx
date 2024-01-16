import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Root from "./layouts/Root"
import Discover from "./pages/casual/Discover"
import SignUpPage from "./pages/auth/SignUp"
import SignInPage from "./pages/auth/SignIn"
import Profile from "./pages/user/Profile"
import NewPostPage from "./pages/post/NewPost"
import PostInDetail from "./pages/post/PostInDetail"
import { useEffect, useState } from "react"
import AuthContext from "./context/AuthContext"
import Cookies from 'js-cookie'
import Logout from "./pages/auth/Logout"
import SpecUProfile from "./pages/user/SpecUProfile"
import DisplayUsers from "./pages/user/DisplayUsers"
import Favorites from "./pages/post/Favorites"
import EditPost from "./pages/post/EditPost"
import PrivacyStatement from "./pages/auth/PrivacyStatement"

/**
 * App is the root component that renders the React Router routes 
 * and AuthContext provider.
 *
 * It manages the auth state and account creation state with React hooks.
 * It reads the auth cookie on mount and sets the auth state.
 * 
 * The React Router routes are configured to render different page components 
 * based on the path.
 *
 * The AuthContext provider shares the auth state and account creation state
 * with child components.
 */
function App() {
  const [auth, setAuth] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  const readCookie = () => {
    const user = Cookies.get("authToken");
    if (user) {
      setAuth(true)
    }
  }

  useEffect(() => {
    readCookie();
  }, [])


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" Component={Root}>

        <Route index Component={Discover} />
        <Route path="/u/profile" element={<Profile />} />
        <Route path="/u/:username/profile" element={<SpecUProfile />} />
        <Route path="/users" element={<DisplayUsers />} />

        <Route path="/u/saved" element={<Favorites />} />
        


        <Route path="/post/new" element={<NewPostPage />} />
        <Route path="/post/:title" element={<PostInDetail />} />
        <Route path="/post/edit/:title" element={<EditPost />} />


        {/* Authenticate */}
        <Route path="/auth/sign-up" Component={SignUpPage} />
        <Route path="/auth/sign-in" Component={SignInPage} />
        <Route path="/auth/logout" Component={Logout} />
        <Route path="/auth/privacy-statement" Component={PrivacyStatement} />




      </Route>
    )
  )

  return (
    <AuthContext.Provider value={{ auth, setAuth, setAccountCreated, accountCreated }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  )
}

export default App
