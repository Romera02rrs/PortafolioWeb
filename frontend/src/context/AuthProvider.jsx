import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    
    const [auth, setAuth] = useState({})

    useEffect(() => {
      const autenticarUsuario = async () => {

        const token = localStorage.getItem('token')
        
        if(!token){
            return
        }

        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.get('/usuarios/perfil', config)
            
            setAuth(data)
        } catch (error) {
            
        }
      }

      autenticarUsuario()
    }, [])
    

    return (
        <AuthContext.Provider
            value={{
              setAuth
            }}>
                {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider
}