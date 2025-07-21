import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HomePage from "./UI_Components/HomePage"
import Navbar from "./Supportive_Components/Navbar"
import './App.css'
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router'
import TicketMenu from './UI_Components/TicketMenu'
import MCP from './UI_Components/MCP'
import MCFform from './UI_Components/MCFform'
import ViewTickets from './UI_Components/ViewTickets'
import LoginPage from './UI_Components/Login'
import SignupPage from './UI_Components/Signup'
import AuthorityLogin from './UI_Components/AuthorityLogin'
import AuthoritySignup from './UI_Components/AuthoritySignup'
import AuthorityDashboard from './UI_Components/AuthorityDashboard'
import TicketInfo from './UI_Components/TicketInfo'
import UpdateTicketInfo from './UI_Components/UpdateTicketInfo'
import SearchedTicket from './UI_Components/SearchedTicket'
import OptionList from './UI_Components/OptionList'
import PrivateComponent from './UI_Components/PrivateComponent'


function App() {
  const location = useLocation();


  const hideNavbar = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/authorityLogin' || location.pathname === '/authoritySignup';

  const naviagte = useNavigate();
  useEffect(() => {
    const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

    const intervalId = setInterval(() => {
      const now = Date.now();
      const then = parseInt(localStorage.getItem("time"));

      if (!isNaN(then)) {
        const diff = now - then;
        console.log("inside it");
        if (diff >= ONE_DAY_IN_MS) {
          console.log("24 hours passed — clearing localStorage.");
          localStorage.clear();
          alert("Your session is expired Please login again!");
          naviagte("/");
        } else {
          console.log("Checked: Not yet 24 hours, diff =", diff);
        }
      }
    }, 60 * 1000);

    return () => clearInterval(intervalId);
  },[])

  return (
    <div className='App'>


      {!hideNavbar && <Navbar />}
      <Routes>
        <Route element={<PrivateComponent />}>

          <Route path="/menu" element={<TicketMenu />} />
          <Route path='/mcp' element={<MCP />} />
          <Route path="/registerMcp/:type" element={<MCFform/>} />
          <Route path='/view' element={<ViewTickets />} />

          <Route path='/authorityDashboard' element={<AuthorityDashboard />} />
          <Route path='/info' element={<TicketInfo />} />
          <Route path='/updateComplaint' element={<UpdateTicketInfo />} />
          <Route path='/search' element={<SearchedTicket />} />
          <Route path='/optionList/:type' element={<OptionList />} />
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<SignupPage />} />
        <Route path='/authorityLogin' element={<AuthorityLogin />} />
        <Route path='/authoritySignup' element={<AuthoritySignup />} />
      </Routes>


    </div>
  )
}

export default App
