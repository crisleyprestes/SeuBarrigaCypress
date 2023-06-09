const locators = {
    LOGIN: {
        USER: '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        SETTINGS: '[data-test="menu-settings"]',
        MOVIMENTACAO: '[data-test="menu-movimentacao"]',
        HOME: '[data-test="menu-home"]',
        EXTRATO: '[data-test="menu-extrato"]',
        COLLAPSE: 'button[class="navbar-toggler"]'
    },
    SETTINGS: {
        RESET: '[href="/reset"]',
        CONTAS: '[href="/contas"]'
    },
    CONTAS: {
        NOME: '[data-test="nome"]',
        CONTA_ALTERADA: nome_conta => `//td[contains(.,'${nome_conta}')]`,
        BTN_SALVAR: '.btn'
    },
    MOVIMENTACAO: {
        DESCRICAO: '[data-test="descricao"]',
        DATA_TRANSACAO: '[data-test="data-transacao"]',
        VALOR: '[data-test="valor"]',
        INTERESSADO: '[data-test="envolvido"]',
        CONTA: '[data-test="conta"]',
        BTN_STATUS: '[data-test="status"]',
        BTN_SALVAR: '.btn-primary'
    },
    EXTRATO: {
        MOVIMENTACOES: '//li[@data-test]',
        MOVIMENTACAO_CADASTRADA: (description, value) => `//span[contains(., '${description}')]/following-sibling::small[contains(., '${value}')]`,
        ICON_DELETAR: description => `//li[contains(., "${description}")]//i[@class="far fa-trash-alt"]`,
        ICON_EDITAR: description => `//li[contains(., "${description}")]//i[@class="fas fa-edit"]`,
        MOVIMENTACAO_EXCLUIDA: description => `//span[contains(., '${description}')]`,
        GET_LINHA: description => `//span[contains(.,'${description}')]/../../../..`
    },
    HOME: {
        SALDO_CONTA: nome_conta => `//td[contains(., '${nome_conta}')]/following-sibling::td`,
        SALDO_TOTAL: '//td[contains(., "Total")]/following-sibling::td'
    },
    MESSAGE: '.toast-message'
}

export default locators;