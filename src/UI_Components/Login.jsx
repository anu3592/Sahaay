import React, { useState } from 'react';
//import { useLoaderData } from 'react-router';
import { useNavigate } from 'react-router';
import { useLoading } from '../context/LoadingContext';

const LoginPage = () => {
  //const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const {showLoading, hideLoading} = useLoading();
//   const handleChange = e => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading();
    let result = await fetch("https://sahaay2.onrender.com/loginUser",{
        method: "POST",
        body: JSON.stringify({email, password}),
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
    localStorage.setItem("type", "user");
    localStorage.setItem("time", Date.now());
    
    if(result)
    {
      hideLoading();
      navigate('/menu');
    }
    console.log('Logging in with:', localStorage.getItem("name"));
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center text-gray-700">Login</h2>
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
          required
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <span className='text-blue-400 cursor-pointer' onClick={()=>navigate('/register')}>new user</span>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 button3"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
