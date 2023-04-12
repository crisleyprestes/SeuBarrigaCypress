import locators from "../locators"

Cypress.Commands.add('accessTransactions', () => {
    cy.get(locators.MENU.MOVIMENTACAO).click()
})

Cypress.Commands.add('createTransaction', (description, value, user) => {
    cy.get(locators.MOVIMENTACAO.DESCRICAO).type(description)
    cy.get(locators.MOVIMENTACAO.VALOR).type(value)
    cy.get(locators.MOVIMENTACAO.INTERESSADO).type(user)
    cy.get(locators.MOVIMENTACAO.BTN_STATUS).click()
    cy.get(locators.MOVIMENTACAO.BTN_SALVAR).click()
})