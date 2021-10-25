// global THREE

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
const sectionTag = document.querySelector('section');

const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xff0000, 0);
sectionTag.appendChild(renderer.domElement);

const clock = new THREE.Clock();
const loader = new THREE.TextureLoader();
const cubeLoader = new THREE.CubeTextureLoader();

const uniforms = {
  time: {value: clock.getElapsedTime()},
  cube: {
    value: cubeLoader.load([
      './assets/shader-texture/foto/portrait/posx.jpg',
      './assets/shader-texture/foto/portrait/negx.jpg',
      './assets/shader-texture/foto/portrait/posy.jpg',
      './assets/shader-texture/foto/portrait/negy.jpg',
      './assets/shader-texture/foto/portrait/posz.jpg',
      './assets/shader-texture/foto/portrait/negz.jpg',
    ]),
  },
};

// Setting up Shapes and Geometry

const dpi = 64;
// const geometry = new THREE.SphereGeometry(12, dpi, dpi);
// const geometry = new THREE.TorusKnotGeometry(8, 1, 5 * dpi, dpi, 2, 5);
// const geometry = new THREE.ConeGeometry(5, 20, 32);
// const geometry = new THREE.TetrahedronGeometry(20, 1);
const geometry = new THREE.PlaneGeometry(10, 10);
// const geometry = new THREE.PlaneGeometry(150, 15);
// const geometry = new THREE.OctahedronGeometry(10, 0);

const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vert,
  fragmentShader: frag,
});
const shape = new THREE.Mesh(geometry, material);

scene.add(shape);

let aimCamera = new THREE.Vector3(0, 0, 35);
let currentCamera = new THREE.Vector3(0, 100, 100);

camera.position.copy(aimCamera);

// Adding an GLTFL Loader

// const gltfloader = new THREE.GLTFLoader();

// gltfloader.load('./assets/desktop.gltf', function (gltf) {
//   gltf.scene.traverse(function (child) {
//     if (child.isMesh) {
//       child.material = new THREE.ShaderMaterial({
//         uniforms: uniforms,
//         vertexShader: vert,
//         fragmentShader: frag,
//       });
//     }
//   });

//   scene.add(gltf.scene);
// });

const animate = function () {
  requestAnimationFrame(animate);

  //camera zoom
  const diff = aimCamera.clone().sub(currentCamera).multiplyScalar(0.01);
  currentCamera.add(diff);
  camera.position.copy(currentCamera);

  // update uniforms
  uniforms.time = {value: clock.getElapsedTime()};

  renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// White Marble
// './assets/shader-texture/marble/white/posx.jpg',
// './assets/shader-texture/marble/white/negx.jpg',
// './assets/shader-texture/marble/white/posy.jpg',
// './assets/shader-texture/marble/white/negy.jpg',
// './assets/shader-texture/marble/white/posz.jpg',
// './assets/shader-texture/marble/white/negz.jpg',

// Black Marble
// './assets/shader-texture/marble/black/posx.jpg',
// './assets/shader-texture/marble/black/negx.jpg',
// './assets/shader-texture/marble/black/posy.jpg',
// './assets/shader-texture/marble/black/negy.jpg',
// './assets/shader-texture/marble/black/posz.jpg',
// './assets/shader-texture/marble/black/negz.jpg',

// Foto/Portrait
// './assets/shader-texture/foto/portrait/posx.jpg',
// './assets/shader-texture/foto/portrait/negx.jpg',
// './assets/shader-texture/foto/portrait/posy.jpg',
// './assets/shader-texture/foto/portrait/negy.jpg',
// './assets/shader-texture/foto/portrait/posz.jpg',
// './assets/shader-texture/foto/portrait/negz.jpg',
