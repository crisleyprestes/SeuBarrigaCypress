/// <reference types="cypress" />

import biuldEnv from "../../support/buildEnv"
import locators from "../../support/locators"

describe('Should test accounts feature at an interface level', () => {

    afterEach(() => {
        cy.clearLocalStorage()
    })

    beforeEach(() => {
        biuldEnv()
        cy.login('crisley@mail.com', '123456')
    })

    it('Should create an account', () => {
        cy.intercept('POST', '/contas', {
            id: 3,
            nome: 'Conta de teste',
            visivel: true,
            usuario_id: 1
        }).as('saveConta')

        cy.accessAccounts()

        cy.intercept('GET', '/contas', 
            [
            {id: 1, nome: 'Carteira', visivel: true, usuario_id: 1},
            {id: 2, nome: 'Banco', visivel: true, usuario_id: 1},
            {id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1}
            ]
        ).as('contasSave')

        cy.createAccount('Conta de teste')
        cy.get(locators.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should update an account', () => {
        cy.intercept('PUT', '/contas/**', {
            id: 1,
            nome: 'Conta alterada',
            visivel: true,
            usuario_id: 1
        }).as('alterarConta')

        cy.accessAccounts()

        cy.intercept('GET', '/contas', 
            [
            {id: 1, nome: 'Conta alterada', visivel: true, usuario_id: 1},
            {id: 2, nome: 'Banco', visivel: true, usuario_id: 1}
            ]
        ).as('contas')

        cy.updateAccount('Carteira', 'Conta alterada')
        cy.get(locators.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
        cy.xpath(locators.CONTAS.CONTA_ALTERADA('Conta alterada')).should('exist')
    })

    it('Should not create an account with same name', () => {
        cy.intercept('POST', '/contas', {
            error: 'Já existe uma conta com esse nome!',
            statusCode: 400
        }).as('saveContaMesmoNome')

        cy.accessAccounts()
        cy.createAccount('Conta mesmo nome')
        cy.get(locators.MESSAGE).should('contain', 'Erro: Error: Request failed with status code 400')
    })

    it.only('Should validate data send to create an account', () => {
        cy.intercept('POST', '/contas', {
            id: 3,
            nome: 'Conta de teste',
            visivel: true,
            usuario_id: 1
        }).as('saveConta')

        cy.accessAccounts()

        cy.intercept('GET', '/contas', 
            [
            {id: 1, nome: 'Carteira', visivel: true, usuario_id: 1},
            {id: 2, nome: 'Banco', visivel: true, usuario_id: 1},
            {id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1}
            ]
        ).as('contasSave')

        cy.createAccount('Conta de teste')
        cy.wait('@saveConta').its('request.body.nome').should('not.be.empty')
        cy.get(locators.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })
})