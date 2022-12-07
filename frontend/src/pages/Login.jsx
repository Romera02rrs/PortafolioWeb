import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Mensaje from "../components/Mensaje";
import clienteAxios from "../config/clienteAxios";
import { useForm } from "../hooks/useForm";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate()

  const { setAuth } = useAuth()
  const [mensaje, setMensaje] = useState(false)
  const { email, password, onInputChange } = useForm({
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if([email, password].includes('')){
      return setMensaje({
        title: '',
        msg: 'Todos los campos son obligatorios',
        color: 'red'
      })
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/login', {
        email, 
        password
      })
      localStorage.setItem('token', data.token)
      setAuth(data);
      setMensaje({
        titulo: '',
        msg: 'Inicio de sesión exitoso',
        color: "green",
      });
      return navigate('/portafolios')
      
    } catch (error) {
      return setMensaje({
        titulo: error.response.status,
        msg: error.response.data.msg,
        color: "red",
      });
    }
  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl sm:text-6xl capitalize lg:text-5xl xl:text-6xl">
        Inicia sesión y administra tus {" "}
        <span className="text-rose-500">Portafolios</span>
      </h1>
      { mensaje && <Mensaje mensaje={mensaje} /> }
      <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={onInputChange}
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={onInputChange}
            placeholder="Password de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="my-5 mt-10">
          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-rose-500 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </div>
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 text-sm"
          to="/usuarios/registrar">
          ¿No tienes una cuenta?{" "}
          <span className="underline-transition text-rose-500 uppercase font-medium">
            Regístrate
          </span>
        </Link>

        <Link
          className="block font-medium hover:pointer text-center my-5 uppercase text-sm text-rose-500"
          to="/usuarios/olvide-password">
          <span className="underline-transition">Olvide Mi Password</span>
        </Link>
      </nav>
    </>
  );
};

export default Login;
