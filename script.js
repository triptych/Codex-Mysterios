// codex mysterios
// created by Andrew Wooldridge triptych@gmail.com

import { reactive, html, watch } from 'https://cdn.skypack.dev/@arrow-js/core';

const data = reactive({
  tileWidth: 32, // pixels
  tileHeight: 32, // pixels
  numTilesX: 64, // tiles
  numTilesY: 95, // tiles
  currTileX: 0, // current X coord
  currTileY: 0, // current Y coord
  img: null, // image
  ctx: null, // canvas context
})


const renderTile = () => {
  console.log('renderTile', data.currTileX, data.currTileY);
  console.log('data.tileWidth', data.tileWidth)
  if (data.img && data.ctx) {
    data.ctx.clearRect(0, 0, data.tileWidth, data.tileHeight);
    data.ctx.drawImage(data.img, data.currTileX * data.tileWidth, data.currTileY * data.tileHeight, data.tileWidth, data.tileHeight, 0, 0, data.tileWidth, data.tileHeight);
  }
}

watch(renderTile);

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("cnv_preview");
  console.log(canvas);
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  data.img = new Image();
  data.img.setAttribute('crossOrigin', 'anonymous');
  data.img.src = "img/ProjectUtumno_full.png";
  data.img.onload = () => {
    console.log('img loaded', data.img);
    // renderTile(img, ctx, 1, 1);
    data.ctx = ctx;
    data.currTileX = 1;
    data.currTileY = 1;
  }
})