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
    this.size = this.getSize();
    this.polution = 0;
    this.pos={
      x:"posx" in props? props.posx : 100000*(Math.random()*2-1),
      y:"posy" in props? props.posy : 100000*(Math.random()*2-1)
    };
    //this.speed=("speed" in props)?props.speed:Math.random()*50;
    this.speed = 1;
    this.direction = {
      x: "dirx" in props?props.dirx:10*Math.random()*2-1,
      y: "diry" in props?props.diry:10*Math.random()*2-1
    };
    this.distFromOrigin = Math.sqrt(this.pos.x^2 + this.pos.y^2);
  }

  makeComposition = function (){
    for (const mat of materials){
      let curPercent = Math.random()*1000;
      this.materials[mat] = curPercent;
    }
  }

  getPercent = function(mat){
    if (!mat in this.materials)
    {return 0;}
    return this.materials[mat]/this.size
  }

  getSize = function(){
    let size = 0;
    for(const mat in this.materials){
      size+=parseFloat(this.materials[mat]);
    }
    return size;
  }

  move = function(){
    //if (["Start","Sun"].includes(this.type)){return;}
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

  applyGravity(other){
    console.log(this.type in ["Start"]);

    const g = 10;
    const dist = this.getDistance(other);
    const dir = this.getDir(other);

    // F = g*((m1*m2)/(d*d))
    var F = g*(this.size * planet.size )/(dist*dist);

    console.log(dist, dir, F);

    this.direction.x += dir.x*(F);
    this.direction.y += dir.y*(F);

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