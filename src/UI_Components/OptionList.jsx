import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { HealthData } from "../data/data";
import { McfData } from "../data/data";
import { CyberCrime } from "../data/data";
import { Electricity } from "../data/data";
import { Police } from "../data/data";
import { Environment } from "../data/data";

const OptionList = ()=>{
    const {type} = useParams();
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    if (type === "MCF") {
      setList(McfData);
    } else if(type=== "health") {
      setList(HealthData);
    }
    else if(type==="police")
    {
      setList(Police);
    }
    else if(type==="cyber")
    {
      setList(CyberCrime);
    }
    else if(type=="electricity"){
      setList(Electricity);
    }
    else{
      setList(Environment);
    }
  }, [type]);

    
    return(
        <div className="flex flex-col mt-20">
          <h2 className="text-3xl font-bold m-2">You can Register ticket for problems like :</h2>
            <ul>
            {list.map((item,index)=>(
                <li className="text-left m-2 text-xl">{index+1 }.  { item.name}</li>
            ))}
            </ul>
            <button onClick={()=>navigate(`/registerMCP/${type}`)} className="button1 text-white w-[200px]">Register Complaint</button>
        </div>
    )
}

export default OptionList;