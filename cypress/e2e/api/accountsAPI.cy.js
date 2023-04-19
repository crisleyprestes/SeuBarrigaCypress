/// <reference types="cypress" />

describe('Should test accounts feature at API level', () => {
    let token

    beforeEach(() => {
        cy.getToken('crisley@mail.com', '123456')
            .then(userToken => {
                token = userToken
            })
        cy.resetDataAPI('crisley@mail.com', '123456')    
    })

    it('Should create an account', () => {
            cy.request({
                url: '/contas',
                method: 'POST',
                headers: { Authorization: `JWT ${token}` },
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

    it.only('Should update an account', () => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(response => {
            cy.request({
                url: `/contas/${response.body[0].id}`,
                method: 'PUT',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: 'Conta alterada via rest'
                }
            }).as('response')
        })

        cy.get('@response').its('status').should('be.equal', 200)
    })

    it('Should not create an account with same name', () => {
    })

})