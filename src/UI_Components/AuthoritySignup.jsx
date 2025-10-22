import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useLoading } from "../context/LoadingContext";



const AuthoritySignup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState(1);
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const navigate = useNavigate();
  const {showLoading, hideLoading} = useLoading();


  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading();
    if (name && email && phone && department && level && location && password && cPassword) {
      if (password === cPassword) {
        let result = await fetch("https://sahaay2.onrender.com/authoritySignup", {
          method: "POST",
          body: JSON.stringify({ name, email, phone, department, level, location, password, no_of_ticket_assigned: 0 }),
          headers: {
            'content-type': 'application/json'
          }
        });

        result = await result.json();

        localStorage.clear();
        localStorage.setItem("name", result.name);
        localStorage.setItem("email", result.email);
        localStorage.setItem("phone", result.phone);
        localStorage.setItem("id", result.id);
        localStorage.setItem("type", "authority");
        localStorage.setItem("time", Date.now());

        if (result) {
          hideLoading();
          navigate('/authorityDashboard');
        }

        console.log(result);
      }
      else {
        alert("Password doesn't match!");
      }
    }
    else {
      alert("Please fill all the available fields!");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md mt-20">
        <h2 className="text-2xl  mb-6 text-center text-gray-700">Authority Sign Up</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="phone"
          placeholder="phone number"
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />



        <select name="department" id="department" value={department} onChange={(e) => setDepartment(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option>-Select-</option>
          <option value="MCF" >MCF</option>
          <option value="Police">Police</option>
          <option value="Cyber">Cyber</option>
          <option value="Health">Health</option>
          <option value="Electricity">Electricity</option>

        </select>

        <input
          type="number"
          name="level"
          placeholder="Level"
          onChange={(e) => setLevel(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          onChange={(e) => setCpassword(e.target.value)}
          required
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 button3"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default AuthoritySignup;