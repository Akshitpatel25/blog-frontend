import useTheme from "../zustand/them";
import React, { useEffect, useState } from "react";
import getUser from "../utils/getUser";
import { useNavigate } from "react-router-dom";
import { useOnlineStatus } from "../utils/Network";

export default function Signup() {
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [err, setErr] = useState("");
  const [user, setuser] = useState({
    name: "",
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
    if (user.email === "" || user.password === "" || user.name === "") {
      setErr("Please enter name, email and password");
      return;
    }
    try {
      const fullURL = new URL(`signup`, backendURL).href;

      const res = await fetch(fullURL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const response = await res.json();
     console.log(response.message);
     if (response.message === "invalid input") {
        setErr("Invalid input and Password > 4 characters");
     }else if (response.message === "user already exists") {
        setErr("User already exists");
     }else if (response.message === "success") {[
        window.location.href = "/signin",
     ]}
    } catch (err) {
      setErr("Signup route failed ",err);
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
              <span>sign up to continue</span>
            </div>
            <input
              onChange={(e) => setuser({ ...user, name: e.target.value })}
              type="text"
              placeholder="Name"
              name="Name"
              className="input"
            />
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
            
            <button onClick={handleSignin} className="button-confirm">
              Let`s go →
            </button>

            <button
                onClick={() => {
                  navigate("/signin");
                }}
                title="Sign Up"
                className={`w-full 
                  ${theme ? "bg-black text-white" : "bg-white text-black"}
                  `}
              >
                <p>Have an account? <span className="cursor-pointer underline">Sign In</span></p>
              </button>
          </div>
      </div>
    </>
  );
}


