import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

const UpdateTicketInfo = () => {

  const [name, setName] = useState();
  const [title, setTitle] = useState();
  const [phone, setPhone] = useState();
  const [category, setCategory] = useState();
  const [address, setAddress] = useState();
  const [problem, setProblem] = useState();
  const navigate = useNavigate();
  const myState = useSelector((state) => state.showDetails);
  let id;

  useEffect(() => {
  if (myState && myState.length > 0) {
    setName(myState[myState.length-1].name);
    setTitle(myState[myState.length-1].title);
    setPhone(myState[myState.length-1].phone);
    setCategory(myState[myState.length-1].category);
    setAddress(myState[myState.length-1].address);
    setProblem(myState[myState.length-1].problemDesc);
  }
}, [myState]);

  const updateComplaint = async (e)=>{
    e.preventDefault();
    console.log(name,phone,category,address,problem);
    fetch('https://sahaay2.onrender.com/updateComplaint', {
      method: "PUT",
      body: JSON.stringify({id: myState[myState.length-1].id, name, title, phone, category, address, problemDesc:problem}),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(()=>{alert("Complaint Updated Successfully!");
      navigate("/menu");});    
      
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center items-center p-6 mt-20">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Form Section (70%) */}
        {myState.length>0?
        <div className="w-full md:w-2/3 p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Update Complaint</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="text"
              placeholder="Enter title..."
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="tel"
              placeholder="Enter your phone number..."
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <textarea
              placeholder="Enter your address..."
              rows="3"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-200"
            ></textarea>
            <textarea
              placeholder="Explain your problem..."
              rows="4"
              value={problem}
              onChange={e=>setProblem(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-200"
            ></textarea>
            <button
              type="submit"
              onClick={(e)=>updateComplaint(e)}
              className="w-full py-2 rounded-md hover:bg-blue-700 transition"
            >
              Update
            </button>
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
      </div>
    </div>
  );
};

export default UpdateTicketInfo;
