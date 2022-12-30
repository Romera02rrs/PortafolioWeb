import { useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button } from "flowbite-react";
import { useForm, useFieldArray } from "react-hook-form";
import { ToggleSwitch } from "flowbite-react";
import { Link } from "react-router-dom";

const PortafolioItem = ({
  datos: { titulo, descripcion, _id },
  datos,
  setPortafolios,
}) => {
  const token = localStorage.getItem("token");
  const [confirmacionModal, setConfirmacionModal] = useState(false);
  const [editarModal, setEditarModal] = useState(false);

  const ver = () => {
    console.log("ver");
  };

  const editar = () => {
    console.log(datos);
  };

  const abrirEditarModal = () => {
    setEditarModal(true);
  };

  const cerrarEditarModal = () => {
    setEditarModal(false);
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
    setPortafolios((portafolios) =>
      portafolios.filter((portafolio) => portafolio._id !== _id)
    );

    try {
      await clienteAxios.delete(`portafolio/${_id}`, config);
      console.log("eliminado");
    } catch (error) {
      console.log(error.response);
    }
  };

  const date = new Date();
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({ 
    defaultValues: datos
   });

  const {
    fields: habFields,
    append: habAppend,
    remove: habRemove,
  } = useFieldArray({
    control,
    name: "habilidades",
  });

  const {
    fields: aptFields,
    append: aptAppend,
    remove: aptRemove,
  } = useFieldArray({
    control,
    name: "aptitudes",
  });

  const {
    fields: expFields,
    append: expAppend,
    remove: expRemove,
  } = useFieldArray({
    control,
    name: "experiencia",
  });

  const {
    fields: forFields,
    append: forAppend,
    remove: forRemove,
  } = useFieldArray({
    control,
    name: "formaciones",
  });

  const [mensaje, setMensaje] = useState(false);
  const [modalExperienciaOpen, setModalExperienciaOpen] = useState(false);
  const [trabajoActual, setTrabajoActual] = useState(false);
  const [modalFormacionOpen, setModalFormacionOpen] = useState(false);
  const [formacionActual, setFormacionActual] = useState(false);

  const changeTrabajoActual = () => {
    setTrabajoActual(!trabajoActual);
  };

  const changeFormacionActual = () => {
    setFormacionActual(!formacionActual);
  };

  const onClickExperiencia = () => {
    setModalExperienciaOpen(true);
  };

  const onCloseExperiencia = () => {
    setModalExperienciaOpen(false);
  };

  const onClickFormacion = () => {
    setModalFormacionOpen(true);
  };

  const onCloseFormacion = () => {
    setModalFormacionOpen(false);
  };

  const calculaDia = (dia) => {
    return dia < 10 ? "0" + dia : dia;
  };

  const onFormSubmit = (dataForm) => {
    cerrarEditarModal()
    if (errors.lenght > 0) {
      setMensaje(errors[0]);
      return console.log("hay errores: ", errors);
    }

    const token = localStorage.getItem("token");

    const enviarPortafolio = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        console.log(dataForm);
        const { data } = await clienteAxios.put(
          `/portafolio/${_id}`,
          dataForm,
          config
        );
        setPortafolios((portafolios) => { 
          return portafolios.map((portafolio) => {
            if(portafolio._id === _id){
              return data
            }else{
              return portafolio
            }
          })
        });
      } catch (error) {
        console.log(error.response);
      }
    };

    enviarPortafolio();
  };

  return (
    <div key={_id} className="bg-white shadow-md rounded-md p-4 my-4">
      <h2 className="text-2xl font-bold">{titulo}</h2>
      <p className="text-gray-600">{descripcion}</p>
      <div className="pt-3">
        <Link
          to={`/portafolios/portafolio/${_id}`}
          className="bg-green-500 text-white px-4 py-2 rounded-md mr-3 shadow-lg hover:bg-green-600 hover:shadow-none transition-colors">
          Ver
        </Link>

        { /* EDITAR MODAL */}

        <button
          onClick={abrirEditarModal}
          className="bg-yellow-400 text-white px-4 py-2 rounded-md mr-3 shadow-lg hover:bg-yellow-500 hover:shadow-none transition-colors">
          Editar
        </button>
        <Modal
          show={editarModal}
          size="lg"
          popup={true}
          onClose={cerrarEditarModal}>
          <Modal.Header className="mt-20">
          </Modal.Header>
          <Modal.Body>
            <form
              className="bg-yellow-400 py-10 px-5 W-full rounded-lg shadow"
              onSubmit={handleSubmit(onFormSubmit)}>
              {mensaje && <Alerta alerta={alerta} />}

              <div className="mb-5">
                <label
                  className="text-gray-700 uppercase font-bold text-sm"
                  htmlFor="titulo">
                  Título del portafolio
                </label>

                <input
                  {...register("titulo", {
                    required: "El título es requerido",
                  })}
                  id="titulo"
                  type="text"
                  className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  placeholder="Título del portafolio"
                />
              </div>

              <div className="mb-5">
                <label
                  className="text-gray-700 uppercase font-bold text-sm"
                  htmlFor="descripcion">
                  Descripción
                </label>

                <textarea
                  {...register("descripcion", {
                    required: "La descripción es requerida",
                  })}
                  id="descripcion"
                  className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  placeholder="Descripción del portafolio"
                />
              </div>

              {/* MODAL DE LA EXPERIENCIA */}

              <div className="mb-5">
                <label
                  className="text-gray-700 uppercase font-bold text-sm"
                  htmlFor="experiencia">
                  Experiencia
                </label>

                <button
                  id="experiencia"
                  type="button"
                  onClick={onClickExperiencia}
                  className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">
                  Añadir experiencia
                </button>
              </div>

              <Modal show={modalExperienciaOpen} onClose={onCloseExperiencia}>
                <Modal.Header>Inserte un nuevo campo</Modal.Header>
                {expFields.map((item, index) => {
                  return (
                    <Modal.Body
                      key={item.id}
                      className="m-10 bg-gray-200 rounded-lg">
                      <div className="mb-5">
                        <label
                          className="text-gray-700 uppercase font-bold text-sm"
                          htmlFor="nombreEmpresa">
                          Nombre de la empresa
                        </label>

                        <input
                          {...register(`experiencia.${index}.nombreEmpresa`)}
                          id="nombreEmpresa"
                          type="text"
                          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                          placeholder="Inserte el nombre de la empresa"
                        />
                      </div>
                      <div className="mb-5">
                        <label
                          className="text-gray-700 uppercase font-bold text-sm"
                          htmlFor="cargo">
                          Cargo / Desempeño
                        </label>

                        <input
                          {...register(`experiencia.${index}.cargo`)}
                          id="cargo"
                          type="text"
                          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                          placeholder="(Programador frontend, administrador de bases de datos...)"
                        />
                      </div>
                      <div className="mb-5">
                        <label
                          className="text-gray-700 uppercase font-bold text-sm"
                          htmlFor="fechaInicioExperiencia">
                          Fecha de inicio
                        </label>

                        <input
                          {...register(`experiencia.${index}.fechaInicio`)}
                          id="fechaInicioExperiencia"
                          type="date"
                          max={`${year}-${month}-${calculaDia(day + 1)}`}
                          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        />
                      </div>
                      <div className="mb-5">
                        <label
                          className="text-gray-700 block uppercase font-bold text-sm"
                          htmlFor="fechaFinExperiencia">
                          Fecha de fin
                        </label>

                        <div className="block sm:flex">
                          <input
                            {...register(`experiencia.${index}.fechaFin`)}
                            id="fechaFinExperiencia"
                            type="date"
                            disabled={trabajoActual}
                            max={`${year}-${month}-${calculaDia(day + 1)}`}
                            className={
                              (trabajoActual ? "bg-gray-200" : "") +
                              " border w-full sm:w-[50%] p-2 mt-2 placeholder-gray-400 rounded-md"
                            }
                          />
                          <div
                            className="flex ml-3 mt-5 sm:mt-0 justify-center flex-col gap-4"
                            id={`toggle${index}`}>
                            <ToggleSwitch
                              checked={trabajoActual}
                              label="Trabajo actualmente"
                              onChange={changeTrabajoActual}
                              id={`toggle${index}`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-5">
                        <label
                          className="text-gray-700 uppercase font-bold text-sm"
                          htmlFor="ubicacionEmpresa">
                          Ubicacion de la empresa
                        </label>

                        <input
                          {...register(`experiencia.${index}.ubicacion`)}
                          id="ubicacionEmpresa"
                          type="text"
                          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                          placeholder="Inserte la ubicacion de la empresa"
                        />
                      </div>

                      <button
                        type="button"
                        className="text-white text-sm bg-rose-500 p-3 rounded-md uppercase font-bold hover:bg-sky-600 transition-colors"
                        onClick={() => expRemove(index)}>
                        Eliminar
                      </button>
                    </Modal.Body>
                  );
                })}
                <Modal.Footer>
                  <Button onClick={onCloseExperiencia}>Guardar</Button>
                  <Button color="gray" onClick={() => expAppend("")}>
                    Nuevo campo
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* MODAL DE LA FORMACIÓN */}
              <div className="mb-5">
                <label
                  className="text-gray-700 uppercase font-bold text-sm"
                  htmlFor="formacion">
                  Formación
                </label>

                <button
                  type="button"
                  id="formacion"
                  onClick={onClickFormacion}
                  className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">
                  Añadir formación
                </button>
              </div>
              <Modal show={modalFormacionOpen} onClose={onCloseFormacion}>
                <Modal.Header>Inserte un nuevo campo</Modal.Header>
                {forFields.map((item, index) => {
                  return (
                    <Modal.Body
                      key={item.id}
                      className="m-10 bg-gray-200 rounded-lg">
                      <div className="mb-5">
                        <label
                          className="text-gray-700 uppercase font-bold text-sm"
                          htmlFor="titulo">
                          Título
                        </label>

                        <input
                          {...register(`formaciones.${index}.titulo`)}
                          id="titulo"
                          type="text"
                          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                          placeholder="Grado superior en... Grado universitario en..."
                        />
                      </div>
                      <div className="mb-5">
                        <label
                          className="text-gray-700 uppercase font-bold text-sm"
                          htmlFor="campo">
                          Familia profesional
                        </label>

                        <input
                          {...register(`formaciones.${index}.campo`)}
                          id="campo"
                          type="text"
                          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                          placeholder="(informática y comunicaciones, agraria, artes gráficas...)"
                        />
                      </div>
                      <div className="mb-5">
                        <label
                          className="text-gray-700 uppercase font-bold text-sm"
                          htmlFor="nombreCentro">
                          Nombre del centro
                        </label>

                        <input
                          {...register(`formaciones.${index}.nombreCentro`)}
                          id="nombreCentro"
                          type="text"
                          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                          placeholder="Inserte el nombre del centro educativo"
                        />
                      </div>
                      <div className="mb-5">
                        <label
                          className="text-gray-700 uppercase font-bold text-sm"
                          htmlFor="fechaInicioFormacion">
                          Fecha de inicio
                        </label>

                        <input
                          {...register(`formaciones.${index}.fechaInicio`)}
                          id="fechaInicioFormacion"
                          type="date"
                          max={`${year}-${month}-${calculaDia(day + 1)}`}
                          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        />
                      </div>
                      <div className="mb-5">
                        <label
                          className="text-gray-700 block uppercase font-bold text-sm"
                          htmlFor="fechaFinFormacion">
                          Fecha de fin
                        </label>

                        <div className="block xs:flex">
                          <input
                            {...register(`formaciones.${index}.fechaFin`)}
                            id="fechaFinFormacion"
                            type="date"
                            disabled={trabajoActual}
                            max={`${year}-${month}-${calculaDia(day + 1)}`}
                            className={
                              (trabajoActual ? "bg-gray-200" : "") +
                              " border w-full sm:w-[50%] p-2 mt-2 placeholder-gray-400 rounded-md"
                            }
                          />
                          <div
                            className="flex ml-3 mt-5 sm:mt-0 justify-center flex-col gap-4"
                            id={`toggle${index}`}>
                            <ToggleSwitch
                              checked={trabajoActual}
                              label="Estudio actualmente"
                              onChange={changeFormacionActual}
                              id={`toggle${index}`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-5">
                        <label
                          className="text-gray-700 uppercase font-bold text-sm"
                          htmlFor="ubicacionFormacion">
                          Ubicacion del centro educativo
                        </label>

                        <input
                          {...register(`formaciones.${index}.ubicacion`)}
                          id="ubicacionFormacion"
                          type="text"
                          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                          placeholder="Inserte la ubicacion del centro educativo"
                        />
                      </div>

                      <button
                        type="button"
                        className="text-white text-sm bg-rose-500 p-3 rounded-md uppercase font-bold hover:bg-sky-600 transition-colors"
                        onClick={() => forRemove(index)}>
                        Eliminar
                      </button>
                    </Modal.Body>
                  );
                })}
                <Modal.Footer>
                  <Button onClick={() => forAppend("")}>Nuevo campo</Button>
                  <Button color="gray" onClick={onCloseFormacion}>
                    Guardar
                  </Button>
                </Modal.Footer>
              </Modal>

              <div className="mb-5">
                <label
                  className="text-gray-700 block uppercase font-bold text-sm"
                  htmlFor="habilidades">
                  Habilidades
                </label>

                {habFields.map((item, index) => {
                  return (
                    <div
                      className="block xs:flex justify-between"
                      key={item.id}>
                      <input
                        className="border w-full xs:w-[70%] p-2 mt-2 placeholder-gray-400 rounded-md"
                        {...register(`habilidades.${index}`, {
                          required: true,
                        })}
                      />

                      <button
                        type="button"
                        className="border w-full xs:w-[25%] p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                        onClick={() => habRemove(index)}>
                        Eliminar
                      </button>
                    </div>
                  );
                })}
                <button
                  type="button"
                  className="border w-[50%] p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                  onClick={() => {
                    habAppend("");
                  }}>
                  Nueva habilidad
                </button>
              </div>

              <div className="mb-5">
                <label
                  className="text-gray-700 block uppercase font-bold text-sm"
                  htmlFor="aptitudes">
                  Aptitudes
                </label>

                <ul>
                  {aptFields.map((item, index) => {
                    return (
                      <div
                        className="block xs:flex justify-between"
                        key={item.id}>
                        <input
                          className="border w-full xs:w-[70%] p-2 mt-2 placeholder-gray-400 rounded-md"
                          {...register(`aptitudes.${index}`, {
                            required: true,
                          })}
                        />

                        <button
                          type="button"
                          className="border w-full xs:w-[25%] p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                          onClick={() => aptRemove(index)}>
                          Eliminar
                        </button>
                      </div>
                    );
                  })}
                </ul>
                <button
                  type="button"
                  className="border w-[50%] p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                  onClick={() => {
                    aptAppend("");
                  }}>
                  Nueva habilidad
                </button>
              </div>

              <input
                type="submit"
                className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
              />
            </form>
          </Modal.Body>
        </Modal>

        { /* EDITAR MODAL */}

        <button
          onClick={abrirMoadalConfirmacion}
          className="bg-red-500 text-white px-4 py-2 rounded-md mr-3 shadow-lg hover:bg-red-600 hover:shadow-none transition-colors"
          type="button"
          data-modal-toggle="popup-modal">
          Eliminar
        </button>
        <Modal
          show={confirmacionModal}
          size="md"
          popup={true}
          onClose={cerrarModalConfirmacion}>
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
