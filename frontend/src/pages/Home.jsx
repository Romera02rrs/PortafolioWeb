import { Suspense, useState } from "react";
import ThreeScene from "../components/ThreeScene";
import Sphere from "../components/Sphere";
import { OrbitControls, Stars } from "@react-three/drei";
import Model from "../components/Model";
import HomeOverlay from "../components/HomeOverlay";
import { useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";

const Home = () => {
  const scroll = useRef(0);
  const [cameraPosition, setCameraPosition] = useState([-0.15, 0, 2.2]);
  const [cameraRotation, setCameraRotation] = useState([1.62, 0.01, 0.11]);

  
  const [rotation, setRotation] = useState(0)

  const lightPosition = [-2, 5, 2];

  document.body.onscroll = function () {
    const t = document.body.getBoundingClientRect().top;

    setCameraPosition([-0.15, 0 + t * -0.0005, 2.2 + t * -0.0015]);
    setCameraRotation([1.62 + t * +0.00005, 0.01, 0.11 + t * -0.00003]);
  };

  document.body.onmousemove = function (e) {

    const x = (e.clientX / window.innerWidth) * 500 -30;

    setRotation(-x)
  };

  return (
    <>
      <div className="canvas-container">
        <ThreeScene>
            <color attach="background" args={["#161c24"]} />
            {/* <Sphere color="#ccff0c" position={lightPosition} /> */}
            <ambientLight intensity={0.8} />
            <directionalLight intensity={0.6} position={lightPosition} />
            <group rotation={[0, rotation * 0.0005 , 0]}>
              <Model  scroll={scroll} position={[0, -6.5, 0]} />
            </group>

            <group
              name="Camera"
              position={cameraPosition}
              rotation={cameraRotation}>
              <PerspectiveCamera
                makeDefault
                far={100}
                near={0.1}
                fov={28}
                rotation={[-Math.PI / 2, 0.43, 0]}
              />
          </group>
        </ThreeScene>
      </div>
      <HomeOverlay />
    </>
  );
};

export default Home;
