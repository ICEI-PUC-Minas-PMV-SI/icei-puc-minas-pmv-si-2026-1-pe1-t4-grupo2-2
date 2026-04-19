# Programação de Funcionalidades na Aplicação

Implementação das funcionalidades da aplicação web voltada para conectar doadores e pessoas afetadas por desastres naturais. As funcionalidades foram desenvolvidas com base nos requisitos funcionais definidos no projeto, e são essenciais no processo de realização do cadastro de usuários, registro de doações, solicitações de ajuda e o status do pedido.

Para cada requisito funcional, pode ser entregue um artefato desse tipo.



## Exemplo

## Requisitos Atendidos

As tabelas que se seguem apresentam os requisitos funcionais e não-funcionais que relacionam o escopo do projeto com os artefatos criados:

### Requisitos Funcionais

|ID    | Descrição do requisito   | Responsável | Artefato criado |                 
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID    | Descrição                                                                                                                                             | Responsável | Artefato Criado          |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------ |
| RF-01 | O sistema deve permitir o cadastro de usuários.                                                                                                       | Anna        | cadastro-usuario.html    |
| RF-02 | O sistema deve permitir o login de usuários.                                                                                                          | Anna        | login.html               |
| RF-03 | O sistema deve armazenar os dados de cadastro do usuário.                                                                                             | Anna        | script.js                |
| RF-04 | O sistema deve armazenar as solicitações feitas pelos usuários.                                                                                       | Anna        | script.js                |
| RF-05 | O sistema deve disponibilizar uma lista de pedidos/solicitações para que os doadores possam visualizar e escolher qual desejam atender.               | Anna        | lista-solicitacoes.html  |
| RF-06 | O sistema deve exigir o envio de dados de validação (endereço, telefone ou CPF/CNPJ) no momento do cadastro para garantir a procedência dos usuários. | Anna        | cadastro-usuario.html    |
| RF-07 | O sistema deve permitir que o usuário acompanhe a entrega do produto via código de rastreio.                                                          | Anna        | acompanhamento.html      |
| RF-08 | O sistema deve permitir que o receptor confirme o recebimento do produto.                                                                             | Anna        | confirmacao-entrega.html |
| RF-09 | O sistema deve permitir a redefinição de senha e e-mail do usuário.                                                                                   | Anna        | perfil.html              |
| RF-10 | O sistema deve permitir filtrar as doações disponíveis por região.                                                                                    | Anna        | lista-solicitacoes.html  |
                                                                                |




## Descrição das estruturas:

## Doação
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Quantidade     | Numero (Inteiro)  | Número de itens a serem doados            | 10                                             |
| Id do usuário  | Numero (Inteiro)  | Doador ou Receptor                        | Doador                                         |
| Id da doação   | Roupas            | Conteúdo do item                          | Casacos de inverno para adultos                |
| Status         | ...               | Pendente, Enviado ou Entregue             | Entregue                                       |

