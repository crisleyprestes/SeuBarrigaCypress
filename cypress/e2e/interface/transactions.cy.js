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

    it('Should create a transaction', () => {
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
        cy.intercept('DELETE', '/transacoes/**', {
            statusCode: 204
        }).as('deleteConta')

        cy.removeTransaction('Movimentacao de conta')
        cy.get(locators.MESSAGE).should('contain', 'Movimentação removida com sucesso!')
    })

    it('Should test colors', () => {
        cy.fixture('contasStatus').then((contasStatus) => {
            cy.intercept('GET', '/extrato/**', contasStatus)
        })

        cy.get(locators.MENU.EXTRATO).click()
        cy.xpath(locators.EXTRATO.GET_LINHA('Receita paga')).should('have.class', 'receitaPaga')
        cy.xpath(locators.EXTRATO.GET_LINHA('Receita pendente')).should('have.class', 'receitaPendente')
        cy.xpath(locators.EXTRATO.GET_LINHA('Despesa paga')).should('have.class', 'despesaPaga')
        cy.xpath(locators.EXTRATO.GET_LINHA('Despesa pendente')).should('have.class', 'despesaPendente')
    })

    it('Should test the responsiveness', () => {
        cy.get(locators.MENU.HOME).should('exist')
            .and('be.visible')
        cy.get(locators.MENU.COLLAPSE).should('be.not.visible') 
        cy.viewport(500, 700)
        cy.get(locators.MENU.HOME).should('exist')
            .and('be.not.visible')
        cy.get(locators.MENU.COLLAPSE).should('be.visible')

        cy.viewport('iphone-5')
        cy.get(locators.MENU.HOME).should('exist')
            .and('be.not.visible')
        cy.get(locators.MENU.COLLAPSE).should('be.visible')
        
        cy.viewport('ipad-2')
        cy.get(locators.MENU.HOME).should('exist')
            .and('be.visible')
        cy.get(locators.MENU.COLLAPSE).should('be.not.visible') 
    })
})