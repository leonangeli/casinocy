import { faker } from "@faker-js/faker"

export class signupPage{

    elements = {
        modal : () => cy.get('.modal__content'),
        signupurl : () => cy.url('https://demo.casino/user/registration')
    }

   completeSignupForm(){
    cy.get('[data-test="input-email"]').type(faker.internet.email())
    cy.get('[data-test="input-terms_and_conditions"]').click({force: true})
    cy.get('[data-test="input-bonus"]').click({force: true})
    cy.get('[data-test="input-password"]').type(Cypress.env('PASSWORD'))
    cy.get('[data-test="input-password"]').type(Cypress.env('PASSWORD'))
   }

   clickCreateAccountBtn(){
    cy.get('[data-test="control-submit"]')
    .should('be.visible')
    .should('be.enabled')
    .click()
   }
}