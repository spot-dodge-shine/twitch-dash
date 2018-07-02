// localStorage.debug = '';

var gameboy = window.gameboy = new (window.Gameboy)();
var socket = io(window.location.origin)
var roomName = window.location.pathname

socket.on('connect', () => {
  socket.emit('join-room', roomName)
  socket.on('hello', () => {
    console.log('success!')
  })
  socket.on('load-file-server', files => {
    console.log(files)
    loadFileReact(files)
  })
  socket.on('input-from-chat', keyCode => {
    gameboy.joypad.keyDown(keyCode)
    setTimeout(() => gameboy.joypad.keyUp(keyCode), 10)
  })
})

// Render

var canvas = document.getElementById('frame');

var ctx = canvas.getContext('2d');
gameboy.gpu.on('frame', function (offcanvas) {
    ctx.drawImage(offcanvas, 0, 0);
});

// Buttons

function loadFileReact (files) {
  if (!files.length) return;

  var reader = new FileReader();
  reader.onloadend = function () {
      gameboy.loadCart(reader.result);
      gameboy.start();
  };
  console.log(files[0])
  reader.readAsArrayBuffer(files[0]);
}

function loadFile () {
    if (!this.files.length) return;

    var reader = new FileReader();
    reader.onloadend = function () {
        gameboy.loadCart(reader.result);
        gameboy.start();
    };
    console.log(this.files[0])
    reader.readAsArrayBuffer(this.files[0]);
}

function fullscreen () {
    (
        canvas.requestFullscreen ||
        canvas.mozRequestFullScreen ||
        canvas.webkitRequestFullscreen ||
        canvas.msRequestFullscreen
    )
    .call(canvas);
}

$('#input').change(loadFile);
$('#fullscreen').click(fullscreen);
$('#pause').click(function () { gameboy.pauseResume() });
$('#reset').click(function () { gameboy.reset() });
$('#rendering').click(function () { $('#frame').toggleClass('pixelated') });

// Joypad

$(document).keydown(function (e) {
  gameboy.joypad.keyDown(e.keyCode)
});
$(document).keyup(function (e) {
  gameboy.joypad.keyUp(e.keyCode)
});

