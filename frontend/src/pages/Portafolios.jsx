import usePortafolios from "../hooks/usePortafolios";
import ClipLoader from "react-spinners/ClipLoader";
import PortafolioItem from "../components/PortafolioItem";

const Portafolios = () => {
  const { portafolios, loading } = usePortafolios();

  return (
    <>
      <h1 className="text-4xl font-black capitalize">Tus portafolios</h1>
      {

        loading

        ? <div className="min-h-full min-w-full flex items-center justify-center"><ClipLoader size={250} /></div>

        : <div>
          {portafolios.map((portafolio) => (
            <PortafolioItem datos={portafolio} key={portafolio._id} />
          ))}
          </div>
        }
    </>
  );
};

export default Portafolios;
