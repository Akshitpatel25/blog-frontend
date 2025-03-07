import useTheme from "../zustand/them";
import useUser from "../zustand/getUserByToken";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../zustand/getAllPosts";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user } = useUser();
  const { posts,fetchPosts } = usePosts();
  const [iscopy, setIsCopy] = useState(false);
  const [isId, setIsId] = useState("");
  const frontendURL = import.meta.env.VITE_FRONTEND_DOMAIN;

  function handleShare(postID) {
    navigate(`/post/${postID}`);
  }

  function handleCopyClipboard(postID) {  
    setIsId(postID);
    const fullURL = new URL(`post/${postID}`, `${frontendURL}`).href;
    console.log(fullURL);
    navigator.clipboard.writeText(fullURL)
    .then(() => {
      setIsCopy((prev) => !prev);
      setTimeout(() => {
        setIsCopy((prev) => !prev);
      }, 2000);
    })
    .catch((error) => {
      alert("Cannot able to Copy",error);
    });
  }

  useEffect(() => {
    fetchPosts();
  },[])
  
  return (
    <>
      <div
        className={`w-screen h-screen flex flex-col justify-between items-center
            relative z-10 ${
              theme ? "bg-black text-white" : "bg-white text-black"
            }`}
      >
        <div className="w-full h-fit overflow-auto p-4 mt-20 mb-20 ">
          <div className="flex flex-col gap-y-3">
            {
            posts?.posts?.length > 0 ? (
              posts.posts.slice().reverse().map((item) => (
                <div key={item._id} className={`
                ${theme ? 'bg-gray-900' : 'bg-gray-100'}
                rounded-lg p-2 text-lg flex flex-col gap-y-5`}>
                  <div className="flex gap-x-2 h-fit items-center">
                    <img 
                    src="/users_icon.png" 
                    alt="user-image" 
                    className="w-10 h-10 rounded-full " />
                    <div className="text-sm">
                      <h1 className="font-bold text-lg">{item.name}</h1>
                      <p>@{item.username}</p>
                    </div>
                    <span className=" w-full  flex justify-end  items-center gap-x-4">
                      <span style={{fontSize: '10px', paddingLeft: '5px', marginTop: '2px', color: 'gray'}}>{item.date}</span>
                      
                      {
                        iscopy && isId === item._id ? (<>
                          <img 
                          onClick={() => handleCopyClipboard(item._id)}
                          className={`w-5 h-5 cursor-pointer `}
                          src="/check.png" 
                          alt="share" />
                        </>):(<>
                        <img 
                        onClick={() => handleCopyClipboard(item._id)}
                        className={`w-5 h-5 cursor-pointer ${theme ? 'invert': ''}`}
                        src="/shareImage.png" 
                        alt="share" />
                        </>)
                      }
                      
                    </span>
                  </div>
                  <div
                      onClick={() => handleShare(item._id)}
                      className="cursor-pointer"
                  >
                    <div className="font-bold ">{item.title} </div>
                    <div className="h-fit">{item.discription}</div>
                    <div>💬 {item.comments.length}</div>
                  </div>
                  
                </div>
              ))
            ) : (
              <p>No posts available</p>
            )}
          </div>

          
        </div>

        {user && (
          <div
            className={`fixed bottom-0 w-full h-20 pt-2 flex justify-center items-start
                            ${theme ? "bg-black " : "bg-white"}`}
          >
            <button
              onClick={() => navigate("/create-post")}
              className={`p-2 border cursor-pointer rounded-lg font-semibold
                                ${theme ? "bg-white text-black" : "bg-black text-white"}`}
            >
              Create Post
            </button>
          </div>
        )}
      </div>
    </>
  );
}
