import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { auth } = useAuth();

  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10 bg-white">
      <p className="text-xl font-bold text-center">
        ¡Bienvenido: {auth.nombre}!
      </p>

      <div className="w-full flex justify-center">
        <Link
          to="crear-portafolio"
          className="bg-sky-600 md:text-center md:min-w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg shadow-lg hover:shadow-none hover:bg-sky-700 transition-colors">
          Nuevo portafolio
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
