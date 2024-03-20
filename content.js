const rm = {
  el: document.querySelector("g-room"),
  w: 2048,
  h: 2048,
  x: 0,
  y: 0,
};

const p = {
  el: document.querySelector("g-item[player]"),
  x: 350,
  y: 250,
  w: 32,
  h: 32,
  accel: 1,
  mSpd: 5,
  hSpd: 0,
  vSpd: 0,
};

const cam = {
  el: document.querySelector("g-camera"),
  w: 768,
  h: 640,
};
cam.hW = cam.w / 2;
cam.hH = cam.h / 2;
cam.hPW = p.w / 2;
cam.hPH = p.h / 2;

/*
solid: whether the item can be moved through
role: functional role of the item (wall)
var: cosmetic variant of the item (wall + concrete)
*/

const items = [
  {
    solid: true,
    mods: {
      role: "wall",
      var: "concrete",
    },
    x: 220,
    y: 128,
    w: 91,
    h: 57,
  },
  {
    solid: true,
    mods: {
      role: "wall",
      var: "concrete",
    },
    mods: {
      role: "wall",
      var: "concrete",
    },
    x: 0,
    y: 345,
    w: 93,
    h: 197,
  },
  {
    solid: true,
    mods: {
      role: "wall",
      var: "concrete",
    },
    x: 220,
    y: 240,
    w: 96,
    h: 197,
  },
  {
    solid: true,
    mods: {
      role: "wall",
      var: "concrete",
    },
    x: 400,
    y: 200,
    w: 56,
    h: 10,
  },
  {
    solid: true,
    mods: {
      role: "wall",
      var: "concrete",
    },
    x: 480,
    y: 200,
    w: 56,
    h: 16,
  },
  {
    solid: true,
    mods: {
      role: "wall",
      var: "concrete",
    },
    x: 128,
    y: 0,
    w: 93,
    h: 36,
  },
  {
    solid: true,
    mods: {
      role: "wall",
      var: "concrete",
    },
    x: 400,
    y: 400,
    w: 200,
    h: 128,
  },
  {
    solid: true,
    mods: {
      role: "wall",
      var: "concrete",
    },
    x: 640,
    y: 500,
    w: 500,
    h: 128,
  },
];
