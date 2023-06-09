import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { WebGLRendererParameters } from 'three';
import * as dat from 'dat.gui';
import { Euler } from 'three';

var scene = new THREE.Scene();

function nodes(posX: any, posY: any ,posZ:any , color:any , radius:any ,widthSegment:any , heightSegment:any){
     var material = new THREE.MeshBasicMaterial({color:color});
     var geometry = new
    THREE.SphereGeometry(radius,widthSegment,heightSegment);
     var point = new THREE.Mesh(geometry , material);
     point.position.set(posX,posY,posZ);
     return point;
     }


// Camera
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 60, aspect, 0.1, 1000 );
camera.position.z = 5;
camera.position.x = 5;
camera.position.y = 5;
camera.lookAt(0, 1.5, 0);
camera.updateProjectionMatrix();
// var controls = new THREE.OrbitControls( camera );


// Renderer
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// Model: 
var material = new THREE.MeshStandardMaterial();

var geometry = new THREE.BoxGeometry( 2, 1, 2 );
var base = new THREE.Mesh( geometry, material );
scene.add( base );

var s_node = nodes(0,0.8,0,'#71797E',0.46,32,16);
var k_node = nodes(0,0.8,0,'#71797E',0.46,32,16);
var l_node = nodes(0,0.8,0,'#71797E',0.46,32,16);



geometry = new THREE.BoxGeometry(0.5, 2, 0.5);
var lowerArm = new THREE.Mesh( geometry, material );
lowerArm.translateY(1);
base.add(s_node);
s_node.add(lowerArm);

geometry = new THREE.BoxGeometry(0.5, 2, 0.5);
var lowerArm1 = new THREE.Mesh( geometry, material );
lowerArm1.translateY(1);
lowerArm.add(k_node);
k_node.add(lowerArm1);

geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
var lowerArm2 = new THREE.Mesh( geometry, material );
lowerArm2.translateY(0.8);
lowerArm1.add(l_node);
l_node.add(lowerArm2);


// Light
var light = new THREE.DirectionalLight(0xffffff, 1.0);
light.position.set(10, 5, 10);
light.target = base;
scene.add(light);

const light1 = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light1);


// Options (DAT.GUI)
var options = {
  base: 0,
  s_node: 0,
  k_node:0,
  l_node:0,
};
// DAT.GUI Related Stuff
var gui = new dat.GUI();
gui.add(options, 'base', -180, 180).listen();
gui.add(options, 's_node', -180, 180).listen();
gui.add(options, 'k_node', -90, 90).listen();
gui.add(options, 'l_node', -90, 90).listen();


// Rendering
var xAxis = new THREE.Vector3(1, 0, 0);
var zAxis = new THREE.Vector3(0, 0, 1);
var yAxis = new THREE.Vector3(0, 1, 0);

var render = function () {
  requestAnimationFrame( render );
  
  // Rotate joints
  base.setRotationFromAxisAngle(yAxis, options.base * Math.PI / 180)
  s_node.setRotationFromAxisAngle(yAxis, options.s_node * Math.PI / 180);
  k_node.setRotationFromAxisAngle(zAxis, options.k_node * Math.PI / 180);
  l_node.setRotationFromAxisAngle(zAxis, options.l_node * Math.PI / 180);

  // Render
  renderer.render( scene, camera );
   };

render();