import locators from "../locators"

Cypress.Commands.add('createTransaction', (description, value, interested, account) => {
    cy.get(locators.MENU.MOVIMENTACAO).click()
    cy.get(locators.MOVIMENTACAO.DESCRICAO).type(description)
    cy.get(locators.MOVIMENTACAO.VALOR).type(value)
    cy.get(locators.MOVIMENTACAO.INTERESSADO).type(interested)
    cy.get(locators.MOVIMENTACAO.CONTA).select(account)
    cy.get(locators.MOVIMENTACAO.BTN_STATUS).click()
    cy.get(locators.MOVIMENTACAO.BTN_SALVAR).click()
})

Cypress.Commands.add('removeTransaction', (description) => {
    cy.get(locators.MENU.EXTRATO).click()
    cy.xpath(locators.EXTRATO.ICON_DELETAR(description)).click()
})

Cypress.Commands.add('editTransaction', (description) => {
    cy.get(locators.MENU.EXTRATO).click()
    cy.xpath(locators.EXTRATO.ICON_EDITAR(description)).click()
    cy.get(locators.MOVIMENTACAO.DESCRICAO).should('have.value', description)
    cy.get(locators.MOVIMENTACAO.BTN_STATUS).click()
    cy.get(locators.MOVIMENTACAO.BTN_SALVAR).click()   
})