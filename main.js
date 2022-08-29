//to import 3d effects
import * as THREE from 'three';
// for orbit controls

import { OrbitControls } from './OrbitControls'

var pd = document.querySelector(".pad")
pd.width =window.innerWidth
pd.Height =window.innerHeight

export var name = document.querySelector(".planet")

//textures
const sunTexture = new THREE.TextureLoader().load('textures/sun.jpg')
const mercuryTexture = new THREE.TextureLoader().load('textures/mercury.jpg')
const venusTexture = new THREE.TextureLoader().load('textures/venus.jpg')
const earthTexture = new THREE.TextureLoader().load('textures/earth.jpg')
const marsTexture = new THREE.TextureLoader().load('textures/mars.png')
const jupiterTexture = new THREE.TextureLoader().load('textures/jupiter.jpg')
const saturnTexture = new THREE.TextureLoader().load('textures/saturn.jpg')
const saturnRingTexture = new THREE.TextureLoader().load('textures/saturn_rings.png')
const uranusTexture = new THREE.TextureLoader().load('textures/uranus.jpg')
const neptuneTexture = new THREE.TextureLoader().load('textures/neptune.jpg')
const backgroundTexture = new THREE.TextureLoader().load('textures/background.jpg')



var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
var renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector(".pad")
});
scene.background = backgroundTexture;
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
window.addEventListener("resize", function () {
    renderer.setSize(window.innerWidth, window.innerHeight)
});
camera.position.setZ(30)
renderer.render(scene, camera)
document.body.appendChild( renderer.domElement );

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

renderer.domElement.addEventListener("click", onClick);
var selected = sun;





let cam={
    x: 4.700205260505324,
    y: 3.0805361027267857,
    z: -3.8573587698380867
}
let sunSize = 2;
let mapPositions ={
    sun :[0,0,0],
    venus :[0,3,0],
    mercury :[0,4,0],
    earth :[0,5,0],
    mars :[0,6,0],
    jupiter :[0,7,0],
    saturn :[0,8,0],
    saturnRings :[0,8,0],
    uranus :[0,9,0],
    neptune:[0,10,0]
}


window.addEventListener("resize", ()=>{
    renderer.setPixelRatio(window.devicePixelRatio)
    camera.aspect = window.innerWidth/ window.innerHeight
    camera.updateProjectionMatrix()
    scene.background = backgroundTexture;
    renderer.setSize(window.innerWidth, window.innerHeight)
    var viewPos = camera.position;
    //console.log(viewPos)
})




const controls = new OrbitControls( camera, renderer.domElement );
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( cam.x,cam.y ,cam.z  );
controls.update();

const size = 10;
const divisions = 10;

const ambientlight = new THREE.AmbientLight(0xffffff)
//const light  = new THREE.PointLightHelper(PointLight)
const gridHelper = new THREE.GridHelper( size, divisions);
//scene.add( ambientlight,gridHelper );
scene.add(ambientlight)
let venusSize = sunSize/277
let mercurySize = sunSize/113
let earthSize = sunSize/108



var sun =  new THREE.Mesh(
    new THREE.SphereGeometry(sunSize,32,40),
    new THREE.MeshBasicMaterial({map:sunTexture})
)


let venus =  new THREE.Mesh(
    new THREE.SphereGeometry(venusSize,32,40),
    new THREE.MeshBasicMaterial({map:venusTexture})
)


let mercury =  new THREE.Mesh(
    new THREE.SphereGeometry(mercurySize,32,40),
    new THREE.MeshBasicMaterial({map:mercuryTexture})
)


let earth =  new THREE.Mesh(
    //earth scale to sun size
    new THREE.SphereGeometry(earthSize,32,40),
    new THREE.MeshBasicMaterial({map:earthTexture})
)

let mars =  new THREE.Mesh(
    new THREE.SphereGeometry(sunSize/208,32,40),
    new THREE.MeshBasicMaterial({map:marsTexture})
)

let jupiter =  new THREE.Mesh(
    new THREE.SphereGeometry(sunSize/9.7,32,40),
    new THREE.MeshBasicMaterial({map:jupiterTexture})
)

