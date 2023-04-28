/// <reference types="cypress" />

import locators from "../../support/locators"
import biuldEnv from "../../support/buildEnv"

describe('Should test balance feature at an interface level', () => {

    afterEach(() => {
        cy.clearLocalStorage()
    })

    beforeEach(() => {
        biuldEnv()
        cy.login('crisley@mail.com', 'senha errada')
    })

    it('Should get balance', () => {
        cy.get(locators.MENU.HOME).click()
        cy.xpath(locators.HOME.SALDO_CONTA('Carteira')).should('contain', '100,00')
        cy.xpath(locators.HOME.SALDO_TOTAL)
            .should('contain', '1.000.100,00')
    })

    it.only('Should get balance updated', () => {
        cy.fixture('movimentacaoParaSaldo').then((movimentacaoParaSaldo) => {
            cy.intercept('GET', '/transacoes/**', movimentacaoParaSaldo)
        })

        cy.fixture('movimentacaoParaSaldo').then((movimentacaoParaSaldo) => {
            cy.intercept('PUT', '/transacoes/**', movimentacaoParaSaldo)
        })

        cy.editTransaction('Movimentacao 1, calculo saldo')
        cy.get(locators.MESSAGE).should('contain', 'Movimentação alterada com sucesso!')

        cy.fixture('getSaldo').then((getSaldo) => {
            cy.intercept('GET', '/saldo', getSaldo)
        })

        cy.get(locators.MENU.HOME).click()
        cy.xpath(locators.HOME.SALDO_CONTA('Carteira')).should('contain', '4.034,00')
        cy.xpath(locators.HOME.SALDO_TOTAL).should('contain', '1.004.034,00')
    })
})