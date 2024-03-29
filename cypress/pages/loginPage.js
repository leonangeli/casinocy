export class loginPage {
  elements = {
    loginUrl: () => cy.url("https://demo.casino/user/login"),
  };

  visitLoginPage() {
    cy.get("div.button").should("be.visible").click();
    cy.get('[data-test="nav-login-head"]').should("be.visible").click();
  }

  validateLoginPage() {
    cy.url().should("eq", "https://demo.casino/user/login");
  }

  completeLoginForm(username, password) {
    cy.get('[data-test="input-username"]').type(username);
    cy.get('[data-test="input-password"]').type(password);
  }

  clickSigninBtn() {
    cy.get('[data-test="control-submit"]')
      .should("be.visible")
      .should("be.enabled")
      .click();
  }

  validateSuccesfulLogin() {
    cy.getCookie("authToken").should("exist");
  }
}
