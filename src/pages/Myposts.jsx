import { useEffect, useState } from "react";
import useTheme from "../zustand/them";
import { useParams } from "react-router-dom";
import useUser from "../zustand/getUserByToken";

export default function Myposts() {
  const { theme } = useTheme();
  const params = useParams();
  const [allUserPosts, setAllUserPosts] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_DOMAIN;
  const { user } = useUser();
  const [iscopy, setIsCopy] = useState(false);
  const [isId, setIsId] = useState("");
  const frontendURL = import.meta.env.VITE_FRONTEND_DOMAIN;

  useEffect(() => {
    if (user._id !== params.id) {
      window.location.href = '/';
    }
  },[])

  useEffect(() => {
    async function fetchAllUserPosts() {
      const fullURL = new URL(`get-all-userPosts/${params.id}`, backendURL).href;

      const res = await fetch(
        fullURL,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await res.json();
      setAllUserPosts(response);
    }
    fetchAllUserPosts();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete?")) {
      async function deletePost() {
        const fullURL = new URL(`delete-post`, backendURL).href;
  
          const res = await fetch(fullURL, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  id: id
              })
          })
          const response = await res.json()
          if (response.message == 'success') {
            window.location.reload()
          }else {
              alert(response.message)
          }
      }
      deletePost();
    }
    
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

  return (
    <>
      <div
        className={`w-screen h-fit min-h-screen flex flex-col
            relative z-10  pt-25 ${
              theme ? "bg-black text-white" : "bg-white text-black"
            }`}
      >
        {allUserPosts
          .slice()
          .reverse()
          .map((post) => (
            
              <div key={post._id} className="w-full h-fit p-4 ">
                <div
                  className={`flex flex-col  ${
                    theme ? "bg-gray-900" : "bg-gray-100"
                  } rounded-lg p-2 text-lg flex flex-col gap-y-5`}
                >
                  <div className=" flex w-full justify-between items-center">
                    <div className="flex gap-x-2 items-center">
                      <img
                        src="/users_icon.png"
                        alt="user-image"
                        className="w-10 h-10 rounded-full  "
                      />
                      <div className="text-sm">
                        <h1 className="font-bold text-lg">{post.name}</h1>
                        <p>@{post.username}</p>
                      </div>
                    </div>
                    <div className="pr-2 flex items-center gap-x-2">
                      {
                        iscopy && isId == post._id ? (<>
                            <img
                      className={`w-7 h-7 cursor-pointer `} 
                      src="/check.png" 
                      alt="share" />
                        </>):(<>
                          <img
                          onClick={() => handleCopyClipboard(post._id)}
                          className={`w-7 h-7 cursor-pointer ${theme ? 'invert' : ''}`} 
                          src="/shareImage.png" 
                          alt="share" />
                        </>)
                      }
                      
                      <img 
                      onClick={() => handleDelete(post._id)}
                      className="w-6 h-6 cursor-pointer"
                      src="/delete.png" 
                      alt="delete" />
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      paddingLeft: "5px",
                      color: "gray",
                    }}
                  >
                    Date: {post.date}
                  </span>
                  <h1 className="text-2xl">
                    Title:{" "}
                    <span className="font-bold italic">{post.title}</span>
                  </h1>

                  <p className="flex flex-col font-bold">
                    <span className="font-thin">Discription: </span>
                    {post.discription}
                  </p>
                  <img
                  className="w-40 h-40 rounded-lg" 
                  src={post.imageID} alt="post image" />
                </div>
              </div>
            
          ))}
      </div>
    </>
  );
}
