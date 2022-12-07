import { useForm } from "../hooks/useForm";
import Mensaje from "./Mensaje";
import { useState } from "react";

const FormularioPortafolio = () => {
  const {} = useForm({});

  const [mensaje, setMensaje] = useState(false);

  return (
    <form className="bg-white py-10 px-5 md:w-4/5 lg:w-3/5 rounded-lg shadow">
      {mensaje && <Alerta alerta={alerta} />}

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="nombre">
          Título del portafolio
        </label>

        <input
          id="nombre"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del portafolio"
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="descripcion">
          Descripción
        </label>

        <textarea
          id="descripcion"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripción del portafolio"
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="experiencia">
          Experiencia
        </label>

        <button 
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
        >Añadir experiencia</button>
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="formacion">
          Formación
        </label>

        <button 
          className="<border w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors>"
        >Añadir formación</button>
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 block uppercase font-bold text-sm"
          htmlFor="habilidades">
          Habilidades
        </label>
        
        <div className="block xs:flex justify-between">
            <input
            id="nombre"
            type="text"
            className="border w-full xs:w-[70%] p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nueva habilidad"
            />
            <button className="border w-full xs:w-[25%] p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">Insertar</button>
        </div>
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 block uppercase font-bold text-sm"
          htmlFor="aptitudes">
          Aptitudes
        </label>
        
        <div className="block xs:flex justify-between ">
            <input
            id="nombre"
            type="text"
            className="border w-full xs:w-[70%] p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nueva aptitud"
            />
            <button className="border w-full xs:w-[25%] p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">Insertar</button>
        </div>
      </div>

      <input
        type="submit"
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormularioPortafolio;
