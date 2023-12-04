let lakeX = 0
let lakeY = 0
let lakeD = 0
let flowerCount = 0
let grassColor
let lake
let flowers = []
let angle = 0
let radius = [85,50]
let radiusWaves = [lakeX, lakeY]
let speed = 0.005;
// the center of our rotation:
let centerX = 0;
let centerY = 0;
let grassX=[]
let grassY=[]
let positions = {position1:[], position2:[], position3:[], position4:[], position5:[], position6:[], position7:[]}
let sound
let bird
let birdX=0
let birdY=window.innerHeight + 292
let drawBird = false
let soundPlaying = false

function preload(){
  // sound =  loadSound("assets/birds.wav")
  sound =  loadSound("assets/sound.wav")
  bird = loadImage("assets/Bird2.png")
}

function setup() {
  const w = window.innerWidth
  const h = window.innerHeight
  createCanvas(w,h); 

  lakeX = w/2
  lakeY = h/2
  lakeD = h/2.5

  centerX = w/2
  centerY = h/2

  for(let i=0; i<50; i++){
    grassX[i]=random(0,w)
    grassY[i]=random(0,h)
    positions.position1[i]=random(5,10)
    positions.position2[i]=random(8,14)
    positions.position3[i]=random(10,15)
    positions.position4[i]=random(6,8)
    positions.position5[i]=random(15,20)
    positions.position6[i]=random(8,14)
    positions.position7[i]=random(20,25)
  }
  
  imageMode(CENTER);
  bird.resize(200,155)  
}

function draw(){

  if(flowerCount >= 0 && flowerCount < 10) {
    grassColor = "#B0B591"
  }else if(flowerCount >= 10 && flowerCount < 20){
    grassColor = "#B4BD79"
  }else if(flowerCount >= 20 && flowerCount < 30){
    grassColor = "#C2D262"
  }else{
    grassColor = "#D8E878"
  }
  background(grassColor);

  for(let j=0; j<grassX.length;j++){
    stroke("#7C815C")
    noFill()

    beginShape();
	  vertex(grassX[j],grassY[j]);
	  vertex(grassX[j]+positions.position1[j],grassY[j]-positions.position2[j]);
	  vertex(grassX[j]+positions.position3[j],grassY[j]-positions.position4[j]);
	  vertex(grassX[j]+positions.position5[j],grassY[j]-positions.position6[j]);
    vertex(grassX[j]+positions.position7[j],grassY[j]);
	  endShape(); 
  }
  
  if(flowerCount >= 0 && flowerCount < 10) {
    lake = "#627C77"
  }else if(flowerCount >= 10 && flowerCount < 20){
    lake = "#72A89E"
  }else if(flowerCount >= 20 && flowerCount < 30){
    lake = "#C0EEE5"
  }else{
    lake = "#D5F9F3"
  }
  fill(lake)
  noStroke()
  circle(lakeX, lakeY, lakeD)
  //Sombra
  push()
  drawingContext.shadowOffsetX = 5
  drawingContext.shadowOffsetY = -5
  drawingContext.shadowBlur = 20
  drawingContext.shadowColor = "black"
  noFill()
  strokeWeight(0.5)
  stroke(lake)
  circle(lakeX-4,lakeY+3,lakeD-7)
  pop()

  for(let i = 0; i<flowers.length; i++){
    drawFlower(flowers[i].x, flowers[i].y, flowers[i].color, flowers[i].nPetals, flowers[i].size)
  } 

  if(flowerCount >= 20){
    addFish()
    flyingBird()
  }
}

function mousePressed(){

  let d = dist(lakeX,lakeY,mouseX,mouseY)

  if(d>(lakeD/2)){
    let flowerColor = ["#8B0000","#B22222","#DC143C","#FFE4E1","#FFFFFF","#c71f37","#ef233c"]
    flowerColor = random(flowerColor)
    let size = random(20,60)
    let nPetals = Math.floor(random(9,14))

    flowers.push({x:mouseX, y:mouseY, color: flowerColor, nPetals: nPetals, size: size})
    drawFlower(mouseX,mouseY,flowerColor)
    flowerCount += 1
  }  
  console.log(flowers)
  // console.log(flowerCount)
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
  arc(radiusWaves[0], radiusWaves[0]/4, 50, 50, 0, HALF_PI);
  arc(radiusWaves[1], radiusWaves[1]/3, 150, 150, 0, HALF_PI);
  arc(radiusWaves[0]/8, radiusWaves[0]/3, 180, 180, PI, PI + QUARTER_PI);
  arc(radiusWaves[0]/8, radiusWaves[0]/3, 100, 100, HALF_PI, PI);
  
  angle = angle + speed;
  pop()

  // push()
  // translate(lakeX,lakeY)

  // pop()
  if(flowerCount >= 30){ 
    push()
    drawingContext.shadowOffsetX = 8;
    drawingContext.shadowOffsetY = 10;
    drawingContext.shadowBlur = 20
    drawingContext.shadowColor = 'grey';
    circle(lakeX,lakeY,20)
    pop()
    let c = drawingContext.createRadialGradient(lakeX,lakeY,17,lakeX,lakeY,50)
    c.addColorStop(0,"green")
    c.addColorStop(1,"darkgreen")
    drawingContext.fillStyle = c
    noStroke()
    arc(lakeX, lakeY, 50,50, PI/7, -PI/7)
    
    push()
    translate(lakeX,lakeY)
    for(let i = 0; i<7;i++){
      fill("LightPink")
      ellipse(0,5,8,16)
      rotate(TWO_PI/7) 
    }
    pop()

    push()
    drawingContext.shadowOffsetX = 8;
    drawingContext.shadowOffsetY = 10;
    drawingContext.shadowBlur = 20
    drawingContext.shadowColor = 'grey';
    circle(lakeX+50,lakeY+40,20)
    pop()
    let c2 = drawingContext.createRadialGradient(lakeX,lakeY,17,lakeX,lakeY,50)
    c2.addColorStop(0,"green")
    c2.addColorStop(1,"darkgreen")
    drawingContext.fillStyle = c2
    noStroke()
    arc(lakeX+50, lakeY+40, 50,50, -TWO_PI/3, PI)
    
    push()
    translate(lakeX+50,lakeY+40)
    for(let i = 0; i<7;i++){
      fill("LightPink")
      ellipse(0,5,8,16)
      rotate(TWO_PI/7) 
    }
    pop()
  }

}

function flyingBird(){
  rotate(QUARTER_PI);
  //ativa o desenho do passaro e o som quando o resto do frameCount for 0
  if(frameCount%600==0){
    drawBird = true
    sound.play()
  }
  // console.log(frameCount%600)

  //ativa o desenho
  if(drawBird == true){
    image(bird, birdX, birdY)
    if(birdX<window.innerWidth){
      birdX+=2
      birdY-=3
    }else{
      birdX = 0
      birdY = window.innerHeight
      //quando chega ao fim passa para false até o resto ser 0
      drawBird=false
    }
  }
}