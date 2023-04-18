/// <reference types="cypress" />

describe('Should test accounts feature at API level', () => {

    beforeEach(() => {
        // cy.loginAPI('crisley@mail.com', '123456')
    })

    it('Should create an account', () => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                email: 'crisley@mail.com',
                redirecionar: false,
                senha: '123456'
            }
        }).its('body.token').should('not.be.empty')
        .then(token => {
            cy.request({
                url: 'https://barrigarest.wcaquino.me/contas',
                method: 'POST',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: 'Conta via rest'
                }
            }).as('response')
        })

        cy.get('@response').then(response => {
            expect(response.status).to.be.equal(201)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('nome', 'Conta via rest')
        })
    })

    it('Should update an account', () => {
    })

    it('Should not create an account with same name', () => {
    })

})