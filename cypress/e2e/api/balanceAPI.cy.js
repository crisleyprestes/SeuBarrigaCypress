/// <reference types="cypress" />

import moment from "moment"

describe('Should test balance feature at API level', () => {
    let token

    beforeEach(() => {
        cy.getToken('crisley@mail.com', '123456')
            .then(userToken => {
                token = userToken
        })
        cy.resetDataAPI('crisley@mail.com', '123456')  
    })

    it('Should get balance', () => {
        cy.request({
            url: '/saldo',
            method: 'GET',
            headers: { Authorization: `JWT ${token}` }
        }).then(response => {
            let saldoConta = null
            response.body.forEach(conta => {
                if(conta.conta === 'Conta para saldo') saldoConta = conta.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })
    })

    it('Should get balance updated', () => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            headers: { Authorization: `JWT ${token} `},
            qs:{
                descricao: 'Movimentacao 1, calculo saldo'
            }
        }).then(response => {
            cy.request({
                url: `/transacoes/${response.body[0].id}`,
                method: 'PUT',
                headers: { Authorization: `JWT ${token} `},
                body: {
                    status: true,
                    data_transacao: moment(response.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: moment(response.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: response.body[0].descricao,
                    envolvido: response.body[0].envolvido,
                    valor: response.body[0].valor,
                    conta_id: response.body[0].conta_id
                } 
            }).its('status').should('be.equal', 200)
        })

        cy.request({
            url: '/saldo',
            method: 'GET',
            headers: { Authorization: `JWT ${token}` }
        }).then(response => {
            let saldoConta = null
            response.body.forEach(conta => {
                if(conta.conta === 'Conta para saldo') saldoConta = conta.saldo
            })
            expect(saldoConta).to.be.equal('4034.00')
        })
    })
})