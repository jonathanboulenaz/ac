//Basic KNN classification of MFFCs
var k = 3; //k can be any integer
var machine = new kNear(k);

var currentClass = 0;
var lastClass;
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
var counter9 = 0;

var counter = 9;
var count  = [0,counter1,counter2,counter3,counter4,counter5,counter6,counter7,counter8,counter9];


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

    startTime = millis();
    setupButtons();

}


function draw() {

    background(255);
    textSize(36);
drawButtons();
if (currentClass>0){
for (var i = 1; i< counter; i++){
document.getElementById('class'+i).className = 'button'
document.getElementById('myText'+i).className = 'text1'
}
  //if (currentClass !== lastClass){
  document.getElementById('class'+currentClass).className = 'button2'
  document.getElementById('myText'+currentClass).className = 'text2'

}


// if (currentClass == 1){
//   document.getElementById('class1').className = 'button2'
//   document.getElementById('myText1').className = 'text2'
// }
// else{
//     document.getElementById('class1').className = 'button'
//     document.getElementById('myText1').className = 'text1'
// }

playSound();
//pr
int(machine);

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

 if (currentClass !== 0){

text(count[currentClass-1] + " " + document.getElementById("myText"+ currentClass).value, posx, posy);
 }

    noStroke();

    //textSize();
    //text("Current class: " + currentClass, 20, 30, 1000);
    text("Number of samples: " + nSamples, window.innerWidth-390, 30, 1000);

    if (predictionAlpha > 0) predictionAlpha-=5;


}
function labelStuff() {
  fill(255);
  //textSize(18);
  text('~'+selectedBin.freq + 'Hz (bin #' + selectedBin.index+')', mouseX, mouseY );
  text('Energy: ' + selectedBin.value, mouseX, mouseY + 20);



}

function drawButtons(){


// for (var i = 1; i<= counter-1; i++){
// select('#class'+ i).mousePressed(function(){
// currentClass = i;
//
//
// });
//
// }

     class1 = select('#class1');
    class1.mousePressed(function() {
      //machine.save();
  	currentClass = 1;
    // document.getElementById('class1').className = 'button2'
    // document.getElementById('class2').className = 'button'
    // document.getElementById('class3').className = 'button'
    // document.getElementById('class4').className = 'button'
    });
    class2 = select('#class2');
    class2.mousePressed(function() {
      // document.getElementById('class1').className = 'button'
      // document.getElementById('class2').className = 'button2'
      // document.getElementById('class3').className = 'button'
      //machine.save();
  	currentClass = 2;
    });
    class3 = select('#class3');
    class3.mousePressed(function() {
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
    if (counter == 10){
    class9 = select('#class9');
    class9.mousePressed(function() {
      //machine.save();
  	currentClass = 9;
    });
  }
  else if (counter == 11){
  class10 = select('#class10');
  class10.mousePressed(function() {
    //machine.save();
  currentClass = 10;
  });
}
}
function setupButtons() {

  record = select('#record');
  record.mousePressed(function() {
    //machine.save();
    document.getElementById('record').className = 'record2'
	recording = true;
  audio = new MicrophoneInput(v);
  });
  stopRecording = select('#stoprecording');
  stopRecording.mousePressed(function() {
      document.getElementById('record').className = 'record'
    //machine.save();
	recording = false;
  });
}

function playSound(){

if (test !== lastTest ){
count[test-1]++;
}

lastTest = test;
}

function soundDataCallback(soundData) {
    //console.log('soundData');
    soundReady = true;
    mfcc = soundData.mfcc;
    // console.log(mfcc);
    loudness= soundData.loudness.total;

    var peaked = false;

    for (var i = 0; i < 13; i++) {
        normalized[i] = map(mfcc[i],-10,30,0,1);
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
     console.log('training datas',machine.training);
     var data = $("form#myForm").toJSON()
     var audioData = JSON.stringify(machine.training);

     // console.log(audioData);
     localStorage.setItem('form_data', data);
     localStorage.setItem('audio_data', audioData);

     return false;
   })

   $("#_load").on('click', function(){
     if(localStorage['form_data']){
       console.log("Loading form data...");
       //console.log(JSON.parse(localStorage['form_data']))
       let model = JSON.parse(localStorage.getItem('audio_data'));
       machine.training = model;
       console.log('length',model.length,machine.training);

      nSamples = model.length;
       //console.log(JSON.parse(localStorage['audio-data']))
       let form = localStorage.getItem('form_data');
       $("form#myForm").fromJSON(form);

     } else {
       console.log("Error: Save some data first")
     }


     return false;
   })
});
$(document).ready(function(){



    $("#addButton").click(function () {

	if(counter>15){
            alert("Only 15 textboxes allow");
            return false;
	}

	var newTextBoxDiv = $(document.createElement('div'))
	     .attr("id", 'TextBoxDiv' + counter);
    //  <input class = text1 type="text" name="textfield8" id="myText8" value="Verre(s)">
	newTextBoxDiv.after().html(
    // '<label>Textbox #'+ counter + ' : </label>' +
	      '<input class = text1 type="text" name="textfield' + counter
        + '" id="myText'+ counter +'" value=""><button id="class' + counter + '" class="button">'+ counter + '</button>'
      );
// <button id="class1" class="button">1</button>


	newTextBoxDiv.appendTo("#TextBoxesGroup");


	counter++;
     });

     $("#removeButton").click(function () {
	if(counter==1){
          alert("No more textbox to remove");
          return false;
       }

	counter--;

        $("#TextBoxDiv" + counter).remove();

     });

     $("#getButtonValue").click(function () {

	var msg = '';
	for(i=1; i<counter; i++){
   	  msg += "\n Textbox #" + i + " : " + $('#textbox' + i).val();
	}
    	  alert(msg);
     });
  });
