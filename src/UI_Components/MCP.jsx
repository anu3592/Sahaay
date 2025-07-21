import React from "react";
import { McfData } from "../data/data";
import { useNavigate } from "react-router";


const MCP = ()=>{
    const navigate = useNavigate();

    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 gap-6 py-4 z-10 lg:mt-20">
            {
                McfData.map((item, index)=>
                (
                    <div className="flex flex-col rounded-2xl boxshadow p-2 cursor-pointer h-[100px] justify-center" onClick={()=>navigate("/registerMcp")}>
                        <h2 className="text-2xl font-bold">{item.name}</h2>
                    </div>
                )
                )
                
            }
            <div className="flex flex-col rounded-2xl boxshadow p-2 cursor-pointer h-[100px] justify-center">
                        <h2 className="text-2xl font-bold">Others</h2>
                    </div>
            
        </div>
    )
}

export default MCP;