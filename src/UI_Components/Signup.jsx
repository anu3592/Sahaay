import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const SignupPage = () => {
  //   const [formData, setFormData] = useState({
  //     name: '', email: '', password: '', confirmPassword: ''
  //   });

  //   const handleChange = e => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [password, setPassword] = useState();
  const [cPassword, setCpassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && email && phone && address && password && cPassword) {

      if (password === cPassword) {
        let result = await fetch("https://sahaay2.onrender.com/registerUser", {
          method: "POST",
          body: JSON.stringify({ name, email, phone, address, password }),
          headers: {
            'content-type': 'application/json'
          }
        })

        result = await result.json();

        delete result.address;
        delete result.password;

        localStorage.clear();
        localStorage.setItem("name", result.name);
        localStorage.setItem("email", result.email);
        localStorage.setItem("phone", result.phone);
        localStorage.setItem("id", result.id);
        localStorage.setItem("time", Date.now());
        localStorage.setItem("type", "user");

        if (result) {
          navigate('/menu');
        }


        console.log('Signup data:', result);
      }
      else {
        alert("Password doesn't match!");
      }
    }
    else {
      alert("Please fill all the fields!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md mt-20">
        <h2 className="text-2xl  mb-6 text-center text-gray-700">Sign Up</h2>

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

        <textarea placeholder="address"
          rows="3"
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          name="confirmPassword"
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
  );
};

export default SignupPage;
