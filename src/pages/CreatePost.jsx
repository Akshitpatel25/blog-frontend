import useTheme from "../zustand/them";
import useUser from "../zustand/getUserByToken";
import { useState } from "react";

export default function CreatePost() {
  const { theme } = useTheme();
  const { user } = useUser();
  const [postData, setPostData] = useState({
    title: "",
    discription: "",
    user_id: user?._id,
  });
  const [isclick, setIsClick] = useState(false)
  const backendURL = import.meta.env.VITE_BACKEND_DOMAIN;


  const handleCreatePost = async() => {
    try {
        if( !postData.title || !postData.discription || !postData.user_id) {
            alert("Please enter title and discription")
            return
        }
        setIsClick((prev) => !prev)
        const date = new Date();
        const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        day: "2-digit",
        month: "2-digit",
      });
        
        const res = await fetch(`${backendURL}create-post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: postData.title,
                discription: postData.discription,
                user_id: postData.user_id,
                name: user.name,
                username: user.username,
                date: formattedDate 
            })
        })

        const response = await res.json()
        console.log(response);
        if(response.message === "success") {
            window.location.href = "/"
        }
    } catch (error) {
        setIsClick((prev) => !prev)
        alert("something went wrong",error)
    }
    finally{
      setIsClick((prev) => !prev)
    }
  }

  

  // console.log(user);


  return (
    <>
      <div
        className={`w-screen h-screen flex flex-col items-center gap-y-2
            relative z-10 pt-20 overflow-auto ${
              theme ? "bg-black text-white" : "bg-white text-black"
            }`}
      >
        <input
        onChange={(e) => setPostData({...postData, title: e.target.value})}
          className={`border-b w-full p-4 text-4xl allinputs
                        ${theme ? "border-white" : "border-black"}`}
          placeholder="Title"
          type="text"
        />

        <textarea 
        onChange={(e) => setPostData({...postData, discription: e.target.value})}
        className={`border p-4 w-full h-1/2 outline-none allinputs
            ${theme ? "border-white text-white" : "border-black text-black"}`}
            placeholder="Discription..."
        ></textarea>


        <div>
            <button 
            onClick={handleCreatePost}
            className={`p-2 rounded-md cursor-pointer ${isclick ? 'bg-blue-900' : 'bg-blue-500'} font-bold ${theme ? "text-black" : "text-white"}  `}>Create</button>
        </div>
      </div>
    </>
  );
}
