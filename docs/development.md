# Programação de Funcionalidades

## Requisitos Atendidos

As tabelas que se seguem apresentam os requisitos funcionais e não-funcionais que relacionam o escopo do projeto com os artefatos criados:

### Requisitos Funcionais

| ID | Descrição do Requisito | Responsável | Artefato Criado |
|:---|:---|:---:|:---|
| RF-01 | **Cadastro de Usuários** - O sistema deve permitir que novos usuários se registrem fornecendo dados básicos para acesso. | João | `tela_cadastro.html`, `script.js` |
| RF-02 | **Login de Usuários** - O sistema deve permitir o acesso seguro de usuários cadastrados através de e-mail e senha. | Ana Paula | `tela_login.html`, `script.js` |
| RF-05 | **Listagem de Pedidos** - Exibição de uma lista de solicitações para que doadores visualizem e escolham quais atender. | João | `tela_pedidos.html`, `pedidos.json` |
| RF-06 | **Validação de Dados** - Exigir o envio de documentos (CPF/CNPJ) e endereço no cadastro para garantir a procedência. | Ana Paula | `tela_cadastro.html`, `valida_dados.js` |
| RF-07 | **Rastreio de Entrega** - O sistema deve permitir que o usuário acompanhe o status da entrega via código de rastreio. | João | `tela_rastreio.html`, `api_entrega.js` |
| RF-08 | **Confirmação de Recebimento** - Interface para que o receptor confirme formalmente que recebeu o produto doado. | Ana Paula | `confirmacao.html`, `script.js` |
| RF-09 | **Redefinição de Perfil** - Funcionalidade para que o usuário realize a troca de sua senha e e-mail cadastrados. | João | `perfil.html`, `redefinir.js` |
| RF-10 | **Filtro por Região** - Sistema de busca avançada que permite filtrar as doações disponíveis por localização. | Ana Paula | `tela_pedidos.html`, `filtros.js` |

## Descrição das estruturas:

### Usuário

| Nome | Tipo | Descrição | Exemplo |
| :--- | :--- | :--- | :--- |
| Id | Número (Inteiro) | Identificador único do usuário | 1 |
| Nome | Texto | Nome completo do usuário | Victor Martins de Albuquerque |
| Data de Nascimento | Data | Data de nascimento do usuário | 20/08/2007 |
| Cidade | Texto | Cidade do usuário | Belo Horizonte |
| Estado | Texto | Estado do usuário | Minas Gerais |
| Perfil | Texto | Perfil do usuário (Solicitante, doador ou ONG) | Solicitante |
| Documento | Texto | Documento do usuário (Opcional para os perfis: solicitante e doador) | 110.216.850-54 |
| E-mail | Texto | E-mail do usuário | victor.martins@gmail.com |
| Senha | Texto | Senha do usuário (decodada para maior segurança) | ******* |

---

### Pedido

| Nome | Tipo | Descrição | Exemplo |
| :--- | :--- | :--- | :--- |
| Id Pedido | Número (Inteiro) | Identificador único do pedido | 203 |
| Título | Texto | Título do pedido | Preciso de roupas de frio para enfrentar o inverno |
| Categoria ID | Número (Inteiro) | Identificador único das categórias de pedidos | 3 (Roupas) |
| Categoria | Lista de Texto | Categorias pré-definidas em um campo de lista suspensa | [Alimentos, Roupas, Itens Gerais, (...)] |
| Descrição | Texto | Descrição do solicitante | Sou de São Paulo e sou mãe de três filhas. Com a chegada do inverno, estamos precisando de doações de roupas de frio para nos ajudar a passar por esse período com mais conforto e dignidade. Qualquer ajuda será muito bem-vinda. 💙 |

---

### Envia Pedido

| Nome | Tipo | Descrição | Exemplo |
| :--- | :--- | :--- | :--- |
| Id Envio | Número (Inteiro) | Identificador único do Envio | 555 |
| Código de Rastreio | Texto | Código de rastreamento do envio | EF532353931QZ |
| Mensagem | Texto | Mensagem do doador para o solicitante | Olá, fulano. Fico muito feliz em poder ajudar. Espero que esses itens contribuam para que você e sua família se estruturarem melhor. Um abraço! |