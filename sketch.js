//Basic KNN classification of MFFCs
var k = 3; //k can be any integer
var machine = new kNear(k);

var currentClass;
var lastClass;
var nSamples = 0;

var audio;
var normalized = [];

var mfcc;
var loudness = 0;
var loudnessThreshold = 6;
var ambiantNoise = 4;

var soundReady = false;
var pressed = false;
var counter1 = 0;
var counter2 = 0;
var counter3 = 0;
var counter4 = 0;
var counter5 = 0;
var counter6 = 0;
var counter7 = 0;
var counter8 = 0;
var counter9 = 0;
var counter10 = 0;
var counter11 = 0;
var counter12 = 0;
var counter13 = 0;
var counter14 = 0;
var counter15 = 0;

var counter = 0;
var count  = [0,counter1,counter2,counter3,counter4,counter5,counter6,counter7,counter8,counter9,counter10,counter11,counter12,counter13,counter14,counter15];
var et  = [0,counter1,counter2,counter3,counter4,counter5,counter6,counter7,counter8,counter9,counter10,counter11,counter12,counter13,counter14,counter15];

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


function tweet(tweetText){
  //https://twitter-proxy.glitch.me/tweet?t=hello_there
  var url = new URL("https://twitter-proxy.glitch.me/tweet");
  var params = {t:tweetText};

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  fetch(url).then(function(err){
    console.log("fetch sent");
  });

}


function setup() {

document.getElementById('record').style.display = 'none';
document.getElementById('defaultCanvas0').style.display = 'none';

    cnv = createCanvas(window.innerWidth,200);

    startTime = millis();
// exports.OAuth = require("./lib/oauth").OAuth;
    // define(function (require) {
    // var OAuth = require(['oauth/lib/oauth.js']);
    // // });
    //
    // // var OAuth = require(['oauth/lib/oauth.js']);
    // // var OAuth = require(['oauth.js']);
    //
    // var twitter_application_consumer_key = 'DiAk0zD6fW3liW016Cj91e3AA';  // API Key
    // var twitter_application_secret = 'Rfqec7EjpOnRtLnpSYxeIEU4yIxepre8lT0gxzMGh0gxyi3hyY';  // API Secret
    // var twitter_user_access_token = '907540247973638144-cOBuIcinfB1cCP4qIRfZoBpPI4tBphp ';  // Access Token
    // var twitter_user_secret = 'rfJxV41Vf84TxI0cDRTUHs9B05Wf4Ttsg1Yz59LROGt0t ';  // Access Token Secret
    //
    //
    // var oauth = new OAuth(
    //   'https://api.twitter.com/oauth/request_token',
    //   'https://api.twitter.com/oauth/access_token',
    //   twitter_application_consumer_key,
    //   twitter_application_secret,
    //   '1.0A',
    //   null,
    //   'HMAC-SHA1'
    // );
    //
    // var status = '';  // This is the tweet (ie status)
    //
    // var postBody = {
    //   'status': status
    // };



}


