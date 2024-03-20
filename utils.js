//global paused state
let paused = false;

//translate an item's DOM element to its coordinates
function placeEl(item) {
  item.el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
}

//size an item's DOM element to its dimensions
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
function updateEl(item) {
  sizeEl(item);
  placeEl(item);
  styleEl(item);
}

//update item's DOM element to match its traits and then add the element to room
function addEl(item) {
  updateEl(item);
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
