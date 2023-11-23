/* eslint-disable no-unused-vars */
import React,{useState} from 'react'

const useAuth = ()=>{
    const [isAuthenticated, setisAuthenticated] = useState(false)
    return {isAuthenticated}    
}

export default useAuth