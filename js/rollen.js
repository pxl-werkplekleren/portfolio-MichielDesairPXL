const rollenContainer = document.getElementById('rollen-container');

fetch('./data/rollen.json')
  .then((res) => res.json())
  .then((data) => {
    data.rollen.forEach(renderRol);
  });

function renderRol(rol) {
  const rolCard = document.createElement('div');
  rolCard.className = 'card rol';

  rolCard.innerHTML = `
    <div class="header">
      <span class="badge rol-badge">Rol</span>
      <h3>${rol.naam}</h3>
    </div>

    <h4 class="sub-header">Competenties</h4>
    <div class="rol-container">
      ${rol.competenties.map(renderCompetentie).join('')}
    </div>

    <h4 class="sub-header">Mijn situering</h4>
    <div class="rol-container">
      ${renderSituering('Waar sta je momenteel?', rol.situering.momenteel, 'momenteel')}
      ${renderSituering('Wat lukt je al goed?', rol.situering.goed, 'goed')}
      ${renderSituering('Wat lukt je nog niet?', rol.situering.nietGoed, 'niet-goed')}
    </div>

    <h4 class="sub-header">Voorbeelden</h4>
    <div class="card-container">
      ${rol.voorbeelden.map(renderVoorbeeld).join('')}
    </div>
  `;

  rollenContainer.appendChild(rolCard);
}

function renderCompetentie(comp) {
  return `
    <div class="competentie-item">
      <strong>${comp.code}</strong>
      <p>${comp.beschrijving}</p>
    </div>
  `;
}

function renderSituering(vraag, antwoorden, className) {
  if (!antwoorden || antwoorden.length === 0) return '';

  return `
    <div class="situering-item ${className}">
      <p class="situering-question">${vraag}</p>
      ${antwoorden.map((a) => `<p class="situering-answer">${a}</p>`).join('')}
    </div>
  `;
}

function renderVoorbeeld(voorbeeld) {
  return `
    <div class="card voorbeeld-card">
      <h5 class="card-title">${voorbeeld.titel}</h5>
      <p class="card-description">${voorbeeld.beschrijving}</p>
    </div>
  `;
}
