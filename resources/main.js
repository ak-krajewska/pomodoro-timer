//tofix: bug: after the full session timer and break timer run out, when you hit "start" again the timer starts and then turns off after one tick.

//this is the default duration, but it can be over written with interation
var sessionMinutes = 1;
var breakMinutes = 1;
var onBreak = false;
var durationSeconds = (sessionMinutes * 60);
var secondInterval;
var isTickTocking = false;
document.getElementById("pause").disabled = true;

//show the timer with the selected break and session time
function showTimer(){
    document.getElementById("session").innerHTML = "SESSION: " + sessionMinutes + ":00";
    document.getElementById("break").innerHTML = "BREAK: " + breakMinutes + ":00";
}


//Timer control buttons

//write safeteys so you can't mess with a session in progress

function incrementSession(){
    sessionMinutes = sessionMinutes + 1;
    console.log("sessionMinutes is now: " + sessionMinutes);
    durationSeconds = sessionMinutes * 60;
    showTimer();
    //button to increment session by 1 minute
}

//button to decrement session by 1 minute
function decrementSession(){
    if (sessionMinutes > 1){
        sessionMinutes = sessionMinutes - 1;
        console.log("sessionMinutes is now: " + sessionMinutes);
        durationSeconds = sessionMinutes * 60;
        showTimer();
    }
}

function incrementBreak(){
    //button to increment berak by 1 minute
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
            if (remainingSeconds < 10){
                document.getElementById("session").innerHTML = "SESSION: " + remainingMinutes + ":0" + remainingSeconds;
                document.getElementById("break").innerHTML = "BREAK: " + breakMinutes + ":00";
            } else {
                document.getElementById("session").innerHTML = "SESSION: " + remainingMinutes + ":" + remainingSeconds;
                document.getElementById("break").innerHTML = "BREAK: " + breakMinutes + ":00";
            }
        } else if (onBreak == true){
            if (remainingSeconds < 10){
                document.getElementById("break").innerHTML = "BREAK: " + remainingMinutes + ":0" + remainingSeconds;
            } else {
                document.getElementById("break").innerHTML = "BREAK: " + remainingMinutes + ":" + remainingSeconds;
            }
        }
            
    } else {
        if (onBreak == false){
            document.getElementById("session").innerHTML = "Session complete";
            onBreak = true;
            durationSeconds = breakMinutes * 60;
            tickTock();
            //call the break functions
        } else if ((onBreak == true) && (durationSeconds == 0)){
            document.getElementById("break").innerHTML = "Break complete";
            clearInterval(secondInterval); 
            isTickTocking = false;
            //durationSeconds = sessionMinutes * 60; creates unexpected bad effects and doesn't fix the bug
            buttonActivate();
            console.log("tic toc status: " + isTickTocking);
            
        }
    }
}
   
function startTimer(){
    console.log("start the clock");
    isTickTocking = true;
    secondInterval = setInterval(tickTock, 1000);
    buttonActivate();
    console.log("tic toc status: " + isTickTocking);
}

function pauseTimer(){
    console.log("pause the clock");
    clearInterval(secondInterval);
    document.getElementById("start").disabled = false;
    document.getElementById("pause").disabled = true;
}

function resetTimer(){
    if (confirm("Are you sure you want to stop this potato early?")){
        console.log("reset the clock"); 
        clearInterval(secondInterval); 
        isTickTocking = false;
        buttonActivate();
        showTimer();
        console.log("tic toc status: " + isTickTocking);
        } 
}

console.log("tic toc status: " + isTickTocking);