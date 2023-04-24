/// <reference types="cypress" />

import moment from "moment"

describe('Should test transactions feature at API level', () => {
    let token

    beforeEach(() => {
        cy.getToken('crisley@mail.com', '123456')
            .then(userToken => {
                token = userToken
        })
        cy.resetDataAPI('crisley@mail.com', '123456')  
    })

    it('Should create a transaction', () => {
        cy.getAccountByName('Conta para movimentacoes')
            .then(contaID => {
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
                    headers: { Authorization: `JWT ${token}` },
                    body: {
                        conta_id: contaID,
                        data_pagamento: moment().add({ days: 1 }).format('DD/MM/YYYY'),
                        data_transacao: moment().format('DD/MM/YYYY'),
                        descricao: 'desc',
                        envolvido: 'inter',
                        status: true,
                        tipo: 'REC',
                        valor: '123'
                    }
                }).as('response')
            })

        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')

    })

    it.only('Should remove a transaction', () => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            headers: { Authorization: `JWT ${token} `},
            qs:{
                descricao: 'Movimentacao para exclusao'
            }
        }).then(response => {
            cy.request({
                url: `/transacoes/${response.body[0].id}`,
                method: 'DELETE',
                headers: { Authorization: `JWT ${token} `}
            }).its('status').should('be.equal', 204)
        })
    })
})