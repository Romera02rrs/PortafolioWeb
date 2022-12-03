import { Link } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Mensaje from "../components/Mensaje"
import { useState } from "react"
import { useForm } from "../hooks/useForm"

const OlvidePassword = () => {

  const [mensaje, setMensaje] = useState(false)
  const { email, onInputChange } = useForm({
    email: ''
  })
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await clienteAxios.post('/usuarios/olvide-password', {email})
      console.log(data);
      setMensaje({
        msg: data.msg,
        color: 'green',
        titulo: ''
      })
    } catch (error) {
      setMensaje({
        msg: error.response.data.msg,
        color: 'red',
        titulo: 'Error ' + error.response.status
      })
    }
    

  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl sm:text-6xl capitalize lg:text-5xl xl:text-6xl">
        Recupera el acceso y no pierdas tus{" "}
        <span className="text-rose-500">Portafolios</span>
      </h1>

      { mensaje && <Mensaje mensaje={mensaje} />}

      <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email">
            Email
          </label>
          <input
            id="email"
            onChange={onInputChange}
            value={email}
            name="email"
            type="email"
            placeholder="Introduce tu correo electrónico"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="my-5 mt-10">
          <input
            type="submit"
            value="Enviar instrucciones"
            className="bg-rose-500 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </div>
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
          className="block text-center my-5 text-slate-500 text-sm"
          to="/usuarios/registrar">
          ¿No tienes una cuenta?{" "}
          <span className="underline-transition text-rose-500 uppercase font-medium">
            Regístrate
          </span>
        </Link>
      </nav>
    </>
  )
}

export default OlvidePassword