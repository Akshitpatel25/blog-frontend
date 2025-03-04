import useTheme from "../zustand/them";
import Switch from "./Switch";
import { useNavigate } from "react-router-dom";
import useUser from "../zustand/getUserByToken";

export default function Navbar() {
    const navigate = useNavigate();
    const {theme} = useTheme();
    const {user} = useUser();

    return (
        <>
            <div 
            style={{fontFamily: 'Montserrat'}}
            className={`fixed top-0 left-0 h-20 w-full z-50  
                ${theme ? 'bg-black text-white border-b' : 'bg-white backdrop-blur-md text-black border-b'}
                flex justify-between items-center p-4
                `}>

                <div>
                    <h1 className="text-2xl font-bold ">AI-Blog</h1>
                </div>

                <div 
                className="flex items-center justify-between gap-x-4 "
                >
                    {
                        user ? (
                            <>
                            <button
                            onClick={() => {
                                navigate('/profile')
                            }}
                            className="cursor-pointer"
                            >
                                <img 
                                title="Profile"
                                className={`w-8 ${theme ? 'invert' : ''}`}
                                src="/userIcon1.png" 
                                alt="login" />
                            </button>
                            </>
                        ):(
                            <>
                            <button
                            className="cursor-pointer"
                            onClick={() => {
                                navigate('/signin')
                            }}
                            >
                                <img 
                                title="Login"
                                className={`w-8 ${theme ? 'invert' : ''}`}
                                src="/icons8-login-100.png" 
                                alt="login" />
                            </button>
                            </>

                        )
                    }
                    <Switch/>
                </div>


                

                
                
            </div>
        </>
    )
}