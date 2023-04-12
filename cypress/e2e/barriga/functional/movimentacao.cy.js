/// <reference types="cypress" />

import locators from "../../../support/locators"

describe('Should test transactions feature at a functional level', () => {

    beforeEach(() => {
        cy.login('crisley@mail.com', '123456')
        cy.resetData()
    })

    it('Should create a transaction', () => {
        cy.accessTransactions()
        cy.createTransaction('Desc', '123', 'Inter')
        cy.get(locators.MESSAGE).should('contain', 'Movimentação inserida com sucesso!')
        cy.url().should('equal', 'https://barrigareact.wcaquino.me/extrato')
        cy.xpath(locators.EXTRATO.MOVIMENTACOES).should('have.length', 7)
        cy.xpath(locators.EXTRATO.MOVIMENTACAO_CADASTRADA('Desc', '123')).should('exist')
    })
})