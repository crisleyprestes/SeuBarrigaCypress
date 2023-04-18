import locators from "../locators"

Cypress.Commands.add('login', (user, password) => {
    cy.visit('https://barrigareact.wcaquino.me/')
    cy.get(locators.LOGIN.USER).type(user)
    cy.get(locators.LOGIN.PASSWORD).type(password)
    cy.get(locators.LOGIN.BTN_LOGIN).click()
    cy.get(locators.MESSAGE, { timeout : 10000 }).should('contain', 'Bem vindo')
})

Cypress.Commands.add('getToken', (user, password) => {
    cy.request({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/signin',
        body: {
            email: user,
            redirecionar: false,
            senha: password
        }
    }).its('body.token').should('not.be.empty')
    .then(token => {
        return token
    })
})