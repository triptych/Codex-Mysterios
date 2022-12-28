import { reactive, html, watch } from 'https://cdn.skypack.dev/@arrow-js/core';
import gameData from '../data/data.json' assert { type: 'json' };

let placeholder = new Image(); 

const card = reactive({
  img: '/img/placeholder.png',
  name: 'card-name',
  description: 'card-description',
});   

export const renderedCard = html`
  <div class="card"><img src="${card.img}"/></div>
  <div class="card-name">${card.name}</div>
  <div class="card-description">${card.description}</div>
`;

              