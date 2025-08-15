import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle, FaBars, FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { sendSearchData } from "../action";

const Navbar = () => {
    const changeButtonClrRef = useRef();
    const [showDetails, setShowDetails] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const naviagte = useNavigate();
    const dispatch = useDispatch();
    const auth = localStorage.getItem("id");
    const navigate = useNavigate();


    const onLogoutClicked = () => {
        localStorage.clear();
        naviagte("/");

    }

    const goToViewPage = ()=>{
        naviagte("/view");
        setClicked(!clicked);
    }

    const goToHome = ()=>{
        naviagte("/menu");
        setClicked(!clicked);
    }

    useEffect(() => {

    }, [])

    return (
        <nav className="fixed top-0 left-0 w-full bg-gray-700 flex flex-wrap justify-between items-center px-6 py-3 shadow-md z-20">
            
            <a className="text-white font-bold text-lg">
                Sahaay
                {clicked ?
                    <FaArrowUp className="lg:h-5 h-0 text-white" onClick={() => setClicked(!clicked)} />
                    : <FaArrowDown className="lg:h-5 h-0 text-white" onClick={() => setClicked(!clicked)} />
                }
            </a>

            
            <button className="text-white md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                <FaBars className="w-6 h-6 text-black" />
            </button>

            
            <div className={`w-full md:w-auto flex flex-col md:flex-row items-center ${menuOpen ? 'block' : 'hidden'} md:flex`}>
                {localStorage.getItem("type") === "user" ?<h2 className="text-xl text-white font-bold md:hidden" onClick={()=>goToViewPage()}>View Tickets</h2>: <></>}
                <div className="m-2 flex items-center">
                    <input
                        className="h-10 m-2 bg-white focus:outline-none rounded-md p-1"
                        type="text"
                        placeholder="Search ticket ID..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Link to="/search"><button
                        className="m-2 px-4 py-2 rounded-md text-black hover:bg-blue-700"
                        type="button"
                        ref={changeButtonClrRef}
                        onClick={() => {
                            changeButtonClrRef.current.style.backgroundColor = "green";
                            changeButtonClrRef.current.style.color = "white";
                            fetch(`https://sahaay2.onrender.com/search/${search}`)
                                .then((data) => data.json())
                                .then((result) => { setSearchResult(result); dispatch(sendSearchData(result));console.log(result); })
                        }}
                    >
                        Search
                    </button></Link>

                </div>

                
                <div className="relative">
                    <FaUserCircle
                        className="w-7 h-7 m-3 cursor-pointer text-white"
                        onClick={() => setShowDetails(!showDetails)}
                    />

                    
                    {showDetails && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-3">
                            <p className="text-sm font-semibold">{localStorage.getItem("name")}</p>
                            <p className="text-xs text-gray-500">{localStorage.getItem("email")}</p>
                            <button
                                className="mt-2 px-4 py-1 text-white text-xs rounded-md bg-red-600 hover:bg-red-700 w-full"
                                onClick={() => onLogoutClicked()}
                                style={{ backgroundColor: "red" }}
                            >
                                Logout
                            </button>
                        </div>
                    )}


                </div>
            </div>
            <div
                className={clicked ?
                    "fixed bottom-0 left-0 lg:w-[300px] lg:h-[80%] w-[-1px] h-[-1px] bg-gray-500 z-10 p-4 shadow-lg overflow-y-auto duration-400"
                    : "fixed bottom-[-100%] left-[-100%] lg:w-[300px] lg:h-full w-[-1px] h-[-1px] bg-gray-500 z-10 duration-400"
                }
            >
                <nav>
                    <h2 className="text-2xl text-white m-3">User Ticket</h2>
                    {auth?
                    <ul>{localStorage.getItem("type") === "user"?
                        <>
                        <li className="fontstyle text-white cursor-pointer m-2" onClick={()=>goToHome()}>Home</li>
                        <li className="fontstyle text-white cursor-pointer m-2" onClick={()=>goToViewPage()}>View Registered Tickets</li>
                        </>
                        :<></>
                    }
                    </ul>:
                    <ul>
                        <li className="fontstyle text-white cursor-pointer m-2" onClick={()=>navigate("/login")}>Login</li>
                        <li className="fontstyle text-white cursor-pointer m-2" onClick={()=>navigate("/register")}>Sign Up</li>
                    </ul>
}
                </nav>

            </div>

        </nav>
    );
}

export default Navbar;
