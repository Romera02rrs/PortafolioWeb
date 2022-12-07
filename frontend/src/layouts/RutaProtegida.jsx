import { Outlet, Navigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RutaProtegida = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full ">
        <ClipLoader
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <>
      {
        auth._id 
        
        ? <div>

            <Header />

            <div className="md:flex md:min-h-screen">
              <Sidebar />
              <main className="p-10 flex-1 bg-gray-100">
                <Outlet /> 
              </main>
            </div>
          </div>
        
        : <Navigate to={'/usuarios'} />
      }
    </>);
};

export default RutaProtegida;
