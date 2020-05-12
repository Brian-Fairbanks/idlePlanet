var planets = []
var zoom = 30;
var maxZoom = 300;
const maxPlanets = 20;
// const maxDistance = 200000;
// above commented while testing collisions
const maxDistance = 100000;
const maxSpeed = 100;
//Gravitational Constant
const g = .0000003;

//const homePlanet = newPlanet("Home");
planets.push(new Planet({name:"Earth", speed:0, posx:0, posy:0, dirx:0, diry:0, type:"Start"}));

const canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");



  // resize the canvas to fill browser window dynamically

  function resizeCanvas() {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;

          draw()
  }


function draw(){
  // set background color
  ctx.fillStyle = "#000000";
  ctx.fillRect(0,0,canvas.width, canvas.height);
  for (planet of planets){
    planet.draw();
  }
}

// TODO: update as fast as possible, but only draw 60 times/second
function update(){
  //forget planets that are too far away.
  planets = planets.filter(planet=> planet.distFromOrigin < maxDistance);
  // and add a new one if less than the max anount
  if(planets.length < maxPlanets){
    planets.push(new Planet({name:"Uranus", type:"Planet"}));
  }

  applyGravity(planets)
  detectColisions();

  for(planet of planets){
    planet.move();
  }

  draw();
}

// Collision detections for planets
function detectColisions(){
  for (planet of planets){
    for (other of planets){
      if (planet != other){
        planet.detectCollison(other)
      }
    }
  }
}

//Gravity Function
function applyGravity(){
  //Apply Gravity
  for (planet of planets){
    for (other of planets){
      if (planet != other){
        //console.log(`Applying Gravity on ${planet.name} -> ${other.name}`);
        planet.applyGravity(other);
        // G = g*((m1*m2)/(d*d))

      }
    }
  }
}


/*===========================================
      On Startup 
============================================= */
window.addEventListener('resize', resizeCanvas, false);
// Scrolling
document.addEventListener("wheel", function (e) {
  if (e.deltaY < 0 && zoom <maxZoom){zoom*=1.5;}
  else if (e.deltaY > 0 && zoom >2){zoom/=1.5;}
  console.log(zoom);
  draw();
});

const timer = setInterval(update, 20);
resizeCanvas();