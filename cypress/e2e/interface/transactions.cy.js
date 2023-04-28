/// <reference types="cypress" />

import biuldEnv from "../../support/buildEnv"
import locators from "../../support/locators"

describe('Should test transactions feature at an interface level', () => {

    afterEach(() => {
        cy.clearLocalStorage()
    })

    beforeEach(() => {
        biuldEnv()
        cy.login('crisley@mail.com', 'senha errada')
    })

    it.only('Should create a transaction', () => {
        cy.intercept('POST', '/transacoes', {
            id: 31433,
            descricao: 'Teste',
            envolvido: 'Crisley',
            observacao: null,
            tipo: 'REC',
            data_transacao: "2023-04-24T03:00:00.000Z",
            data_pagamento: "2023-04-24T03:00:00.000Z",
            valor: 123
        })

        cy.fixture('movimentacaoSalva').then((movimentacaoSalva) => {
            cy.intercept('GET', '/extrato/**', movimentacaoSalva)
        })

        cy.createTransaction('Teste', '123', 'Crisley', 'Banco')
        cy.get(locators.MESSAGE).should('contain', 'Movimentação inserida com sucesso!')
        cy.url().should('equal', 'https://barrigareact.wcaquino.me/extrato')
        cy.xpath(locators.EXTRATO.MOVIMENTACOES).should('have.length', 6)
        cy.xpath(locators.EXTRATO.MOVIMENTACAO_CADASTRADA('Teste', '123,00')).should('exist')
    })

    it('Should remove a transaction', () => {
        cy.removeTransaction('Movimentacao para exclusao')
        cy.get(locators.MESSAGE).should('contain', 'Movimentação removida com sucesso!')
        cy.xpath(locators.EXTRATO.MOVIMENTACOES).should('have.length', 6)
        cy.xpath(locators.EXTRATO.MOVIMENTACAO_EXCLUIDA('Movimentacao para exclusao')).should('not.exist')
    })
})