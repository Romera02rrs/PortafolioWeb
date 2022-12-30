import { useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import useAuth from "./useAuth";

const usePortafolio = ( id ) => {
  
  const [portafolio, setPortafolio] = useState()
  const [ loading, setLoading ] = useState(true)

  const token = localStorage.getItem('token')

  const getPortafolio = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.get('/portafolio/'+ id , config)
      setPortafolio(data)
      console.log(data);   
      setLoading(false)

    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    
    getPortafolio()
  }, [])
  
  const obtenerPortafolios = () => {
    return getPortafolio()
  }

  return {
    portafolio,
    loading,
    obtenerPortafolios,
    setPortafolio
  };
};

export default usePortafolio;
