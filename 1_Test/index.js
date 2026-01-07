import * as THREE from 'three';
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 10);
camera.position.z = 3;
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true });
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

const light = new THREE.DirectionalLight(0xffffff, 2);
scene.add(light);

const colorWhite = new THREE.Color(0xFFFFFF);
const colorYellow = new THREE.Color(0xFFFF00);
const colorOrange = new THREE.Color(0xFF8800);

function animate(t = 0) {
    requestAnimationFrame(animate);
    const time = t * 0.001;

    //mesh.rotation.y = time * 0.5;
    mesh.rotation.x = time * 0.5;

    light.position.x = Math.cos(time) * 10; 
    light.position.z = Math.sin(time) * 3;
    light.position.y = Math.sin(time * 0.5) * 2;

    const cycle = (Math.sin(time) + 1) / 2;
    if (cycle < 0.5) {
        light.color.copy(colorWhite).lerp(colorYellow, cycle * 2);
    } else {
        light.color.copy(colorYellow).lerp(colorOrange, (cycle - 0.5) * 2);
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();