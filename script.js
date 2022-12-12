// codex mysterios
// created by Andrew Wooldridge triptych@gmail.com

import { reactive, html, watch } from 'https://cdn.skypack.dev/@arrow-js/core';
import gameData from './data/data.json' assert {type: 'json'};
console.log(gameData);

const data = reactive({
  tileWidth: 32, // pixels
  tileHeight: 32, // pixels
  numTilesX: 64, // tiles
  numTilesY: 95, // tiles
  currTileX: 0, // current X coord
  currTileY: 0, // current Y coord
  img: null, // image
  ctx: null, // canvas context
  currPanel:"tiles" // current panel
})


const renderTile = () => {
  console.log('renderTile', data.currTileX, data.currTileY);
  console.log('data.tileWidth', data.tileWidth)
  if (data.img && data.ctx) {
    data.ctx.clearRect(0, 0, data.tileWidth, data.tileHeight);
    data.ctx.drawImage(data.img, data.currTileX * data.tileWidth, data.currTileY * data.tileHeight, data.tileWidth, data.tileHeight, 0, 0, data.tileWidth, data.tileHeight);
  }
}

const bindEvents = () => {
  const inputX = document.getElementById('inputX');
  const inputY = document.getElementById('inputY');
  const panels = document.querySelectorAll('.pnl-chooser');
  inputX.addEventListener('change', (e) => { data.currTileX = e.target.value });
  inputY.addEventListener('change', (e) => { data.currTileY = e.target.value });
  panels.forEach((pnl) => {
    console.log(pnl)
    pnl.addEventListener('click', (e) => {
      console.log('click', e.target.id);
      data.currPanel = e.target.getAttribute('data-link');
      
    });
  
  });
}

const renderPanels = () => {
  console.log('renderPanels', data.currPanel);
  const panels = document.querySelectorAll('.pnl');
  console.log(panels);
  // if(panels.length < 1) return;
  // for (let i = 0; i < panels.length; i++) {
  //   panels[i].style.display = "none"
  // }
  panels.forEach((pnl) => {
    pnl.style.display = "none";
  })
  switch (data.currPanel) {
      case 'tiles':
      document.querySelector('.pnl.tiles').style.display = "block";
        break;
      case 'data':
        document.querySelector('.pnl.data').style.display = "block";
        break;
      case 'tools':
      document.querySelector('.pnl.tools').style.display = "block";
        break;
      default:
        console.log('renderPanels', data.currPanel)
        break;
  
  }
}

watch(renderTile);
watch(renderPanels);

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

  bindEvents();
})