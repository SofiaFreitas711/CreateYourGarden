let lakeX = 0
let lakeY = 0
let lakeD = 0
let flowerCount = 0
let grassColor = "#B0B591"
let lake = "#627C77"
let flowers = []

function setup() {
  const w = window.innerWidth
  const h = window.innerHeight
  createCanvas(w,h); 

  lakeX = w/2
  lakeY = h/2
  lakeD = h/3 

  //variação do relvado
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

  //desenho do lago e variação
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

  //desenhar peixe
  if(flowerCount >= 10){
    addFish()
  }
  // let x=window.innerWidth/2
  // let y=window.innerHeight/2

  // fill("orange")
  // ellipse(x,y, 16,10)
  // triangle(x+6,y,x+12,y+6,x+12,y-6)
}

// function draw(){

//   if(flowerCount >= 0 && flowerCount < 5) {
//     grassColor = "#B0B591"
//   }else if(flowerCount >= 5 && flowerCount < 10){
//     grassColor = "#B4BD79"
//   }else if(flowerCount >= 10 && flowerCount < 15){
//     grassColor = "#C2D262"
//   }else{
//     grassColor = "#D8E878"
//   }
//   background(grassColor);


//   if(flowerCount >= 0 && flowerCount < 5) {
//     lake = "#627C77"
//   }else if(flowerCount >= 5 && flowerCount < 10){
//     lake = "#72A89E"
//   }else if(flowerCount >= 10 && flowerCount < 15){
//     lake = "#C0EEE5"
//   }else{
//     lake = "#D5F9F3"
//   }
//   fill(lake)
//   noStroke()
//   circle(lakeX, lakeY, lakeD)

// }

function mousePressed(){

  let d = dist(lakeX,lakeY,mouseX,mouseY)

  if(d>(lakeD/2)){
    //opções de cor
    drawFlower(mouseX,mouseY)
    flowerCount += 1
  }  
  console.log(flowerCount)
}

function drawFlower(x,y){
  
  push()
  translate(x,y)
  noStroke()

  // opções de cor
  let colors = ["#8B0000","#B22222","#DC143C","#FFE4E1","#FFFFFF"]
  
  //desenho da flor
  let flowerColor = random(colors)
  // console.log(flowerColor)

  let nPetals = Math.floor(random(9,14))
  // console.log(nPetals);
  let size = random(20,60)
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

