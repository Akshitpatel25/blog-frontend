import useTheme from "../zustand/them";
import useUser from "../zustand/getUserByToken";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const { theme } = useTheme();
  const { user } = useUser();
  const [postData, setPostData] = useState({
    title: "",
    discription: "",
    user_id: user?._id,
  });
  const [isclick, setIsClick] = useState(false)
  const [file, setFile] = useState(null);
  const backendURL = import.meta.env.VITE_BACKEND_DOMAIN;
  const navigate = useNavigate()
  const [aiButton, setAiButton] = useState(false)

 // Handle file selection
 const handleFileChange = (event) => {
  setFile(event.target.files[0]);
};

// Handle Create Post
  const handleCreatePost = async() => {
    try {
        if( !postData.title || !postData.discription || !file) {
            alert("Please enter title, discription and image")
        setIsClick((prev) => !prev)
            return
        }
        
        setIsClick((prev) => !prev)
        const date = new Date();
        const formattedDate = date.toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
    // console.log(postData);

      const fullURL = new URL("create-post", backendURL).href;
      // console.log(fullURL);

      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("discription", postData.discription);
      formData.append("user_id", postData.user_id);
      formData.append("name", user.name);
      formData.append("username", user.username);
      formData.append("date", formattedDate);
      formData.append("photo", file);
      
        const res = await fetch(fullURL, {
            method: 'POST',
            body: formData
        })
        console.log(res);
        if (!res.ok) {
          const errorData = await res.json();
          alert("Error creating post:", errorData.message);
        setIsClick((prev) => !prev)
          return;
        }

        navigate("/")
    } catch (error) {
        setIsClick((prev) => !prev)
        alert("something went wrong",error)
    }
    finally{
      setIsClick((prev) => !prev)
    }
  }

  // AI Generator Discription
  const handleAIGeneratorDiscription = async() => {
    try {
      if (postData.title === "") {
        alert("Please enter title")
        return
      }
      setAiButton((prev) => !prev)
      const fullURL = new URL("ai-discription", backendURL).href;
      const res = await fetch(fullURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: postData.title,
        })
      })
      console.log(postData.title);
      const response = await res.json()
      if (res.status === 200) {
        setPostData({...postData, discription: response.message})
       setAiButton((prev) => !prev)
      }else {
        alert(response.message)
        setAiButton((prev) => !prev)
      }
    } catch (error) {
      alert('something went wrong in AI Generator', error)
      setAiButton(false)
    }
  }


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

          <div className="w-full text-end pr-2 italic ">
            <span
            onClick={handleAIGeneratorDiscription}
             className={`${aiButton ? 'skeleton-glance-text cursor-not-allowed' : 'cursor-pointer'} `}>AI Generator Discription</span>
          </div>
        <textarea 
        value={postData.discription}
        onChange={(e) => setPostData({...postData, discription: e.target.value})}
        className={`border p-4 w-full h-1/2 outline-none allinputs
            ${theme ? "border-white text-white" : "border-black text-black"}`}
            placeholder="Discription..."
        ></textarea>

        <input type="file" accept="image/*" className="border cursor-pointer" name="photo" onChange={handleFileChange} />

        <div>
            <button 
            onClick={handleCreatePost}
            disabled={isclick}
            className={`p-2 rounded-md  ${isclick ? 'bg-blue-900 cursor-not-allowed' : 'bg-blue-500 cursor-pointer'} font-bold ${theme ? "text-black" : "text-white"}  `}>Create</button>
        </div>
      </div>
    </>
  );
}
