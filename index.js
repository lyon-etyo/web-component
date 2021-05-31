// Get template #animated-card
const template = document.getElementById("animated-card");

// function to return computed CSS Rules
function style(imgUrl) {
  return /* css */ `
    .card__front {
      background-image: url("${imgUrl}");
    }
  `;
}

// Create a class for the element
class AnimatedCard extends HTMLElement {
  // Specify observed attributes so that
  // attributeChangedCallback will work
  static get observedAttributes() {
    return ["active"];
  }

  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    // sets and returns 'this.shadowRoot'
    this.attachShadow({ mode: "open" });

    // Apply external styles to the shadow DOM
    const externalStyles = document.createElement("link");
    externalStyles.setAttribute("rel", "stylesheet");
    externalStyles.setAttribute("href", "style.css");
    this.shadowRoot.appendChild(externalStyles);

    // Apply internal styles to the shadow DOM
    const internalStyles = document.createElement("style");
    this.shadowRoot.appendChild(internalStyles);
    internalStyles.textContent = style(this.getAttribute("bg-img"));

    // Attach the created elements from template to the shadow DOM within shadowRoot
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // set active class to component that have active atribute true
  toggleActive() {
    if (this.getAttribute("active")) this.classList.toggle("active");
  }

  // Delete component
  deleteMe() {
    return this.remove();
  }

  // lifecycle -> when component is already attached/connected to document
  connectedCallback() {
    console.log("Component is succesfully connected");
    // Delete Component button
    // this.shadowRoot.querySelector(".card__button").addEventListener("click", () => {
    //   this.deleteMe();
    // });
  }

  // lifecycle -> when component get destroyed
  disconnectedCallback() {
    console.log("Component was succesfully disconnected");
  }

  // lifecycle -> when component get attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    this.toggleActive();
  }
}

// Define custom element
customElements.define(template.id, AnimatedCard);

// Access .container
const container = document.querySelector(".container");

// create previous variable to contain previous clicked object in container
let previous;

// Add event listener to container and delegates coresponded event to the component
container.addEventListener("click", e => {
  if (e.target.localName == "animated-card") {
    if (previous) previous.setAttribute("active", false);
    e.target.setAttribute("active", true);
    previous = e.target;
  }
});
