"use strict";
//global paused state
let paused = false;

function createRoomCollisionCells() {
  const colCt = Math.ceil(rm.w / rm.cellSize);
  const rowCt = Math.ceil(rm.h / rm.cellSize);

  for (let i = 0; i <= colCt; i++) {
    const col = [];
    for (let i = 0; i <= rowCt; i++) col.push([]);
    rm.cells.push(col);
  }
}

function setCellsOfStaticItem(item) {
  const x1 = Math.floor(item.x / rm.cellSize);
  const y1 = Math.floor(item.y / rm.cellSize);
  const x2 = Math.floor((item.x + item.w) / rm.cellSize);
  const y2 = Math.floor((item.y + item.h) / rm.cellSize);

  for (let col = x2; col >= x1; col--)
    for (let row = y2; row >= y1; row--) rm.cells[col][row].push(item);
}

function resetStaticCollidables(item) {
  if (
    !item.prevCell ||
    item.cell[0] !== item.prevCell[0] ||
    item.cell[1] !== item.prevCell[1]
  ) {
    const x = item.cell[0];
    const y = item.cell[1];
    const newColItems = [];

    for (let col = x + 1; col >= x - 1; col--)
      for (let row = y + 1; row >= y - 1; row--)
        rm.cells[col]?.[row]?.forEach((colItem) => newColItems.push(colItem));

    item.colItems = [...new Set(newColItems)];
    item.prevCell = [x, y];
  }
}

//easing function for camera
function easeCam() {
  rm.x += (cam.x - rm.x) * cam.ease;
  rm.y += (cam.y - rm.y) * cam.ease;
}

//position a static DOM element at its coords
function posEl(item) {
  item.el.style.inset = `${item.y}px ${rm.w - item.x - item.w}px ${
    rm.h - item.y - item.h
  }px ${item.x}px`;
}

//translate a dynamic item's DOM element to its coords (for dynamic items)
function transEl(item) {
  item.el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
}

//size an item's DOM element to its dimensions (for dynamic items)
function sizeEl(item) {
  item.el.style.width = `${item.w}px`;
  item.el.style.height = `${item.h}px`;
}

//apply modifier classes to an item's DOM element
function styleEl(item) {
  Object.entries(item.mods || {}).forEach(([key, value]) =>
    item.el.setAttribute(`${key}`, `${value}`)
  );
}

//size and translate and item's DOM element to its coordinates and dimensions, and apply modifier classes
function updateElStatic(item) {
  posEl(item);
  styleEl(item);
}

function updateElDynamic(item) {
  sizeEl(item);
  transEl(item);
  styleEl(item);
}

//update item's DOM element to match its traits and then add the element to room
function addElStatic(item) {
  updateElStatic(item);
  rm.el.append(item.el);
}

function addElDynamic(item) {
  updateElDynamic(item);
  rm.el.append(item.el);
}

//check collisions against an item or group of items
const col = (item1, item2, xMod = 0, yMod = 0) =>
  item1.x + xMod + item1.w > item2.x &&
  item1.y + yMod + item1.h > item2.y &&
  item1.x + xMod < item2.x + item2.w &&
  item1.y + yMod < item2.y + item2.h;

const groupCol = (item1, group, xMod = 0, yMod = 0) =>
  group.some((item) => col(item1, item, xMod, yMod));

const groupSolidCol = (item1, group, xMod = 0, yMod = 0) =>
  group.some((item) => item.solid && col(item1, item, xMod, yMod));

//input handling
const press = {};
press.up = press.right = press.down = press.left = false;
const keys = new Map();
keys.set("ArrowUp", "up");
keys.set("ArrowRight", "right");
keys.set("ArrowDown", "down");
keys.set("ArrowLeft", "left");

//toggle keys are all "else if" keydown cases. On-press key events (like firing a weapon) will probably have to be part of a queue that gets shifted each frame
document.addEventListener("keydown", function (e) {
  if (keys.get(e.key)) {
    press[keys.get(e.key)] = true;
  } else if (e.key === "p") {
    paused = !paused;
  }
});

document.addEventListener("keyup", function (e) {
  if (keys.get(e.key)) {
    press[keys.get(e.key)] = false;
  }
});