function draw() {
  // console.log(counter);
  //
  // var c = document.getElementById("cnv");
  // var ctx = c.getContext("2d");

if (counter == 0 ){

  document.getElementById('removeButton').style.display = 'none';
}


// URL("localhost:8000", "localhost:8000");

    background(255);
    textSize(36);
drawButtons();
// if (currentClass>0){
//
// for (var i = 1; i< counter; i++){
//   document.getElementById('class0').className = 'ambiant'
// document.getElementById('class'+i).className = 'button'
// //document.getElementById('myText'+i).className = 'text1'
// }
//   //if (currentClass !== lastClass){
//   document.getElementById('class'+currentClass).className = 'button2'
// //  document.getElementById('myText'+currentClass).className = 'text2'
//
// }

// if (currentClass==0){
//
// for (var i = 1; i< counter; i++){
//   document.getElementById('class0').className = 'ambiant'
// document.getElementById('class'+i).className = 'button'
// //document.getElementById('myText'+i).className = 'text1'
// }
//   //if (currentClass !== lastClass){
//     document.getElementById('class0').className = 'ambiant2'
// //  document.getElementById('myText'+currentClass).className = 'text2'
//
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
        text("LOUDNESS " , window.innerWidth-275, 150);
        text("MFCCs", 20,  150);

        if (loudness > loudnessThreshold) {
            // fill(0,255,0);
        } else {
            fill(122);
        }

        if (singleTrigger == false) {
            fill (255,0,0);
        }



        stroke(0);
        ellipse(window.innerWidth-50, 138, loudness*2, loudness*2);

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
if (loudness < ambiantNoise){
    test = 0;
  }
    noStroke();
    fill(0);
    textSize(36);

  	// text("Prediction: " + test, window.innerWidth-240, 90);

    var posx = 20;
    var posy = 90;

////////////////////////////////////////////////////////////////////////////////

 // if (currentClass !== 0){

//text(count[currentClass-1] + " " + document.getElementById("myText"+ currentClass).value, posx, posy);
for (var i = 1; i<= counter; i++){
document.getElementById("p"+i).innerHTML = count[i-1] + " /";
}
for (var i = 1; i <= counter; i++){
  if(count[i-1] == document.getElementById("myEmail"+i).value){
    //console.log(document.getElementById("myEmail1").value);
    if (count[i-1] !== 0){


          // alert(count[i-1] + " " + document.getElementById("myText"+ i).value + " comptailisé");
    if (et[counter] == 0){
      console.log(document.getElementById("tweet"+i).value)
      tweet(document.getElementById("tweet"+i).value);
    }
    else if (et[counter] == 1){

      console.log("to:"+ document.getElementById('destinataire'+i).value + ", objet:" + document.getElementById('myEmail'+i).value + " " + document.getElementById('myText'+i).value + ", message:" + document.getElementById('message'+i).value)

      Email.send({
          Host : "smtp.gmail.com",
          Username : "smtp0593@gmail.com",
          Password : "q1w2e3r4t5z6",
          To : document.getElementById('destinataire'+i).value,
          From : "smtp0593@gmail.com",
          Subject : document.getElementById('myEmail'+i).value + " " + document.getElementById('myText'+i).value,
          Body : document.getElementById('message'+i).value
      }).then(
        //message => alert(message)
      );

    }

    // var element = document.getElementById('div'+counter);
    //     element.parentNode.removeChild(element);


  }
    //console.log(count[i-1] + " " + document.getElementById("myText"+ currentClass).value);
    count[i-1] = 0;

  }
}
// }

    noStroke();

    //textSize();
    //text("Current class: " + currentClass, 20, 30, 1000);
    var a;

    if (nSamples < 10){
      a = 390;
    }
    else if (nSamples >=10 && nSamples < 100 ){
      a = 410;
    }
    else if  ( nSamples >= 100 && nSamples < 1000 ){
      a = 430;
    }
    else if  ( nSamples >= 1000 ){
      a = 450;
    }
    //text("Number of samples: " + nSamples, window.innerWidth-a, 30, 1000);

    if (predictionAlpha > 0) predictionAlpha-=5;




}
function labelStuff() {
  fill(255);
  //textSize(18);
  text('~'+selectedBin.freq + 'Hz (bin #' + selectedBin.index+')', mouseX, mouseY );
  text('Energy: ' + selectedBin.value, mouseX, mouseY + 20);



}

