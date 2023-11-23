/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from "react";
import { useNavigate} from "react-router-dom";
import Cookies from 'js-cookie'


export default function ProtectedRoute(props) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = Cookies.get('user-token')
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      return navigate("/login");
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken()
  }, [isLoggedIn])
  
  return <>{isLoggedIn ? props.children : null}</>;
}
