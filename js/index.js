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

function insertMouseRecords (obj) {
	mouseMoves.push(obj)
}

function startRecord (e) {
    
    mouseMoves = [];
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
                    'timestamp' : timeStamp
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
	alert (e.type);
};


let toggleRecord = false;

$startAndStop.addEventListener('click', (event) => {   
    toggleRecord = !toggleRecord;
    if (toggleRecord) {
		window.addEventListener('mousemove', startRecord, false);
	} else {
        window.removeEventListener('mousemove', startRecord, false);
    }
});

$replayRecording.addEventListener('click', (event) => {
	replayRecord(event);
});