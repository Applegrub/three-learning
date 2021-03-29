import '../../style.css'
import * as THREE from 'three'
import wall from '../../textures/wall.jpg'
import flower1 from '../../textures/flower-1.jpg'
import flower2 from '../../textures/flower-2.jpg'
import flower3 from '../../textures/flower-3.jpg'
import flower4 from '../../textures/flower-4.jpg'
import flower5 from '../../textures/flower-5.jpg'
import flower6 from '../../textures/flower-6.jpg'


function main() {
  const canvas = document.querySelector('canvas.webgl');
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2

  const scene = new THREE.Scene();

  {
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.PointLight(color, intensity);
    scene.add(light);
  }

  const loader = new THREE.TextureLoader()
  const cubeSize = 1

  const materials = [
    new THREE.MeshBasicMaterial({ map: loader.load(flower1)}),
    new THREE.MeshBasicMaterial({ map: loader.load(flower2)}),
    new THREE.MeshBasicMaterial({ map: loader.load(flower3)}),
    new THREE.MeshBasicMaterial({ map: loader.load(flower4)}),
    new THREE.MeshBasicMaterial({ map: loader.load(flower5)}),
    new THREE.MeshBasicMaterial({ map: loader.load(flower6)}),

  ]
  const cubes = [];
  const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
  const cubeMat = new THREE.MeshBasicMaterial({
    map: loader.load(wall)
  })
  const cube = new THREE.Mesh(cubeGeo, materials)
  scene.add(cube)
  cubes.push(cube)

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, ndx) => {
      const speed = .2 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();

