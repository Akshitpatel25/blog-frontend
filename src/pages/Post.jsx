import useTheme from "../zustand/them";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useUser from "../zustand/getUserByToken";

export default function Post() {
  const { theme } = useTheme();
  const { user } = useUser();
  const params = useParams();
  const [post, setpost] = useState({
    id: "",
    title: "",
    discription: "",
    user_id: "",
    name: "",
    username: "",
    date: "",
    imageID: "",
    comments: "",
  });
  const [isButtonClick, setIsButtonClick] = useState(false);
  const [comment, setComment] = useState("");
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
        imageID: response.imageID,
        comments: response.comments,
      });
    }

    fetchPost();
  }, []);

  const handleCommentSubmit = async () => {
    try {
      if (comment === "") {
        return;
      }
      setIsButtonClick((prev) => !prev);
      const date = new Date();
      const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const fullURL = new URL(`/comment-on-post`, backendURL).href;

      const res = await fetch(fullURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: comment,
          userID: user._id,
          username: user.username,
          name: user.name,
          postID: params.id,
          date: formattedDate,
          title: post.title,
        }),
      });
      const response = await res.json();
      if (response.message === "success") {
        setIsButtonClick((prev) => !prev);
        setComment("");
        window.location.reload();
      } else {
        alert("Cannot able to Comment");
      }
    } catch (error) {
      alert("Cannot able to Comment", error);
    }
  };

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
                } rounded-lg p-2 text-lg flex flex-col gap-y-2`}
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
                <img
                  className="w-40 h-40 rounded-lg"
                  src={post.imageID}
                  alt="post image"
                />

                <div>💬 {post?.comments?.length}</div>

                {user != null ? (
                  <>
                    <div className="flex gap-x-2">
                      <input
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="border border-gray-400 p-1 rounded-lg w-full placeholder:text-gray-400"
                        placeholder="Add Comments"
                        type="text"
                      />
                      <button
                        onClick={handleCommentSubmit}
                        className={`pr-2 pl-2 p-1 rounded-lg 
                          ${
                            isButtonClick
                              ? " bg-blue-800 cursor-not-allowed"
                              : "cursor-pointer bg-blue-500"
                          }
                          `}
                      >
                        Add
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div className="w-full flex flex-col gap-y-2">
                  {post?.comments?.length > 0 ? (
                    <>
                      {post.comments.slice().reverse().map((comment) => (
                        <div
                          key={comment._id}
                          className="text-sm border border-gray-400 p-2 rounded-lg flex flex-col"
                        >
                          <div className=" flex justify-between items-center">
                            <div className="flex gap-x-2 items-center">
                              <img
                                src="/users_icon.png"
                                alt="user-image"
                                className="w-5 h-5 rounded-full  "
                              />
                              <div className="text-sm">
                                <h1 className="font-bold">{comment.name}</h1>
                                <p>@{comment.username}</p>
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
                              {comment.date}
                            </span>
                          </div>
                          <p className="text-lg">{comment.comment}</p>
                        </div>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className={`w-screen h-screen pt-20 flex flex-col gap-y-6 p-4 ${
                theme ? "bg-black" : "bg-white"
              }`}
            >
              <div className="h-60 w-full bg-gray-300 rounded-lg skeleton-glance"></div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
