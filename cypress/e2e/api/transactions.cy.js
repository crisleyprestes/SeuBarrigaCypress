/// <reference types="cypress" />

import moment from "moment"

describe('Should test transactions feature at API level', () => {

    beforeEach(() => {
        cy.getToken('crisley@mail.com', '123456')
        cy.resetDataAPI('crisley@mail.com', '123456')  
    })

    it('Should create a transaction', () => {
        cy.getAccountByName('Conta para movimentacoes')
            .then(contaID => {
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
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

    it('Should remove a transaction', () => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            qs:{
                descricao: 'Movimentacao para exclusao'
            }
        }).then(response => {
            cy.request({
                url: `/transacoes/${response.body[0].id}`,
                method: 'DELETE',
            }).its('status').should('be.equal', 204)
        })
    })
})