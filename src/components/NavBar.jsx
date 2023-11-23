/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
export default function NavBar() {
    const navigate = useNavigate()
    async function logout(e){
        e.preventDefault();
        try {
         
          const resp = await fetch('http://localhost:9999/api/auth/logout')
          if(resp.status ===200){
            Cookies.remove('user-token')
            navigate('/login')
          }
         
        } catch (error) {
            alert(error)
        }
      }
  return (
    <div className="flex items-center justify-between">
    <p className="text-2xl py-4 mb-4">Task management application</p>
    <button
              className="px-4 py-2 text-xs font-semibold bg-red-500 text-white  rounded-md  ring-emerald-500"
              type="submit"
              onClick={logout}
            >
              Logout
            </button>
    </div>
  )
}
