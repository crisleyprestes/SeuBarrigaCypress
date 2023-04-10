const locators = {
    LOGIN: {
        USER: '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        SETTINGS: '[data-test="menu-settings"]'
    },
    SETTINGS: {
        RESET: '[href="/reset"]',
        CONTAS: '[href="/contas"]'
    },
    CONTAS: {
        NOME: '[data-test="nome"]',
        BTN_SALVAR: '.btn'
    },
    MESSAGE: '.toast-message'
}

export default locators;