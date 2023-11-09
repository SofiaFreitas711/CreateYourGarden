let lakeX = 0
let lakeY = 0
let lakeD = 0
let flowerCount = 0
let grassColor
let lake
let flowers = []

function setup() {
  const w = window.innerWidth
  const h = window.innerHeight
  createCanvas(w,h); 

  lakeX = w/2
  lakeY = h/2
  lakeD = h/3 
  
}

function draw(){

  if(flowerCount >= 0 && flowerCount < 5) {
    grassColor = "#B0B591"
  }else if(flowerCount >= 5 && flowerCount < 10){
    grassColor = "#B4BD79"
  }else if(flowerCount >= 10 && flowerCount < 15){
    grassColor = "#C2D262"
  }else{
    grassColor = "#D8E878"
  }
  background(grassColor);


  if(flowerCount >= 0 && flowerCount < 5) {
    lake = "#627C77"
  }else if(flowerCount >= 5 && flowerCount < 10){
    lake = "#72A89E"
  }else if(flowerCount >= 10 && flowerCount < 15){
    lake = "#C0EEE5"
  }else{
    lake = "#D5F9F3"
  }
  fill(lake)
  noStroke()
  circle(lakeX, lakeY, lakeD)

  //isto seria para desenhar todas as flores
  for(let i = 0; i<flowers.length; i++){
    drawFlower(flowers[i].x, flowers[i].y, flowers[i].color, flowers[i].nPetals, flowers[i].size)
  } 

  if(flowerCount >= 10){
    addFish()
  }

}

function mousePressed(){

  let d = dist(lakeX,lakeY,mouseX,mouseY)

  if(d>(lakeD/2)){
    let flowerColor = ["#8B0000","#B22222","#DC143C","#FFE4E1","#FFFFFF"]
    flowerColor = random(flowerColor)
    let size = random(20,60)
    let nPetals = Math.floor(random(9,14))

    flowers.push({x:mouseX, y:mouseY, color: flowerColor, nPetals: nPetals, size: size})
    //opções de cor
    drawFlower(mouseX,mouseY,flowerColor)
    flowerCount += 1
  }  
  console.log(flowers)
  console.log(flowerCount)
}

function drawFlower(x,y, flowerColor,nPetals,size) {
  
  push()
  translate(x,y)
  noStroke()

  for(i=0;i<nPetals;i++){
    fill(flowerColor)
    ellipse(0,15, size/3, size)
    rotate(TWO_PI/nPetals)
  }
  fill('yellow')
  circle(0,0,20)
  pop() 
  
}

function addFish(){
  let x=window.innerWidth/2
  let y=window.innerHeight/2

  fill("orange")
  ellipse(x,y, 16,10)
  triangle(x+6,y,x+12,y+6,x+12,y-6)
}

