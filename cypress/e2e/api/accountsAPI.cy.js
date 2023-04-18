/// <reference types="cypress" />

describe('Should test accounts feature at API level', () => {
    let token

    beforeEach(() => {
        cy.getToken('crisley@mail.com', '123456')
            .then(userToken => {
                token = userToken
            })
    })

    it('Should create an account', () => {
            cy.request({
                url: 'https://barrigarest.wcaquino.me/contas',
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

    it('Should update an account', () => {
    })

    it('Should not create an account with same name', () => {
    })

})