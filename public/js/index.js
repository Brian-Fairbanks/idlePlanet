const planets = []
var zoom = 101;
var x = 0;
var y = 0;

//const homePlanet = newPlanet("Home");
planets.push(new Planet({name:"Earth", speed:0, posx:0, posy:0 }));

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
    console.log(`drawing ${planet.name}`);
    ctx.fillStyle = "#00FF00";
    let planetScale = planet.size/zoom;
    //let posx = (canvas.width-(planetScale))/2;
    //let posy = (canvas.height-(planetScale))/2;
    let posx = canvas.width*.5+ planet.pos.x;
    let posy = canvas.height*.5+ planet.pos.y;

    ctx.beginPath();
    //  x center,  y center, 
    ctx.arc(posx, posy, planetScale, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
//    ctx.fillRect(posx, posy, planetScale, planetScale);
  }
}

function update(){

  planets.push(new Planet({}))

  for(planet of planets){
    planet.move();
  }

  draw();
}


/*===========================================
      On Startup 
============================================= */
window.addEventListener('resize', resizeCanvas, false);
// Scrolling
document.addEventListener("wheel", function (e) {
  if (e.deltaY < 0 && zoom <200){zoom*=1.5;}
  else if (e.deltaY > 0 && zoom >2){zoom/=1.5;}
  console.log(zoom);
  draw();
});

const timer = setInterval(update, 20);
resizeCanvas();