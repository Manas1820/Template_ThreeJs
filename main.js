import './style.css'
import * as THREE from 'three'
// import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'


// Canvas
const canvas = document.getElementById('webgl')
// Scene
const scene = new THREE.Scene()




/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

/**
 * Objects
 */
const group = new THREE.Group()
// group.scale.y = 2
// group.rotation.y = 0.2
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube1.position.x = - 1.5
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube2.position.x = 0
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube3.position.x = 1.5
group.add(cube3)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.lookAt(new THREE.Vector3(0, - 1, 0))
scene.add(camera)

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias:true,
})
renderer.setSize(sizes.width, sizes.height)

//Mouse Movements
const raycaster = new THREE.Raycaster()
const controls = new OrbitControls(camera, renderer.domElement)

const mouse = {
  x: undefined,
  y: undefined
}

addEventListener('mousemove', () => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = -(event.clientY / innerHeight) * 2 + 1
})

const clock = new THREE.Clock()

// Animations
let time = Date.now()
function animate() {
  // Calculate the FPS
  const currentTime = Date.now()
  let deltaTime = currentTime - time
  time = currentTime

  //Another method is to use the Three js clock
  const elaspedTime = clock.getElapsedTime()
  // cube2.position.y =Math.cos(elaspedTime)
  // cube3.position.y = Math.sin(elaspedTime)

  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  raycaster.setFromCamera(mouse, camera)
  controls.update()
}

animate()