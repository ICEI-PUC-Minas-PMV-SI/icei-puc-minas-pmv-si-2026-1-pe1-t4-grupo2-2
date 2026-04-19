# Especificações CareConnect

Esta seção apresenta a programação das funcionalidades da aplicação web desenvolvida para conectar doadores a pessoas afetadas por desastres naturais. Serão descritas as implementações realizadas com base nos requisitos definidos, as funcionalidades e os artefatos criados.

## Personas

Ana Paula tem 28 anos, é professora e mora em Belo Horizonte. Acompanha frequentemente notícias sobre desastres naturais e se sente motivada a ajudar pessoas em situações de vulnerabilidade. No entanto, muitas vezes não sabe como ou onde realizar doações de forma segura. Busca uma plataforma confiável onde possa visualizar pedidos reais e doar roupas e alimentos de forma prática e transparente.


## Histórias de Usuários


|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | Registrar a doação pelo site       | Ajudar as pessoas necessitadas         |
|Administrador       | Gerenciar solicitações             | Garantir o envio e a segurança         |


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade | 
|------|-----------------------------------------|----| 
|RF-001| O sistema deve permitir o cadastro de usuários. |
|RF-002| O sistema deve permitir o login de usuários. |
|RF-003| O sistema deve disponibilizar uma lista de pedidos/solicitações para que os doadores possam visualizar e escolher qual desejam atender. 
|RF-004| O sistema deve exigir o envio de dados de validação (endereço, telefone ou CPF/CNPJ) no momento do cadastro para garantir a procedência dos usuários. 
|RF-005| O sistema deve permitir que o usuário acompanhe a entrega do produto via código de rastreio. 
|RF-006| O sistema deve permitir que o receptor confirme o recebimento do produto.
|RF-007| O sistema deve permitir a redefinição de senha e e-mail do usuário.
|RF-008| O sistema deve permitir filtrar as doações disponíveis por região. 

### Requisitos não Funcionais
O sistema deve ser responsivo, garantindo o acesso e usabilidade em dispositivos móveis (telas menores). 
O sistema deve criptografar as informações sensíveis dos usuários armazenadas no banco de dados. 
O sistema deve possuir uma interface intuitiva, focada na facilidade de navegação para o usuário final. 

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:


## Restrições

|ID| Restrição                                             |
|--|-------------------------------------------------------|

|01| O sistema deve ser desenvolvido utilizando a tríade de tecnologias web: HTML5, CSS3 e JavaScript. |

|02| O sistema deve ser hospedado em um servidor gratuito (ex: GitHub Pages ou o próprio deploy do Apps Script). |

|03| O sistema deve priorizar o uso de APIs gratuitas e seguras para funcionalidades externas. |

|04| O sistema deve ser leve, evitando o uso excessivo de mídias (imagens/vídeos) para garantir carregamento rápido em conexões lentas. |

|05| O sistema deve utilizar Google Sheets (Planilhas) como base de dados para o armazenamento das informações. |

