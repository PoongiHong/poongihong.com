// Load 3D Scene
var scene = new THREE.Scene();

// Load Camera Perspektive
var camera = new THREE.PerspectiveCamera(
  25,
  window.innerWidth / window.innerHeight,
  1,
  20000
);
camera.position.set(1, 1, 20);

// Load a Renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xb5b5b5);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

// Load the Orbitcontroller
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// Load Light
var ambientLight = new THREE.AmbientLight(0xcccccc);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 1, 1).normalize();
scene.add(directionalLight);

function animate() {
  render();
  requestAnimationFrame(animate);
}

function render() {
  renderer.render(scene, camera);
}

render();
animate();
