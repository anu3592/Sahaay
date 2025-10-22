import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const SearchedTicket = () => {
  const myState = useSelector((state) => state.sendSearchDatas);
  const ticket = myState?.[myState.length - 1];

  if (!ticket) {
    return (
      <div className="text-center text-xl text-gray-600 mt-10">
        No ticket data available. Please search for a ticket.
      </div>
    );
  }
else{  
  return (
    <div className="flex flex-col w-[800px] h-[50%] rounded-2xl p-3 boxshadow">
      <h2 className="text-4xl font-bold m-4">
        {ticket.title?.toUpperCase()}
      </h2>
      <p className="text-2xl m-2">{ticket.problemDesc}</p>
      <h2>Status:</h2>
      <p className="text-2xl m-2">{ticket.status}</p>
      <div className="text-right">
        <p>-from: {ticket.name}</p>
        <p>-phone: {ticket.phone}</p>
        <p>-email: {ticket.email}</p>
      </div>
    </div>
  );
}
};

export default SearchedTicket;
