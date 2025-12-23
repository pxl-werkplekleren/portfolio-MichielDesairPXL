const semesterList = document.getElementById('semester-list');
const planningList = document.getElementById('planning-list');
const activeSemesterLabel = document.getElementById('active-semester');

fetch('./data/logboek.json')
  .then((res) => res.json())
  .then((data) => {
    const semesters = data.semesters;

    loadSemester(semesters[0]);

    semesters.forEach((semester) => {
      const li = document.createElement('li');
      li.className = 'dropdown-item';
      li.textContent = semester.naam;

      li.addEventListener('click', () => {
        loadSemester(semester);
      });

      semesterList.appendChild(li);
    });
  });

function loadSemester(semester) {
  activeSemesterLabel.textContent = semester.naam;
  planningList.innerHTML = '';

  semester.planning.forEach((week) => {
    const card = document.createElement('div');
    card.className = 'card item';

    card.innerHTML = `
      <div class="item-header">
        <span class="week">Week ${week.week}</span>
        <span class="datum">${week.periode}</span>
      </div>
      <hr>

      ${renderCategory('Lesinhoud', 'notebook-text.svg', week.inhoud)}
      ${renderCategory('Evaluaties', 'circle-alert.svg', week.evaluaties)}
      ${renderCategory('Opdrachten', 'book-open-text.svg', week.opdrachten)}
    `;

    planningList.appendChild(card);
  });
}

function renderCategory(title, icon, items) {
  if (!items || items.length === 0) return '';

  return `
    <div>
      <div class="item-subheader">
        <img src="images/${icon}" alt="${title}">
        <h3>${title}</h3>
      </div>
      <ul>
        ${items.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `;
}