function drawButtons(){

  class0 = select('#class0');
  class0.mousePressed(function(e) {
   //machine.save();
  currentClass = 0;
  document.getElementById('class0').style.display = 'none';
  document.getElementById('_save').style.display = 'none';
  document.getElementById('_load').style.display = 'none';
  document.getElementById('addButton').style.display = 'none';
  document.getElementById('record').style.display = 'inline-block';
  document.getElementById('TextBoxesGroup').style.display = 'none'
  document.getElementById('removeButton').style.display = 'none';
  // for (var i=1; i <= counter; i++){
  //
  //       document.getElementById('div'+i).style.display = 'none';
  //
  //     }
  yourFunction();


  // document.getElementById('class1').className = 'button2'
  // document.getElementById('class2').className = 'button'
  // document.getElementById('class3').className = 'button'
  // document.getElementById('class4').className = 'button'
  //e.preventDefault();
  });


  for (var i = 1; i <= counter; i++){

    select('#class'+i).mousePressed(function() {

         // currentClass = i-1;

         // console.log(currentClass);
         // // console.log(i);
         // console.log(counter);


         // document.getElementById('addButton').style.display = 'none';
         // document.getElementById('class0').style.display = 'none';
         // document.getElementById('record').style.display = 'inline-block';
         // document.getElementById('TextBoxesGroup').style.display = 'none';
         // document.getElementById('removeButton').style.display = 'none';

for (var j = 1; j <= counter; j++){
// console.log(j);
           document.getElementById('div'+j).style.display = 'none';
           document.getElementById('q'+j).style.display = 'none';
           document.getElementById('qb'+j).style.display = 'none';
           document.getElementById('qc'+j).style.display = 'none';
           document.getElementById('qd'+j).style.display = 'none';
           document.getElementById('qe'+j).style.display = 'none';
           document.getElementById('submit'+j).style.display = 'none';
           document.getElementById('submitb'+j).style.display = 'none';
           document.getElementById('submitTweet'+j).style.display = 'none';
           document.getElementById('submitEmail'+j).style.display = 'none';
           document.getElementById('tweetButton'+j).style.display = 'none';
           document.getElementById('mailButton'+j).style.display = 'none';
           document.getElementById('tweet'+j).style.display = 'none';
           document.getElementById('message'+j).style.display = 'none';
           document.getElementById('destinataire'+j).style.display = 'none';
           document.getElementById('class'+j).style.display = 'none';

           document.getElementById('p'+j).style.display = 'none';
           // document.getElementById('class'+j).style.display = 'none';
           //document.getElementById('textb'+j).style.display = 'none';
           // document.getElementById('texta'+j).style.display = 'none';
           document.getElementById('div'+j).style.borderWidth = '0px';
           // document.getElementById('div'+j).style.backgroundColor = "white";
            document.getElementById('TextBoxDiv'+j).style.display = 'none';
            document.getElementById('submitb'+j).style.display = 'none';
            document.getElementById('submitTweet'+j).style.display = 'none';
            document.getElementById('submitEmail'+j).style.display = 'none';
            document.getElementById('tweetButton'+j).style.display = 'none';
            document.getElementById('mailButton'+j).style.display = 'none';
            document.getElementById('texta'+j).style.display = 'none';
            document.getElementById('textb'+j).style.display = 'none';
            // document.getElementById('div'+i).style.backgroundColor = "red";


}
        document.getElementById('TextBoxDiv'+currentClass).style.display = 'inline-block';
        document.getElementById('TextBoxDiv'+currentClass).style.width = '100%';
        document.getElementById('TextBoxDiv'+currentClass).style.margin = '0%';

          document.getElementById('myText'+currentClass).style.display = 'inline-block';

         document.getElementById('div'+currentClass).style.background = "none ";


         // document.getElementById('TextBoxesGroup').style.display = 'inline-block';

         document.getElementById('q'+currentClass).style.display = 'inline-block';
         document.getElementById('q'+currentClass).style.textAlign = "left";
         document.getElementById('div'+currentClass).style.display = 'inline-block';
         document.getElementById('submit'+currentClass).style.display = 'inline-block';
         document.getElementById('div'+currentClass).style.borderWidth = '0px';
         document.getElementById('defaultCanvas0').style.display = 'none';
         // document.getElementById('div'+currentClass).style.backgroundColor = "white";
          //document.getElementById('TextBoxDiv'+currentClass).style.display = 'none';
       document.getElementById('class'+currentClass).style.display = 'none';

         document.getElementById('qb'+currentClass).style.display = 'none';
         document.getElementById('qc'+currentClass).style.display = 'none';
         document.getElementById('qd'+currentClass).style.display = 'none';
         document.getElementById('qe'+currentClass).style.display = 'none';
         document.getElementById('myEmail'+currentClass).style.display = 'none';

           document.getElementById('tweet'+currentClass).style.display = 'none';
           document.getElementById('message'+currentClass).style.display = 'none';
           document.getElementById('destinataire'+currentClass).style.display = 'none';
           document.getElementById('p'+currentClass).style.display = 'none';
           // document.getElementById('class'+counter).style.display = 'none';
           document.getElementById('record').style.display = 'none';
           //document.getElementById('textb'+counter).style.display = 'none';
           // document.getElementById('texta'+counter).style.display = 'none';
       document.getElementById('addButton').style.display = 'none';
       document.getElementById('class0').style.display = 'none';
       document.getElementById('_save').style.display = 'none';
       document.getElementById('_load').style.display = 'none';
       document.getElementById('removeButton').style.display = 'none';
       // console.log(counter);



       });
     }

//   for (var i = 1; i< counter; i++){
//   select('#class'+ i).mousePressed(function(){
//      currentClass = i;
//      console.log(currentClass);
//   });
//
// }
// for (var i = 1; i<= counter-1; i++){
// select('#class'+ i).mousePressed(function(){
// currentClass = i;
//
//
// });
//
// }
if (counter == 1){
class1 = select('#class1');
class1.mousePressed(function(e) {
 //machine.save();
currentClass = 1;
e.preventDefault();
});
}
if (counter == 2){
     class2 = select('#class2');
    class2.mousePressed(function(e) {
      //machine.save();
  	currentClass = 2;
e.preventDefault();
    });
  }
    if (counter == 3){
    class3 = select('#class3');
    class3.mousePressed(function(e) {
  	currentClass = 3;
    e.preventDefault();
    });
  }
    if (counter == 4){
    class4 = select('#class4');
    class4.mousePressed(function() {
  	currentClass = 4;
    });
  }
    if (counter == 5){
    class5 = select('#class5');
    class5.mousePressed(function() {
  	currentClass = 5;
    });
  }
    if (counter == 6){
    class6 = select('#class6');
    class6.mousePressed(function() {
  	currentClass = 6;
    });
  }
    if (counter == 7){
    class7 = select('#class6');
    class7.mousePressed(function() {
  	currentClass = 7;
    });
  }
    if (counter == 8){
    class8 = select('#class8');
    class8.mousePressed(function() {
  	currentClass = 8;
    });
  }
    if (counter == 9){
    class9 = select('#class9');
    class9.mousePressed(function() {
  	currentClass = 9;
    });
  }
    if (counter == 10){
    class10 = select('#class10');
    class10.mousePressed(function() {
  	currentClass = 10;
    });
  }
  if (counter == 11){
  class11 = select('#class11');
  class11.mousePressed(function() {
  currentClass = 11;
  });
}
if (counter == 12){
class12 = select('#class12');
class12.mousePressed(function() {
currentClass = 12;
});
}
if (counter == 13){
class13 = select('#class13');
class13.mousePressed(function() {
currentClass = 13;
});
}
if (counter == 14){
class14 = select('#class14');
class14.mousePressed(function() {
currentClass = 14;
});
}
if (counter == 15){
class15 = select('#class15');
class15.mousePressed(function() {
currentClass = 15;
});
}

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
     console.log(counter);
     // var data = $("form#myForm").toJSON()
     var audioData = JSON.stringify(machine.training);
     var counterData = JSON.stringify(counter);

     // console.log(audioData);
     // localStorage.setItem('form_data', data);
     localStorage.setItem('audio_data', audioData);
     localStorage.setItem('counter_data', counterData);

     return false;
   })

   $("#_load").on('click', function(){
     if(localStorage['audio_data']){
       console.log("Loading form data...");
       //console.log(JSON.parse(localStorage['form_data']))
       let model = JSON.parse(localStorage.getItem('audio_data'));
       machine.training = model;
       console.log('length',model.length,machine.training);
       counter = JSON.parse(localStorage.getItem('counter_data'));

      nSamples = model.length;
       //console.log(JSON.parse(localStorage['audio-data']))
       // let form = localStorage.getItem('form_data');
       // $("form#myForm").fromJSON(form);

     } else {
       console.log("Error: Save some data first")
     }


     return false;
   })
});
$(document).ready(function(){


//

//
  // $("#liste").click(function () {
  //
  //   for (var i=1; i <= counter; i++){
  //     document.getElementById('div'+i).style.display = 'inline-block';
  //     document.getElementById("q"+i).style.display = 'none';
  //     document.getElementById("qb"+i).style.display = 'none';
  //     document.getElementById("submit"+i).style.display = 'none';
  //       document.getElementById('submitb'+i).style.display = 'none';
  //       document.getElementById('record').style.display = 'inline-block';
  //
  //   }
  // })

  // --------------------------------------- ajouter

    $("#addButton").click(function () {


      counter++;
currentClass = counter;

console.log("add:"+currentClass)


	if(counter>15){
            alert("Only 15 textboxes allow");
            return false;
	}



	var newTextBoxDiv = $(document.createElement('div'))
	     .attr("id", 'TextBoxDiv' + counter);

    //  <input class = text1 type="text" name="textfield8" id="myText8" value="Verre(s)">
	newTextBoxDiv.after().html(
    // '<label>Textbox #'+ counter + ' : </label>' +
    // '<br>'+
    '<br>'+
    '<br>'+
        '<div class="div" id = "div' + counter + '">' +
	      '<div class="q" id = "q' + counter +
        '">Que voulez-vous compter ?</div>'+
        '<input class = text1 type="text" name="textfield' + counter
        + '" id="myText'+ counter +'" value="">'+

        '<input class="textList" id ="texta'+ counter +
        '"value ="" disabled></input>'+

        '<div id="p'+ counter
        +'" class = p>0 /</div>'+

        '<input class="textListb" id ="textb'+ counter +
        '"value ="" disabled></input>'+

         '<button class="submit" onclick="myFunction()" id="submit'+counter+
        '">Valider</button>'+
        // '<br><br><br><br>'+
        '<button id="class' + counter
         + '" class="button">Editer</button>'  +
          '<div class="q" id = "qb'+counter+
         '">Après combien de fois voulez déclencher une action ?</div> <input class = email type="text" name="email'
         + counter + '" id="myEmail' + counter + '" value="">'
         + '<button class="submit" onclick="yourFunction()" id="submitb'+counter+
         '">Valider</button>' +
//
         '<div class="q" id = "qc'+counter+
        '">Quelle action voulez-vous assigner à ce son ?</div>' +

        '<button class=" choice" onclick="tweetPage()" id="tweetButton'+counter+
        '">Tweet</button>' +
        '<button class="choice" onclick="emailPage()" id="mailButton'+counter+
        '">Email</button>' +

        '<div class="q" id = "qd'+counter+
       '">Tweet</div>'+

       // '<input class = "tweet" type="text" name="tweet'
       // + counter + '" id="tweet' + counter + '" value="">'

       '<textarea class = "tweet" name="tweet'
       + counter + '" id="tweet' + counter + '" cols="40" rows="3" ></textarea>'

       + '<button class="submit" onclick="postTweet()" id="submitTweet'+counter+
       '">Valider</button>' +

       '<div class="q" id = "qe'+counter+
      '">Email</div>'+

      '<input placeholder="A" class = destinataire type="text" name="destinataire'
      + counter + '" id="destinataire' + counter + '" value="">'

      // '<input class = message type="text" name="message'
      // + counter + '" id="message' + counter + '" value="">'+

      +'<textarea placeholder="message" class = "message" name="message'
      + counter + '" id="message' + counter + '" cols="40" rows="3"></textarea>'

      + '<button class="submit" onclick="sendEmail()" id="submitEmail'+counter+
      '">Valider</button>' +

         '</div>'

      );
// <button id="class1" class="button">1</button>


	newTextBoxDiv.appendTo("#TextBoxesGroup");

// --------------------------------------- premiere question -> que voulez vous compter ?

  for (var i=1; i < counter; i++){
    document.getElementById('div'+i).style.display = 'none';
    document.getElementById('q'+i).style.display = 'none';
    document.getElementById('qb'+i).style.display = 'none';
    document.getElementById('qc'+i).style.display = 'none';
    document.getElementById('qd'+i).style.display = 'none';
    document.getElementById('qe'+i).style.display = 'none';
    document.getElementById('submit'+i).style.display = 'none';
    document.getElementById('submitb'+i).style.display = 'none';
    document.getElementById('submitTweet'+i).style.display = 'none';
    document.getElementById('submitEmail'+i).style.display = 'none';
    document.getElementById('tweetButton'+i).style.display = 'none';
    document.getElementById('mailButton'+i).style.display = 'none';
    document.getElementById('tweet'+i).style.display = 'none';
    document.getElementById('message'+i).style.display = 'none';
    document.getElementById('destinataire'+i).style.display = 'none';
    document.getElementById('class'+i).style.display = 'none';

    document.getElementById('p'+i).style.display = 'none';
    document.getElementById('class'+i).style.display = 'none';
    document.getElementById('textb'+i).style.display = 'none';
    document.getElementById('texta'+i).style.display = 'none';
    document.getElementById('div'+i).style.borderWidth = '0px';
    // document.getElementById('div'+i).style.backgroundColor = "white";
     document.getElementById('TextBoxDiv'+i).style.display = 'none';


     // document.getElementById('div'+i).style.backgroundColor = "red";


  }

  document.getElementById('div'+counter).style.background = "none";
  document.getElementById('q'+counter).style.display = 'inline-block';
  document.getElementById('q'+counter).style.textAlign = "left";
  document.getElementById('div'+counter).style.display = 'inline-block';
  document.getElementById('submit'+counter).style.display = 'inline-block';
  document.getElementById('div'+counter).style.borderWidth = '0px';
  document.getElementById('defaultCanvas0').style.display = 'none';
  // document.getElementById('div'+counter).style.backgroundColor = "white";
   //document.getElementById('TextBoxDiv'+counter).style.display = 'none';
document.getElementById('class'+counter).style.display = 'none';

  document.getElementById('qb'+counter).style.display = 'none';
  document.getElementById('qc'+counter).style.display = 'none';
  document.getElementById('qd'+counter).style.display = 'none';
  document.getElementById('qe'+counter).style.display = 'none';
  document.getElementById('myEmail'+counter).style.display = 'none';
    document.getElementById('submitb'+i).style.display = 'none';
    document.getElementById('submitTweet'+i).style.display = 'none';
    document.getElementById('submitEmail'+i).style.display = 'none';
    document.getElementById('tweetButton'+i).style.display = 'none';
    document.getElementById('mailButton'+i).style.display = 'none';
    document.getElementById('tweet'+counter).style.display = 'none';
    document.getElementById('message'+counter).style.display = 'none';
    document.getElementById('destinataire'+counter).style.display = 'none';
    document.getElementById('p'+counter).style.display = 'none';
    // document.getElementById('class'+counter).style.display = 'none';
    document.getElementById('record').style.display = 'none';
    document.getElementById('textb'+counter).style.display = 'none';
    document.getElementById('texta'+counter).style.display = 'none';
document.getElementById('addButton').style.display = 'none';
document.getElementById('class0').style.display = 'none';
document.getElementById('_save').style.display = 'none';
document.getElementById('_load').style.display = 'none';
document.getElementById('removeButton').style.display = 'none';
// console.log(counter);
     });


     $("#removeButton").click(function () {
       document.getElementById('TextBoxesGroup').style.width = '100%'
	if(counter==0){
          alert("No more textbox to remove");
          return false;
       }



        $("#TextBoxDiv" + counter).remove();
        	counter--;
     });

     $("#getButtonValue").click(function () {

	var msg = '';
	for(i=1; i<counter; i++){
   	  msg += "\n Textbox #" + i + " : " + $('#textbox' + i).val();
	}
    	  alert(msg);
     });
  });
