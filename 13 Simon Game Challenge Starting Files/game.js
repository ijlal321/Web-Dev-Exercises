const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
var level =0;


function nextSequence()
{
    level += 1;
    $("h1").text("Level "+ level);
    randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);


}


$(".btn").click(onBtnClick);

function onBtnClick(event)
{
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    if (checkArrSame(userClickedPattern, gamePattern) == true){
        if (gamePattern.length === userClickedPattern.length){
            userClickedPattern.length = 0
            setTimeout(nextSequence, 100);
        }

    }
    else{
        $("h1").text("Game Over you lost, ");
        level = 0;
        gamePattern.length = 0;
        userClickedPattern.length = 0;
    }



    
}

function playSound(name)
{
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}



function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {$("#"+currentColor).removeClass("pressed")}, 500);
}

$("body").keypress(function(event){
    if (level === 0){
        $("h1").text("Level 0");
        nextSequence();
    }
});


function checkArrSame(arr1, arr2)
{
    for(var i = 0; i < arr1.length; i++)
        {
            if (arr1[i] != arr2[i])
            return false;
        }
        return true;
}