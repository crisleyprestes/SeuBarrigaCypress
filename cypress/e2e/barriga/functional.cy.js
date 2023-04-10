/// <reference types="cypress" />

import locators from "../../support/locators"

describe('Should test at a functional level', () => {

    beforeEach(() => {
        cy.login('crisley@mail.com', '123456')
        cy.resetData()
    })

    it('Should create an account', () => {
        cy.createAccount('Conta qualquer')
        cy.get(locators.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should update an account', () => {
        cy.updateAccount('Conta para alterar', 'Conta alterada')
        cy.get(locators.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
        cy.xpath('//td[contains(.,"Conta alterada")]').should('exist')
    })

})