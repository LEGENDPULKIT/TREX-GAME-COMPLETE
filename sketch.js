//add trex and ground
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

//add cloud and obstacle group
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

//add score
var score;

//initialise game state
var PLAY=1;
var END=0;
var gameState=PLAY;

//create score
var score=0;

//add game over and restart buttons
var gameover,restart;
    

function preload()
{
  //set animation to trex
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  //add image to ground
  groundImage = loadImage("ground2.png");
  
  //add image to clouds
  cloudImage = loadImage("cloud.png");
  
  //add images to obstacles
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  //add image to gameover and restart button
  gameoverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() 
{
  createCanvas(600, 200);
   
  //create trex sprite and set animation
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  //create ground sprite and set animation
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //create gameover sprite and set image
  gameover=createSprite(300,100);
  gameover.addImage(gameoverImg);
  gameover.scale=0.5;
  gameover.visible=false;
  
  //create restart sprite and set image
  restart=createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale=0.5;
  restart.visible=false;
  
  
  //create invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create cloud and obstacle group
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  //set variable for score
  score = 0;
}

function draw() 
{
  //clear the background
  background(180);
  
  //display the text
  text("Score: "+ score, 500,50);
  
  //set gamestate to play
  if(gameState===PLAY)
  {
    score = score + Math.round(getFrameRate()/60);
    
    //make trex jump
     if(keyDown("space")) {
    trex.velocityY = -10;
  }
   
    trex.velocityY = trex.velocityY + 0.8
     
      spawnClouds();
      spawnObstacles();
    
      //change game state to end
      if(obstaclesGroup.isTouching(trex))
      {
        gameState=END;
       }
     }
  
  //set game state to end
  else if(gameState===END)
  {
    gameover.visible=true;
    restart.visible=true;
    
    ground.velocityX=0;
    trex.velocityY=0;
    
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    trex.changeAnimation("collided",trex_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    //make the game reset when we click on restart button
    if(mousePressedOver(restart))
    {
      reset();
    
    }
  
  }
  
  
 
  
  
  
 
  trex.collide(invisibleGround);
 
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

//create reset function
function reset()
{
  gameState=PLAY;
  
  gameover.visible=false;
  restart.visible=false;

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score=0;



}