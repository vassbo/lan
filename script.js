// Mat = yellow ???
// Turnering = ...




var dato = '03-06'; // 05.03
var year = '2020';

var program = [
  {
    time: { from: '15:34', to: '15:45' },
    delayed: { from: '15:41', to: '15:48' },
    date: dato,
    name: 'Test',
    icon: '',
    description: 'Vi skal spille super smash bros, til høyre i lillesalen',
    position: '',
    color: 'purple'
  },
  {
    // time: { from: '21:00', to: '21:20' },
    time: { from: '20:00', to: '21:00' },
    delayed: { from: '', to: '' },
    date: dato,
    name: 'Kveldsmøte',
    icon: '', // menu_book
    description: 'Andakt og lovsang',
    position: 'Her',
    color: 'purple'
  },
  {
    // time: { from: '21:00', to: '21:20' },
    time: { from: '17:39', to: '17:49' },
    delayed: { from: '21:10', to: '21:20' }, // utsatt til / nytt klokkeslett
    date: dato,
    name: 'Mat',
    icon: 'fastfood',
    description: 'Taco',
    position: 'Nede i kjeller',
    color: 'blue'
  },
  {
    time: { from: '23:30', to: '23:59' },
    delayed: { from: '', to: '' },
    date: dato,
    name: 'Super Smash Bros Turnering',
    icon: 'emoji_events',
    description: 'Påmelding til Sondre Harestad',
    position: 'Liten sal',
    color: 'red'
  },
  {
    time: { from: '00:00', to: '00:20' },
    delayed: { from: '', to: '' },
    date: '03-07',
    name: 'Nattmat',
    icon: 'fastfood',
    description: 'Boller og saft',
    position: 'Nede i kjeller',
    color: 'blue'
  },
];




var info = [
  '<b>Minecraft Server:</b> <i>Kommer snart</i>',
  // '<b>Film oppe:</b> Inside Out',
  'Oppe er det film og avslapping',
  // 'Mistet ting er funnet! Snakk med Martin Berge',
  '<b>Toaletter</b> i gangen og nede',
  'Mulighet for <b>soving</b> nede i sjokoladefabrikken'
];

var html = '', infoPos = 0;
setInterval(infoUpdate, 4000);
infoUpdate();
function infoUpdate() {
  // for (var i = 0; i < info.length; i++) {
  //   html += '<div>' + info[i] + '</div>';
  // }
  document.querySelector('.info').innerHTML = '<div>' + info[infoPos] + '</div>';
  infoPos++;
  if (infoPos >= info.length) infoPos = 0;
}




update();
// setInterval(update, 100);
setInterval(update, 1000);
function update() {
  // drawClock();
  updateDigital();
  updateProgram();
}


function updateProgram() {
  var now = new Date();
  // var html = '<h1><i class="material-icons-outlined" style="font-size:40px;padding-right:8px;">event_note</i>Program:</h1>';
  var html = '';
  var count = 0;
  for (var i = 0; i < program.length; i++) {

    // new Date().toLocaleString("no-NO", {timeZone: 'Europe/Oslo'});

    var time = 'time';
    if (exists(program[i].delayed.from)) time = 'delayed';

    var dateTime = new Date(year + '-' + program[i].date + 'T' + program[i][time].to + ':00+01:00');
    // var dateTime = Date.parse(year + '-' + program[i].date + 'T' + program[i].time.to + ':00');

    if (dateTime > now && count < 5) {
      count++;
      var active = '';
      if (new Date(year + '-' + program[i].date + 'T' + program[i][time].from + ':00+01:00') < now) active = 'active';

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










/////////////// CLOCK ///////////////

// clock
// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");
// var radius = canvas.height / 2;
// ctx.translate(radius, radius);
// radius = radius * 0.90;
// setInterval(drawClock, 1000);

function drawClock2() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace2(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, 'red');
  // grad.addColorStop(0.5, 'black');
  // grad.addColorStop(1, 'white');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
}

function drawNumbers2(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime2(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand2(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}





// clock 2
var clock = document.getElementById("clock");
var radius = clock.offsetHeight / 2;
radius = radius * 0.90;


// drawNumbers();
function drawNumbers() { // ctx
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}


var th = document.getElementById('tickerH');
var tm = document.getElementById('tickerM');
var s = 0;
function drawClock() {
  console.log(s);
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();

  var top = clock.offsetHeight / 2;
  var left = clock.offsetHeight / 2;

  var thw = th.offsetWidth / 2;

  var hh = th.getBoundingClientRect().height;
  var hw = th.getBoundingClientRect().width;
  hw = hw / 2 - thw;
  hh = hh / 2 - thw;

  console.log(hh);


  top -= hh;

  // var s = today.getSeconds();
  s++;
  if (s >= 60) s = 0;

  var rot = 360 / 60 * s;


  if (rot > 270) left -= hw; // + pointer width / 2
  else if (rot > 180) left -= hw;
  else if (rot > 90) left += hw;
  else left += hw;


  if (rot > 90 && rot <= 270) top += hh; // hh + hh // - pointer height / 2
  else top -= hh;

  // if (rot > 180) left -= hw;
  // else left += hw;

  // if (rot <= 180) top += hh;
  // else top -= hh;

  th.style.transform = 'rotate(' + rot + 'deg)'; // translate(-50%, -50%)
  th.style.top = top + 'px';
  th.style.left = left + 'px';
}


function updateDigital() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  m = ('0' + m).substr(-2); // checkTime
  document.getElementById('digital').innerHTML = h + ":" + m;
}
