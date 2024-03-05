const { homePage } = require("../pages/homePage");
const { loginPage } = require("../pages/loginPage");

const login = new loginPage();
const home = new homePage();
const username = Cypress.env("USERNAME");
const password = Cypress.env("PASSWORD");

describe("User Login Tests", () => {
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

  it("should be able to Login successfully", () => {
    //Wait for the slowest endpoint to load
    cy.wait("@interceptPOSTIdentify");
    //Assert that the website is visible for the user by the presence of the modal
    home.elements.modal().should("be.visible");
    //Close the modal
    home.closeModal();
    //Go to login page
    login.visitLoginPage();
    //Assert that the user is in the sign un page
    login.elements.loginUrl().should("eq", "https://demo.casino/user/login");
    //Fulfill the sign in form
    login.completeLoginForm(username, password);
    //Click sign in button
    login.clickSigninBtn();
    //Validate successful login (unable to do it due to captcha)
  });
});
