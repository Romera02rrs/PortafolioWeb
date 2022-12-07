import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0 capitalize">
          Portafolios web
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button type="button" className="hover:bg-gray-100 p-2 rounded-md font-bold uppercase transition-colors">
            Buscar portafolio
          </button>
          <Link to="/portafolios" className="font-bold uppercase hover:bg-gray-100 transition-colors p-2 rounded-md">
            Portafolios
          </Link>

          <button
            type="button"
            className="text-white text-sm bg-rose-500 p-3 rounded-md uppercase font-bold hover:bg-sky-600 transition-colors">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
