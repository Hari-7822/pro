import * as Three from 'three';
import * as curves from 'three/examples/jsm/curves/CurveExtras';



import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { DoubleSide, Mesh, PlaneGeometry } from 'three';


const cam = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight , 0.1, 120);



const scn = new Three.Scene();


const rend = new Three.WebGLRenderer( {
  canvas: document.querySelector('#b'),
  antialias: true
  // alpha : true
} );

document.body.appendChild(rend.domElement);

function res() {
cam.aspect = (window.innerWidth / window.innerHeight);
cam.updateProjectionMatrix();
rend.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', res, false);

rend.setSize(window.innerWidth, window.innerHeight);
rend.setPixelRatio(window.devicePixelRatio);


const ctrl = new OrbitControls(cam, rend.domElement);

cam.position.z = 30;
// cam.position.x = -3;

const tgeo = new Three.TorusGeometry(10, 3, 16, 100);
const tmat = new Three.MeshStandardMaterial( { color : 0x00c8ff, wireframes : true } );
const torus = new Three.Mesh(tgeo, tmat);
// scn.add(torus);

const amb = new Three.AmbientLight(0xffffff);
scn.add(amb);



//text processing
const loader = new FontLoader();

loader.load('../../node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json', (droidfont) => {
  const txtgeo = new TextGeometry(' ', {
    height : 2,
    size : 5,
    font : droidfont,
  });

  const txtmat = new Three.MeshNormalMaterial( { color : 0xffbb00 } );
  const txtmesh = new Three.Mesh(txtgeo, txtmat);
  // txtmesh.position.x = 10;
  // txtmesh.position.y = 12;
  txtmesh.position.set(-20,0,90);
  scn.add(txtmesh);

  // txtmesh.rotation.x = 0;
  // txtmesh.rotation.y = 0;
}) 


const moo = new Three.TextureLoader().load('../../dist/texture/moon.jpg');
const geo = new Three.SphereGeometry(20, 100, 90);
const mat = new Three.MeshStandardMaterial( { map: moo, normalMap: moo} );

const moon = new Three.Mesh(geo, mat);

moon.position.z = 30;
moon.position.setX(-10);

scn.add(moon);


//rectarea light

const rectlit = new Three.RectAreaLight(0x008cff, 100, 20, 20);

rectlit.position.set(0, 0, 150)
rectlit.lookAt(0, 0, 0);
// rectlit.rotation.x = 10;

scn.add(rectlit);


 
//  scn.add(new RectAreaLightHelper(rectlit) );

const curve = new Three.CatmullRomCurve3( [
  new Three.Vector3(-10, 0, 10),
  new Three.Vector3(-5, 5, 5),new Three.Vector3(0, 0, 0), new Three.Vector3(5, -5, 5), new Three.Vector3(10, 0, 10) 
] );

const pt = curve.getPoints( 50 );

const g = new Three.BufferGeometry().setFromPoints( pt );
const mt = new Three.LineBasicMaterial( { color : 0xff0000 } );

const c = new Three.Line(g, mt);

// scn.add(c);


const cinq = new curves.CinquefoilKnot();
const cg = new Three.TubeGeometry(curve, 100, 20, 8, true );
const cmt = new Three.MeshBasicMaterial( { color : 0xbb00ff} );

const cin = new Three.Line(cg, cmt);

scn.add(cin);  



const tex = new Three.TextureLoader().load('https://www.kali.org/images/favicon-dark.svg')
const pg = new Three.PlaneGeometry(8, 8);
const pm = new Three.MeshBasicMaterial({ color : 0x367bf0, side : Three.DoubleSide, map : tex, normalMap : tex})

const pln = new Three.Mesh(pg, pm);
scn.add(pln);

pln.position.z += 90;
pln.position.x += 1;
pln.position.y += 2 ;


const u = new Three.TextureLoader().load('data:image/png;base64,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');
const ux = new Three.PlaneGeometry(8, 8);
const i = new Three.MeshBasicMaterial( { color : 0xdd4814, side : Three.DoubleSide, map : u, normalMap : u } );

const up = new Three.Mesh(ux, i);

scn.add(up);

up.position.z += 150;
up.position.x += 1;
up.position.y += 3;


function addStar() {
  const geometry = new Three.SphereGeometry(0.25, 24, 24);
  const material = new Three.MeshBasicMaterial({ color: 0xffffff });
  const star = new Three.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => Three.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scn.add(star);
}

Array(900).fill().forEach(addStar);





function camera() {
  const m = document.body.getBoundingClientRect().top;

  moon.rotation.x = -0.002;
  moon.rotation.z = -0.003;
  moon.rotation.z = -0.002;


  cam.position.z = m * -0.1;
  cam.position.x = m * -0.002;
  cam.position.y = m * -0.002;
}

document.body.onscroll = camera;
camera();

function anime() {
  requestAnimationFrame(anime);

  cin.rotation.x += 0.004;
  cin.rotation.y += 0.0003;
  cin.rotation.z += 0.002


  moon.rotation.x += 0.002;
  moon.rotation.y += 0.002;


  // ctrl.update();
  rend.render(scn, cam);
}


anime();



