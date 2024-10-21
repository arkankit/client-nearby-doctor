import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterUser({uname, upwd}) {
  const navigate = useNavigate();

  const data = {
    username: uname,
    password: upwd,
  };
  const register = async () => {
    try {
      const response = await axios.post("http://server-nearby-doctor-production.up.railway.app/register", data);
      if (response.status == 201) {
        navigate("/details");
      }
    } catch (error) {
      navigate("/login");
    }
  };
  register();
}

export default RegisterUser;
