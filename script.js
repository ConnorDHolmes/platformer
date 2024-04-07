"use strict";
//max framerate
const targetFPS = 60;
const fpsInterval = 1000 / targetFPS;
const visChangeQueue = [];
let then = performance.now();

function allVisChanges() {
  while (visChangeQueue.length) {
    const change = visChangeQueue.shift();
    change[0].style.visibility = change[1] ? "visible" : "hidden";
  }
}

const occluder = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) =>
      visChangeQueue.push([entry.target, entry.isIntersecting])
    ),
  {
    root: cam.el,
    rootMargin: "32px",
  }
);

//set up the room
function build() {
  createRoomCollisionCells();

  //populate room with items
  items.forEach((item) => {
    item.el = document.createElement("g-itm");
    occluder.observe(item.el);

    //3d sides
    const sides = ["top", "right", "bottom", "left"];
    sides.forEach((side) => {
      const el = document.createElement("g-face");
      el.setAttribute(side, "");
      item.el.append(el);
    });

    setCellsOfStaticItem(item);
    addElStatic(item);
  });

  sizeEl(cam);
  sizeEl(rm);
  updateElDynamic(p);
}

function positionCamera() {
  if (p.x > cam.hW - cam.hPW && p.x < rm.w - cam.hW - cam.hPW) {
    cam.x = -p.x + cam.hW - cam.hPW;
  }
  if (p.y > cam.hH - cam.hPH && p.y < rm.h - cam.hH - cam.hPH) {
    cam.y = -p.y + cam.hH - cam.hPH;
  }
  easeCam();
  //update room relative to view box
  rm.el.style.transform = `translate3d(${rm.x}px, ${rm.y}px, 0) rotate3d(1, 0, 0, -5deg) `;
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
  resetStaticCollidables(p);

  //horizontal movement
  if (press.left === press.right) {
    !groupSolidCol(p, p.colItems, p.hSpd, 0) && decelH();
  } else if (press.left && p.hSpd > -p.mSpd) {
    p.hSpd -= p.accel;
  } else if (press.right && p.hSpd < p.mSpd) {
    p.hSpd += p.accel;
  }
  while (groupSolidCol(p, p.colItems, p.hSpd, 0)) {
    decelH();
  }
  p.x += p.hSpd;

  if (p.canJump && press.up && groupSolidCol(p, p.colItems, 0, 1)) {
    p.canJump = false;
    p.vSpd = -p.jumpHeight;
  }
  if (!groupSolidCol(p, p.colItems, 0, p.vSpd) && p.vSpd < p.jumpHeight) {
    p.vSpd += p.accel;
  }
  if (groupSolidCol(p, p.colItems, 0, 1) && !press.up) {
    p.canJump = true;
  }
  while (groupSolidCol(p, p.colItems, 0, p.vSpd)) {
    decelV();
  }
  p.y += p.vSpd;

  //update player element in DOM
  transEl(p);
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
  //anything that does not need to be throttled to 60fps
  allVisChanges();
  ///
  requestAnimationFrame(step);
}

//start the game
build();
step();
