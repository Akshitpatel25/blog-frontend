import useTheme from "../zustand/them";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Post() {
  const { theme } = useTheme();
  const params = useParams();
  const [post, setpost] = useState({
    id: "",
    title: "",
    discription: "",
    user_id: "",
    name: "",
    username: "",
    date: "",
  });
  const backendURL = import.meta.env.VITE_BACKEND_DOMAIN;

  

  useEffect(() => {
    async function fetchPost() {
      const fullURL = new URL(`get-post/${params.id}`, backendURL).href;

      const res = await fetch(fullURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      setpost({
        id: response._id,
        title: response.title,
        discription: response.discription,
        user_id: response.user_id,
        name: response.name,
        username: response.username,
        date: response.date,
      });
    }
    fetchPost();
  }, []);

  return (
    <>
      <div
        className={`w-screen h-fit min-h-screen flex flex-col justify-between items-center
            relative z-10 pt-20 overflow-auto ${
              theme ? "bg-black text-white" : "bg-white text-black"
            }`}
      >
        {post && post.id ? (
          <>
            <div className="w-full h-fit overflow-auto p-4 ">
              <div
                className={`flex flex-col  ${
                  theme ? "bg-gray-900" : "bg-gray-100"
                } rounded-lg p-2 text-lg flex flex-col gap-y-5`}
              >
                <div className=" flex justify-between items-center">
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
                  <span
                    style={{
                      fontSize: "10px",
                      paddingLeft: "5px",
                      marginTop: "2px",
                      color: "gray",
                    }}
                  >
                    {post.date}
                  </span>
                </div>
                <h1 className="text-2xl">
                  Title: <span className="font-bold italic">{post.title}</span>
                </h1>

                <p className="flex flex-col font-bold">
                  <span className="font-thin">Discription: </span>
                  {post.discription}
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1>Post not fount</h1>
          </>
        )}
      </div>
    </>
  );
}
