const opdrachtenContainer = document.getElementById('opdrachten-container');

fetch('./data/opdrachten.json')
  .then((res) => res.json())
  .then((data, index) => {
    // deze functie sorteert chronologisch: eerst week, dan datum
    const gesorteerdeOpdrachten = data.opdrachten.sort((a, b) => {
      if (a.week !== b.week) {
        return a.week - b.week;
      }
      return (
        new Date(a.datum.split('-').reverse().join('-')) -
        new Date(b.datum.split('-').reverse().join('-'))
      );
    });

    gesorteerdeOpdrachten.forEach(renderOpdracht, index);
  });

function renderOpdracht(opdracht, index) {
  const opdrachtCard = document.createElement('div');
  opdrachtCard.className = 'card item';

  opdrachtCard.innerHTML = `
    <div class="item-header">
      <span class="badge week-badge">Lesweek ${opdracht.week}</span>
      <span class="datum">Einddatum: ${opdracht.datum}</span>
    </div>
    <hr>

    <h3 class="opdracht-title primary">${index + 1}. ${opdracht.titel}</h3>

    <p class="opdracht-description">${opdracht.beschrijving}</p>

    ${renderLijst('Persoonlijke uitdagingen:', opdracht.uitdagingen)}

    ${renderLijst('Wat heb ik bijgeleerd:', opdracht.bijgeleerd)}
  `;

  opdrachtenContainer.appendChild(opdrachtCard);
}

function renderLijst(titel, items) {
  if (items.length === 0)
    return `
    <h3 class="item-subheader"><strong>${titel}</strong></h3>
    <p>/</p>`;

  return `
    <h3 class="item-subheader"><strong>${titel}</strong></h3>
    <ul>
      ${items.map((item) => `<li>${item}</li>`).join('')}
    </ul>
  `;
}
