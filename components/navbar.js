class AppNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <div class="container header-inner">
          <p class="logo">Michiel Desair</p>
          <nav>
            <ul class="nav-list">
              <li><a href="index.html">Introductie</a></li>
              <li><a href="logboek.html">Logboek</a></li>
              <li><a href="ontwikkeling.html">Ontwikkeling</a></li>
              <li><a href="opdrachten.html">Opdrachten</a></li>
              <li><a href="reflectie.html">Reflectie</a></li>
            </ul>
          </nav>
        </div>
      </header>
    `;
  }
}

customElements.define('app-navbar', AppNavbar);
