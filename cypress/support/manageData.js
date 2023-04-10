import locators from "./locators"

Cypress.Commands.add('resetData', () => {
    cy.get(locators.MENU.SETTINGS).click()
    cy.get(locators.SETTINGS.RESET).click()
    cy.get(locators.MESSAGE).should('contain', 'Dados resetados com sucesso!')
})