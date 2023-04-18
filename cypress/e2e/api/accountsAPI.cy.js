/// <reference types="cypress" />

describe('Should test accounts feature at API level', () => {

    beforeEach(() => {
        cy.loginAPI('crisley@mail.com', '123456')
    })

    it('Should create an account', () => {
    })

    it('Should update an account', () => {
    })

    it('Should not create an account with same name', () => {
    })

})