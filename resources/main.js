//borrowed code


    var seconds = 60;
    function secondPassed() {
        var minutes = Math.round((seconds - 30)/60);
        var remainingSeconds = seconds % 60;
        if (remainingSeconds < 10) {
            remainingSeconds = "0" + remainingSeconds;  
        }
        document.getElementById('sessionTimer').innerHTML = minutes + ":" + remainingSeconds;
        if (seconds == 0) {
            clearInterval(countdownTimer);
            document.getElementById('sessionTimer').innerHTML = "Buzz Buzz";
        } else {
            seconds--;
        }
    }
    var countdownTimer = setInterval('secondPassed()', 1000);

//end borrowed code



function timerControl(command){    
    if (command == "start"){
        console.log("start the clock");
        countDownTimer(3);
        //run the time function
    }
    else if (command == "pause"){
        console.log("pause the clock");
        //pause will also need to be an unpause so will have to have a visual indicator of its state
        //save the timers state
        //unpause the timer using the saved state to initialize it
    } 
    else if (command == "reset"){
        if (confirm("Are you sure you want to stop this potato early?")){
        console.log("reset the clock"); 
        //clearInterval(secondInterval);
        //set the timer to starting postion but don't start it
        } else {
            //do nothing
        }
           
    }
}

//this is the default duration, but it can be over written with interation
var sessionMinutes = 25;
var breakMinutes = 5;

function countDownTimer(duration){
    //runs the timer
    
    var durationSeconds = (duration * 60);
    console.log("I'm starting a timer with a duration in seconds of " + durationSeconds);
    document.getElementById("session").innerHTML = durationSeconds;
    function tickTock(){
        //if the duration is 1 second or more than a second sutract 1 from the display
        //if the duration is 0, stop the function????
        if (durationSeconds >= 1){
            durationSeconds = durationSeconds - 1;
            document.getElementById("session").innerHTML = durationSeconds;
        }
        
    }
    var secondInterval = setInterval(tickTock, 1000);
    
    
    
    
}

function setTime(time){
    //customizes the length of the timer
}
