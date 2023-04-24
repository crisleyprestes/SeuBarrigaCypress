/// <reference types="cypress" />

import locators from "../../support/locators"

describe('Should test accounts feature at an interface level', () => {

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

        cy.login('crisley@mail.com', '123456')
    })

    it('Should create an account', () => {
        cy.intercept('GET', '/contas', 
            [{
                id: 1,
                nome: 'Carteira',
                visivel: true,
                usuario_id: 1
            },
            {
                id: 2,
                nome: 'Banco',
                visivel: true,
                usuario_id: 1
            }]
        ).as('contas')

        cy.intercept('POST', '/contas', {
            id: 3,
            nome: 'Conta de teste',
            visivel: true,
            usuario_id: 1
        }).as('saveConta')

        cy.accessAccounts()

        cy.intercept('GET', '/contas', 
            [{
                id: 1,
                nome: 'Carteira',
                visivel: true,
                usuario_id: 1
            },
            {
                id: 2,
                nome: 'Banco',
                visivel: true,
                usuario_id: 1
            },
            {
                id: 3,
                nome: 'Conta de teste',
                visivel: true,
                usuario_id: 1
            }
        ]
        ).as('contasSave')

        cy.createAccount('Conta de teste')
        cy.get(locators.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it.only('Should update an account', () => {
        cy.intercept('GET', '/contas', 
            [{
                id: 1,
                nome: 'Carteira',
                visivel: true,
                usuario_id: 1
            },
            {
                id: 2,
                nome: 'Banco',
                visivel: true,
                usuario_id: 1
            }]
        ).as('contas')

        cy.intercept('PUT', '/contas/**', {
            id: 1,
            nome: 'Conta alterada',
            visivel: true,
            usuario_id: 1
        }).as('alterarConta')

        cy.accessAccounts()

        cy.intercept('GET', '/contas', 
        [{
            id: 1,
            nome: 'Conta alterada',
            visivel: true,
            usuario_id: 1
        },
        {
            id: 2,
            nome: 'Banco',
            visivel: true,
            usuario_id: 1
        }]
        ).as('contas')

        cy.updateAccount('Carteira', 'Conta alterada')
        cy.get(locators.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
        cy.xpath(locators.CONTAS.CONTA_ALTERADA('Conta alterada')).should('exist')
    })

    it('Should not create an account with same name', () => {
        cy.accessAccounts()
        cy.createAccount('Conta mesmo nome')
        cy.get(locators.MESSAGE).should('contain', 'Erro: Error: Request failed with status code 400')
    })

})