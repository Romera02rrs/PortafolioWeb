import { useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button } from "flowbite-react";

const PortafolioItem = ({ datos:{ titulo, descripcion, _id } }) => {
  
  const token = localStorage.getItem("token");
  const [confirmacionModal, setConfirmacionModal] = useState(false)


  const ver = () => {
    console.log("ver");
  };

  const editar = () => {
    console.log("editar");
  };

  const abrirMoadalConfirmacion = () => {
    setConfirmacionModal(true);
  };

  const cerrarModalConfirmacion = () => {
    setConfirmacionModal(false);
  };

  const eliminar = async () => {
    setConfirmacionModal(false);
    const config = {
      headers: {    
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    window.location.reload();

    try {
      await clienteAxios.delete(`portafolio/${_id}`, config);
      console.log("eliminado");  
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div key={_id} className="bg-white shadow-md rounded-md p-4 my-4">
      <h2 className="text-2xl font-bold">{titulo}</h2>
      <p className="text-gray-600">{descripcion}</p>
      <div className="pt-3">
        <button
          onClick={ver}
          className="bg-green-500 text-white px-4 py-2 rounded-md mr-3 shadow-lg hover:bg-green-600 hover:shadow-none transition-colors">
          Ver
        </button>
        <button
          onClick={editar}
          className="bg-yellow-400 text-white px-4 py-2 rounded-md mr-3 shadow-lg hover:bg-yellow-500 hover:shadow-none transition-colors">
          Editar
        </button>
        <button
          onClick={abrirMoadalConfirmacion}
          className="bg-red-500 text-white px-4 py-2 rounded-md mr-3 shadow-lg hover:bg-red-600 hover:shadow-none transition-colors"
          type="button"
          data-modal-toggle="popup-modal">
          Eliminar
        </button>
        <Modal show={confirmacionModal} size="md" popup={true} onClose={cerrarModalConfirmacion}>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                ¿Estas seguro de eliminar este portafolio?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={eliminar}>
                  Si, eliminar
                </Button>
                <Button color="gray" onClick={cerrarModalConfirmacion}>
                  Cancelar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default PortafolioItem;