// --------------------------------------- question 2 -> après combien de fois declencher action
  function myFunction(){
    for (var i=1; i <= counter; i++){
      if (currentClass !== 0){

      document.getElementById('qb'+currentClass).style.display = 'inline-block';
      document.getElementById('myEmail'+currentClass).style.display = 'inline-block';

      document.getElementById('q'+currentClass).style.display = 'none';

      document.getElementById('submit'+currentClass).style.display = 'none';
      document.getElementById('myText'+currentClass).style.display = 'none';


      document.getElementById('submitb'+currentClass).style.display = 'inline-block';
      document.getElementById('submitb'+i).style.marginTop = '7%';
      document.getElementById('tweetButton'+i).style.display = 'none';
      document.getElementById('mailButton'+i).style.display = 'none';
}

    }


  }

// --------------------------------------- ouvrir page rec
// function yourFunction() {
// document.getElementById('record').style.display = 'inline-block';
// for(var i = 1; i <= counter; i++){
//
//       document.getElementById('qb'+i).style.display = 'none';
//       document.getElementById('qc'+i).style.display = 'none';
//       document.getElementById('submitb'+i).style.display = 'none';
//       document.getElementById('myEmail'+i).style.display = 'none';
//       document.getElementById('defaultCanvas0').style.display = 'none';
//       document.getElementById('defaultCanvas0').style.backgroundColor = "#ff7a00 ";
//     }
//
// }

