/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
export default function SignUpScreen() {
  const navigate =   useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
const [errorMessage, seterrorMessage] = useState(null)

  async function signup(e){
    e.preventDefault();
    try {
      if(password !== cpassword){
        alert('password mismatch');
        return
      } 
      const resp = await fetch('http://localhost:9999/api/auth/signup',{
        method:'POST',
        headers:{
          'Content-type':'Application/json'
        },
        body:JSON.stringify({username,password})
      })
      const data = await resp.json()
      if(data.error){
        throw new Error(data.error)
      }
      Cookies.set('user-token', data.token)
      navigate('/')
    } catch (error) {
      seterrorMessage(error)
    }
  }
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[300px] text-xs">
        <div className="py-2 mb-4">
          <p className='text-3xl'>Signup</p>
        </div>
        <form onSubmit={signup}>
        <div className="flex flex-col mb-2">
          <label htmlFor="username" className="py-2">Username</label>
          <input
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="rounded-md  flex-1 w-full px-4 py-2  text-[#ddd] bg-[#3C3C3C9F] ring-1 ring-[#5454549f] outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="password" className="py-2">Password</label>
          <input
            id="password"
            required
            placeholder="* * * * * *"
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md  flex-1 w-full px-4 py-2  text-[#ddd] bg-[#3C3C3C9F] ring-1 ring-[#5454549f] outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="cpassword" className="py-2">Confirm Password</label>
          <input
            id="cpassword"
            required
            placeholder="* * * * * *"
            type='password'
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
            className="rounded-md  flex-1 w-full px-4 py-2  text-[#ddd] bg-[#3C3C3C9F] ring-1 ring-[#5454549f] outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div className="mt-6">
          <button type="" className="rounded-md  w-full px-4 py-2  text-[#ddd] bg-emerald-600  ">Signup</button>
        </div>
        </form>
        {errorMessage ? <p className="text-center text-red-400">{errorMessage}</p> :null}
        <div className="py-4">
          <p className="text-center">Already have an account ?  <span className="hover:underline pl-2"><a href="/login" className="text-emerald-500"> Login</a></span></p>
        </div>
      </div>
    </div>
  );
}
