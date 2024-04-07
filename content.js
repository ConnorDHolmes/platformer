"use strict";
const rm = {
  el: document.querySelector("g-rm"),
  w: 2057,
  h: 2000,
  x: 0,
  y: 0,
  cellSize: 128,
  cells: [],
};

const p = {
  el: document.querySelector("[p]"),
  dyn: true,
  x: 480,
  y: 150,
  w: 32,
  h: 40,
  accel: 0.5,
  mSpd: 4,
  hSpd: 0,
  vSpd: 0,
  jumpHeight: 12,
  canJump: false,
  colItems: [],
  get cell() {
    return [Math.floor(this.x / rm.cellSize), Math.floor(this.y / rm.cellSize)];
  },
};

const cam = {
  el: document.querySelector("g-cam"),
  w: 768,
  h: 640,
  x: 0,
  y: 0,
  //cosmetic effect
  ease: 0.05,
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
    y: 428,
    w: 91,
    h: 57,
  },
  {
    solid: true,
    mods: {
      role: "wall",
      var: "concrete",
    },
    x: 420,
    y: 628,
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
    x: 200,
    y: 845,
    w: 128,
    h: 128,
  },
  {
    solid: true,
    mods: {
      role: "wall",
      var: "concrete",
    },
    x: 420,
    y: 840,
    w: 96,
    h: 197,
  },
  {
    solid: true,
    mods: {
      role: "wall",
      var: "concrete",
    },
    x: 600,
    y: 800,
    w: 56,
    h: 10,
  },
  {
    solid: true,
    mods: {
      role: "wall",
      var: "concrete",
    },
    x: 680,
    y: 700,
    w: 56,
    h: 16,
  },
  {
    solid: true,
    mods: {
      role: "wall",
      var: "concrete",
    },
    x: 328,
    y: 500,
    w: 93,
    h: 36,
  },
  {
    solid: true,
    mods: {
      role: "wall",
      var: "concrete",
    },
    x: 600,
    y: 900,
    w: 200,
    h: 128,
  },
  {
    solid: true,
    mods: {
      role: "wall",
      var: "concrete",
    },
    x: 840,
    y: 1000,
    w: 500,
    h: 128,
  },
  {
    solid: true,
    mods: {
      role: "wall",
      var: "concrete",
    },
    x: 940,
    y: 800,
    w: 200,
    h: 128,
  },
  {
    solid: true,
    mods: {
      role: "wall",
      var: "concrete",
    },
    x: 1500,
    y: 940,
    w: 16,
    h: 128,
  },
  {
    solid: true,
    mods: {
      role: "wall",
      var: "concrete",
    },
    x: 1450,
    y: 1050,
    w: 120,
    h: 12,
  },
  {
    solid: true,
    mods: {
      role: "wall",
      var: "concrete",
    },
    x: 1700,
    y: 1000,
    w: 16,
    h: 128,
  },
  {
    solid: true,
    mods: {
      role: "wall",
      var: "concrete",
    },
    x: 300,
    y: 1800,
    w: 2000,
    h: 32,
  },
];
