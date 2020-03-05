var dato = '03-05'; // 05.03
var year = '2020';

var program = [
  {
    time: { from: '17:52', to: '18:10' },
    delayed: { from: '', to: '' },
    date: dato,
    name: 'Test',
    description: 'Programmer dette',
    color: 'purple'
  },
  {
    // time: { from: '21:00', to: '21:20' },
    time: { from: '17:39', to: '17:49' },
    delayed: { from: '21:10', to: '21:20' }, // utsatt til / nytt klokkeslett
    date: dato,
    name: 'Mat',
    description: 'Taco',
    color: 'yellow'
  },
  {
    time: { from: '23:30', to: '23:59' },
    delayed: { from: '', to: '' },
    date: dato,
    name: 'Turnering',
    description: 'Super Smash Bros',
    color: 'red'
  }
];




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
  var html = '';
  var count = 0;
  for (var i = 0; i < program.length; i++) {

    var time = 'time';
    if (program[i].delayed.from !== '' && program[i].delayed.from !== undefined) time = 'delayed';

    var dateTime = new Date(year + '-' + program[i].date + 'T' + program[i][time].to + ':00');
    // var dateTime = Date.parse(year + '-' + program[i].date + 'T' + program[i].time.to + ':00');

    if (dateTime > now && count < 5) {
      count++;
      var active = '';
      if (new Date(year + '-' + program[i].date + 'T' + program[i][time].from + ':00') < now) active = 'active';

      var showTime = '>' + program[i][time].from;
      if (time == 'delayed') showTime = ' style="color:var(--delayed)"' + showTime;

      html += '<div class="section ' + active + '">' +
        '<div class="color" style="background:var(--' + program[i].color + ');"></div>' +
        '<div class="time"' + showTime + '</div>' +
        '<div class="flexColumn">' +
          '<div class="name">' + program[i].name + '</div>' +
          '<div class="description">' + program[i].description + '</div>' +
        '</div>' +
      '</div>';
    }
  }
  document.querySelector('.program').innerHTML = html;
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
