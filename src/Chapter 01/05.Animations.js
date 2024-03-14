// // Example 1 Using deltaTime

// import "./style.css";
// import * as THREE from "three";

// // Canvas
// const canvas = document.querySelector("canvas.webgl");

// // Scene
// const scene = new THREE.Scene();

// // Object
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// // Sizes
// const sizes = {
//   width: 800,
//   height: 600,
// };

// // Camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// camera.position.z = 3;
// scene.add(camera);

// // Renderer
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
// });
// renderer.setSize(sizes.width, sizes.height);

// let time = Date.now();

// // Animations
// const tick = () => {
//   // Time
//   const currentTime = Date.now();
//   const deltaTime = currentTime - time;

//   time = currentTime;

//   //Update objects
//   // mesh.position.x -= 0.01;
//   // mesh.position.y += 0.01;

//   mesh.rotation.y += 0.002 * deltaTime;
//   // mesh.rotation.x -= 0.01;
//   // mesh.rotation.z += 0.01;

//   //Render
//   renderer.render(scene, camera);

//   window.requestAnimationFrame(tick);
// };
// tick();

// // Example 2 Using Clock()

// import "./style.css";
// import * as THREE from "three";

// // Canvas
// const canvas = document.querySelector("canvas.webgl");

// // Scene
// const scene = new THREE.Scene();

// // Object
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// // Sizes
// const sizes = {
//   width: 800,
//   height: 600,
// };

// // Camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// camera.position.z = 3;
// scene.add(camera);

// // Renderer
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
// });
// renderer.setSize(sizes.width, sizes.height);

// //Clock
// const clock = new THREE.Clock();

// // Animations
// const tick = () => {
//   //Update objects
//   const elapsedTime = clock.getElapsedTime();
//   console.log(elapsedTime);
//   // mesh.rotation.y = elapsedTime * Math.PI * 2;
//   // mesh.rotation.y = Math.sin(elapsedTime);
//   mesh.position.y = Math.sin(elapsedTime);
//   mesh.position.x = Math.cos(elapsedTime);

//   camera.position.x = Math.sin(elapsedTime);
//   camera.position.y = Math.cos(elapsedTime);

//   camera.lookAt(mesh.position);

//   //Render
//   renderer.render(scene, camera);

//   window.requestAnimationFrame(tick);
// };
// tick();

// Example 3 Using GSAP

import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

//gsap

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });

// Animations
const tick = () => {
  //Update objects
  // const elapsedTime = clock.getElapsedTime();
  // console.log(elapsedTime);
  // // mesh.rotation.y = elapsedTime * Math.PI * 2;
  // // mesh.rotation.y = Math.sin(elapsedTime);
  // mesh.position.y = Math.sin(elapsedTime);
  // mesh.position.x = Math.cos(elapsedTime);
  // camera.position.x = Math.sin(elapsedTime);
  // camera.position.y = Math.cos(elapsedTime);
  // camera.lookAt(mesh.position);
  //Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
