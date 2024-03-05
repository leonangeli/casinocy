const { homePage } = require("../pages/homePage");

const home = new homePage();

describe("Navbar Tests", () => {
  Cypress.on(
    "uncaught:exception",
    () =>
      // Returning false here prevents Cypress from failing the test on the unhandled app exception
      // Ideally would fix app exception long-term
      false
  );
  beforeEach(() => {
    cy.intercept("POST", "identificate").as("interceptPOSTIdentify");
    cy.visit("/", { failOnStatusCode: false });
  });

  it("should be able to change the language properly", () => {
    //Wait for the slowest endpoint to load
    cy.wait("@interceptPOSTIdentify");
    //Assert that the website is visible for the user by the presence of the modal
    home.elements.modal().should("be.visible");
    //Close the modal
    home.closeModal();
    //Click the flag button and select the desired language, Portuguese in this case
    home.clickMoreBtn();
    home.clickFlagButton();
    home.clickPortugueseLanguageBtn();
    //Validate the selected language is now on display
    home.elements.portugueseUrl().should("eq", "https://demo.casino/pt");
    home.elements.signupBtn().should("have.text", "Cadastro");
  });
});
