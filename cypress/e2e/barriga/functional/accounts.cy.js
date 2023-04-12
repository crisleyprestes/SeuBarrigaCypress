/// <reference types="cypress" />

import locators from "../../../support/locators"

describe('Should test at a functional level', () => {

    beforeEach(() => {
        cy.login('crisley@mail.com', '123456')
        cy.resetData()
    })

    it('Should create an account', () => {
        cy.accessAccounts()
        cy.createAccount('Conta qualquer')
        cy.get(locators.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should update an account', () => {
        cy.accessAccounts()
        cy.updateAccount('Conta para alterar', 'Conta alterada')
        cy.get(locators.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
        cy.xpath('//td[contains(.,"Conta alterada")]').should('exist')
    })

    it.only('Should not create an account with same name', () => {
        cy.accessAccounts()
        cy.createAccount('Conta mesmo nome')
        cy.get(locators.MESSAGE).should('contain', 'Erro: Error: Request failed with status code 400')
    })

})