import { useState } from "react";

const Mensaje = () => {
  const [showAlert, setShowAlert] = useState(true);
  return (
    <>
      {showAlert ? (
        <div
          className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500"
        >
          <span className="text-xl inline-block mr-5 align-middle">
            <i className="fas fa-bell" />
          </span>
          <span className="inline-block align-middle mr-8">
            <b className="capitalize">red!</b> This is a red alert -
            check it out!
          </span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            onClick={() => setShowAlert(false)}
          >
            <span>×</span>
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Mensaje;




// // import { useEffect } from "react";

// const Mensaje = ({ mensaje: { titulo, msg, color } }) => {

//   // const cerrarMensaje = (e) => {
//   //   console.log();
//   //   e.target.parentNode.parentNode.style = 'display:none'
//   // }

//   // const abrirMensaje = () => {
//   //   console.log(document.getElementById('mensajeContainer'));
//   //   //document.querySelector('span')[1].style = 'display:block'
//   // }

//   // useEffect(() => {
//   //   abrirMensaje()
//   // }, [])
  

//   return (
//     <div
//       className={`mt-10 bg-${color}-100 border border-${color}-500 text-${color}-700 px-4 py-3 rounded relative`}
//       role="alert"
//       id="mensajeContainer">
//       {titulo && <strong className="font-bold">{titulo}: </strong>}
//       <span className="block sm:inline text-center">¡{msg}!</span>
//       {/* <span onClick={cerrarMensaje} className="absolute top-0 bottom-0 right-0 px-4 py-3">
//         <svg
//           className={`fill-current h-6 w-6 text-${color}-500`}
//           role="button"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20">
//           <title>Close</title>
//           <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
//         </svg>
//       </span> */}
//     </div>
//   );
// };

// export default Mensaje;
