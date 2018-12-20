//Basic KNN classification of MFFCs
var k = 3; //k can be any integer
var machine = new kNear(k);
var test;
var currentClass = 0;
var nSamples = 0;

var audio;
var normalized = [];

var mfcc;
var loudness = 0;
var loudnessThreshold = 10;

var soundReady = false;

var counter1 = 0;
var counter2 = 0;
var counter3 = 0;
var counter4 = 0;
var counter5 = 0;
var counter6 = 0;
var counter7 = 0;
var counter8 = 0;
//TRIGGER MODE
var predictionAlpha = 255;

var singleTrigger = true;
var startTime;
var triggerTimerThreshold = 300;
var timer;
var test = 0;
let lastTest;

let soundA;
let soundB;
let soundC;

var soundFile;
var fft;
var binCount = 1024;
var bins = new Array(binCount);

var v = 512;
var ps = true;
var recording = false;

function preload() {
  soundA = loadSound('A.mp3');
  soundB = loadSound('B.mp3');
  soundC = loadSound('B.mp3');

}

function setup() {
    cnv = createCanvas(window.innerWidth,200);
window.onload = function() {
	audio = new MicrophoneInput(v);
}
    startTime = millis();
    setupButtons();
  //  makeDragAndDrop(cnv, gotFile);


  //load JSON ...

}



function callbackJSONLoaded(json){
  machine.training = json.training;
}

function draw() {
    background(255);
    textSize(36);
    playSound();

//print(machine);

    timer = millis() - startTime;
    if (timer>triggerTimerThreshold) {
        singleTrigger = true;
    }


    if (soundReady) {
        fill(0);
        noStroke();
        text("LOUDNESS " + nf(loudness, 1, 2), window.innerWidth-380, 150);
        text("MFCCs", 20,  150);

        if (loudness > loudnessThreshold) {
            fill(0,255,0);
        } else {
            fill(122);
        }

        if (singleTrigger == false) {
            fill (255,0,0);
        }

        stroke(0);
        ellipse(window.innerWidth-50, 140, loudness*3, loudness*3);

        fill(0,255,0);
        for (var i = 0; i < 13; i++) {
            rect(i*(15)+ 170, 150, 10, mfcc[i]*5);
        }
    }

    //TEST
    //if (mouseIsPressed && (loudness > loudnessThreshold) && singleTrigger ) {

    if (recording == true && (loudness > loudnessThreshold) && singleTrigger ) {
        machine.learn(mfcc, currentClass);
        nSamples++;

        fill(255, 0, 0);
        noStroke();
        ellipse(window.innerWidth - 55, 25, 25, 25);

        singleTrigger = false;
        startTime = millis();


    } else if (nSamples >0 && (loudness > loudnessThreshold) && singleTrigger)  {
        fill(0,255,0);
        if (loudness > loudnessThreshold) {

            test = machine.classify(mfcc);
            singleTrigger = false;
            startTime = millis();
            predictionAlpha = 255;
        }
    }
if (loudness < 8){
    test = 0;
  }
    noStroke();
    fill(0);
    textSize(36);

  	text("Prediction: " + test, window.innerWidth-240, 90);
    var posx = 20;
    var posy = 90;
  if (currentClass == 1){
    text(counter1 + " " + document.getElementById("myText1").value, posx, posy);
  }
  else if (currentClass == 2){
    text(counter2 + " " + document.getElementById("myText2").value, posx, posy);
  }
  else if (currentClass == 3){
    text(counter3 + " " + document.getElementById("myText3").value, posx, posy);
  }
  else if (currentClass == 4){
    text(counter4 + " " + document.getElementById("myText4").value, posx, posy);
  }
  else if (currentClass == 5){
    text(counter5 + " " + document.getElementById("myText5").value, posx, posy);
  }
  else if (currentClass == 6){
    text(counter6 + " " + document.getElementById("myText6").value, posx, posy);
  }
  else if (currentClass == 7){
    text(counter7 + " " + document.getElementById("myText7").value, posx, posy);
  }
  else if (currentClass == 8){
    text(counter8 + " " + document.getElementById("myText8").value, posx, posy);
  }


    //print(test);

    noStroke();

    //textSize();
    text("Current class: " + currentClass, 20, 30, 1000);
    text("Number of samples: " + nSamples, window.innerWidth-390, 30, 1000);

    if (predictionAlpha > 0) predictionAlpha-=5;


}

function mousePressed() { getAudioContext().resume() }

function labelStuff() {
  fill(255);
  //textSize(18);
  text('~'+selectedBin.freq + 'Hz (bin #' + selectedBin.index+')', mouseX, mouseY );
  text('Energy: ' + selectedBin.value, mouseX, mouseY + 20);

  /*if (soundFile.isPlaying()) {
    text('Current Time: ' + soundFile.currentTime().toFixed(3), width/2, 20);
  }*/



}
// function makeDragAndDrop(canvas, callback) {
//   var domEl = cnv;
//   domEl.drop(callback);
// }

