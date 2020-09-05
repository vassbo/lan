var dataUpdateRate = 60; // data from GitHub
var infoUpdateRate = 4; // info switch rate
var updateRate = 0.5; // analog clock, digital clock, program // debug: 0.05 // 0.5
var programCount = 5;

var debug = false;

var dato, program, info, tidssone;

var firstUpdate = true;
getData("data.json");
function getData(request) {
  var oXHR = new XMLHttpRequest();

  // initiate request
  oXHR.onreadystatechange = reportStatus;
  oXHR.open("GET", request, true);  // get json file.
  oXHR.send();

  function reportStatus() {
    if (oXHR.readyState == 4) { // check if request is complete.
      if (this.responseText !== '404: Not Found') {
        let data = JSON.parse(this.responseText);
        // console.log(this.responseText);
        // console.log(data);
        
        dato = data.dato;
        tidssone = data.tidssone;
        program = data.program;
        info = data.info;
        firstUpdate = false;
      }
    }
  }
}


/////////////////////////////////////////
/////////////////////////////////////////


// update data
setInterval(() => {
  // getData("data.json");
  getData("https://raw.githubusercontent.com/vassbo/lan/master/data.json");
}, dataUpdateRate * 1000);


// info
var infoPos = 0;
setInterval(infoUpdate, infoUpdateRate * 1000);
infoUpdate();
function infoUpdate() {
  if (!firstUpdate) {
    if (info[infoPos] === undefined) infoPos = 0;
    while (info[infoPos].slice(0, 3) == '---') {
      infoPos++;
      if (infoPos >= info.length) infoPos = 0;
    }
    document.querySelector('.info').innerHTML = '<div>' + info[infoPos] + '</div>'; // <span class="material-icons-outlined">info</span>
    infoPos++;
    if (infoPos >= info.length) infoPos = 0;
  }
}


// debug
var debugDate = new Date() / 1;
if (debug) {
  setInterval(() => {
    debugDate += 60000;
  }, updateRate * 1000);
}


// update program
function updateProgram() {
  var now = new Date();
  if (debug) now = new Date(debugDate);
  
  // var html = '<h1><i class="material-icons-outlined" style="font-size:40px;padding-right:8px;">event_note</i>Program:</h1>';
  var html = '';
  var count = 0;
  
  for (var i = 0; i < program.length; i++) {
    var time = 'time';
    if (exists(program[i].delayed.from)) time = 'delayed';

    if (program[i].date == 'dato') program[i].date = dato;
    var dateTime = new Date(program[i].date + 'T' + program[i][time].to + ':00' + tidssone);

    if (dateTime > now && count < programCount) {
      count++;
      var active = '';
      
      if (new Date(program[i].date + 'T' + program[i][time].from + ':00' + tidssone) < now) active = 'active';

      var showTime = '>' + program[i][time].from;
      if (time == 'delayed') showTime = ' style="color:var(--delayed)"' + showTime;

      var description = program[i].description;
      if (exists(program[i].position)) description = '<span style="vertical-align:middle;">' + description + '</span><br><i class="material-icons-outlined" style="vertical-align:middle;padding-right:4px;">location_on</i>' + program[i].position;

      var name = program[i].name;
      if (exists(program[i].icon)) name = '<i class="material-icons-outlined" style="padding-right:8px;">' + program[i].icon + '</i>' + name;

      html += '<div class="section ' + active + '">' +
        '<div class="time"' + showTime + '</div>' +
        '<div class="color" style="background:var(--' + program[i].color + ');"></div>' +
        '<div class="flexColumn">' +
          '<div class="name">' + name + '</div>' +
          '<div class="description">' + description + '</div>' +
        '</div>' +
      '</div>';
    }
  }
  
  document.querySelector('.program').innerHTML = html;
}

function exists(object) {
  var notExisting = false;
  if (object !== '' && object !== undefined) notExisting = true;
  return notExisting;
}


// update digital clock
function updateDigital() {
  var today = new Date();
  if (debug) today = new Date(debugDate);
  var h = ('0' + today.getHours()).substr(-2);
  var m = ('0' + today.getMinutes()).substr(-2);
  document.getElementById('digital').innerHTML = h + ":" + m;
}


///////// CLOCK /////////
// src: https://www.youtube.com/watch?v=94TKO4eKfIA
var deg = 6;
var hr = document.querySelector('#hr');
var mn = document.querySelector('#mn');
// var ss = document.querySelector('#ss');
function drawClock() {
  var day = new Date();
  if (debug) day = new Date(debugDate);
  var hh = day.getHours() * 30;
  var mm = day.getMinutes() * deg;
  // hh = 8 * 30;
  // mm = 0 * deg;
  // var s = day.getSeconds() * deg;
  hr.style.transform = 'rotate(' + (hh + (mm / 12)) + 'deg)';
  mn.style.transform = 'rotate(' + mm + 'deg)';
  // ss.style.transform = 'rotate(' + s + 'deg)';
}


// fade in & out logo
var logo = 0;
function logoFade() {
  logo++;
  if (logo > 600) { // every 10 min
    let opacity = 0.3;
    if (logo > 630) { // 20 sec fade in -> 10 sec on -> 20 sec fade out
      opacity = 0;
      logo = 0;
    }
    document.querySelector('.logo').style.filter = 'opacity(' + opacity + ')';
  }
}


update();
setInterval(update, updateRate * 1000);
function update() {
  drawClock();
  updateDigital();
  if (!firstUpdate) updateProgram();
  logoFade();
}