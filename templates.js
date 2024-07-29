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

function openEntryHtml(type1, pokemonImg, i) {
    return `
    <div id="popUp" class="large-background" onclick="closeCard()">
        <div class="poke-card-open" onclick="event.stopPropagation()">
            <div class="${type1} card-1st-half">
                <button class="close-card-button" onclick="closeCard()"><b>X</b></button>
                <img src="${pokemonImg}">
            </div>
            <div class="card-2nd-half">
                <div class="card-buttons">
                    <div id="buttonLeft" class="button-left" onclick="loadInfo(${i})">Info</div>
                    <div id="buttonRight" class="button-right button-clicked" onclick="loadStats(${i})">Stats</div>
                </div>
                <div id="info" class="info"> 
                </div>
                <div class="arrow-container">
                    <div class="arrows">
                        <img class="arrow-left" src="./img/arrowleft.png" onclick="nextLeft(${i})">
                        <img class="arrow-right" src="./img/arrowright.png" onclick="nextRight(${i})">
                    </div>
                </div>
                <div id="separator">
                </div>
                <div id="separator2">
                </div>
            <div>
        </div>    
    </div>
    `;
}

function loadInfoHtml(pokemonName, id, pokemonHeight, pokemonWeight, type1, type2Div, i) {
    return `
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
        <div class="single-info-right">
            <span>Type:</span>
        </div>
        <div class="single-info-right">
            <div class="types-flex">
                <div class="type-open ${type1}">${type1}</div>
                ${type2Div}
            </div>
        </div>
        <div class="single-info-right">
            <span>Cry:</span>
        </div>
        <div class="single-info-right">
            <button onclick="cry(${i})" class="sound-button"><div>Sound</div><img src="./img/sound.png"></button>
        </div>
    </div> 
    `;
}

function statDivsHtml(statName, baseStat) {
    return `
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