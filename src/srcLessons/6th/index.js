import '../../style.css'
import * as THREE from 'three'
import checker from '../../textures/checker.png'
import shadow from '../../textures/roundshadow.png'


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
  scene.background = new THREE.Color('white')

  {
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.PointLight(color, intensity);
    scene.add(light);
  }

  const loader = new THREE.TextureLoader()
  const texture = loader.load(checker)

  const planeSize = 40
  texture.wrapT = THREE.RepeatWrapping
  texture.wrapS = THREE.RepeatWrapping
  texture.magFilter = THREE.NearestFilter
  const repeat = planeSize / 2
  texture.repeat.set(repeat, repeat)

  const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize)
  const planeMat = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
  })

  planeMat.color.setRGB(1.5, 1.5, 1.5)
  const mesh = new THREE.Mesh(planeGeo, planeMat)
  mesh.rotation.x = Math.PI * - .5
  scene.add(mesh)

  const sphereShadowBases = []

  const sphereRadius = 1
  const sphereWidth = 32
  const sphereHeight = 16
  const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidth, sphereHeight)

  const shadowTexture = loader.load(shadow)

  const shadowPlaneSize = 1
  const shadowGeo = new THREE.PlaneGeometry(shadowPlaneSize, shadowPlaneSize)



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

