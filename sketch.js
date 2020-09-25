var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var survivalTime = 0;
var score;

function preload(){
  
  
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  background('lightblue');
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  monkey.setCollider("circle",0,0,300);
  //monkey.debug = true;

  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;  
  survivalTime=0;
}


function draw() {
  background('lightblue');

  
  
  stroke("white");
  textSize(20);
  fill("white");
  text(score, 60,125);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: ", + survivalTime,100,50);
    score = score + Math.round(getFrameRate()/60);
  
  if (gameState===PLAY) {
    
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
    
    
   if(keyDown("space")&& monkey.y >= 200) {
        monkey.velocityY = -10 ;
    } 
    monkey.velocityY = monkey.velocityY + 0.8

    food();
    obstacles();
    
   
    
  }
    monkey.collide(ground);  
  
  drawSprites();
  
}

function food(){
    if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    
    //add each cloud to the group
    foodGroup.add(banana);
  }
}

function obstacles(){
  
    if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,330,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.12;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
  
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
  
}