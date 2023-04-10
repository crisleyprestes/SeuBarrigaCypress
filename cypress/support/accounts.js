import locators from "./locators"

Cypress.Commands.add('accessAccounts', () => {
    cy.get(locators.MENU.SETTINGS).click()
    cy.get(locators.SETTINGS.CONTAS).click()
})

Cypress.Commands.add('createAccount', (accountName) => {
    cy.accessAccounts()
    cy.get(locators.CONTAS.NOME).type(accountName)
    cy.get(locators.CONTAS.BTN_SALVAR).click()
})

Cypress.Commands.add('updateAccount', (account, accountUpdated) => {
    cy.accessAccounts()
    cy.xpath(`//td[contains(.,"${account}")]/..//i[@class="far fa-edit"]`).click()
    cy.get(locators.CONTAS.NOME).clear().type(accountUpdated)
    cy.get(locators.CONTAS.BTN_SALVAR).click()
})