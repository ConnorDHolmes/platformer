//max framerate
const targetFPS = 60;
const fpsInterval = 1000 / targetFPS;
let then = performance.now();

//set up the room
function build() {
  //populate room with items
  items.forEach((item) => {
    item.el = document.createElement("g-item");
    addEl(item);
  });

  sizeEl(cam);
  sizeEl(rm);
  updateEl(p);
}

function positionCamera() {
  if (p.x > cam.hW - cam.hPW && p.x < rm.w - cam.hW - cam.hPW) {
    rm.x = -p.x + cam.hW - cam.hPW;
  }
  if (p.y > cam.hH - cam.hPH && p.y < rm.h - cam.hH - cam.hPH) {
    rm.y = -p.y + cam.hH - cam.hPH;
  }
  //update rooom relative to view box
  placeEl(rm);
}

function decelH() {
  if (p.hSpd > 0) {
    p.hSpd -= p.accel;
  } else if (p.hSpd < 0) {
    p.hSpd += p.accel;
  }
}

function decelV() {
  if (p.vSpd > 0) {
    p.vSpd -= p.accel;
  } else if (p.vSpd < 0) {
    p.vSpd += p.accel;
  }
}

//handle player movement and collisions
function movePlayer() {
  //horizontal movement
  if (press.left === press.right) {
    !groupCol(p, items, p.hSpd, 0) && decelH();
  } else if (press.left && p.hSpd > -p.mSpd) {
    p.hSpd -= p.accel;
  } else if (press.right && p.hSpd < p.mSpd) {
    p.hSpd += p.accel;
  }
  while (groupCol(p, items, p.hSpd, 0)) {
    decelH();
  }
  p.x += p.hSpd;

  //vertical movement
  if (press.up === press.down) {
    !groupCol(p, items, 0, p.vSpd) && decelV();
  } else if (press.up && p.vSpd > -p.mSpd) {
    p.vSpd -= p.accel;
  } else if (press.down && p.vSpd < p.mSpd) {
    p.vSpd += p.accel;
  }
  while (groupCol(p, items, 0, p.vSpd)) {
    decelV();
  }
  p.y += p.vSpd;

  //update p element in DOM
  placeEl(p);
}

//run the game at ~60fps
function step(timeStamp) {
  const diff = timeStamp - then;
  if (diff > fpsInterval) {
    then = timeStamp - (diff % fpsInterval);
    //all functions that should be run every frame while the game is not paused
    if (!paused) {
      movePlayer();
      positionCamera();
    }
  }
  requestAnimationFrame(step);
}

//start the game
build();
step();