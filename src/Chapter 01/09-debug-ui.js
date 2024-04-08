// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import gsap from "gsap";

// import GUI from "lil-gui";

// /**
//  * Debug
//  *
//  */
// const gui = new GUI();

// /**
//  * Base
//  */
// // Canvas
// const canvas = document.querySelector("canvas.webgl");

// // Scene
// const scene = new THREE.Scene();

// /**
//  * Object
//  */
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
// const material = new THREE.MeshBasicMaterial({ color: "#ff0000" });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// // gui.add(mesh.position, "y", -3, 3, 0.01);
// gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");

// gui.add(mesh, "visible");

// gui.add(material, "wireframe");

// // gui.addColor(material, "color");

// // there is a problem when we work on color, specially when our client give us a color from the ui using the gui library, then this doesn't equal hex color code that is applied to the object, which is why we have to fired event so that we can extract color that is actually applied to the object.
// gui.addColor(material, "color").onChange((value) => {
//   console.log(value.getHexString());
// });
// /**
//  * Sizes
//  */
// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// window.addEventListener("resize", () => {
//   // Update sizes
//   sizes.width = window.innerWidth;
//   sizes.height = window.innerHeight;

//   // Update camera
//   camera.aspect = sizes.width / sizes.height;
//   camera.updateProjectionMatrix();

//   // Update renderer
//   renderer.setSize(sizes.width, sizes.height);
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(
//   75,
//   sizes.width / sizes.height,
//   0.1,
//   100
// );
// camera.position.x = 1;
// camera.position.y = 1;
// camera.position.z = 2;
// scene.add(camera);

// // Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
// });
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// /**
//  * Animate
//  */
// const clock = new THREE.Clock();

// const tick = () => {
//   const elapsedTime = clock.getElapsedTime();

//   // Update controls
//   controls.update();

//   // Render
//   renderer.render(scene, camera);

//   // Call tick again on the next frame
//   window.requestAnimationFrame(tick);
// };

// tick();

// Example 2 another way to debug the color using debug function

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

import GUI from "lil-gui";

/**
 * Debug
 *
 */
const gui = new GUI({
  width: 300,
  title: "Nice debug UI",
  closeFolders: false,
});
gui.close();
gui.hide();

window.addEventListener("keydown", (event) => {
  if (event.key == "h") {
    gui.show(gui._hidden);
  }
});

const debugObject = {};
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */

debugObject.color = "#3a6ea6";
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: debugObject.color,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const cubeTweaks = gui.addFolder("Awesome cube");
cubeTweaks.close();
// gui.add(mesh.position, "y", -3, 3, 0.01);
cubeTweaks.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");

cubeTweaks.add(mesh, "visible");

cubeTweaks.add(material, "wireframe");

// cubeTweaks.addColor(material, "color");

// there is a problem when we work on color, specially when our client give us a color from the ui using the gui library, then this doesn't equal hex color code that is applied to the object, which is why we have to fired event so that we can extract color that is actually applied to the object.
cubeTweaks.addColor(debugObject, "color").onChange(() => {
  material.color.set(debugObject.color);
});

debugObject.spin = () => {
  gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2 });
};
cubeTweaks.add(debugObject, "spin");

debugObject.subdivision = 2;
cubeTweaks
  .add(debugObject, "subdivision")
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    // warnings*************************
    // donot use onChange function here, it may causes cpu performance issues
    mesh.geometry.dispose(); // this will dispose the previous mesh object geometry
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject.subdivision,
      debugObject.subdivision,
      debugObject.subdivision
    );
  });

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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
