/// <reference types="cypress" />

import biuldEnv from "../../support/buildEnv"
import locators from "../../support/locators"
import moment from "moment"

describe('Should test transactions feature at an interface level', () => {

    afterEach(() => {
        cy.clearLocalStorage()
    })

    beforeEach(() => {
        biuldEnv()
        cy.login('crisley@mail.com', 'senha errada')
    })

    it.only('Should create a transaction', () => {
        cy.intercept('POST', '/transacoes', {
            id: 31433,
            descricao: 'Teste',
            envolvido: 'Crisley',
            observacao: null,
            tipo: 'REC',
            data_transacao: "2023-04-24T03:00:00.000Z",
            data_pagamento: "2023-04-24T03:00:00.000Z",
            valor: 123
        })

        cy.intercept('GET', '/extrato/**', 
        [
        {conta: "Conta com movimentacao", id: 1610912, descricao: "Movimentacao de conta", envolvido: "BBB", observacao: null, tipo: "DESP", data_transacao: "2023-04-24T03:00:00.000Z", data_pagamento: "2023-04-24T03:00:00.000Z", valor: "-1500.00", status: true, conta_id: 1720266, usuario_id: 36898, transferencia_id: null, parcelamento_id: null},
        {conta: "Conta para saldo", id: 1610913, descricao: "Movimentacao 1, calculo saldo", envolvido: "CCC", observacao: null, tipo: "REC", data_transacao: "2023-04-24T03:00:00.000Z", data_pagamento: "2023-04-24T03:00:00.000Z", valor: "3500.00", status: false, conta_id: 1720267, usuario_id: 36898, transferencia_id: null, parcelamento_id :null},
        {conta: "Conta para saldo", id: 1610914, descricao: "Movimentacao 2, calculo saldo", envolvido: "DDD", observacao: null, tipo: "DESP", data_transacao: "2023-04-24T03:00:00.000Z", data_pagamento: "2023-04-24T03:00:00.000Z", valor: "-1000.00", status: true, conta_id: 1720267, usuario_id: 36898, transferencia_id: null, parcelamento_id: null},
        {conta: "Conta para saldo", id: 1610915, descricao: "Movimentacao 3, calculo saldo", envolvido: "EEE", observacao: null, tipo: "REC", data_transacao: "2023-04-24T03:00:00.000Z", data_pagamento: "2023-04-24T03:00:00.000Z", valor: "1534.00", status: true, conta_id: 1720267, usuario_id: 36898, transferencia_id: null, parcelamento_id: null},
        {conta: "Conta para extrato", id: 1610916, descricao: "Movimentacao para extrato", envolvido: "FFF", observacao: null, tipo: "DESP", data_transacao: "2023-04-24T03:00:00.000Z", data_pagamento: "2023-04-24T03:00:00.000Z", valor: "-220.00", status: true, conta_id: 1720268, usuario_id: 36898, transferencia_id: null, parcelamento_id: null},
        {conta: "Conta para extrato", id: 31433, descricao: "Teste", envolvido: "Crisley", observacao: null, tipo: "REC", data_transacao: "2023-04-24T03:00:00.000Z", data_pagamento: "2023-04-24T03:00:00.000Z", valor: "123.00", status: true, conta_id: 1720268, usuario_id: 36898, transferencia_id: null, parcelamento_id: null}
        ])

        cy.createTransaction('Teste', '123', 'Crisley', 'Banco')
        cy.get(locators.MESSAGE).should('contain', 'Movimentação inserida com sucesso!')
        cy.url().should('equal', 'https://barrigareact.wcaquino.me/extrato')
        cy.xpath(locators.EXTRATO.MOVIMENTACOES).should('have.length', 6)
        cy.xpath(locators.EXTRATO.MOVIMENTACAO_CADASTRADA('Teste', '123,00')).should('exist')
    })

    it('Should remove a transaction', () => {
        cy.removeTransaction('Movimentacao para exclusao')
        cy.get(locators.MESSAGE).should('contain', 'Movimentação removida com sucesso!')
        cy.xpath(locators.EXTRATO.MOVIMENTACOES).should('have.length', 6)
        cy.xpath(locators.EXTRATO.MOVIMENTACAO_EXCLUIDA('Movimentacao para exclusao')).should('not.exist')
    })
})