let lakeX = 0
let lakeY = 0
let lakeD = 0
let flowerCount = 0
let grassColor
let lake
let flowers = []
let angle = 0
// let radius1 = 85;
// let radius2 = 50;
let radius = [85,50]
let radiusWaves = [lakeX, lakeY]
let speed = 0.01;
// the center of our rotation:
let centerX = 0;
let centerY = 0;

let grassX=[]
let grassY=[]
// let position1=[]
// let position2=[]
// let position3=[]
// let position4=[]
// let position5=[]
// let position6=[]
// let position7=[]
let positions = {position1:[], position2:[], position3:[], position4:[], position5:[], position6:[], position7:[]}

// let angles = []

function setup() {
  const w = window.innerWidth
  const h = window.innerHeight
  createCanvas(w,h); 

  lakeX = w/2
  lakeY = h/2
  lakeD = h/3 

  centerX = w/2
  centerY = h/2

  for(let i=0; i<50; i++){
    grassX[i]=random(0,w)
    grassY[i]=random(0,h)
    // position1[i]=random(5,10)
    // position2[i]=random(8,14)
    // position3[i]=random(10,15)
    // position4[i]=random(6,8)
    // position5[i]=random(15,20)
    // position6[i]=random(8,14)
    // position7[i]=random(20,25)
    positions.position1[i]=random(5,10)
    positions.position2[i]=random(8,14)
    positions.position3[i]=random(10,15)
    positions.position4[i]=random(6,8)
    positions.position5[i]=random(15,20)
    positions.position6[i]=random(8,14)
    positions.position7[i]=random(20,25)
    // angles[i]=random(-1,1)
  }

  console.log(w/400);
  
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

  // for(let j=60; j<height;j+=120){
  //   for(let i=50; i<width; i+= 180){
  //     if(j%240==60){
  //       i+= 100
  //     }
  //     stroke("#7C815C")
  //     line(i,j,i+5,j-6)
  //     line(i+5,j-6,i+10,j-4)
  //     line(i+10,j-4, i+20,j-6)
  //     line(i+20,j-6,i+25,j)
        
  //   }
  // }
  for(let j=0; j<grassX.length;j++){
    // for(let i=50; i<width; i+= 180){
    //   if(j%240==60){
    //     i+= 100
    //   }
    stroke("#7C815C")
    noFill()
     // line(grassX[j],grassY[j],grassX[j]+5,grassY[j]-6)
     // line(grassX[j]+5,grassY[j]-6,grassX[j]+10,grassY[j]-4)
     // line(grassX[j]+10,grassY[j]-4, grassX[j]+20,grassY[j]-6)
     // line(grassX[j]+20,grassY[j]-6,grassX[j]+25,grassY[j])
    
    beginShape();
	  vertex(grassX[j],grassY[j]);
	  vertex(grassX[j]+positions.position1[j],grassY[j]-positions.position2[j]);
	  vertex(grassX[j]+positions.position3[j],grassY[j]-positions.position4[j]);
	  vertex(grassX[j]+positions.position5[j],grassY[j]-positions.position6[j]);
    vertex(grassX[j]+positions.position7[j],grassY[j]);
	  endShape();
    
    
    }


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

  push()
  drawingContext.shadowOffsetX = 20;
  drawingContext.shadowOffsetY = 15;
  drawingContext.shadowBlur = 30
  drawingContext.shadowColor = 'black';
  circle(0,0,20)
  pop()
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
  push()
  translate(centerX, centerY);
  rotate (-angle);
  
  fill("orange")
  ellipse(radius[0],0, 10,16)
  triangle(radius[0],8,radius[0]-8,15,radius[0]+8,15)
  
  angle = angle + speed;
  pop()

  push()
  translate(centerX, centerY);
  rotate (angle);
  
  fill("orange")
  ellipse(radius[1],0, 10,16)
  triangle(radius[1],-8,radius[1]-8,-15,radius[1]+8,-15)
  
  angle = angle + speed*1.5;
  pop()

  push()
  translate(centerX, centerY);
  rotate (angle);
  
  strokeWeight(2)
  stroke(255,255,255,150)
  noFill()
  // circle(radius[0]/10,radius[0]/4, 40)
  arc(radiusWaves[0], radiusWaves[0]/4, 50, 50, 0, HALF_PI);
  arc(radiusWaves[1], radiusWaves[1]/3, 150, 150, 0, HALF_PI);
  arc(radiusWaves[0]/8, radiusWaves[0]/3, 180, 180, PI, PI + QUARTER_PI);
  arc(radiusWaves[0]/8, radiusWaves[0]/3, 100, 100, HALF_PI, PI);
  
  angle = angle + speed;
  pop()

}