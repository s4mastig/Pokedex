let pokemonData = [];

let offset = 0;
const limit = 20;

async function init() {
    loadingSpinner.style.display = 'flex';
    await getDataPokemon();
    console.log(pokemonData);


    // Simulate a delay for loading
    setTimeout(() => {
        renderPokemon();
        // Hide the spinner
        loadingSpinner.style.display = 'none';
    }, 1500); // Adjust the timeout duration as needed
}

async function getDataPokemon() {
    for (let i = 1; i <= 151; i++) {

        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let responseAsJson = await response.json();
        pokemonData.push(responseAsJson);
    }
}

function renderPokemon() {
    for (let i = offset; i < offset + limit; i++) {
        let singlePokemon = pokemonData[i];
        let button = document.getElementById('loadButton');
        if (!singlePokemon) {
            button.innerHTML = '';
            break;
        }

        let content = document.getElementById('content');

        let pokemonName = singlePokemon.name;
        pokemonName = capitalizeFirstLetter(pokemonName);
        let pokemonImg = singlePokemon.sprites.other["official-artwork"].front_default;
        let types = singlePokemon.types;
        let type1 = types[0].type.name;
        type1 = capitalizeFirstLetter(type1);
        let type2 = checkIfType2(types);
        let type2Div = checkIfType2Div(type2);
        let id = singlePokemon.id;

        content.innerHTML += renderPokemonHtml(i, id, type1, pokemonName, type2Div, pokemonImg);
        button.innerHTML = `<button onclick="loadMore()">Load more</button>`;
    }
    offset += limit;
}

function checkIfType2(types) {
    let type2 = null;
    if (types.length > 1) {
        type2 = types[1].type.name;
    }
    return type2;
}

function checkIfType2Div(type2) {
    let type2Div = '';
    if (type2) {
        type2 = capitalizeFirstLetter(type2);
        type2Div = `<div class="type ${type2}">${type2}</div>`;
    }
    return type2Div;
}

function checkIfType2DivOpen(type2) {
    let type2Div = '';
    if (type2) {
        type2 = capitalizeFirstLetter(type2);
        type2Div = `<div class="type-open ${type2}">${type2}</div>`;
    }
    return type2Div;
}



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderPokemonHtml(i, id, type1, pokemonName, type2Div, pokemonImg) {
    return `
           <div class="poke-card ${type1}" onclick="openEntry(${i})">
                <div class="poke-id">
                    <div>#${id}</div>
                </div>
                <div class="name-span">
                    <span>${pokemonName}</span>
                </div>
                <div class="lower-section">
                    <div class="types">
                        <div class="type ${type1}2">${type1}</div>
                        ${type2Div}
                    </div>
                    <img class="poke-img" src="${pokemonImg}">
                </div>
            </div>
            `;
}

async function loadMore() {
    let loadingSpinner = document.getElementById('loadingSpinner');

    // Show the spinner
    loadingSpinner.style.display = 'flex';

    // Simulate a delay for loading
    setTimeout(() => {
        renderPokemon();
        // Hide the spinner
        loadingSpinner.style.display = 'none';
    }, 1500); // Adjust the timeout duration as needed
}

async function filterPokedex() {

    let search = document.getElementById('search').value.toLowerCase();
    let filteredPokemon = pokemonData.filter(pokemon => pokemon.name.toLowerCase().startsWith(search));
    content.innerHTML = '';
    for (let i = 0; i < filteredPokemon.length; i++) {

        let singlePokemon = filteredPokemon[i];
        let originalIndex = pokemonData.indexOf(singlePokemon);
        let content = document.getElementById('content');
        let button = document.getElementById('loadButton');
        let pokemonName = singlePokemon.name;
        pokemonName = capitalizeFirstLetter(pokemonName);
        let pokemonImg = singlePokemon.sprites.other["official-artwork"].front_default;
        let types = singlePokemon.types;
        let type1 = types[0].type.name;
        type1 = capitalizeFirstLetter(type1);
        let type2 = checkIfType2(types);
        let type2Div = checkIfType2Div(type2);
        let id = singlePokemon.id;

        button.innerHTML = '';
        content.innerHTML += renderPokemonHtml(originalIndex, id, type1, pokemonName, type2Div, pokemonImg);
    }
    if (search === '') {
        loadingSpinner.style.display = 'flex';
        offset = 0;
        content.innerHTML = '';
        setTimeout(() => {

            renderPokemon();
            // Hide the spinner
            loadingSpinner.style.display = 'none';
        }, 1500); // Adjust the timeout duration as needed


    }
}


