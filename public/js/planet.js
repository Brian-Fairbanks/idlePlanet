const materials = [
  "Gold",
  "Iron",
  "Coal",
  "Dirt",
  //gasses
  "Oxygen",
  "Hydrogen"
]


class Planet {
  constructor(props){ //props = {name, posx, posy, speed, dirx, diry}
    this.name = "name" in props? props.name : "unNamed";
    this.type = "type" in props?props.type : "Start";
    this.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    this.materials = {};
    this.makeComposition();
    this.mass = this.getMass();
    this.size = this.getSize(this.mass);
    this.polution = 0;
    this.pos={
      x:"posx" in props? props.posx : maxDistance*(Math.random()*2-1),
      y:"posy" in props? props.posy : maxDistance*(Math.random()*2-1)
    };
    //this.speed=("speed" in props)?props.speed:Math.random()*50;
    this.speed = 1;
    this.direction = {
      x: "dirx" in props?props.dirx:maxSpeed*(Math.random()*2-1),
      y: "diry" in props?props.diry:maxSpeed*(Math.random()*2-1)
    };
    this.distFromOrigin = Math.sqrt(this.pos.x^2 + this.pos.y^2);
  }

  makeComposition = function (){
    for (const mat of materials){
      let curPercent = Math.random()*1000000;
      this.materials[mat] = curPercent;
    }
  }

  getPercent = function(mat){
    if (!mat in this.materials)
    {return 0;}
    return this.materials[mat]/this.mass
  }

  getMass = function(){
    let mass = 0;
    for(const mat in this.materials){
      mass+=parseFloat(this.materials[mat]);
    }
    return mass;
  }

  getSize = function(){
    //v=1/6 pi d^3
    // 6v = pi d3
    // 6pi V = d3
    // 3root 6piV = d

    let size = Math.cbrt(6*Math.PI*this.mass)
    return size;
  }

  move = function(){
    if (["Start","Sun"].includes(this.type)){return;}
    this.pos.x += this.speed*this.direction.x;
    this.pos.y += this.speed*this.direction.y;
    this.distFromOrigin = Math.sqrt(this.pos.x*this.pos.x + this.pos.y*this.pos.y);
  }


  getDistance = function(other){
    return Math.sqrt(Math.pow(this.pos.x-other.pos.x, 2)+Math.pow(this.pos.y-other.pos.y, 2));
  }

  getDir = function(other){
    var angleRadians = Math.atan2(other.pos.y - this.pos.y, other.pos.x - this.pos.x);
    return {x:Math.cos(angleRadians), y:Math.sin(angleRadians)};
  }

  applyGravity = function (other){
    const dist = this.getDistance(other);
    const dir = this.getDir(other);

    // F = g*((m1*m2)/(d*d))
    var F = g*(this.mass * planet.mass )/(dist*dist);

    //console.log(dist, dir, F);

    other.direction.x += dir.x*(-F);
    other.direction.y += dir.y*(-F);
  }

  detectCollison = function(other){
    let edges = this.getDistance(other) - .5*this.size - .5*other.size;
    if (edges < 0){
      console.log("Collision Detected!");
      this.combinePlanets(other);
    }
  }

  combinePlanets = function(other){
    let bigger;
    let smaller;
    // home planet will always servive
    if (["Start","Sun"].includes(this.type)){bigger = this; smaller = other}
    else if (["Start","Sun"].includes(other.type)){bigger = other; smaller = this}
    else{
      bigger = this.mass > other.mass? this:other;
      smaller = this.mass <= other.mass? this:other;
    }

    for(const mat in smaller.materials){
      //console.log(mat,":",smaller.materials[mat])
      // add all materials to larger planet and resize
      bigger.materials[mat]+=smaller.materials[mat]
    }
      bigger.mass = bigger.getMass();
      bigger.size = bigger.getSize();

      // recalculate direction of larger planet

      // V1*M1 - V2*M2 = VF*MT
      // VF = (V1*M1 - V2*M2)/MT
      let dif = bigger.mass/(bigger.mass + smaller.mass);
      console.log(dif);
      bigger.direction.x = .7*(bigger.direction.x *dif )+(smaller.direction.x *(1-dif));
      bigger.direction.y = .7*(bigger.direction.y *dif )+(smaller.direction.y *(1-dif));

      //move the smaller one to the point where it will disapear
      smaller.pos.x=maxDistance+1;
  }



  draw = function(){
        let planetScale = planet.size/zoom;
        //let posx = (canvas.width-(planetScale))/2;
        //let posy = (canvas.height-(planetScale))/2;
        let posx = canvas.width*.5+ planet.pos.x/zoom;
        let posy = canvas.height*.5+ planet.pos.y/zoom;
    
        ctx.beginPath();
        //  x center,  y center, 
        ctx.arc(posx, posy, planetScale, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
  }
}