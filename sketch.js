  var PLAY=1;
  var END=0;
  var gameState=PLAY;

  var tower,towerImage,ghost,ghostImagejump,ghostImagestand;
  var door,doorImage,climber,climberImage;
  var climberGroup,doorGroup;
  var invisibleClimber,invisibleClimberGroup;

  function preload(){
    towerImage = loadImage("tower.png");
    ghostImagejump = loadImage("ghost-jumping.png");
    ghostImagestand = loadImage("ghost-standing.png");
    doorImage = loadImage("door.png");
    climberImage = loadImage("climber.png");
    //spookySound = loadSound("spooky.wav");
  }

  function setup(){
    createCanvas(600,600);
    //spookySound.loop();
    tower = createSprite(300,300,600,600);
    tower.addImage('tower',towerImage);
    tower.velocityY=1;

    ghost = createSprite(300,300,20,20);
    ghost.addImage("ghost",ghostImagestand);
    ghost.scale=0.5;    


    doorGroup = new Group();
    climberGroup = new Group();
    invisibleClimberGroup = new Group();
  }

  function draw(){
   background("black");
    if(gameState===PLAY){


    if(tower.y>400){
       tower.y=300;
       }

    if(keyDown("space")){
       ghost.velocityY=-5;
       }
    ghost.velocityY=ghost.velocityY+0.8;    

    if(keyDown("left")) {
      ghost.x=ghost.x-5;
    }

    if(keyDown("right")){
       ghost.x=ghost.x+5;
    }

       //climbersGroup.collide(ghost);
      if(climberGroup.isTouching(ghost)){
        ghost.velocityY = 0;
      }

      if(invisibleClimberGroup.isTouching(ghost)|| ghost.y>600 ){
        gameState=END;
        ghost.destroy();
        tower.destroy();


      }
    spawnDoors();

    drawSprites();
       }
    else if(gameState===END){
      stroke("yellow");
      fill("yellow");
      textSize(30);     
      text("GameOver",230,300);

    }





  }

  function spawnDoors(){
    if(frameCount%300===0){
      door = createSprite(300,-100,20,20);
      door.addImage("door",doorImage);
      door.x=Math.round(random(120,400));
      door.velocityY=1;     
      ghost.depth=door.depth;
      ghost.depth=ghost.depth+1; 
      door.lifetime=700;
      doorGroup.add(door);

      climber = createSprite(300,-50,20,20);
      climber.addImage('climber',climberImage);
      climber.x=door.x;
      climber.velocityY=1;
      climber.depth=door.depth;
       climber.lifetime=700;
      climberGroup.add(climber);
      climber.debug=true;


      invisibleClimber = createSprite(300,-50,100,20);
      invisibleClimber.width = climber.width;
      invisibleClimber.height = 2;
      invisibleClimber.x = door.x;
      invisibleClimber.velocityY = 1;
      invisibleClimber.lifetime = 700;
      invisibleClimber.visible=false;
      invisibleClimberGroup.add(invisibleClimber);
       }

  }
