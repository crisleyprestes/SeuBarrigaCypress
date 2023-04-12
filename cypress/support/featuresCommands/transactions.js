import locators from "../locators"

Cypress.Commands.add('createTransaction', (description, value, user) => {
    cy.get(locators.MENU.MOVIMENTACAO).click()
    cy.get(locators.MOVIMENTACAO.DESCRICAO).type(description)
    cy.get(locators.MOVIMENTACAO.VALOR).type(value)
    cy.get(locators.MOVIMENTACAO.INTERESSADO).type(user)
    cy.get(locators.MOVIMENTACAO.BTN_STATUS).click()
    cy.get(locators.MOVIMENTACAO.BTN_SALVAR).click()
})

Cypress.Commands.add('removeTransaction', (description) => {
    cy.get(locators.MENU.EXTRATO).click()
    cy.xpath(locators.EXTRATO.ICON_DELETAR(description)).click()
})