import React, { useEffect, useState } from "react";
import group from "../images/group.png";
import team from "../images/team.png";
import { useNavigate } from "react-router";

const HomePage = () => {

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:9494/ticketApplication/')
            .then(response => response.text())
            .then(data => setMessage(data))
            .catch(error => console.log("Error", error));
    }, []);
    return (
        <div className="mt-20 p-4">
            <h1 className="text-2xl font-bold mb-4">Sahaay</h1>
            

            <div className="flex flex-row justify-center items-center gap-6 flex-wrap">

                <div className="w-1/2 sm:w-1/3 md:w-1/4 aspect-square flex flex-col justify-center items-center rounded-2xl shadow p-2 boxshadow cursor-pointer"
                  onClick={()=>navigate("/login")}>
                    <img src={group} alt="Group" className="w-full h-full object-contain" />
                    <h2 className="text-2xl font-bold">Ticket Registration</h2>

                </div>

                <div className="w-1/2 sm:w-1/3 md:w-1/4 aspect-square flex flex-col justify-center items-center rounded-2xl shadow p-2 boxshadow cursor-pointer"
                  onClick={()=>navigate("/authorityLogin")}>
                    <img src={team} alt="Team" className="w-full h-full object-contain" />
                    <h2 className="text-2xl font-bold">Official</h2>
                </div>
            </div>
        </div>

    );
}


export default HomePage;
