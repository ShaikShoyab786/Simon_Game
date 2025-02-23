gamePattern = []; 
userClickedPattern= [];
buttonColors = ["red","blue","green","yellow"]; 

var level = 0;
var started = false;


$("#start").on("click touchstart",function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

});

function nextSequence(){
    userClickedPattern = [];

    level = level + 1;

    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor(Math.random()*4); 
    var randomChosenColor = buttonColors[randomNumber]; 
    gamePattern.push(randomChosenColor); 

    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    
}

$(".btn").on("click", handler);

function handler(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
}

function playSound(name){
    var audio = new Audio ("sounds/"+name+".mp3");
    audio.play();

}

function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed");
    },100);

}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Click Start to play again");
        startOver();
    }

    
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}