function yourFunction() {
  for (var i=1; i <= counter; i++){
if (currentClass !== 0){
    document.getElementById('qc'+currentClass).style.display = 'inline-block';
    document.getElementById('tweetButton'+currentClass).style.display = 'inline-block';
    document.getElementById('mailButton'+currentClass).style.display = 'inline-block';

    document.getElementById('q'+currentClass).style.display = 'none';
    document.getElementById('qb'+currentClass).style.display = 'none';

    document.getElementById('submit'+currentClass).style.display = 'none';
    document.getElementById('myText'+currentClass).style.display = 'none';
    document.getElementById('myEmail'+currentClass).style.display = 'none';


    document.getElementById('submitb'+currentClass).style.display = 'none';
    // document.getElementById('tweetButton'+i).style.display = 'none';
    // document.getElementById('mailButton'+i).style.display = 'none';

}
  }

}
function tweetPage(){
  console.log("tweetPage");
 et[counter] = 0;
 document.getElementById('qc'+currentClass).style.display = 'none';
 document.getElementById('tweetButton'+currentClass).style.display = 'none';
 document.getElementById('mailButton'+currentClass).style.display = 'none';

 document.getElementById('div'+currentClass).style.display = 'inline-block';

 document.getElementById('qd'+currentClass).style.display = 'inline-block';
 document.getElementById('tweet'+currentClass).style.display = 'inline-block';
 document.getElementById('submitTweet'+currentClass).style.display = 'inline-block';
 document.getElementById('div'+currentClass).style.width = '100%';



}

