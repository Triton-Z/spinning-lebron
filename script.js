import * as THREE from 'https://threejs.org/build/three.module.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color("white");

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const loader = new THREE.TextureLoader();

const light = new THREE.DirectionalLight("white", 3);
light.position.set(0, 1, 1).normalize();
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.69, 0.69, 0.69), new Array(6).fill("https://i.imgur.com/ZDaV1Nk.jpeg").map(pic => {
  return new THREE.MeshPhongMaterial({map: loader.load(pic)});
}));
scene.add(cube);

camera.position.z = 1;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.003;
  cube.rotation.y += 0.003;

  renderer.render(scene, camera);
}

window.addEventListener("resize", function() {
  const canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
