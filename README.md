# SeuBarrigaCypress

## Descrição

Este repositório se refere à automação da aplicação [**_Seu Barriga_**](https://barrigareact.wcaquino.me/)

## Setup do Projeto

Para este projeto são necessários as seguintes aplicações/ferramentas:

- [Node.js (versão 18.5.0 ou superior)](https://nodejs.org/en)
- [Cypress (versão 12.9.0 ou superior)](https://www.cypress.io/)
- [Cypress/Xpath (versão 2.0.3 ou superior)](https://github.com/cypress-io/cypress/tree/develop/npm/xpath)
- [Git (versão 2.39.1)](https://git-scm.com/downloads)
- [VS Code (versão 1.77.0)](https://code.visualstudio.com/download)

## Configurando o Setup do Projeto

Este projeto foi implementado e executado no *_Windows_*, logo os passos abaixo foram executados para este sistema operacional.

### Node.js

- Baixe o [instalador](https://nodejs.org/dist/v18.15.0/node-v18.15.0-x64.msi) e execute-o. Após finalizar a instalação, execute no CMD o comando abaixo:
<pre>npm -v</pre>

- Deverá ser exibida a seguinte saída:
<pre>v18.15.0</pre>

### Cypress

- No CMD, navegue até o diretório raiz do projeto e execute o comando abaixo:
<pre>npm install cypress</pre>

- Aguarde a instalação ser finalizada. Exeucte o comando abaixo:
<pre>npx cypress --version</pre>

- Deverá ser exibida a seguinte saída:
<pre>Cypress package version: 12.9.0
Cypress binary version: 12.9.0
Electron version: 21.0.0
Bundled Node version:
16.16.0</pre>

### Cypress/Xpath

- No CMD, navegue até o diretório raiz do projeto e execute o comando abaixo:
<pre>npm install @cypress/xpath</pre>

- Aguarde a instalação ser finalizada. O plugin será adicionado como uma dependência dentro do arquivo _**package.json**_.

- Em seguida, em _**support/index.js**_ ou _**e2e.js**_, adicione a seguinte linha de código:
<pre>require('@cypress/xpath');</pre>

- Salve o arquivo e a dependência será carregada para dentro do projeto. Para utilizá-la, basta chamá-la dentro de cada teste usando a seguinte sintaxe:
<pre>cy.xpath('xpathLocator')</pre>

### Git

- Execute o instalador do *_git_* e após finalizar a instalação, execute no CMD:
<pre>git -v</pre>

- Deverá ser exibida a seguinte saída:
<pre>git version 2.39.1.windows.1</pre>

## Clonando e Importando o Projeto

- Execute o comando abaixo no CMD:
<pre>npm init -y</pre>

- No CMD, execute o comando *_git clone_*:
<pre>https://github.com/crisleyprestes/curso-cypress.git</pre>

- Aguarde o clone ser finalizado. Em seguida, o projeto pode ser importado para o **_VS Code_**.

## Executando os Testes

- No CMD, navegue até o diretório raiz do projeto e execute o comando:
<pre>npx cypress run</pre>

- Os testes serão executados em modo _headless_ e após a sua finalização será exibido a seguinte saída:
<pre>====================================================================================================

  (Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ √  arrow.spec.js                            154ms        3        3        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  asserts.spec.js                          424ms        7        7        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  basic.spec.js                            00:04        1        1        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  describe.spec.js                         118ms        3        3        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  elements.spec.js                         00:02        1        1        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  promises.spec.js                          91ms        1        1        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  sync.spec.js                             00:02        1        1        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    √  All specs passed!                        00:10       17       17        -        -        -
    
    </pre>
    
- Caso opte por executar os testes usando a GUI do Cypress, execute o comando abaixo no diretório raiz do projeto:
<pre>npx cypress open</pre>

- Na GUI do Cypress, selecione o browser e os testes que deseja executar (_Recomendável utilizar o **Electron**_).


## Implementação do Código

- Os testes estão implementados no diretório _**cypress/integration**_.
- Configurações gerais do projeto estão no arquivo _**cypress.json**_.
