import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Textures
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load(
  "./textures/door/metalness.jpg"
);
const doorRoughnessTexture = textureLoader.load(
  "./textures/door/roughness.jpg"
);
const matcapTexture = textureLoader.load("./textures/matcaps/1.png");
// const matcapTexture = textureLoader.load('/textures/matcaps/2.png');
// const matcapTexture = textureLoader.load('/textures/matcaps/3.png');
// const matcapTexture = textureLoader.load('/textures/matcaps/4.png');
// const matcapTexture = textureLoader.load('/textures/matcaps/5.png');
// const matcapTexture = textureLoader.load('/textures/matcaps/6.png');
// const matcapTexture = textureLoader.load('/textures/matcaps/7.png');
// const matcapTexture = textureLoader.load('/textures/matcaps/8.png');
const gradientTexture = textureLoader.load("./textures/gradients/3.jpg");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Object
// MeshBasicMaterial
// example 1
// const material = new THREE.MeshBasicMaterial({ map: doorColorTexture });

// Equivalent Example 1
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color = new THREE.Color("#ff0000");
// material.color = new THREE.Color("#f00");
// material.color = new THREE.Color("red");
// material.color = new THREE.Color("rgb(255, 0, 0)");
// material.color = new THREE.Color(0xff0000);
// material.wireframe = true;
// material.transparent = true;
// material.opacity = true;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide;

// // MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial();
// // material.wireframe = true;
// material.flatShading = true;

// MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// // MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial(); // this is the material which need the light to see through\

// MeshPhongMaterial
const material = new THREE.MeshPhongMaterial();
material.shininess = 100;
material.specular = new THREE.Color(0x1188ff);
const spare = new THREE.Mesh(new THREE.SphereGeometry(0.5, 1, 16), material);
spare.position.x = -1.5;
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
);
torus.position.x = 1.5;
scene.add(spare, plane, torus);

// lights
const ambientLIgnt = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLIgnt);

const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  spare.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;
  spare.rotation.x = -0.15 * elapsedTime;
  plane.rotation.x = -0.15 * elapsedTime;
  torus.rotation.x = -0.15 * elapsedTime;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
