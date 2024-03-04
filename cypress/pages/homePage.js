export class homePage {
    elements = {
        modal : () => cy.get('.modal__content')
    }

   closeModal(){
    cy.get('.mfp-close')
          .should('be.visible')
          .should('be.enabled')
          .click()
   }

   clickSignupButton(){
    cy.get('[data-test="nav-reg-head"]')
    .should('be.visible')
    .click();
   }
}