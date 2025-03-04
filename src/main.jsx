import "@fontsource/montserrat"; 
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react';
import SkeletonLoader from './skeletons/SkeletonLoading.jsx';
import Sk_createpost from './skeletons/Sk_createpost.jsx';
import Sk_homepage from "./skeletons/SK_homepage.jsx";
import App from './App.jsx'
import Sk_post from "./skeletons/Sk_post.jsx";
const Home = lazy(() => import('./pages/Home.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const Signin = lazy(() => import('./pages/Signin.jsx'));
const Signup = lazy(() => import('./pages/Signup.jsx'));
const CreatePost = lazy(() => import("./pages/CreatePost.jsx"))
const Post = lazy(() => import("./pages/Post.jsx"))
const Myposts = lazy(() => import("./pages/Myposts.jsx"))

const website_routes = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <Suspense fallback={<Sk_homepage />}><Home /></Suspense> },
        { path: '/profile', element: <Suspense fallback={<SkeletonLoader />}><Profile /></Suspense> },
        { path: '/create-post', element: <Suspense fallback={<Sk_createpost />}><CreatePost /></Suspense> },
        { path: '/post/:id', element: <Suspense fallback={<Sk_post />}><Post /></Suspense> },
        { path: '/my-posts/:id', element: <Suspense fallback={<SkeletonLoader />}><Myposts /></Suspense> }
      ],
    },
    { path: '/signin', element: <Signin /> },

    { path: '/signup', element: <Signup /> }
  ],
  { basename: import.meta.env.VITE_BASENAME || "/" } // Set base path dynamically
);


createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={website_routes}/>
  
)
