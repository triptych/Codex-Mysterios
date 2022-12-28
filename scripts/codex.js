// codex mysterios
// created by Andrew Wooldridge triptych@gmail.com

import { reactive, html, watch } from 'https://cdn.skypack.dev/@arrow-js/core';
import gameData from '../data/data.json' assert { type: 'json' };
console.log(gameData);

const state = reactive({
  tileWidth: 32, // pixels
  tileHeight: 32, // pixels
  numTilesX: 64, // tiles
  numTilesY: 95, // tiles
  currTileX: 0, // current X coord
  currTileY: 0, // current Y coord
  img: null, // image
  ctx: null, // canvas context
  currPanel: "tiles" // current panel
});

// render a tile into the state's canvas

const renderTile = () => {
  console.log('renderTile', state.currTileX, state.currTileY);
  console.log('state.tileWidth', state.tileWidth)
  if (state.img && state.ctx) {
    state.ctx.clearRect(0, 0, state.tileWidth, state.tileHeight);
    state.ctx.drawImage(state.img, state.currTileX * state.tileWidth, state.currTileY * state.tileHeight, state.tileWidth, state.tileHeight, 0, 0, state.tileWidth, state.tileHeight);
  }
}
watch(renderTile);

const init = () => {
  const canvas = document.getElementById("cnv_preview");
  console.log(canvas);
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  state.img = new Image();
  state.img.setAttribute('crossOrigin', 'anonymous');
  state.img.src = "img/ProjectUtumno_full.png";
  state.img.onload = () => {
    console.log('img loaded', state.img);
    // renderTile(img, ctx, 1, 1);
    state.ctx = ctx;
    state.currTileX = 1;
    state.currTileY = 1;
  }

}


// start things off when page is ready

window.addEventListener("DOMContentLoaded", () => {
  init();
})