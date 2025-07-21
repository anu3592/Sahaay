import React from "react";
import cyber from "../images/cyber-security.png";
import environment from "../images/environment.jpeg";
import health from "../images/health.png";
import police from "../images/police.jpeg";
import electricity from "../images/electricity.jpeg";
import mcp from "../images/mcp.png";
import { Link } from "react-router";



const TicketMenu = ()=>{
    return (
        <div className="mt-20">
            <h1 className="font-bold">Categories</h1>
        <div className="grid md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 gap-6 py-4 z-10 lg:mt-20">
            <Link to="/optionList/health"><div className="flex flex-col rounded-2xl boxshadow p-2 cursor-pointer">
                <img src={health} className="w-1/2"/>
                <h2 className="text-2xl font-bold">Health</h2>
            </div></Link>

            <Link to="/optionList/police"><div className="flex flex-col rounded-2xl boxshadow p-2 cursor-pointer">
                <img src={police} className="w-1/2"/>
                <h2 className="text-2xl font-bold">Police</h2>
            </div></Link>

            <Link to={"/optionList/environment"}><div className="flex flex-col rounded-2xl boxshadow p-2 cursor-pointer">
                <img src={environment} className="w-1/2"/>
                <h2 className="text-2xl font-bold">Environment and Sanitation</h2>
            </div></Link>

            <Link to="/optionList/cyber"><div className="flex flex-col rounded-2xl boxshadow p-2 cursor-pointer">
                <img src={cyber} className="w-1/2"/>
                <h2 className="text-2xl font-bold">Cyber</h2>
            </div></Link>

            <Link to="/optionList/electricity"><div className="flex flex-col rounded-2xl boxshadow p-2 cursor-pointer">
                <img src={electricity} className="w-1/2"/>
                <h2 className="text-2xl font-bold">Electricity</h2>
            </div></Link>

            <Link to="/optionList/MCF"><div className="flex flex-col rounded-2xl boxshadow p-2 cursor-pointer">
                <img src={mcp} className="w-1/2"/>
                <h2 className="text-2xl font-bold">MCF</h2>
            </div></Link>
        </div>
        </div>
    )
}

export default TicketMenu;