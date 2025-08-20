import React, { use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showDetails } from "../action";
import { Link } from "react-router";

const ViewTickets = () => {
  const [tickets, setTickets] = useState([]);
  const dispatch = useDispatch();
  const date = new Date();
  useEffect(() => {
    let id = localStorage.getItem("id");
    fetch(`https://sahaay2.onrender.com/getTickets/${id}`) // adjust your endpoint
      .then(res => res.json())
      .then(data => {setTickets(data); console.log(data);})
      .catch(err => console.error("Error fetching tickets:", err));
  }, []);

  return (
    <div className="p-6 mt-20">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">View Tickets</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-4">Ticket ID</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Status</th>
              
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Escalated</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 ? (
              tickets.map((ticket,index) => (
                <tr key={ticket.id} className="text-center border-b">
                  <td className="py-2 px-4">{ticket.id}</td>
                  <td className="py-2 px-4">{ticket.category}</td>
                  <td className="py-2 px-4">{ticket.status}</td>
                  
                  <td className="py-2 px-4">{date(ticket.created_at).toLocalDateString()}</td>
                  {/*<td className="py-2 px-4">{ticket.escalated ? "Yes" : "No"}</td>*/}
                  <td className="py-2 px-4 space-x-2">
                    <Link to="/info"><button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded button1" onClick={()=>dispatch(showDetails(ticket))}>View</button></Link>
                    <Link to="/updateComplaint"><button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded button2" onClick={()=>dispatch(showDetails(ticket))}>Edit</button></Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-6 text-center text-gray-500">No tickets found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewTickets;
