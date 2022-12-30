import React from "react";
import { Navbar, Button, Timeline } from "flowbite-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <nav>
        <Navbar fluid={true} rounded={true}>
          <Navbar.Brand>
            <span className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0 capitalize">
              Portafolio web
            </span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Link to="/usuarios">
              <button className="text-white text-sm bg-rose-500 p-3 rounded-md uppercase font-bold shadow-lg hover:shadow-none hover:bg-rose-700 transition-colors">
                Usuarios
              </button>
            </Link>
          </div>
        </Navbar>
      </nav>
      <div className="py-10">
        <div className="px-5 py-3 bg-sky-600 capitalize font-bold text-2xl text-white">
          Rubén Romera Sánchez
        </div>

        <div className="pt-5 px-5">
          <div className="text-xl font-bold text-sky-600">Resumen Profesional</div>
          <p>Jóven programador web con un gran interés en el mundo de la informática y la programación. Tengo gran capacidad para adaptarme a todo tipo de entornos y aportar siempre lo mejor de mí. Me caracterizo por mi facilidad para el trabajo en equipo y mi entusiasmo por aprender y desarrollar mis habilidades.</p>
        </div>

        <div className="pt-5 px-5">
          <div className="text-xl font-bold text-sky-600">Experiencia</div>
          <div className="pt-3">
            <span className="font-bold block">NTTDATA</span>
            <span className="block">Programador FrontEnd</span>
            <span className="block">2022-12-07T01:10:20.159+00:00</span>
            <span>Playa de san juan</span>
          </div>
        </div>

        <div className="pt-5 px-5">
          <div className="text-xl font-bold text-sky-600">Formacion</div>
          <div className="pt-3">
            <span className="font-bold block">Grado Superior en Desarrollo de Aplicaciones Web</span>
            <span className="block">Informática, programación</span>
            <span className="block">IES Enric Valor</span>
            <span>Pego</span>
          </div>

          <div className="pt-3">
            <span className="font-bold block">Grado Superior en Desarrollo de Aplicaciones Web</span>
            <span className="block">Informática, programación</span>
            <span className="block">IES Enric Valor</span>
            <span>Pego</span>
          </div>
        </div>

        <div className="pt-5 px-5">
          <div className="text-xl font-bold text-sky-600">Habilidades</div>
          <div className="pt-3">
            <ul className="list-disc ml-5">
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>React</li>
              <li>NodeJS</li>
              <li>Express</li>
              <li>MySQL</li>
              <li>MongoDB</li>
            </ul>
          </div>
        </div>

        <div className="pt-5 px-5">
          <div className="text-xl font-bold text-sky-600">Aptitudes</div>
          <div className="pt-3">
            <ul className="list-disc ml-5">
              <li>Trabajo en equipo</li>
              <li>Capacidad de aprendizaje</li>
              <li>Capacidad de adaptación</li>
              <li>Responsabilidad</li>
              <li>Resolución de problemas</li>
              <li>Comunicación</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
