import usePortafolios from "../hooks/usePortafolios";
import ClipLoader from "react-spinners/ClipLoader";
import PortafolioItem from "../components/PortafolioItem"
import { useForm } from "../hooks/useForm";

const Portafolios = () => {
  const { portafolios, setPortafolios, loading } = usePortafolios();
  const { onInputChange, buscar, onResetForm } = useForm({
    buscar: "",
  })
  
  const buscarPortafolios = () => {
    if (buscar == "") {
      console.log("No hay nada");
      setPortafolios(defaultPortafolios);
      return;
    }
    setPortafolios(portafolios.filter(portafolio => portafolio.titulo.toLowerCase().includes(buscar.toLowerCase())))
  }



  return (
    <>
      <h1 className="text-4xl font-black capitalize">Tus portafolios</h1>
      {

        loading

        ? <div className="min-h-full min-w-full flex items-center justify-center"><ClipLoader size={250} /></div>

        : <div>
          <div className="py-5">
            <input type="text" id="buscar" name="buscar" className="rounded-lg p-1" value={buscar} onChange={onInputChange} />
            <button htmlFor="buscar" type="button" onClick={buscarPortafolios} className="max-[455px]:ml-0 max-[455px]:mt-5 ml-5 bg-gray-300 p-2 rounded-md font-bold uppercase transition-colors shadow-md transition-all">
              Buscar portafolio
            </button>
          </div>
          
          {portafolios.map((portafolio) => (
            <PortafolioItem datos={portafolio} key={portafolio._id} setPortafolios={setPortafolios} />
          ))}
          </div>
        }
    </>
  );
};

export default Portafolios;
