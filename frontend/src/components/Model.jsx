import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";
import { useFrame } from '@react-three/fiber'
import { useRef } from "react";
import { useState } from "react";
//import model from "../assets/SpainBoyPose.gltf";

const Model = ({ position }) => {

  const gltf = useLoader(GLTFLoader, "./SpainBoyPose.gltf");

  const myMesh = useRef()


  // useFrame(({ clock }) => {
  //   myMesh.current.rotation.y = clock.getElapsedTime()
  // })

  return (
    <Suspense fallback={null}>
        <primitive ref={myMesh} scale={5} position={position} object={gltf.scene} />
    </Suspense>
  );
};

export default Model;
