/// <reference types="cypress" />

import locators from "../../../support/locators"

describe('Should test balance feature at a functional level', () => {

    beforeEach(() => {
        cy.login('crisley@mail.com', '123456')
        cy.resetData()
    })

    it('Should get balance', () => {
        cy.get(locators.MENU.HOME).click()
        cy.xpath(locators.HOME.SALDO_CONTA('Conta para saldo')).should('contain', '534,00')
        cy.xpath(locators.HOME.SALDO_TOTAL)
            .should('contain', '-')
            .and('contain', '2.686,00')
    })
})