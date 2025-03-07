import { useEffect, useState } from "react";
import useTheme from "../zustand/them";
import useUser from "../zustand/getUserByToken";

export default function MyComments() {
  const { theme } = useTheme();
  const backendURL = import.meta.env.VITE_BACKEND_DOMAIN;
  const { user } = useUser();
  const [allUserComments, setAllUserComments] = useState([]);

  useEffect(() => {
    if (!user._id) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    async function fetchComments() {
      try {
        const fullURL = new URL(`comments/${user._id}`, backendURL).href;
        console.log(fullURL);
        const res = await fetch(fullURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const response = await res.json();
        console.log(response);
        setAllUserComments(response);
      } catch (error) {
        alert("Error in fetching Comments data", error);
      }
    }

    fetchComments();
  }, []);

  const handleDeleteComment = async (id, post) => {
    if (confirm("Are you sure you want to delete?")) {
      console.log(id, post);
      try {
        const fullURL = new URL(`delete-comment`, backendURL).href;
        const res = await fetch(fullURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            CommentID: id,
            PostID: post,
          }),
        });
        const response = await res.json();
        if (response.message == "success") {
          window.location.reload();
        } else {
          alert(response.message);
        }
      } catch (error) {
        alert("something is wrong in deleting comment", error);
      }
    }
  };

  return (
    <>
      <div
        className={`w-screen h-fit min-h-screen flex flex-col
            relative z-10  pt-25 ${
              theme ? "bg-black text-white" : "bg-white text-black"
            }`}
      >
        {allUserComments?.length > 0 ? (
          <div className="p-2 flex flex-col gap-y-2">
            {allUserComments
              .slice()
              .reverse()
              .map((comment) => (
                <div
                  className="w-full border p-2 rounded-lg "
                  key={comment._id}
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-500">
                        Comment on Title:{" "}
                        <span
                          className={`${theme ? " text-white" : " text-black"}`}
                        >
                          {comment.title}
                        </span>
                      </p>
                      <p style={{ fontSize: "10px" }}>Date: {comment.date}</p>
                    </div>
                    <img
                      onClick={() =>
                        handleDeleteComment(comment._id, comment.post)
                      }
                      className="w-5 h-5 cursor-pointer"
                      src="/delete.png"
                      alt="delete"
                    />
                  </div>
                  <p className="font-semibold">{comment.comment}</p>
                </div>
              ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
