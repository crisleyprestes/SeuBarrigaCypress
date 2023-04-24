/// <reference types="cypress" />

describe('Should test accounts feature at API level', () => {

    beforeEach(() => {
        cy.getToken('crisley@mail.com', '123456')
        cy.resetDataAPI('crisley@mail.com', '123456')    
    })

    it('Should create an account', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            body: {
                nome: 'Conta via rest'
            }
        }).as('response')

        cy.get('@response').then(response => {
            expect(response.status).to.be.equal(201)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('nome', 'Conta via rest')
        })
    })

    it('Should update an account', () => {
        cy.getAccountByName('Conta para alterar')
            .then(contaID => {
                cy.request({
                    url: `/contas/${contaID}`,
                    method: 'PUT',
                    body: {
                        nome: 'Conta alterada via rest'
                    }
                }).as('response')
        })

        cy.get('@response').its('status').should('be.equal', 200)
    })

    it('Should not create an account with same name', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(response => {
            expect(response.status).to.be.equal(400)
            expect(response.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })

})