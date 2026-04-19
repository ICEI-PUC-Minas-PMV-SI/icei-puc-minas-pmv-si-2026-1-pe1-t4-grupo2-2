# Programação de Funcionalidades na Aplicação

Implementação das funcionalidades da aplicação web voltada para conectar doadores e pessoas afetadas por desastres naturais. As funcionalidades foram desenvolvidas com base nos requisitos funcionais definidos no projeto, e são essenciais no processo de realização do cadastro de usuários, registro de doações, solicitações de ajuda e o status do pedido.

Para cada requisito funcional, pode ser entregue um artefato desse tipo.

O professor Rommel Carneiro apresenta alguns exemplos prontos para serem utilizados como referência:
- Login do sistema: [https://repl.it/@rommelpuc/LoginApp](https://repl.it/@rommelpuc/LoginApp) 
- Cadastro de Contatos: [https://repl.it/@rommelpuc/Cadastro-de-Contatos](https://repl.it/@rommelpuc/Cadastro-de-Contatos)


> **Links Úteis**:
>
> - [Trabalhando com HTML5 Local Storage e JSON](https://www.devmedia.com.br/trabalhando-com-html5-local-storage-e-json/29045)
> - [JSON Tutorial](https://www.w3resource.com/JSON)
> - [JSON Data Set Sample](https://opensource.adobe.com/Spry/samples/data_region/JSONDataSetSample.html)
> - [JSON - Introduction (W3Schools)](https://www.w3schools.com/js/js_json_intro.asp)
> - [JSON Tutorial (TutorialsPoint)](https://www.tutorialspoint.com/json/index.htm)

## Exemplo

## Requisitos Atendidos

As tabelas que se seguem apresentam os requisitos funcionais e não-funcionais que relacionam o escopo do projeto com os artefatos criados:

### Requisitos Funcionais

|ID    | Descrição do requisito   | Responsável | Artefato criado |
|------|--------------------------|-------------|-----------------|

|RF-001| A aplicação deve permitir o cadrasto de usuário (doador ou receptor)    | João | index.html |
|RF-002| A aplicação deve permitir o usuário a fazer o login                     | Ana Paula | cadastro-noticia.html |
|RF-003 A aplicação deve permitir o acesso das solicitações de doação            | João | index.html |
|RF-004| A aplicação deve permitir o aceso ao status da doação                   | Ana Paula | cadastro-noticia.html |
|RF-005| A aplicação deve permitir que usuários visualizem solicitações de ajuda | João | index.html |
|RF-006| A aplicação deve permitir que usuários encontrem doadores e receptores  | João | index.html |



## Descrição das estruturas:

## Doação
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Quantidade     | Numero (Inteiro)  | Número de itens a serem doados            | 10                                             |
| Id do usuário  | Numero (Inteiro)  | Doador ou Receptor                        | Doador                                         |
| Id da doação   | Roupas            | Conteúdo do item                          | Casacos de inverno para adultos                |
| Status         | ...               | Pendente, Enviado ou Entregue             | Entregue                                       |

