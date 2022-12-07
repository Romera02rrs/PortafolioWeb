import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    
    const navigate = useNavigate()

    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)

    // Se ejecuta una vez al iniciar la app, comprueba si hay un jwt en localstorage, si lo hay lo envia al backend para recibir los datos del usuario
    useEffect(() => {

      const autenticarUsuario = async () => {
        const token = localStorage.getItem('token')
        if(!token){
            return setLoading(false)
        }
        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await clienteAxios.get('/usuarios/perfil', config)
            // console.log(data);
            setAuth(data)
            navigate('/portafolios')
        } catch (error) {
            setAuth({})
        } finally {
            setLoading(false)
        }
      }
      autenticarUsuario()
    }, [])
    

    return (
        <AuthContext.Provider
            value={{
              auth,
              setAuth,
              loading
            }}>
                {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext