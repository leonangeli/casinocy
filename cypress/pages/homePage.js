export class homePage {
  elements = {
    modal: () => cy.get(".modal__content"),
    portugueseUrl: () => cy.url("https://demo.casino/pt"),
    signupBtn: () => cy.get('[data-test="nav-reg-head"]'),
  };

  closeModal() {
    cy.get(".mfp-close").should("be.visible").should("be.enabled").click();
  }

  clickSignupBtn() {
    cy.get('[data-test="nav-reg-head"]').should("be.visible").click();
  }

  clickMoreBtn() {
    cy.get(".mobile-bar__menu").should("be.visible").click();
  }

  clickFlagButton() {
    cy.get(".lang__current").should("be.visible").click();
  }

  clickPortugueseLanguageBtn() {
    cy.get(":nth-child(7) > .lang-list__link").should("be.visible").click();
  }
}
