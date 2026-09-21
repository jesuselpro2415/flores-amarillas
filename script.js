const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const particleCount = 2000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
  const radius = Math.random() * 10;
  const spinAngle = radius * 2;
  const branchAngle = ((i % 3) * 2 * Math.PI) / 3;

  const randomX = (Math.random() - 0.5) * 0.5;
  const randomY = (Math.random() - 0.5) * 0.5;
  const randomZ = (Math.random() - 0.5) * 0.5;

  positions[i * 3] = Math.cos(spinAngle + branchAngle) * radius + randomX;
  positions[i * 3 + 1] = randomY;
  positions[i * 3 + 2] = Math.sin(spinAngle + branchAngle) * radius + randomZ;

  colors[i * 3] = 1.0;
  colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
  colors[i * 3 + 2] = 0.1;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
  size: 0.05,
  vertexColors: true,
  transparent: true,
  opacity: 0.8
});

const galaxy = new THREE.Points(geometry, material);
scene.add(galaxy);

camera.position.z = 8;
camera.position.y = 4;
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  galaxy.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function cerrarCarta() {
  document.getElementById('card').style.display = 'none';
}
