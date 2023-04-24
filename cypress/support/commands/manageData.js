import locators from "../locators"

Cypress.Commands.add('resetData', () => {
    cy.get(locators.MENU.SETTINGS).click()
    cy.get(locators.SETTINGS.RESET).click()
    cy.get(locators.MESSAGE).should('contain', 'Dados resetados com sucesso!')
})

Cypress.Commands.add('resetDataAPI', (user, password) => {
    cy.getToken(user, password).then(token => {
        cy.request({
            method: 'GET',
            url: '/reset',
            headers: { Authorization: `JWT ${token}` }
        }).its('status').should('be.equal', 200)
    })
})