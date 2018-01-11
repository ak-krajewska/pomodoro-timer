//this is the default duration, but it can be over written with interation
var sessionMinutes = 25;
var breakMinutes = 5;
var onBreak = false;
var durationSeconds = (sessionMinutes * 60);
var secondInterval;
var isTickTocking = false;
document.getElementById("pause").disabled = true;
var audio = new Audio('resources/long-chime-sound.mp3');

//show the timer with the selected break and session time
function showTimer(){
    document.getElementById("breakLength").innerHTML = breakMinutes + ":00";
    document.getElementById("sessionLength").innerHTML = sessionMinutes + ":00";
    
    if (onBreak == true){
        document.getElementById("bigClock").innerHTML = breakMinutes + ":00";
        document.getElementById("timerType").innerHTML = "BREAK";
    } else {
        document.getElementById("bigClock").innerHTML = sessionMinutes + ":00";
        document.getElementById("timerType").innerHTML = "SESSION";
    }
}

//fade in color calculator
function potatoFader(total, portion, color){
    var howFaded = portion/total;
    //console.log("how faded is " + howFaded);
    //console.log("portion is " + portion + " and total is " + total);
    document.getElementById("bigPotato").style = "background-color: rgba(" + color + howFaded + ")";
}

//Timer control buttons
//button to increment session by 1 minute
function incrementSession(){
    sessionMinutes = sessionMinutes + 1;
    console.log("sessionMinutes is now: " + sessionMinutes);
    durationSeconds = sessionMinutes * 60;
    console.log("function incrementSession set durationSeconds to " + durationSeconds);
    showTimer(); 
}

//buttons to decrement session by 1 minute
function decrementSession(){
    if (sessionMinutes > 1){
        sessionMinutes = sessionMinutes - 1;
        console.log("sessionMinutes is now: " + sessionMinutes);
        durationSeconds = sessionMinutes * 60;
        console.log("function decrementSession set durationSeconds to " + durationSeconds);
        showTimer();
    }
}

//button to increment berak by 1 minute
function incrementBreak(){
    breakMinutes = breakMinutes + 1;
    console.log("breakMinutes is now: " + breakMinutes);
    //durationSeconds = sessionMinutes * 60;
    showTimer();
}

//button to decrement break by 1 minute
function decrementBreak(){
    if (breakMinutes > 1) {
        breakMinutes = breakMinutes - 1;
        console.log("breakMinutes is now: " + breakMinutes);
        showTimer();
    }
}

//deactivate increment, decrement, and start buttons when timer active
//activate pause button when timer active
function buttonActivate(){
    if (isTickTocking == true){
    //deactivate buttons
        document.getElementById("incrementSession").disabled = true;
        document.getElementById("decrementSession").disabled = true;
        document.getElementById("incrementBreak").disabled = true;
        document.getElementById("decrementBreak").disabled = true;
        document.getElementById("start").disabled = true;
        document.getElementById("pause").disabled = false;
    } else {
    //reactivate buttons   
        document.getElementById("incrementSession").disabled = false;
        document.getElementById("decrementSession").disabled = false;
        document.getElementById("incrementBreak").disabled = false;
        document.getElementById("decrementBreak").disabled = false;
        document.getElementById("start").disabled = false;
        document.getElementById("pause").disabled = true;
    }
}

//runs the timer
function tickTock(){  
    if (durationSeconds >= 1){
        durationSeconds = durationSeconds - 1;
        var remainingMinutes = Math.round((durationSeconds - 30)/60); 
        var remainingSeconds = durationSeconds % 60;  
       
        
        if (onBreak == false) {
            potatoFader(sessionMinutes*60, (remainingMinutes*60 + remainingSeconds), "255, 255, 255,");
            if (remainingSeconds < 10){
                document.getElementById("bigClock").innerHTML = remainingMinutes + ":0" + remainingSeconds;
                
            } else {
                document.getElementById("bigClock").innerHTML = remainingMinutes + ":" + remainingSeconds;
            }
        } else if (onBreak == true){
            potatoFader(breakMinutes*60, (remainingMinutes*60 + remainingSeconds), "26, 180, 91,");
            if (remainingSeconds < 10){
                document.getElementById("bigClock").innerHTML = remainingMinutes + ":0" + remainingSeconds;
                
            } else {
                document.getElementById("bigClock").innerHTML = remainingMinutes + ":" + remainingSeconds;
            }
        }
            
    } else {
        if (onBreak == false){
            onBreak = true;
            durationSeconds = breakMinutes * 60;
            showTimer();
            audio.play();
            tickTock();
            //call the break functions
        } else if ((onBreak == true) && (durationSeconds == 0)){
            clearInterval(secondInterval); 
            isTickTocking = false;
            buttonActivate();
            //console.log("tic toc status: " + isTickTocking);
            onBreak = false;
            //console.log("onBreak is " + onBreak);
            durationSeconds = sessionMinutes * 60; 
            //console.log("durationSeconds is " + durationSeconds);
            audio.play();
            showTimer();
        }
    }
}
   
function startTimer(){
    //console.log("start the clock");
    isTickTocking = true;
    secondInterval = setInterval(tickTock, 1000);
    buttonActivate();
    //console.log("tic toc status: " + isTickTocking);
    audio.play();
}

function pauseTimer(){
    //console.log("pause the clock");
    clearInterval(secondInterval);
    document.getElementById("start").disabled = false;
    document.getElementById("pause").disabled = true;
}

function resetTimer(){
    if (confirm("Are you sure you want to stop this potato early?")){
        //console.log("reset the clock"); 
        clearInterval(secondInterval); 
        isTickTocking = false;
        onBreak = false; //if we're in a break change our status to a session
        buttonActivate();
        showTimer();
        //potatoFader(sessionMinutes*60, (remainingMinutes*60 + remainingSeconds), "255, 255, 255,"); 
        document.getElementById("bigPotato").style = "background-color: rgba(255, 255, 255, 1)";
        //console.log("tic toc status: " + isTickTocking);
        //reset the length of the session, so it's not the length of the break
        durationSeconds = sessionMinutes * 60; 
        } 
}

//console.log("tic toc status: " + isTickTocking);