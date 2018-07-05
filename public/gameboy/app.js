// localStorage.debug = '';

var gameboy = window.gameboy = new (window.Gameboy)();
var socket = io(window.location.origin)
var roomName = window.location.pathname

socket.on('connect', () => {
  socket.emit('join-room', roomName)

  socket.on('load-file-server', (filename, binaryString) => {
    const charArray = []

    for(let char of binaryString) {
      charArray.push(char.charCodeAt(0))
    }

    const gameFile = new File([
      new Blob([
        new Uint8Array(charArray)
      ], { type: 'application/octet-stream' })],
      filename)

    loadFileReact(gameFile)
  })

  socket.on('pause-resume-server', () => {
    gameboy.pauseResume()
  })

  socket.on('reset-server', () => {
    gameboy.reset()
  })

  socket.on('input-from-chat', keyCode => {
    gameboy.joypad.keyDown(keyCode)
    setTimeout(() => gameboy.joypad.keyUp(keyCode), 250)
  })
})

// Render

var canvas = document.getElementById('frame');

var ctx = canvas.getContext('2d');
gameboy.gpu.on('frame', function (offcanvas) {
    ctx.drawImage(offcanvas, 0, 0);
});

// Buttons

function loadFileReact (file) {
  if (!file) return;

  var reader = new FileReader();
  reader.onloadend = function () {
      gameboy.loadCart(reader.result);
      gameboy.start();
  };
  reader.readAsArrayBuffer(file);
}

function loadFile () {
    if (!this.files.length) return;

    var reader = new FileReader();
    reader.onloadend = function () {
        gameboy.loadCart(reader.result);
        gameboy.start();
    };
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

// $('#input').change(loadFile);
// $('#fullscreen').click(fullscreen);
// $('#pause').click(function () { gameboy.pauseResume() });
// $('#reset').click(function () { gameboy.reset() });
// $('#rendering').click(function () { $('#frame').toggleClass('pixelated') });

// // Joypad

// $(document).keydown(function (e) {
//   gameboy.joypad.keyDown(e.keyCode)
// });
// $(document).keyup(function (e) {
//   gameboy.joypad.keyUp(e.keyCode)
// });

