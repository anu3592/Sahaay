import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

const MCPForm = () => {

  const [name, setName] = useState();
  const [title, setTitle] = useState();
  const [phone, setPhone] = useState();
  const [category, setCategory] = useState();
  const [address, setAddress] = useState();
  const [problem, setProblem] = useState();
  const [authorities, setAuthorities] = useState([]);
  const navigate = useNavigate();
  const myState = useSelector((state) => state.showDetails);
  let id;

  useEffect(() => {
    // let result = await fetch(`http://localhost:9494/ticketApplication/getAuthorityInfo/${myState[0].id}`,{
    //   method: "GET"
    // });

    // result = await result.json();
    // console.log("authority info",result);
    if(myState.length>0)
    {
    fetch(`https://sahaay2.onrender.com/getAuthorityInfo/${myState[myState.length-1].id}`)
      .then((result) => result.json())
      .then((data) => { setAuthorities(data); console.log("authority info", data); });
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center items-center p-6 mt-20">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Form Section (70%) */}
        {myState.length>0?
        <div className="w-full md:w-2/3 p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">View Complaint</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="name"
              value={myState[myState.length-1].name}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="text"
              placeholder="title"
              value={myState[myState.length-1].title}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="tel"
              placeholder="phone number"
              value={myState[myState.length-1].phone}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="text"
              placeholder="Category"
              value={myState[myState.length-1].category}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <textarea
              placeholder="address"
              rows="3"
              value={myState[myState.length-1].address}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-200"
            ></textarea>
            <textarea
              placeholder="problem description"
              rows="4"
              value={myState[myState.length-1].problemDesc}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-200"
            ></textarea>

          </form>
        </div>
        :
        <div className='flex flex-row h-full w-full items-center justify-center'>
                    <div className='flex flex-col w-[400px] h-[200px] rounded-xl bg-purple-400 items-center justify-center m-10 boxshadow'>
                        <h2 className='text-2xl font-bold'>Something went wrong!</h2>
                        <p className='text-lg'>Please select again from previous page...</p>
                    </div>
                </div>
  }

        {/* Links Section (30%) */}
        {myState.length>0?
        <div className="w-full md:w-1/3 bg-gray-50 border-l border-gray-200 p-8 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-6">Ticket is Assigned to:</h3>
          <ul className="space-y-4">
            {authorities.length > 0 ? (
              authorities.map((authority, index) => (
                <div className="flex flex-row">
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-5 w-5 rounded-full flex items-center justify-center font-bold
                            bg-blue-600 text-white`}
                    >

                    </div>
                    <div className={`${index!=authorities.length-1? 'h-18 w-1  bg-blue-600': ''}`} />
                  </div>
                  <div >
                    <li className="">
                      Name : {authority.name}
                    </li>
                    <li className="mb-[30px]">
                      Email Id : {authority.email}
                    </li>
                  </div>
                </div>
              ))
            ) : (<>
            </>)
            }
          </ul>
        </div>
        :
        <></>
}
      </div>
    </div>
  );
};

export default MCPForm;
