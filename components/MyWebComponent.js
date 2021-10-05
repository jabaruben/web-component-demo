class MyWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --desktop-background-color: #008282;
        --resolution-height: 180px;
      }
      .wallpaper {
        background: var(--desktop-background-color);
        width: var(--resolution-width, 640px);
        height: var(--resolution-height, 480px);
        position: relative;
        cursor: default
      }
    `;
  }

  changedContent() {
    this.shadowRoot.querySelector(".wallpaper").innerHTML = /* html */ `
      <div>Mostramos un cambio de contenido</div>
      <button btn-action="return">Volver</button>
    `;
    this.shadowRoot.querySelector('button[btn-action="return"]').addEventListener("click", () => this.originalContent());
    this.showCambiado();
  }

  originalContent() {
    this.shadowRoot.querySelector(".wallpaper").innerHTML = /* html */ `
      <div>Mostramos el contenido original</div>
      <button btn-action="change">Cambia el contenido</button>
    `;
    this.shadowRoot.querySelector('button[btn-action="change"]').addEventListener("click", () => this.changedContent());
  }

  showCambiado() {
    const container = document.createElement("template");
    container.innerHTML = /* html */ `
      <div>cambiado</div>
    `;
    this.shadowRoot.appendChild(container.content.firstElementChild);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
      <style>${MyWebComponent.styles}</style>
      <div class="wallpaper"></div>
    `;
    this.originalContent();
  }
}

customElements.define("my-web-component", MyWebComponent);