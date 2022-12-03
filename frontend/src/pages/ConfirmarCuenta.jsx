import clienteAxios from "../config/clienteAxios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Mensaje from "../components/Mensaje";
import { Link } from "react-router-dom";

const ConfirmarCuenta = () => {
  const [mensaje, setMensaje] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const { data } = await clienteAxios.get('/usuarios/confirmar/' + id);
        console.log(data);
      } catch (error) {
        console.log(error);
        setMensaje({
          titulo: error.response.status,
          msg: error.response.data.msg,
          color: "red",
        });
      }
    };

    confirmarCuenta();
  }, []);

  return (
    <>
      {
        
        mensaje
        
        ? <div>
            <Mensaje mensaje={mensaje} />
            <Link 
              className="bg-rose-500 text-center block mt-10 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
              to={'/'}>
              Volver
            </Link>
          </div>

        : <div>
            <h1 className="text-sky-600 font-black text-4xl sm:text-6xl capitalize lg:text-5xl xl:text-6xl">
              Cuenta confiramda correctamente, comienza a crear tus{" "}
              <span className="text-rose-500">Portafolios</span>
            </h1>
            <Link 
              className="bg-rose-500 text-center block mt-10 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
              to='/usuarios'>
              Haz CLick aqui
            </Link>
          </div>
      }
    </>
  );
};

export default ConfirmarCuenta;
