import Mensaje from "./Mensaje";
import { useState } from "react";
import { Button } from "flowbite-react";
import { Modal } from "flowbite-react";
import { ToggleSwitch } from "flowbite-react";
import { useForm, useFieldArray } from "react-hook-form";
import clienteAxios from "../config/clienteAxios";

const FormularioPortafolio = () => {
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
    control,
  } = useForm();

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

  /*
  const {
    formState,
    titulo,
    descripcion,
    habilidades,
    onInputChange,
  } = useForm({
    titulo: '',
    descripcion: '',
    experiencia: [
      {
        nombreEmpresa: '',
        cargo: '',
        fechaInicio: '',
        fechaFin: '',
        enCurso: false,
        ubicacion: ''
      }
    ],
    formaciones: [
      {
        titulo: '',
        campo: '',
        nombreCentro: '',
        fechaInicio: '',
        fechaFin: '',
        enCurso: false,
        ubicacion: ''
      }
    ],
    habilidades: ["", "", ""],
    aptitudes: ["", ""]
  });

  console.log(formState); */

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

  const calculateDays = (date1, date2) => {
    date1 = new Date(date1);
    date2 = new Date(date2);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const onFormSubmit = (dataForm) => {
    if (errors.lenght > 0) {
      return console.log("hay errores: ", errors);
    }

    //const days = calculateDays(dataForm.experiencia[0].fechaInicio, dataForm.experiencia[0].fechaFin);console.log(days);

    const token = localStorage.getItem("token");

    const enviarPortafolio = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios.post(
          "/portafolio",
          dataForm,
          config
        );
        console.log(data);
      } catch (error) {
        console.log(error.response);
      }
    };

    enviarPortafolio();
  };

  return (
    <form
      className="bg-white py-10 px-5 md:w-4/5 lg:w-3/5 xl:w-2/5 rounded-lg shadow"
      onSubmit={handleSubmit(onFormSubmit)}>
      {mensaje && <Alerta alerta={alerta} />}

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="titulo">
          Título del portafolio
        </label>

        <input
          {...register("titulo", { required: "El campo es requerido" })}
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
          {...register("descripcion", { required: "El campo es requerido" })}
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
            <Modal.Body key={item.id} className="m-10 bg-gray-200 rounded-lg">
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
            <Modal.Body key={item.id} className="m-10 bg-gray-200 rounded-lg">
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
            <div className="block xs:flex justify-between" key={item.id}>
              <input
                className="border w-full xs:w-[70%] p-2 mt-2 placeholder-gray-400 rounded-md"
                {...register(`habilidades.${index}`, { required: true })}
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
              <div className="block xs:flex justify-between" key={item.id}>
                <input
                  className="border w-full xs:w-[70%] p-2 mt-2 placeholder-gray-400 rounded-md"
                  {...register(`aptitudes.${index}`, { required: true })}
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
  );
};

export default FormularioPortafolio;
