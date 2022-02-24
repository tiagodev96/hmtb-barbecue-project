const Form = {
  adults: document.querySelector("input#adults"),
  children: document.querySelector("input#children"),
  duration: document.querySelector("input#duration"),

  getValues() {
    return {
      adults: Number(this.adults.value),
      children: Number(this.children.value),
      duration: Number(this.duration.value),
    };
  },

  validateFields() {
    const { adults, children, duration } = this.getValues();

    if (adults < 0 || children < 0 || duration < 0) {
      throw new Error("Please, only numbers greater than or equal to zero");
    }
  },

  submit(event) {
    event.preventDefault();

    try {
      this.validateFields();
      DOM.clearResults();
      DOM.printResult();
      DOM.clearInputs();
    } catch (error) {
      alert(error.message);
    }
  },
};

const Calculator = {
  meal() {
    let amountPerPerson = Form.duration.value >= 6 ? 0.65 : 0.4;
    let totalAdults = Form.adults.value * amountPerPerson;
    let totalChildren = (Form.children.value * amountPerPerson) / 2;
    let total = totalAdults + totalChildren;

    return total.toFixed(2);
  },

  sodaAndWater() {
    let amountPerPerson = Form.duration.value >= 6 ? 1.5 : 1.0;
    let totalAdults = Form.adults.value * amountPerPerson;
    let totalChildren = (Form.children.value * amountPerPerson) / 2;
    let total = totalAdults + totalChildren;

    return total.toFixed(2);
  },

  beer() {
    let amountPerPerson = Form.duration.value >= 6 ? 2.0 : 1.2;
    let totalAdults = Form.adults.value * amountPerPerson;

    return totalAdults.toFixed(2);
  },
};

const DOM = {
  resultContainer: document.querySelector("#result"),

  clearInputs() {
    Form.adults.value = "";
    Form.children.value = "";
    Form.duration.value = "";
  },

  clearResults() {
    while (this.resultContainer.hasChildNodes()) {
      this.resultContainer.removeChild(this.resultContainer.firstChild);
    }
  },

  printResult() {
    const ul = document.createElement("ul");

    ul.innerHTML = this.resultInnerHTML();

    this.resultContainer.appendChild(ul);
  },

  resultInnerHTML() {
    const html = `
      <p class="resultMessage">Meal: ${Calculator.meal()}kg</p>
      <p class="resultMessage">Soda and Water: ${Calculator.sodaAndWater()}L</p>
      <p class="resultMessage">Beer: ${Calculator.beer()}L</p>
      `;

    return html;
  },
};
