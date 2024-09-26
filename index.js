

let buttonColours=["red","blue","green","yellow"];
let gamePattern=[];
let userClickedPattern=[];
let started=false;
let level=0;

$(document).keydown(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextFunction();
      started = true;
    }
  });

$(".btn").click(function(){
    let userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animaPress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

//function to check the answer
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("sucess");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
            nextFunction();
         }, 1000);

        }
    }
     
    else{
        playSound("wrong");
        console.log("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
        
        $("#level-title").text("Game Over!, Press Any Key To Start");
        startOver();
        
    }
}
 
function nextFunction(){
    userClickedPattern=[];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber=Math.floor(Math.random(3)*3);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

  
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);  

}

function playSound(name){
    var audio = new Audio("public/sounds/" + name + ".mp3");
    audio.play();
  }
  
function animaPress(currentColour){
    
    $("#"+currentColour).addClass("pressed");
   
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
   
}

function startOver(){
    gamePattern=[];
    started=false;
    level=0;
}





