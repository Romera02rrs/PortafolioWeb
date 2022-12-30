import { useState } from "react"
import { useForm } from "../hooks/useForm"
import { Link, Navigate } from "react-router-dom"
import Mensaje from "../components/Mensaje"
import clienteAxios from "../config/clienteAxios"
import { BarLoader } from "react-spinners"

const Registrar = () => {

  // const [nombre, setnombre] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [rePassword, setRePassword] = useState('')  
  
  const [loading, setLoading] = useState(false)

  const formData = {
    nombre: '',
    email: '',
    password: '',
    rePassword: ''
  }

  const { formState, nombre, email, password, rePassword, onInputChange, onResetForm } = useForm(formData)

  const [ mensaje, setMensaje ] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    if([nombre, email, password, rePassword].includes('')){
      return setMensaje({
        msg: 'Todos los campos son obligatorios',
        color: 'red',
        titulo: ''
      })
    }

    if(password !== rePassword){
      return setMensaje({
        msg: 'Las contraseñas no coinciden',
        color: 'red',
        titulo: ''
      })
    }
    
    if(password.length < 8){
      return setMensaje({
        msg: 'La contraseña debe tener 8 caracteres como mínimo',
        color: 'red',
        titulo: ''
      })
    }

    try {
      setLoading(true)
      await clienteAxios.post('/usuarios', 
        {
          nombre,
          email,
          password
        }
      )
      setLoading(false)
      setMensaje({
        msg: "Usuario registrado correctamente, verifica tu email",
        color: 'green',
        titulo: ''
      })
      onResetForm()
    } catch (error) {
      console.log(error.response);
      return setMensaje({
        msg: error.response.data.msg,
        color: 'red',
        titulo: 'Error ' + error.response.status
      })
    }
  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl sm:text-6xl capitalize lg:text-5xl xl:text-6xl">
        Crea tu cuenta y administra tus{" "}
        <span className="text-rose-500">Portafolios</span>
      </h1>
     
      {
        mensaje && <Mensaje mensaje={mensaje} />
      }

      {/* <Mensaje titulo="Error de validación" mensaje="Todos los campos son obligatorios" color="red"/> */}
      <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Introuce tu nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            name="nombre"
            value={nombre}
            onChange={onInputChange}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Introduce tu correo electrónico"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            name="email"
            value={email}
            onChange={onInputChange}
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
            placeholder="Introduzca una contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            name="password"
            value={password}
            onChange={onInputChange}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="rePassword">
            Repetir password
          </label>
          <input
            id="rePassword"
            type="password"
            placeholder="Repita su contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            name="rePassword"
            value={rePassword}
            onChange={onInputChange}
          />
        </div>

        <div className="my-5 mt-10">
          <input
            type="submit"
            value="Registrarse"
            className="bg-rose-500 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </div>
        {
          loading && <div className="w-full justify-center flex"><BarLoader color={"#0284C7"} width={150} height={10} /></div>
        }
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 text-sm"
          to="/usuarios">
          ¿Ya eres cliente?{" "}
          <span className="underline-transition text-rose-500 uppercase font-medium">
            Iniciar sesión
          </span>
        </Link>

        <Link
          className="block font-medium hover:pointer text-center my-5 uppercase text-sm text-rose-500"
          to="/usuarios/olvide-password">
          <span className="underline-transition">Olvide Mi Password</span>
        </Link>
      </nav>
    </>
  )
}

export default Registrar