let saturn =  new THREE.Mesh(
    new THREE.SphereGeometry(sunSize/9,32,40),
    new THREE.MeshBasicMaterial({map:saturnTexture})
)
let saturnRings =  new THREE.Mesh(
    new THREE.RingGeometry((sunSize/9) *1.5,(sunSize/9) *2.5,40),
    new THREE.MeshBasicMaterial({map:saturnRingTexture, side: THREE.DoubleSide })
)
saturnRings.rotation.x = 45

let neptune =  new THREE.Mesh(
    new THREE.SphereGeometry(sunSize/26.8,32,40),
    new THREE.MeshBasicMaterial({map:neptuneTexture})
)


let uranus =  new THREE.Mesh(
    new THREE.SphereGeometry(sunSize/26.8,32,40),
    new THREE.MeshBasicMaterial({map:uranusTexture})
)
sun.name = "Sun";
venus.name = "Veus";
mars.name = "Mars";
mercury.name = "Mercury";
earth.name = "Earth"
jupiter.name = "Jupiter"
saturn.name = "Saturn"
neptune.name= "Neptune"
uranus.name = "Uranus"



let planets =[sun,
    venus ,
    mercury,
    earth,
    mars,
    jupiter,
    saturn ,
    saturnRings,
    uranus ,
    neptune]




function positionSet(){
    let x = 0
    Object.entries(mapPositions).forEach(Key =>{
        Object.entries(planets).forEach(planetName =>{
            if (x == 10){
                planetName[1].position.z = Key[1][1]
                
                //console.log(planetName[1],Key[1][1])
                x =0 
                scene.add(planetName[1])
            }
            else{
                x++
            }
        })

    })
}

function others(){
    sun.position.set(0,0,0)
    jupiter.position.set(0,0,9)
    neptune.position.set(0,0,12)
    uranus.position.set(0,0,11)
    saturnRings.position.set(0,0,10)
    saturnRings.rotation.z += 0.002
    scene.add(neptune)
    scene.add(saturnRings)
    saturn.position.set(0,0,10)
    jupiter.rotation.y += 0.002
    sun.rotation.y += 0.002
    venus.rotation.y += 0.01
    mercury.rotation.y += 0.005
    earth.rotation.y += 0.004
    mars.rotation.y += 0.008
    uranus.rotation.y += 0.03
    neptune.rotation.y += 0.002
    saturn.rotation.y += 0.002
    requestAnimationFrame(others)
}


//sun.position.set(mapPositions[1][0],0,0)
var intersects = [];

export function onClick(event) {
  mouse.x = event.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  intersects = raycaster.intersectObjects(planets);
  if (intersects.length > 0) {
    selected = intersects[0].object;
    name.innerHTML = selected.name
    
  }
}


function animate() {
	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
    
	renderer.render( scene, camera );
    requestAnimationFrame( animate );
}

positionSet()
animate()
others()



export var cameraPlanet={
    "sun" : {"x": 0.025649218989141045, "y": 0.5697113788712904 ,"z": 4.257896836869646},
    "venus" : {"x": 0, "y": 2.630491324172983e-16, "z": 4.295918343157282},
    "mercury": {"x": 0, "y":3.229553271289172e-16, "z": 5.274260747731857},
    "earth": {"x": 0, "y": 3.766791977010266e-16, "z": 6.151638137025064},
    "mars":{"x": 0, "y": 4.393400760472684e-16, "z": 7.1749679393789965},
    "jupiter":{"x": 0, "y": 5.976668789989303e-16, "z": 9.760640854408784},
    "saturn":{"x": 0, "y": 6.622347689738838e-16, "z": 10.815114520120535},
    "uranus":{"x": 0, "y": 6.9708923049882465e-16, "z": 11.384331073811083},
    "neptune": {"x": 0, "y": 7.723980393338775e-16,"z": 12.614217256300366}
}




export function find(name){
    camera.position.set(cameraPlanet[name]["x"],cameraPlanet[name]["y"], cameraPlanet[name]["z"])
}




export function flatmap(view){
    if (view == 1){
        camera.position.set(-17.700848665226076,-0.4778884163325753, 17.037333120551313)
    }else if (view == 2){
        camera.position.set(-2.0531056494246585, 14.366801638453458,2.4166980539669276)
    }else if (view == 3 ){
        camera.position.set( 0.9658944679443424, 0.11092812600050117,13.24248105864146)
    }else if (view ==4){
        camera.position.set(4.700205260505324, 3.0805361027267857, -3.8573587698380867)
    }
}
