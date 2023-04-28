const biuldEnv = () => {
    cy.intercept('POST', '/signin', {
        id: 1000,
        nome: 'Usuario falso',
        token: 'Uma string muito grande que nao deveria ser aceito mas que na verdade vai'
    }).as('signin')

    cy.intercept('GET', '/saldo', 
        [
        {conta_id: 999, conta: 'Carteira', saldo: '100.00'},
        {conta_id: 9909, conta: 'Banco', saldo: '1000000.00'}
        ]
    ).as('saldo')

    cy.intercept('GET', '/contas', 
    [
    {id: 1, nome: 'Carteira', visivel: true, usuario_id: 1},
    {id: 2, nome: 'Banco', visivel: true, usuario_id: 1}
    ]
    ).as('contas')

    cy.intercept('GET', '/extrato/**', 
    [
    {conta: "Conta com movimentacao", id: 1610912, descricao: "Movimentacao de conta", envolvido: "BBB", observacao: null, tipo: "DESP", data_transacao: "2023-04-24T03:00:00.000Z", data_pagamento: "2023-04-24T03:00:00.000Z", valor: "-1500.00", status: true, conta_id: 1720266, usuario_id: 36898, transferencia_id: null, parcelamento_id: null},
    {conta: "Conta para saldo", id: 1610913, descricao: "Movimentacao 1, calculo saldo", envolvido: "CCC", observacao: null, tipo: "REC", data_transacao: "2023-04-24T03:00:00.000Z", data_pagamento: "2023-04-24T03:00:00.000Z", valor: "3500.00", status: false, conta_id: 1720267, usuario_id: 36898, transferencia_id: null, parcelamento_id :null},
    {conta: "Conta para saldo", id: 1610914, descricao: "Movimentacao 2, calculo saldo", envolvido: "DDD", observacao: null, tipo: "DESP", data_transacao: "2023-04-24T03:00:00.000Z", data_pagamento: "2023-04-24T03:00:00.000Z", valor: "-1000.00", status: true, conta_id: 1720267, usuario_id: 36898, transferencia_id: null, parcelamento_id: null},
    {conta: "Conta para saldo", id: 1610915, descricao: "Movimentacao 3, calculo saldo", envolvido: "EEE", observacao: null, tipo: "REC", data_transacao: "2023-04-24T03:00:00.000Z", data_pagamento: "2023-04-24T03:00:00.000Z", valor: "1534.00", status: true, conta_id: 1720267, usuario_id: 36898, transferencia_id: null, parcelamento_id: null},
    {conta: "Conta para extrato", id: 1610916, descricao: "Movimentacao para extrato", envolvido: "FFF", observacao: null, tipo: "DESP", data_transacao: "2023-04-24T03:00:00.000Z", data_pagamento: "2023-04-24T03:00:00.000Z", valor: "-220.00", status: true, conta_id: 1720268, usuario_id: 36898, transferencia_id: null, parcelamento_id: null}
    ]
    )
}

export default biuldEnv