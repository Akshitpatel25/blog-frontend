import useUser from "../zustand/getUserByToken";
import useTheme from "../zustand/them";
import { Link } from "react-router-dom";

export default function Profile() {
    const {theme} = useTheme();
    const {user} = useUser();
const backendURL = import.meta.env.VITE_BACKEND_DOMAIN;
    


    const handleLogout = async() => {
      const fullURL = new URL(`logout`, backendURL).href;

        const res = await fetch( fullURL,{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const response = await res.json()
        if (response.message === 'success') {
            window.location.href = '/';
        }
    }

    

    return (
        <>
            <div className={`w-screen h-screen flex flex-col gap-y-3 pt-25 p-5
            relative z-10  ${
            theme ? 'bg-black text-white' : 'bg-white text-black'
            }`}
            >
              <h1>Username: {user.username}</h1>
              <h1>Name: {user.name}</h1>
              <h1>Email: {user.email}</h1>
                <button
                className="cursor-pointer w-fit h-fit p-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}>Logout</button>

                <Link
                className="cursor-pointer w-fit h-fit p-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                to={`/my-posts/${user._id}`}
                >My Posts</Link>

                <Link
                className="cursor-pointer w-fit h-fit p-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                to={`/my-comments/${user._id}`}
                >My Comments</Link>
            </div>
        </>
    )
}