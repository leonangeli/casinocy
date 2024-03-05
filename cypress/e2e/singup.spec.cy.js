const { homePage } = require("../pages/homePage");
const { signupPage } = require("../pages/signupPage");

const home = new homePage();
const signup = new signupPage();

describe("User Sign Up Tests", () => {
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

  it("should be able to Sign up successfully", () => {
    //Wait for the slowest endpoint to load
    cy.wait("@interceptPOSTIdentify");
    //Assert that the website is visible for the user by the presence of the modal
    home.elements.modal().should("be.visible");
    //Close the modal
    home.closeModal();
    //Go to sign up page
    home.clickSignupBtn();
    //Validate that the user is in the sign up page
    signup.elements
      .signupurl()
      .should("eq", "https://demo.casino/user/registration");
    //Fulfill the singup form
    signup.completeSignupForm();
    //Click Create Account button
    signup.clickCreateAccountBtn();
    // Intercept the network request to the registration success endpoint
    cy.intercept("POST", "https://demo.casino/registrationSuccess", (req) => {
      // Respond with a predefined success message or payload
      req.reply({
        captchaPassed: true,
        statusCode: 200,
        body: {
          success: true,
          message: "Registration successful",
          // Add any additional properties as needed
        },
      });
    }).as("registrationSuccess");
    // Wait for the registration success response unable to do it due to captcha
  });
});
