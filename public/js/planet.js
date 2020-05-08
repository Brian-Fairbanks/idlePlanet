const materials = [
  "Gold",
  "Iron",
  "Coal",
  "Dirt"
]


class Planet {
  constructor(props){ //props = {name, posx, posy, speed, dirx, diry}
  console.log(props);
    this.name = "name" in props? props.name : "unNamed";
    this.materials = {}
    this.makeComposition();
    this.size = this.getSize();
    this.polution = 0;
    this.pos={
      x:"posx" in props? props.posx : 0,
      y:"posy" in props? props.posy : 0
    };
    this.speed=("speed" in props)?props.speed:Math.random();
    this.direction = {
      x: "dirx" in props?props.dirx:Math.random()*2-1,
      y: "diry" in props?props.diry:Math.random()*2-1
    }
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
    this.pos.x += this.speed*this.direction.x;
    this.pos.y += this.speed*this.direction.y;
  }
}