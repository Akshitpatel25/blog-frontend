import useTheme from "../zustand/them";
import React, { useEffect, useState } from "react";
import getUser from "../utils/getUser";
import { useNavigate } from "react-router-dom";
import { useOnlineStatus } from "../utils/Network";


export default function Signin() {
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [err, setErr] = useState("");
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
const backendURL = import.meta.env.VITE_BACKEND_DOMAIN;


  useEffect(() => {
    async function fetchToken() {
      const t = await getUser();
      if (t) {
        navigate("/");
      }
    }
    fetchToken();
  }, []);

  const handleSignin = async () => {
    if (user.email === "" || user.password === "") {
      setErr("Please enter email and password");
      return;
    }
    try {
      const res = await fetch(`${backendURL}/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const response = await res.json();
     console.log(response.message);
     if (response.message === "invalid credentials") {
        setErr("Invalid credentials");
     }else if (response.message === "user not found") {
        setErr("User not found");
     }
     else if (response.message === "success") {
        window.location.href = "/";
     }
    } catch (err) {
      setErr("Signin route failed ",err);
    }
    
  };

  if (!isOnline) {
    return (
      <>
        <div className={`w-screen h-screen flex justify-center items-center
           ${theme ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <NO_Internet_Loader/>
        </div>
      </>
    )
  }
  return (
    <>
      <div
        className={`flex flex-col justify-center items-center h-screen
                ${theme ? "bg-black text-white" : "bg-white text-black"}
                `}
      >
        {
            err && <div className="text-red-500">{err}</div>
        }
          <div className="form">
            <div className="title">
              Welcome,
              <br />
              <span>sign in to your account</span>
            </div>
            <input
              onChange={(e) => setuser({ ...user, email: e.target.value })}
              type="email"
              placeholder="Email"
              name="email"
              className="input"
            />
            <input
              onChange={(e) => setuser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Password"
              name="password"
              className="input"
            />
            <div className="login-with">
              <div title="Forget Password?" className="button-log">
                ?
              </div>
              
            </div>
            <button onClick={handleSignin} className="button-confirm">
              Let`s go →
            </button>

            <button
                onClick={() => {
                  navigate("/signup");
                }}
                title="Sign Up"
                className={`
                  ${theme ? "bg-black text-white" : "bg-white text-black"}
                  `}
              >
                Don't have an account? <span className="cursor-pointer underline">Sign Up</span>
              </button>
          </div>
      </div>
    </>
  );
}


