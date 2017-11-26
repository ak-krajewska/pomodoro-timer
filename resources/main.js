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


//this is the default duration, but it can be over written with interation
var sessionMinutes = 1;
var breakMinutes = 1;

function countDownTimer(duration){
    //runs the timer
    var onBreak = false;
    var durationSeconds = (duration * 60);
    console.log("I'm starting a timer with a duration in seconds of " + durationSeconds);
   
    function tickTock(){
        //if the duration is 1 second or more than a second sutract 1 from the display
        //if the duration is 0, stop the function????
        
        
        if (durationSeconds >= 1){
            durationSeconds = durationSeconds - 1;
            var remainingMinutes = Math.round((durationSeconds - 30)/60); 
            var remainingSeconds = durationSeconds % 60;
            if (onBreak == false) {
                document.getElementById("session").innerHTML = "SESSION: remainingMinutes: " + remainingMinutes + " remainingSeconds: " + remainingSeconds;
                document.getElementById("break").innerHTML = "BREAK: " + breakMinutes;
            } else if (onBreak == true){
                document.getElementById("break").innerHTML = "BREAK: remainingMinutes: " + remainingMinutes + " remainingSeconds: " + remainingSeconds;
            }
            
        }
        if (durationSeconds == 0){
            if (onBreak == false){
                document.getElementById("session").innerHTML = "Session complete";
                onBreak = true;
                durationSeconds = breakMinutes *60;
                tickTock();
            //call the break functions
            } else if ((onBreak == true) && (durationSeconds == 0)){
                document.getElementById("break").innerHTML = "Break complete";
            }
            
        }
        
    }
    var secondInterval = setInterval(tickTock, 1000);
  }




function timerControl(command){    
    if (command == "start"){
        console.log("start the clock");
        countDownTimer(sessionMinutes);
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


function setTime(time){
    //customizes the length of the timer
}
