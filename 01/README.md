## App CLI

Esse readme contêm melhorias e funcionalidades adicionais que fiz com base no projeto feito na live pré js-expert do erick wendel link: https://www.youtube.com/watch?v=Gvamncn_wG0

<br />

### Tecnologias

- Node js v15
- Javascript
- Commander js
- ChalkTable
- Chalk
- Jest
- DraftLog - (futura implementação)

<br />

### Funcionalidades Adicionais

Utilizando commander js, criei commandos que executam cada uma das queries do FluentSQLBuilder, parte principal do projeto.

<br />

### Como utilizar

<br />

Navegar até a pasta 01 <br />

Comando base - a flag --experimental-json-modules é necessaria para importação direta de um arquivo json;

     node --experimental-json-modules src/terminalController.js

Digitando o commando a seguir você pode ver todos os comandos disponiveis

    node --experimental-json-modules src/terminalController.js --help

```
Options:
  -V, --version            output the version number
  -w, --where [value...]   condition to select a user
  -s, --select [value...]  fields to select from data
  -o, --orderBy, [value]   field from data to orderBy
  -l, --limit [value]      results limit
  -b, --build              finish query
  -h, --help               display help for command
```

Exemplos

Where

```
    -w 'category:developer' // --where 'field:example'
```

Select

```
    -s name category registered
```

OrderBy

```
    -o name // --orderBy field
```

Limit

```
    -l 50 // --limit number
```

<br />

<b>caso o campo nao seja passado, irá usar o valor default</b>

<br />

Exemplo completo

    node --experimental-json-modules src/terminalController.js --where 'category:developer' --limit 5 --orderBy name --select name category registered --buildv

Resultado esperado

<img width="397" alt="Captura de Tela 2021-03-21 às 21 16 30" src="https://user-images.githubusercontent.com/45431385/111926220-b911bf00-8a8a-11eb-857c-a0dc33fa9b91.png">
