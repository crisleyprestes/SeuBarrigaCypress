/// <reference types="cypress" />

import locators from "../../support/locators"

describe('Should test transactions feature at an interface level', () => {

    afterEach(() => {
        cy.clearLocalStorage()
    })

    beforeEach(() => {
        cy.intercept('POST', '/signin', {
            id: 1000,
            nome: 'Usuario falso',
            token: 'Uma string muito grande que nao deveria ser aceito mas que na verdade vai'
        }).as('signin')

        cy.intercept('GET', '/saldo', 
            [{
                conta_id: 999,
                conta: 'Carteira',
                saldo: '100.00'
            },
            {
                conta_id: 9909,
                conta: 'Banco',
                saldo: '1000000.00' 
            }]
        ).as('saldo')

        cy.login('crisley@mail.com', 'senha errada')
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