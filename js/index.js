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

function startRecord (e) {
    
	mouseIsDragged = true;

	const mouseTimer = function() {

		if (mouseIsDragged) {
			if (isRecording) {

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

$startAndStop.addEventListener('click', (event) => {   
    toggleRecord = !toggleRecord;
    if (toggleRecord) {
        let mouseMove = false;
        let mouseMoveE = '';
         
        window.onmousemove = (e) => {
          mouseMove = true;
          mouseMoveE = e;
        };
         
        setInterval( function() {
            if (mouseMove) {
                mouseMove = false;
                startRecord(mouseMoveE);
            }
        }, 250 );
		// window.addEventListener('mousemove', startRecord, false);
	} else {
        $replayRecording.disabled = false;
        window.removeEventListener('mousemove', startRecord, false);
    }
});

$replayRecording.addEventListener('click', (event) => {
	replayRecord(event);
});