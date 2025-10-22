import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useLoading } from '../context/LoadingContext';

const AuthorityDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [reason, setReason] = useState('');
  const{showLoading, hideLoading} = useLoading();

  useEffect(() => {
    showLoading();
    fetch(`https://sahaay2.onrender.com/getAuthorityTickets/${localStorage.getItem("id")}`)
      .then(res => res.json())
      .then(data => {
        setTickets(data);
        setFilteredTickets(data);
        console.log(data);
        hideLoading();
      })
      .catch((err) => {console.error('Error fetching tickets:', err);
        hideLoading();
      });


  }, []);

  const handleSearch = () => {
    const filtered = tickets.filter(ticket =>
      ticket.id.toString().includes(searchTerm) ||
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTickets(filtered);
  };

  function binaryStringToBase64(binaryString) {
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i) & 0xff;
  }
  let binary = '';
  bytes.forEach(b => binary += String.fromCharCode(b));
  console.log(btoa(binary));
  return btoa(binary);
}

  const closeTicket = (id) => {
    showLoading();
    fetch(`https://sahaay2.onrender.com/close/${id}`, { method: 'GET' })
      .then(() => {
        hideLoading();
        alert('Ticket closed');
        setTickets(prev => prev.filter(t => t.id !== id));
        setFilteredTickets(prev => prev.filter(t => t.id !== id));
      })
      .catch((e)=>{hideLoading();
        console.log("Error in closing Ticket: ",e)

      });
  };

  const escalateTicket = (ticket) => {
    showLoading();
    fetch(`https://sahaay2.onrender.com/escalate/${ticket.id}`, {
      method: 'POST',
      body: JSON.stringify({ ticketId: ticket.id, from_authority_id: ticket.assigned_to, reason }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(() => {hideLoading();
        alert('Ticket escalated');})
      .catch((e)=>{hideLoading();
        console.log("Error in Escalating the Ticket: ",e);});
    setTickets(prev => prev.filter(t => t.id !== ticket.id));
    setFilteredTickets(prev => prev.filter(t => t.id !== ticket.id));
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen mt-20">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-4 sm:mb-0">Assigned Tickets</h2>

      </div>

      {filteredTickets.length !== 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTickets.map(ticket => (
            <div key={ticket.id} className="bg-white shadow-md rounded-xl p-5 border border-gray-200">
              <h3 className="text-xl font-semibold mb-2 text-blue-800">{ticket.title}</h3>
              <p className="text-gray-700"><strong>ID:</strong> {ticket.id}</p>
              <p className="text-gray-700"><strong>Category:</strong> {ticket.category}</p>
              <p className="text-gray-700"><strong>Description:</strong> {ticket.problemDesc}</p>
              <p className="text-gray-700"><strong>Status:</strong> {ticket.status}</p>
              <p className="text-gray-700"><strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
              <input type='text' onChange={(e) => setReason(e.target.value)} placeholder='reason to escalate' className='p-2 border-1 rounded-xl m-1' />
              <img src={`data:image/jpg;base64,${ticket.image}`} />

              <div className="mt-4 flex justify-end space-x-3">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-lg button2"
                  onClick={() => closeTicket(ticket.id)}
                >
                  Close
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg button1"
                  onClick={() => escalateTicket(ticket)}
                >
                  Escalate
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[300px] bg-white rounded-2xl border border-gray-200 shadow-md w-[500px]">
          <h2 className="text-2xl text-gray-600">No Ticket Assigned yet!</h2>
        </div>
      )}
    </div>
  );
};

export default AuthorityDashboard;
