import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import usePortafolio from "../hooks/usePortafolio";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import useAuth from "../hooks/useAuth";

const Portafolio = () => {
  const { id } = useParams();
  const { portafolio, loading } = usePortafolio(id);
  const { auth } = useAuth();

  if (loading)
    return (
      <div className="min-h-full min-w-full flex items-center justify-center">
        <ClipLoader size={250} />
      </div>
    );

  console.log(auth);

  const {
    titulo,
    descripcion,
    experiencia,
    formaciones,
    aptitudes,
    habilidades,
  } = portafolio;

  const convertDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  return (
    <>
      <div className="py-10">
        <div className="px-5 py-3 bg-sky-600 capitalize font-bold text-2xl text-white">
          {auth.nombre}
        </div>
        <div className="px-5 mt-5 py-2 bg-rose-500 capitalize font-bold text-xl text-white">
          {titulo}
        </div>

        <div className="pt-5 px-5">
          <div className="text-xl font-bold text-sky-600">
            Resumen Profesional
          </div>
          <p>{descripcion}</p>
        </div>

        <div className="pt-5 px-5">
          <div className="text-xl font-bold text-sky-600">Experiencia</div>
          {experiencia.map((experiencia) => (
            <div className="pt-3" key={experiencia._id}>
              <span className="font-bold block">
                - {experiencia.nombreEmpresa}
              </span>
              <span className="block">{experiencia.cargo}</span>
              <span className="block">
                {convertDate(experiencia.fechaInicio)}
              </span>
              <span className="text-gray-500">{experiencia.ubicacion}</span>
            </div>
          ))}
        </div>

        <div className="pt-5 px-5">
          <div className="text-xl font-bold text-sky-600">Formación</div>
          {formaciones.map((formacion) => (
            <div className="pt-3" key={formacion._id}>
              <span className="font-bold block">{formacion.titulo}</span>
              <span className="block">{experiencia.campo}</span>
              <span className="block">{experiencia.nombreCentro}</span>
              <span className="block">
                {convertDate(formacion.fechaInicio)} -{" "}
                {convertDate(formacion.fechaFin)}
              </span>
              <span className="text-gray-500">{formacion.ubicacion}</span>
            </div>
          ))}
        </div>

        <div className="pt-5 px-5">
          <div className="text-xl font-bold text-sky-600">Habilidades</div>
          <div className="pt-3">
            <ul className="list-disc ml-5">
              {habilidades.map((habilidad) => (
                <li key={habilidad}>{habilidad}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-5 px-5">
          <div className="text-xl font-bold text-sky-600">Aptitudes</div>
          <div className="pt-3">
          <ul className="list-disc ml-5">
              {aptitudes.map((aptitud) => (
                <li key={aptitud}>{aptitud}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portafolio;