function gotFile(file) {
  if (currentClass == 0){
  soundA.dispose();
  soundA = loadSound(file)

}
if (currentClass == 1){
soundB.dispose();
soundB = loadSound(file)
}
if (currentClass == 2){
soundC.dispose();
soundC = loadSound(file)
}
}

function setupButtons() {



   class1 = select('#class1');
  class1.mousePressed(function() {
    //machine.save();
	currentClass = 1;

  });
  class2 = select('#class2');
  class2.mousePressed(function() {
    //machine.save();
	currentClass = 2;
  });
  class3 = select('#class3');
  class3.mousePressed(function() {
    //machine.save();
	currentClass = 3;
  });
  class4 = select('#class4');
  class4.mousePressed(function() {
    //machine.save();
	currentClass = 4;
  });
  class5 = select('#class5');
  class5.mousePressed(function() {
    //machine.save();
	currentClass = 5;
  });
  class6 = select('#class6');
  class6.mousePressed(function() {
    //machine.save();
	currentClass = 6;
  });
  class7 = select('#class7');
  class7.mousePressed(function() {
    //machine.save();
	currentClass = 7;
  });
  class8 = select('#class8');
  class8.mousePressed(function() {
    //machine.save();
	currentClass = 8;
  });
  record = select('#record');
  record.mousePressed(function() {
    //machine.save();
	recording = true;
  });
  stopRecording = select('#stoprecording');
  stopRecording.mousePressed(function() {
    //machine.save();
	recording = false;
  });
}

function playSound(){
if (soundA.isPlaying() || soundB.isPlaying() || soundC.isPlaying()){
ps = true;
//print("play");
}
else {
  ps = false;
  //print("stop");
}

/*if (soundA.isPlaying()){
  test = 0;
}
if (soundB.isPlaying()){
  test = 1;
}
if (soundC.isPlaying()){
  test = 2;
}*/

if (test == 0 && lastTest !== 0 && ps == false){

}
else if (test == 1 && lastTest !== 1 && ps == false){
counter1++;
}
else if (test == 2 && lastTest !== 2 && ps == false){
counter2++;
}
  else if (test == 3 && lastTest !== 3 && ps == false){
counter3++;
}
  else if (test == 4 && lastTest !== 4 && ps == false){
counter4++;
}
  else if (test == 5 && lastTest !== 5 && ps == false){
counter5++;
}
  else if (test == 6 && lastTest !== 6 && ps == false){
counter6++;
}
  else if (test == 7 && lastTest !== 7 && ps == false){
counter7++;
}
  else if (test == 8 && lastTest !== 8 && ps == false){
counter8++;
}

lastTest = test;
}

function soundDataCallback(soundData) {
    console.log('soundData');
    soundReady = true;
    mfcc = soundData.mfcc;
    // console.log(mfcc);
    loudness= soundData.loudness.total;

    var peaked = false;

    for (var i = 0; i < 13; i++) {
        normalized[i] = map(mfcc[i],-10,30,0,1);
    }
}


function keyPressed() {
    if (key == '0') {
        currentClass = 0;
    } else if (key == '1') {
        currentClass = 1;
    } else if (key == '2') {
        currentClass = 2;
    } else if (key == '3') {
        currentClass = 3;
    } else if (key == '4') {
        currentClass = 4;
    } else if (key == '5') {
        currentClass = 5;
    } else if (key == '6') {
        currentClass = 6;
    } else if (key == '7') {
        currentClass = 7;
    } else if (key == '8') {
        currentClass = 8;
    } else if (key == '9') {
        currentClass = 9;
    }


}

;(function($) {
    $.fn.toJSON = function() {
        var $elements = {};
        var $form = $(this);
        $form.find('input, select, textarea').each(function(){
          var name = $(this).attr('name')
          var type = $(this).attr('type')
          if(name){
            var $value;

              $value = $(this).val()

            $elements[$(this).attr('name')] = $value
          }
        });
        return JSON.stringify( $elements )
    };
    $.fn.fromJSON = function(json_string) {
        var $form = $(this)
        var data = JSON.parse(json_string)
        $.each(data, function(key, value) {
          var $elem = $('[name="'+key+'"]', $form)
          var type = $elem.first().attr('type')

            $elem.val(value)

        })
    };
}( jQuery ));

$(document).ready(function(){
   $("#_save").on('click', function(){
     console.log("Saving form data...")
     var data = $("form#myForm").toJSON()
     console.log(data);
     localStorage['form_data'] = data;

     return false;
   })

   $("#_load").on('click', function(){
     if(localStorage['form_data']){
       console.log("Loading form data...")
       console.log(JSON.parse(localStorage['form_data']))
       $("form#myForm").fromJSON(localStorage['form_data'])
     } else {
       console.log("Error: Save some data first")
     }

     return false;
   })
});
