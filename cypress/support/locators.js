const locators = {
    LOGIN: {
        USER: '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        SETTINGS: '[data-test="menu-settings"]',
        MOVIMENTACAO: '[data-test="menu-movimentacao"]'
    },
    SETTINGS: {
        RESET: '[href="/reset"]',
        CONTAS: '[href="/contas"]'
    },
    CONTAS: {
        NOME: '[data-test="nome"]',
        CONTA_ALTERADA: '//td[contains(.,"Conta alterada")]',
        BTN_SALVAR: '.btn'
    },
    MOVIMENTACAO: {
        DESCRICAO: '[data-test="descricao"]',
        VALOR: '[data-test="valor"]',
        INTERESSADO: '[data-test="envolvido"]',
        BTN_SALVAR: '.btn-primary'
    },
    EXTRATO: {
        MOVIMENTACOES: '//li[@data-test]',
        MOVIMENTACAO_CADASTRADA: '//span[contains(., "Desc")]/following-sibling::small[contains(., "123")]'
    },
    MESSAGE: '.toast-message'
}

export default locators;