function openEntry(i) {
    content = document.getElementById('content');
    let singlePokemon = pokemonData[i];
    baseStats = singlePokemon.stats;
    let pokemonName = singlePokemon.name;
    pokemonName = capitalizeFirstLetter(pokemonName);
    let pokemonImg = singlePokemon.sprites.other["official-artwork"].front_default;
    let types = singlePokemon.types;
    let type1 = types[0].type.name;
    type1 = capitalizeFirstLetter(type1);
    let type2 = checkIfType2(types);
    let type2Div = checkIfType2Div(type2);
    let id = singlePokemon.id;

    content.innerHTML += `
    <div id="popUp" class="large-background" onclick="closeCard()">
        <div class="poke-card-open" onclick="event.stopPropagation()">
            <div class="${type1} card-1st-half">
                <img src="${pokemonImg}">
            </div>
            <div class="card-2nd-half">
                <div class="card-buttons">
                    <div id="buttonLeft" class="button-left" onclick="loadInfo(${i})">Info</div>
                    <div id="buttonRight" class="button-right button-clicked" onclick="loadStats(${i})">Stats</div>
                </div>
                <div id="info" class="info">
                    
                </div>
                <div class="arrows">
                    <img class="arrow-left" src="./img/arrowleft.png" onclick="nextLeft(${i})">
                    <img class="arrow-right" src="./img/arrowright.png" onclick="nextRight(${i})">
                </div>
                <div id="separator">
                </div>
                <div id="separator2">
                </div>
            <div>
        </div>    
    </div>
    
    `;
    loadInfo(i);
}
function loadInfo(i) {
    colorButtons();
    let singlePokemon = pokemonData[i];
    let pokemonName = singlePokemon.name
    let pokemonHeight = singlePokemon.height;
    let pokemonWeight = singlePokemon.weight;
    pokemonWeight = pokemonWeight /10;
    pokemonHeight = pokemonHeight /10;
    pokemonName = capitalizeFirstLetter(pokemonName);
    let types = singlePokemon.types;
    let type1 = types[0].type.name;
    type1 = capitalizeFirstLetter(type1);
    let type2 = checkIfType2(types);
    let type2Div = checkIfType2DivOpen(type2);
    let id = singlePokemon.id;
    let infos = document.getElementById('info');
    document.getElementById('info').classList.remove('stats');
    document.getElementById('info').classList.add('info');

    infos.innerHTML = '';
    infos.innerHTML = `
        <div class="info-left">
            <div class="single-info">
                <span>Species:</span>
                <div class="info-width">${pokemonName}</div>
            </div>
            <div class="single-info">
                <span>Number:</span>
                <div class="info-width">${id}</div>
            </div>
            <div class="single-info">
                <span>Height:</span>
                <div class="info-width">${pokemonHeight.toFixed(2).replace('.', ',') + ' '}m</div>
            </div>
            <div class="single-info">
                <span>Weight:</span>
                <div class="info-width">${pokemonWeight.toFixed(1).replace('.', ',') + ' '}kg</div>
            </div>
        </div>
        <div class="info-right">
            <div class="single-info">
                <span>Type:</span>
            </div>
             <div class="single-info">
                <div class="types-flex info-width">
                    <div class="type-open ${type1}">${type1}</div>
                    ${type2Div}
                </div>
            </div>
            <div class="single-info">
                <span>Cry:</span>
            </div>
            <div class="single-info">
                <button onclick="cry(${i})" class="sound-button"><div>Sound</div><img src="./img/sound.png"></button>
            </div>
        </div> 
    `;
    document.getElementById('separator').classList.toggle('separator');
    document.getElementById('separator2').classList.toggle('separator2');
}

function cry(i) {
    let singlePokemon = pokemonData[i];
    let cry = singlePokemon.cries.latest;
    let audio = new Audio(`${cry}`);
    audio.volume = 0.05;
    audio.play();
}


function loadStats(i) {
    document.getElementById('info').classList.add('stats');
    document.getElementById('info').classList.remove('info');
    let singlePokemon = pokemonData[i];
    let baseStats = singlePokemon.stats;
    let statDivs = document.getElementById('info');
    statDivs.innerHTML = '';
    colorButtons();

    for (let j = 0; j < baseStats.length; j++) {
        let baseStat = baseStats[j].base_stat;
        let statName = baseStats[j].stat.name;
        statName = capitalizeFirstLetter(statName);
        statDivs.innerHTML += `
        <div class="stats-container">
            <div class="stats-width">
                ${statName}: 
            </div>
            <div class="stats-next-to-bar">
                <span class="stat-span">
                    ${baseStat}
                </span>
                <div class="stat-bar">
                    <div class="full-bar">
                        <div class="bar-percentage" style="width: ${baseStat}%;">
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        `;
    }
    document.getElementById('separator').classList.toggle('separator');
    document.getElementById('separator2').classList.toggle('separator2');
}

function colorButtons() {
    document.getElementById('buttonRight').classList.toggle('button-clicked');
    document.getElementById('buttonLeft').classList.toggle('button-clicked');
}

function closeCard() {
    let popUp = document.getElementById('popUp');
    popUp.remove();
}

function nextRight(i) {
    let popUp = document.getElementById('popUp');
    popUp.remove();
    if (i === 150) {
        i = 0;
        openEntry(i);
    }
    else {
        i++
        openEntry(i);
    }
}

function nextLeft(i) {
    let popUp = document.getElementById('popUp');
    popUp.remove();
    if (i === 0) {
        i = 150;
        openEntry(i);
    }
    else {
        i--
        openEntry(i);
    }
}