function emailPage(){
  console.log("emailPage");
  et[counter] = 1;
  document.getElementById('qc'+currentClass).style.display = 'none';
  document.getElementById('tweetButton'+currentClass).style.display = 'none';
  document.getElementById('mailButton'+currentClass).style.display = 'none';

  document.getElementById('div'+currentClass).style.display = 'inline-block';

  document.getElementById('qe'+currentClass).style.display = 'inline-block';
  document.getElementById('message'+currentClass).style.display = 'inline-block';
  document.getElementById('destinataire'+currentClass).style.display = 'inline-block';
  document.getElementById('submitEmail'+currentClass).style.display = 'inline-block';
  document.getElementById('div'+currentClass).style.width = '100%';



}

function postTweet(){
  console.log("postTweet");
  document.getElementById('div'+currentClass).style.display = 'none';

  document.getElementById('qd'+currentClass).style.display = 'none';
  document.getElementById('tweet'+currentClass).style.display = 'none';
  document.getElementById('submitTweet'+currentClass).style.display = 'none';
  document.getElementById('record').style.display = 'inline-block';

}

function sendEmail(){
console.log("sendEmail");

document.getElementById('div'+currentClass).style.display = 'none';

document.getElementById('qe'+currentClass).style.display = 'none';
document.getElementById('message'+currentClass).style.display = 'none';
document.getElementById('destinataire'+currentClass).style.display = 'none';
document.getElementById('submitEmail'+currentClass).style.display = 'none';
document.getElementById('record').style.display = 'inline-block';
//
// Email.send({
//     Host : "smtp.gmail.com",
//     Username : "smtp0593@gmail.com",
//     Password : "q1w2e3r4t5z6",
//     To : document.getElementById('destinataire'+counter).value,
//     From : "smtp0593@gmail.com",
//     Subject : document.getElementById('myEmail'+counter).value + " " + document.getElementById('myText'+counter).value,
//     Body : document.getElementById('message'+counter).value
// }).then(
//   //message => alert(message)
// );

}

