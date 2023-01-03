console.log("Hello World!");
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// Obtener el elemento donde se renderizará three
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

// La escena contiene todas los objetos, cámaras y luces. ES como un container
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xF5B041 );

// La cámara obtiene como primer argumento el campo de visión, aspect ratio
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const cameraStartX = -1
const cameraStartY = 13.5
const cameraStartZ = 2.5
camera.position.set(cameraStartX, cameraStartY, cameraStartZ);
camera.lookAt(-1.6, 13);

renderer.render( scene, camera )

// Luces de ambiente
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1)
scene.add(ambientLight)

// Focos de luz
const spotLight1 = new THREE.SpotLight(0xffffff, 0.5, 50, Math.PI/6, 0, 2);
spotLight1.position.set(0, 30, 25);
const spotLightHelper1 = new THREE.SpotLightHelper(spotLight1);
scene.add(spotLight1);

const spotLight2 = new THREE.SpotLight(0xffffff, 2,50 ,Math.PI/5);
spotLight2.position.set(0, -15, 25);
const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2, 0xffff5f);
scene.add(spotLight2);

const spotLight3 = new THREE.SpotLight(0xffffff, 3,50 ,Math.PI/5);
spotLight3.position.set(-1, 15, 5);
const spotLightHelper3 = new THREE.SpotLightHelper(spotLight3, 0xffff2f);
scene.add(spotLight3);

// Visualizaciones de los rayos de los focos de luz
//scene.add(spotLightHelper1, spotLightHelper2, spotLightHelper3)

// Visualización de la malla del suelo
const gridHelper = new THREE.GridHelper(200, 50)
//scene.add(gridHelper)

// Loader para cargar el modelo
const loader = new GLTFLoader();
loader.load('./3dModels/SpainBoyPose.gltf', (gltfScene) => {
  gltfScene.scene.scale.set(10, 10, 10);
  scene.add(gltfScene.scene)
})

// Función para rerenderizar la ventana al cambiar su tamaño
window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};

// Movimiento de la camara al hacer scroll
document.body.onscroll = function () {
  const t = document.body.getBoundingClientRect().top

  //console.log(t);
  
  //(t < -550 && t > -1550) && console.error((2.5 + t * -0.001) + t * -0.001);
  
  //camera.position.set(-4 + t * -0.009, 10 + t * -0.009, -15);
  //camera.position.set(cameraStartX + t * -0.001, cameraStartY + t * -0.001, cameraStartZ - t * -0.001);
  //t > -550 && camera.position.set(cameraStartX + t * -0.001, cameraStartY + t * -0.001, cameraStartZ + t * -0.001);
  //(t < -550 && t > -1550 ) && console.log("hola");
  camera.position.set(cameraStartX + t * -0.001, cameraStartY + t * -0.001, cameraStartZ + t * -0.001)
  //console.log("camara " + (parseFloat(camera.position.z) + 0.011));
}

//const controls = new OrbitControls(camera, renderer.domElement)

function animate(){
  requestAnimationFrame( animate );

  //controls.update()

  renderer.render(scene, camera);
}

animate()