//this is the default duration, but it can be over written with interation
var sessionMinutes = 1;
var breakMinutes = 1;
var onBreak = false;
var durationSeconds = (sessionMinutes * 60);
var secondInterval;
var isTickTocking = false;

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
            console.log("tic toc status: " + isTickTocking);
        }
    }
}
   
function startTimer(){
    console.log("start the clock");
    isTickTocking = true;
    secondInterval = setInterval(tickTock, 1000);
    console.log("tic toc status: " + isTickTocking);
}

function pauseTimer(){
    console.log("pause the clock");
        //pause will also need to be an unpause so will have to have a visual indicator of its state
        //save the timers state
        //unpause the timer using the saved state to initialize it
        //you know what pause is not one of the user stories so maybe I don't need to build it
}

function resetTimer(){
    if (confirm("Are you sure you want to stop this potato early?")){
        console.log("reset the clock"); 
        clearInterval(secondInterval); 
        isTickTocking = false;
        showTimer();
        console.log("tic toc status: " + isTickTocking);
        } 
}

console.log("tic toc status: " + isTickTocking);