function recFunction(){



      //machine.save();

// --------------------------------------- begin to rec
      if (pressed == false ){
      document.getElementById('record').className = 'record2'
      pressed = true;
  	recording = true;
    audio = new MicrophoneInput(v);
console.log(currentClass);
    // document.getElementById('defaultCanvas0').style.display = 'inline-block';
    // document.getElementById('defaultCanvas0').style.backgroundColor = "#ff7a00 ";
  }
// --------------------------------------- stop rec -> retour à la page d'acceuil
  else if (pressed == true){
    // tweet("tweetTest3");
    document.getElementById('record').className = 'record'
  //machine.save();
  pressed = false;
  recording = false;

document.getElementById('TextBoxesGroup').style.display = 'inline-block';
document.getElementById('TextBoxesGroup').style.width = '100%';
  for (var i=1; i <= counter; i++){

        document.getElementById('div'+i).style.display = 'inline-block';
        document.getElementById("q"+i).style.display = 'none';
        document.getElementById("qb"+i).style.display = 'none';
        document.getElementById("qc"+i).style.display = 'none';
        document.getElementById("qd"+i).style.display = 'none';
        document.getElementById("submit"+i).style.display = 'none';
          document.getElementById('submitb'+i).style.display = 'none';
          // document.getElementById('myText'+i).style.display = 'inline-block';
          document.getElementById('myText'+i).style.display = 'none';
          // document.getElementById('myEmail'+i).style.clear = 'both';
          // document.getElementById('myEmail'+i).style.display = 'inline-block';
          // // document.getElementById('myEmail'+i).style.position= 'relative';
          //  document.getElementById('myEmail'+i).style.cssFloat= 'right';
          // // document.getElementById('myEmail'+i).style.right= '0%';
          // document.getElementById('myEmail'+i).style.marginRight= '0%';
          // document.getElementById('myEmail'+i).style.marginLeft= '0%';
          // document.getElementById('myEmail'+i).style.fontSize= '56px';
          // document.getElementById('myEmail'+i).style.transform = "translateX(20px)";
          // //
          // //
          // // document.getElementById('myEmail'+i).style.marginLeft= '0%';
          // document.getElementById('myEmail'+i).style.width= '20%';
          // document.getElementById('myEmail'+i).style.textAlign= 'right';
          document.getElementById('class'+i).style.display = 'inline-block';

          // document.getElementById('myText'+i).style.textAlign = 'left';
          // document.getElementById('myText'+i).style.marginRight = '4%';
          // document.getElementById('myText'+i).style.marginLeft = '4%';
          // document.getElementById('myText'+i).style.fontSize= '56px';
          // document.getElementById('myText'+i).style.fontWeight = 'bold';
          // document.getElementById('myText'+i).style.width = '92%';



          document.getElementById('texta'+i).value = document.getElementById('myText'+i).value;
          document.getElementById('texta'+i).style.display = 'inline-block';
          document.getElementById('textb'+i).value = document.getElementById('myEmail'+i).value;
          document.getElementById('textb'+i).style.display = 'inline-block';
          document.getElementById('p'+i).style.display = 'inline-block';
          // document.getElementById('class'+i).style.display = 'inline-block'


          document.getElementById('div'+i).style.borderWidth = '1px';
          // document.getElementById('div'+i).style.backgroundColor = "white";
          document.getElementById('TextBoxDiv'+i).style.display = 'inline-block';
          document.getElementById('TextBoxDiv'+i).style.width="80%";
          document.getElementById('TextBoxDiv'+i).style.margin="0% 10%";
          document.getElementById('defaultCanvas0').style.display = 'none';
          document.getElementById('tweetButton'+i).style.display = 'none';
          document.getElementById('mailButton'+i).style.display = 'none';


      }
      document.getElementById('class0').style.display = 'inline-block';
      document.getElementById('_save').style.display = 'inline-block';
      document.getElementById('_load').style.display = 'inline-block';
      document.getElementById('record').style.display = 'none';
      document.getElementById('addButton').style.display = 'inline-block';
      if (counter>0){
      document.getElementById('removeButton').style.display = 'inline-block';

}
  }
}
