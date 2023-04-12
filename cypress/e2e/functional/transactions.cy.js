/// <reference types="cypress" />

import locators from "../../support/locators"

describe('Should test transactions feature at a functional level', () => {

    beforeEach(() => {
        cy.login('crisley@mail.com', '123456')
        cy.resetData()
    })

    it('Should create a transaction', () => {
        cy.createTransaction('Teste', '123', 'Crisley', 'Conta para movimentacoes')
        cy.get(locators.MESSAGE).should('contain', 'Movimentação inserida com sucesso!')
        cy.url().should('equal', 'https://barrigareact.wcaquino.me/extrato')
        cy.xpath(locators.EXTRATO.MOVIMENTACOES).should('have.length', 7)
        cy.xpath(locators.EXTRATO.MOVIMENTACAO_CADASTRADA('Teste', '123,00')).should('exist')
    })

    it('Should remove a transaction', () => {
        cy.removeTransaction('Movimentacao para exclusao')
        cy.get(locators.MESSAGE).should('contain', 'Movimentação removida com sucesso!')
        cy.xpath(locators.EXTRATO.MOVIMENTACOES).should('have.length', 6)
        cy.xpath(locators.EXTRATO.MOVIMENTACAO_EXCLUIDA('Movimentacao para exclusao')).should('not.exist')
    })
})