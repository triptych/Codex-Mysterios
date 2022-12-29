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
  currPanel: "tiles", // current panel
  data: null // state of the app
});

const largerCanvas = () => {
  const srccanvas = document.getElementById("cnv_preview");
  const canvas = document.getElementById('cnv_zoom');
  canvas.width = srccanvas.width * 4;
  canvas.height = srccanvas.height * 4;
  let ctx = canvas.getContext('2d');
  //ctx.scale(2, 2);
  ctx.drawImage(srccanvas, 0, 0, canvas.width, canvas.height);
  return canvas;
}

// render a tile into the state's canvas

const renderTile = () => {
  console.log('renderTile', state.currTileX, state.currTileY);
  console.log('state.tileWidth', state.tileWidth)
  if (state.img && state.ctx) {
    state.ctx.clearRect(0, 0, state.tileWidth, state.tileHeight);
    state.ctx.drawImage(state.img, state.currTileX * state.tileWidth, state.currTileY * state.tileHeight, state.tileWidth, state.tileHeight, 0, 0, state.tileWidth, state.tileHeight);
  }
  largerCanvas();
}
watch(renderTile);


// render an editor view of the name, description, tags
const renderEditor = () => {
  console.log('renderEditor', state.currTileX, state.currTileY);
  if (state && state.data) {


    const name = document.getElementById('inputName');
    const description = document.getElementById('inputDescription');
    name.value = state.data.data.tiles[state.currTileX][state.currTileY].name;
    description.value = state.data.data.tiles[state.currTileX][state.currTileY].description;
  }
}
watch(renderEditor);

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
  state.data = gameData;

}

const renderNav = () => {
  html`
<div> x: ${() => state.currTileX} of ${() => state.numTilesX} y: ${() => state.currTileY} of ${() => state.numTilesY} </div>
<div> <button @click="${e => state.currTileY--}">🔼</button> 
   </div>
<div> 
  <button @click="${e => state.currTileX--}">◀</button> | 
  <button @click="${e => state.currTileX++}">▶</button>
</div>
<div>
  <button @click="${e => state.currTileY++}">🔽</button>
</div>
`(document.getElementsByClassName('nav')[0]);
}

const renderCard = () => {
  console.log('renderCard', state.currTileX, state.currTileY)
  console.log('state.data', state.data)
  console.log('state at ', state.data.data)
  html`
    <div class="tile">
    <div class="tile-name">
     Name: <span>${() => state.data.data.tiles[state.currTileX][state.currTileY].name}</span>
        
    </div>
      <div class="tile-description">
        Description:
        <p>${() => state.data.data.tiles[state.currTileX][state.currTileY].description}</p>
      </div>
  `(document.getElementsByClassName('card')[0]);
}

const bindEvents = () => {
  document.getElementById('btnExport').addEventListener('click', () => {
    const fileName = 'export.json';
    const blob = new Blob([JSON.stringify(state.data)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);

  });

  document.getElementById('btnSave').addEventListener('click', () => {
    console.log('save');
    console.log(document.getElementById('inputName').value);
    state.data.data.tiles[state.currTileX][state.currTileY].name = document.getElementById('inputName').value;
    state.data.data.tiles[state.currTileX][state.currTileY].description = document.getElementById('inputDescription').value;
    //state.data.save();
  
  });
}

// start things off when page is ready

window.addEventListener("DOMContentLoaded", () => {
  init();
  renderNav();
  renderCard();
  renderEditor();
  bindEvents()

});