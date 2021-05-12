var dog;
var food;
var feed;


function preLoad(){
  dog = loadImage("dogImg.png");
  dog = loadImage("dogImg1.png");
}
function setup() {
  createCanvas(800, 700);
  dog=createSprite(300,227);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood=position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
  background(46, 139, 87);

  

    if(keyDown(UP_ARROW)){
        writeStock(foodS);
        dog.addImage(dogImg1);
    }

    
   fedTime=database.ref('FeedTime');
   fedTime.on("value",function(data){
     lastFed=data.val()
   })

       drawSprites();

   Fill(255,255,254);
   testSize(15);
   if(lastFed>=12){
     text("Last Feed :"+lastFed%12 + "PM", 350,30);
   }else if (lastFed==0){
     text("Last Feed : 12AM",350,30);
   }else{
     text("Last Feed :"+ lastFed + "AM", 350,30);

     if(gameState!="Hungry"){
       feed.hide();
       addFood.hide();
       dog.remove();
     }else{
       feed.show();
       addFood.show();
       dog.addImage(DeadDog);
     }  
   }

   readState=database.ref('gameState');
   readState.on("value",function(data){
    gameState=data.val();
   });
   
   currentTIme=hour();
   if(currentTime==(lastFed+1)){
     update("Playing");
     foodObj.garden();
   }else if(currentTime==(lastFed+2)){
     update("Sleeping");
     foodOnj.bedroom();
   }else if(currentTime==(lastFed+2)&&currentTime<+(lastFed+4)){
     update("Bathing");
     foodObj.washroom();
   }else{
     update("Hungry")
     foodObj.display();
   }
}

function feedDog(){
  dog.addImage("dogImg1.png");

  foddObj.uppdateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })

}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data){
  foodS=data.val();

}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}



