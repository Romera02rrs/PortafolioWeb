import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl sm:text-6xl capitalize lg:text-5xl xl:text-6xl">
        Inicia sesión y administra tus {" "}
        <span className="text-rose-500">Portafolios</span>
      </h1>
      <form className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="my-5 mt-10">
          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-rose-500 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </div>
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 text-sm"
          to="/registrar">
          ¿No tienes una cuenta?{" "}
          <span className="underline-transition text-rose-500 uppercase font-medium">
            Regístrate
          </span>
        </Link>

        <Link
          className="block font-medium hover:pointer text-center my-5 uppercase text-sm text-rose-500"
          to="/olvide-password">
          <span className="underline-transition">Olvide Mi Password</span>
        </Link>
      </nav>
    </>
  );
};

export default Login;
