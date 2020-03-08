// Mat = yellow ???
// Turnering = ...




var dato = '03-08'; // 05.03
var year = '2020';

var program = [
  {
    time: { from: '15:34', to: '15:45' },
    delayed: { from: '15:41', to: '15:48' }, // utsatt til / nytt klokkeslett
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
    time: { from: '21:00', to: '21:20' },
    // delayed: { from: '21:10', to: '21:30' },
    delayed: { from: '', to: '' },
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
    date: '03-09',
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



/////////////////////////////////////////
/////////////////////////////////////////



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





function updateProgram() {
  var now = new Date();
  // var html = '<h1><i class="material-icons-outlined" style="font-size:40px;padding-right:8px;">event_note</i>Program:</h1>';
  var html = '';
  var count = 0;
  for (var i = 0; i < program.length; i++) {

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





function updateDigital() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  m = ('0' + m).substr(-2); // checkTime
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
  var hh = day.getHours() * 30;
  var mm = day.getMinutes() * deg;
  // hh = 8 * 30;
  // mm = 0 * deg;
  // var s = day.getSeconds() * deg;
  hr.style.transform = 'rotate(' + (hh + (mm / 12)) + 'deg)';
  mn.style.transform = 'rotate(' + mm + 'deg)';
  // ss.style.transform = 'rotate(' + s + 'deg)';
}






update();
// setInterval(update, 100);
setInterval(update, 500);
function update() {
  drawClock();
  updateDigital();
  updateProgram();
}
