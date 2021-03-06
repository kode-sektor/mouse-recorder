// JavaScript Document

// 1. When a user presses the record button, start recording actions
// 2. When recording, push an object with the important data to the array
//			- Clear the array before starting a new recording
// 3. Stop a recording by pressing the same button
//			- Print all of the position to the console using forEach: 123px 345px
// 4. Replay the recording by iterating through the Array and move a custom cursor to the position that was recorded
//			- Ensure there is not current a recording going on (various ways to prevent that case)



let isRecording = true;
let mouseIsDragged = false;
let mouseMoves = [];
let timer;

const $startAndStop = document.getElementById('startAndStop');
const $replayRecording = document.getElementById('replayRecording');
const $cursor = document.getElementById('cursor');

function insertMouseRecords (obj) {
	mouseMoves.push(obj)
}

let startRecord = (e) => {
    
	mouseIsDragged = true;

	const mouseTimer = function() {

		if (mouseIsDragged) {
			if (isRecording) {

                // Get mouse coordinates
                let xCoord = e.clientX;
                let yCoord = e.clientY;
                let timeStamp = e.timeStamp;

                insertMouseRecords({
                    'x-coord' : xCoord,
                    'y-coord' : yCoord,
                    'timestamp' : Math.round(timeStamp)
                });
                console.log(e);
                console.log(e.clientX, e.clientY);
                console.log (mouseMoves);
                // Record the data to the array
			}
		}
	};

    mouseTimer();
};

const replayRecord = (e) => {
    // First make alternate cursor visible
    $cursor.style.display = 'block';
    
    let duration = mouseMoves.length / 5;
    duration = duration * 50;

    console.log(mouseMoves.length);
    
    function start(counter){
        if(counter < (mouseMoves.length - 1)){
            setTimeout(function(){
                /*
                const mouseMoves = [
                    {"x-coord": 95, "y-coord": 20, "timestamp": 236238623},
                    {"x-coord": 47, "y-coord": 17, "timestamp": 236235423}
                ]
                */
                $cursor.style.setProperty('--x', mouseMoves[counter]["x-coord"]);
                $cursor.style.setProperty('--y', mouseMoves[counter]["y-coord"]); 
                counter++;

                start(counter);
            }, duration);
        } else {
            // Clear mouseMoves coordinates for next click
            mouseMoves = [];
        }
    }
    start(0);
};


let toggleRecord = false;

const initRecord = () => {
    
    toggleRecord = !toggleRecord;   // Toggle the click
    
    // On first click of 'Start Rercording': 
    // Change its text to 'Stop Recording',
    // Add a class to 'Replay recording' button to indicate its not clickable
    // Listen to mousemove event
    // Set interval to trap a function that will be passed
    
    if (toggleRecord) { 
        isRecording = true;
        $startAndStop.textContent = 'Stop Recording';
        $replayRecording.disabled = true;
        $replayRecording.classList.add('not-allowed');
        let mouseMove = false;
        let mouseMoveE = '';
         
        window.onmousemove = (e) => {
          mouseMove = true;
          mouseMoveE = e;
        };
         
        setInterval( function() {   // Prevent event from rapidly firing
            if (mouseMove && isRecording) {
                mouseMove = false;
                startRecord(mouseMoveE);
            }
        }, 250 );
	} else {
        
        // On the 2nd click of 'Start Recording',
        // Change text on "Start / Stop Recording" button to 'Start Recording'
        // Add a class to 'Replay recording' button to indicate its now clickable
        // 

        $startAndStop.textContent = 'Start Recording';
        $replayRecording.disabled = false;
        $replayRecording.classList.remove('not-allowed');
        window.removeEventListener('mousemove', startRecord, false);
        isRecording = false;
    }
    
}

// Trigger recording with 'spacebar' key
document.body.onkeyup = function(e){
    if (e.keyCode == 32){
        initRecord();
    }
}

// Listen to click of 'Start/Stop' and run function that 
// tracks the coordinates of the mouse movements
$startAndStop.addEventListener('click', (event) => {   
    initRecord();
});

// Listen to click of 'Replay Recording' and add run function
// that moves custom mouse with exact previous stored coordinates
$replayRecording.addEventListener('click', (event) => {
	replayRecord(event);
    $replayRecording.classList.add('not-allowed');    
});