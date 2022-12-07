import { useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import useAuth from "./useAuth";

const usePortafolios = () => {
  
  const [portafolios, setPortafolios] = useState()
  const [ loading, setLoading ] = useState(true)

  const token = localStorage.getItem('token')

  const getPortafolios = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.get('/portafolio', config)
      console.log(data);   

    } catch (error) {
      console.log(error.response);
    }


  };

  useEffect(() => {
    
    getPortafolios()
  }, [])
  

  return {
    portafolios,
  };
};

export default usePortafolios;
