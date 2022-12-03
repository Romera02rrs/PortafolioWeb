import { useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import { useForm } from "../hooks/useForm";
import Mensaje from "../components/Mensaje";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const NuevoPassword = () => {
  const [mensaje, setMensaje] = useState(false);
  const [tokenValido, setTokenValido] = useState(false);
  const { password, rePassword, onInputChange } = useForm({
    password: "",
    rePassword: "",
  });
  const { token } = useParams();

  useEffect(() => {
    const confirmarToken = async () => {

      try {
        await clienteAxios.get('/usuarios/olvide-password/' + token);
        setTokenValido(true);
      } catch (error) {
        setMensaje({
          titulo: error.response.status,
          msg: error.response.data.msg,
          color: "red",
        });
      }
    };

    confirmarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if([password, rePassword].includes('')){
      return setMensaje({
        title:'',
        msg: 'Todos los campos son obligatorios',
        color: 'red'
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
      const { data } = await clienteAxios.post('/usuarios/olvide-password/' + token, {password})
      return setMensaje({
        msg: data.msg,
        color: 'green',
        titulo: ''
      })
    } catch (error) {
      setMensaje({
        titulo: error.response.status,
        msg: error.response.data.msg,
        color: "red",
      });
      return setTokenValido(false)
    }
  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl sm:text-6xl capitalize lg:text-5xl xl:text-6xl">
        Recupera la contraseña y no pierdas el acceso a tus{" "}
        <span className="text-rose-500">Portafolios</span>
      </h1>

      {tokenValido ? (
        <div>
          {mensaje && <Mensaje mensaje={mensaje} />}
          <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
            <div className="my-5">
              <label
                className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="password">
                Nueva contraseña
              </label>
              <input
                id="password"
                value={password}
                name="password"
                onChange={onInputChange}
                type="password"
                placeholder="Introduzca una contraseña"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
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
                value="Cambiar contraseña"
                className="bg-rose-500 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
              />
            </div>
          </form>
        </div>
      ) : (
        mensaje && <Mensaje mensaje={mensaje} />
      )}
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 text-sm"
          to="/usuarios">
          ¿Ya eres cliente?{" "}
          <span className="underline-transition text-rose-500 uppercase font-medium">
            Iniciar sesión
          </span>
        </Link>
      </nav>
    </>
  );
};

export default NuevoPassword;
