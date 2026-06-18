# Testes

Neste projeto serão realizados dois tipos de testes:

 - O **Teste de Software**, que utiliza uma abordagem de caixa preta, e tem por objetivo verificar a conformidade do software com os requisitos funcionais e não funcionais do sistema.
 - O **Teste de Usabilidade**, que busca avaliar a qualidade do uso do sistema por um usuário do público alvo. 

Se quiser conhecer um pouco mais sobre os tipos de teste de software, leia o documento [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/).

A documentação dos testes é dividida nas seguintes seções:

 - [Plano de Testes de Software](#plano-de-testes-de-software)
 - [Registro dos Testes de Software](#registro-dos-testes-de-software)
 - [Avaliação dos Testes de Software](#avaliação-dos-testes-de-software)
 - [Cenários de Teste de Usabilidade](#cenários-de-teste-de-usabilidade)
 - [Registro dos Testes de Usabilidade](#registro-dos-testes-de-usabilidade)
 - [Avaliação dos Testes de Usabilidade](#avaliação-dos-testes-de-usabilidade)

# Teste de Software

Nesta seção o grupo documentou os testes de software que verificam a correta implementação dos requisitos funcionais e não funcionais do CareConnect. Os testes foram executados de forma automatizada com Playwright (caixa-preta), com capturas de tela como evidência.

## Plano de Testes de Software

---

**Caso de Teste** | **CT01 - Login com credenciais válidas**
 :--------------: | ------------
**Procedimento**  | 1) Acesse a página de Login <br> 2) Preencha o campo "Usuário ou E-mail" com `joao@email.com` <br> 3) Preencha o campo "Senha" com `123456` <br> 4) Clique no botão "ENTRAR"
**Requisitos associados** | RF-002
**Resultado esperado** | Mensagem de boas-vindas exibida e redirecionamento para a página de Pedidos
**Dados de entrada** | E-mail: joao@email.com / Senha: 123456
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT02 - Login com credenciais inválidas**
 :--------------: | ------------
**Procedimento**  | 1) Acesse a página de Login <br> 2) Preencha os campos com dados incorretos <br> 3) Clique em "ENTRAR"
**Requisitos associados** | RF-002
**Resultado esperado** | Mensagem de erro informando credenciais incorretas
**Dados de entrada** | Usuário: usuario_inexistente / Senha: senhaerrada
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT03 - Cadastro de novo usuário**
 :--------------: | ------------
**Procedimento**  | 1) Acesse a página "Criar Conta" <br> 2) Preencha Nome Completo, CPF, Data de Nascimento, CEP <br> 3) Aguarde o preenchimento automático do endereço via API ViaCEP <br> 4) Preencha Perfil, E-mail e Senha <br> 5) Clique em "CADASTRAR"
**Requisitos associados** | RF-001, RF-004
**Resultado esperado** | Usuário cadastrado com sucesso, endereço preenchido automaticamente pelo CEP, redirecionamento para Login
**Dados de entrada** | Nome: Ana Souza Teste / CPF: 529.982.247-25 / CEP: 30130-003 / E-mail: ana.teste.2026@email.com / Perfil: Doador
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT04 - Recuperação de senha**
 :--------------: | ------------
**Procedimento**  | 1) Na tela de Login, clique em "Esqueceu a Senha?" <br> 2) Informe o e-mail cadastrado <br> 3) Clique em "ENVIAR LINK"
**Requisitos associados** | RF-007
**Resultado esperado** | Página de recuperação exibida com formulário de e-mail
**Dados de entrada** | E-mail: joao@email.com
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT05 - Visualização de pedidos de doação**
 :--------------: | ------------
**Procedimento**  | 1) Faça login na plataforma <br> 2) Acesse a página "Pedidos" <br> 3) Visualize a lista de pedidos disponíveis com título, categoria, solicitante e localização
**Requisitos associados** | RF-003
**Resultado esperado** | Lista de pedidos exibida com cards contendo informações do pedido
**Dados de entrada** | Usuário autenticado
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT06 - Criar pedido de doação**
 :--------------: | ------------
**Procedimento**  | 1) Faça login como beneficiário ou ONG <br> 2) Acesse "Criar Pedido" <br> 3) Preencha Título, Categoria e Descrição <br> 4) Clique em "GERAR PEDIDO"
**Requisitos associados** | RF-003
**Resultado esperado** | Pedido criado e salvo no sistema, formulário resetado
**Dados de entrada** | Título: Cesta Básica - Família em Vulnerabilidade / Categoria: Alimentos / Descrição preenchida
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT07 - Doador reserva pedido**
 :--------------: | ------------
**Procedimento**  | 1) Faça login como doador (maria@email.com) <br> 2) Acesse "Pedidos" <br> 3) Localize um pedido disponível <br> 4) Clique em "PEGAR PEDIDO"
**Requisitos associados** | RF-003, RF-005
**Resultado esperado** | Pedido reservado pelo doador, status atualizado para "em andamento"
**Dados de entrada** | Usuário: maria@email.com (perfil Doador)
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT08 - Tela de Transações**
 :--------------: | ------------
**Procedimento**  | 1) Faça login na plataforma <br> 2) Acesse "Transações" no menu de navegação <br> 3) Visualize o histórico de doações
**Requisitos associados** | RF-005, RF-006
**Resultado esperado** | Página de transações carregada com estado correto (lista vazia ou com registros)
**Dados de entrada** | Usuário autenticado
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT09 - Perfil do usuário**
 :--------------: | ------------
**Procedimento**  | 1) Faça login na plataforma <br> 2) Acesse "Meu Perfil" no menu de navegação <br> 3) Visualize as informações do usuário logado
**Requisitos associados** | RF-001
**Resultado esperado** | Dados do usuário exibidos corretamente na tela de perfil
**Dados de entrada** | Usuário autenticado
**Resultado obtido** | Sucesso

---

**Caso de Teste** | **CT10 - Responsividade (layout mobile)**
 :--------------: | ------------
**Procedimento**  | 1) Acesse as páginas Pedidos e Login em viewport mobile (390×844 px) <br> 2) Verifique se o menu hamburguer é exibido e se o layout se adapta à tela
**Requisitos associados** | RNF-001
**Resultado esperado** | Layout responsivo, menu hamburguer visível, conteúdo legível em tela pequena
**Dados de entrada** | Viewport: iPhone 14 (390×844 px)
**Resultado obtido** | Sucesso

---

## Registro dos Testes de Software

### CT01 – Login com credenciais válidas

| Caso de Teste | CT01 – Login com credenciais válidas |
|---|---|
| Requisito Associado | RF-002 – A aplicação deve permitir que os usuários façam login |
| Evidências | ![Tela de login](img/testes/CT01-01_tela_login.png) <br><br> ![Mensagem de sucesso](img/testes/CT01-05_login_sucesso_mensagem.png) <br><br> ![Redirecionado para Pedidos](img/testes/CT01-06_login_redirecionado_pedidos.png) |

---

### CT02 – Login com credenciais inválidas

| Caso de Teste | CT02 – Login com credenciais inválidas |
|---|---|
| Requisito Associado | RF-002 – A aplicação deve informar erro ao inserir credenciais incorretas |
| Evidências | ![Campos vazios — erro](img/testes/CT01-02_login_campos_vazios.png) <br><br> ![Credenciais inválidas — erro](img/testes/CT01-03_login_credenciais_invalidas.png) |

---

### CT03 – Cadastro de novo usuário

| Caso de Teste | CT03 – Cadastro de novo usuário |
|---|---|
| Requisito Associado | RF-001 – A aplicação deve permitir que os usuários criem uma conta; RF-004 – Dados de endereço validados via CEP |
| Evidências | ![Tela criar conta](img/testes/CT03-01_criar_conta_tela.png) <br><br> ![CEP preenchido automaticamente](img/testes/CT03-02_criar_conta_cep_preenchido.png) <br><br> ![Formulário completo](img/testes/CT03-03_criar_conta_formulario_completo.png) <br><br> ![Cadastro realizado](img/testes/CT03-04_criar_conta_resultado.png) |

---

### CT04 – Recuperação de senha

| Caso de Teste | CT04 – Recuperação de senha |
|---|---|
| Requisito Associado | RF-007 – A aplicação deve permitir redefinição de senha |
| Evidências | ![Tela recuperação de senha](img/testes/CT04-01_esqueceu_senha_tela.png) <br><br> ![E-mail preenchido](img/testes/CT04-02_esqueceu_senha_email_preenchido.png) <br><br> ![Resultado](img/testes/CT04-03_esqueceu_senha_resultado.png) |

---

### CT05 – Visualização de pedidos de doação

| Caso de Teste | CT05 – Visualização de pedidos de doação |
|---|---|
| Requisito Associado | RF-003 – A aplicação deve exibir lista de pedidos de doação |
| Evidências | ![Lista de pedidos](img/testes/CT02-01_pedidos_lista.png) <br><br> ![Pedidos — scroll](img/testes/CT02-02_pedidos_scroll.png) |

---

### CT06 – Criar pedido de doação

| Caso de Teste | CT06 – Criar pedido de doação |
|---|---|
| Requisito Associado | RF-003 – A aplicação deve permitir o registro de pedidos de doação |
| Evidências | ![Tela criar pedido](img/testes/CT05-01_criar_pedido_tela.png) <br><br> ![Formulário preenchido](img/testes/CT05-02_criar_pedido_formulario.png) <br><br> ![Pedido criado](img/testes/CT05-03_criar_pedido_resultado.png) |

---

### CT07 – Doador reserva pedido

| Caso de Teste | CT07 – Doador reserva pedido |
|---|---|
| Requisito Associado | RF-003 – Doadores podem se vincular a pedidos; RF-005 – Rastreamento de doações |
| Evidências | ![Pedidos como doador](img/testes/CT09-01_pedidos_como_doador.png) <br><br> ![Pedido reservado](img/testes/CT09-02_pedido_reservado.png) |

---

### CT08 – Tela de Transações

| Caso de Teste | CT08 – Tela de Transações |
|---|---|
| Requisito Associado | RF-005 – Rastreamento de doações; RF-006 – Confirmação de recebimento |
| Evidências | ![Tela de transações](img/testes/CT06-01_transacoes_tela.png) |

---

### CT09 – Perfil do usuário

| Caso de Teste | CT09 – Perfil do usuário |
|---|---|
| Requisito Associado | RF-001 – Gerenciamento de cadastro do usuário |
| Evidências | ![Tela de perfil](img/testes/CT07-01_perfil_tela.png) <br><br> ![Perfil — scroll](img/testes/CT07-02_perfil_scroll.png) |

---

### CT10 – Responsividade (layout mobile)

| Caso de Teste | CT10 – Responsividade mobile |
|---|---|
| Requisito Associado | RNF-001 – A aplicação deve ser responsiva |
| Evidências | ![Pedidos mobile](img/testes/CT10-01_mobile_pedidos.png) <br><br> ![Login mobile](img/testes/CT10-02_mobile_login.png) |

---

## Avaliação dos Testes de Software

Os testes foram executados de forma automatizada com Playwright sobre a versão local do CareConnect, cobindo 10 casos de teste que mapeiam todos os requisitos funcionais e o principal requisito não funcional.

**Pontos fortes identificados:**
- O fluxo de autenticação (RF-002) funciona corretamente tanto para login válido quanto para credenciais inválidas, exibindo mensagens adequadas ao usuário.
- O cadastro de conta (RF-001) integra com sucesso a API ViaCEP para preenchimento automático do endereço, reduzindo o esforço do usuário e atendendo ao RF-004.
- A listagem e criação de pedidos (RF-003) funcionam conforme esperado, com cards informativos e formulário validado.
- A proteção de rotas (AuthGuard) funciona corretamente, impedindo acesso a páginas autenticadas sem login.
- O design é responsivo (RNF-001), adaptando o layout e exibindo o menu hamburguer em telas móveis.

**Pontos de melhoria identificados:**
- A página de transações exibe estado vazio para usuários sem doações em andamento — seria útil uma mensagem orientativa mais detalhada.
- A recuperação de senha (RF-007) ainda não possui integração com envio real de e-mail, sendo apenas uma tela estática nesta versão.

**Próximas iterações:**
- Implementar envio real de e-mail para recuperação de senha.
- Melhorar o estado vazio da tela de transações com instruções de uso.

---

# Testes de Usabilidade

O objetivo do Plano de Testes de Usabilidade é obter informações quanto à expectativa dos usuários em relação à funcionalidade da aplicação de forma geral.

Para tanto, elaboramos quatro cenários, cada um baseado na definição apresentada sobre as histórias dos usuários, definido na etapa das especificações do projeto.

Foram convidadas quatro pessoas cujos perfis se encaixassem nas definições das histórias apresentadas na documentação, visando averiguar os seguintes indicadores:

**Taxa de sucesso:** responde se o usuário conseguiu ou não executar a tarefa proposta.

**Satisfação subjetiva:** responde como o usuário avalia o sistema com relação à execução da tarefa proposta, conforme a seguinte escala:

1. Péssimo; 
2. Ruim; 
3. Regular; 
4. Bom; 
5. Ótimo.

**Tempo para conclusão da tarefa:** em segundos, e em comparação com o tempo utilizado quando um especialista (um desenvolvedor) realiza a mesma tarefa.

Objetivando respeitar as diretrizes da Lei Geral de Proteção de Dados, as informações pessoais dos usuários que participaram do teste não foram coletadas, tendo em vista a ausência de Termo de Consentimento Livre e Esclarecido.

> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)


## Cenários de Teste de Usabilidade

| Nº do Cenário | Descrição do cenário |
|---------------|----------------------|
| 1 | Você é um doador e deseja ajudar uma família carente. Acesse o CareConnect, faça login e encontre um pedido de doação de alimentos para aceitar. |
| 2 | Você é um beneficiário e deseja acompanhar o status de uma doação que solicitou. Acesse a área de Transações e verifique se há atualizações. |


## Registro de Testes de Usabilidade

### Cenário 1 — Doador encontra e aceita pedido de doação de alimentos

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 34.21 segundos                  |
| 2       | SIM             | 5                    | 28.45 segundos                  |
| 3       | SIM             | 4                    | 42.10 segundos                  |
|         |                 |                      |                                 |
| **Média**     | 100%      | 4.67             | 34.92 segundos                  |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 11.30 segundos |

> Comentários dos usuários: "O site é claro e as informações dos pedidos são bem organizadas. Consegui encontrar o pedido de alimentos rapidamente." / "Gostei dos cards com as categorias coloridas."

---

### Cenário 2 — Beneficiário acompanha status de transação

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 4                    | 19.80 segundos                  |
| 2       | SIM             | 4                    | 25.60 segundos                  |
| 3       | SIM             | 3                    | 33.10 segundos                  |
|         |                 |                      |                                 |
| **Média**     | 100%      | 3.67             | 26.17 segundos                  |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 6.20 segundos |

> Comentários dos usuários: "Encontrei a área de Transações, mas não havia registros. Fiquei sem saber se meu pedido tinha sido aceito por alguém." / "O menu poderia destacar melhor a opção de Transações."

---

## Avaliação dos Testes de Usabilidade

Tomando como base os resultados obtidos, foi possível verificar que a aplicação web apresenta bons resultados quanto à taxa de sucesso na interação dos usuários, tendo em vista que todos os cenários propostos foram concluídos com sucesso (100% de taxa de sucesso).

A satisfação subjetiva geral foi positiva, variando entre 3,67 (Regular-Bom) e 4,67 (Bom-Ótimo). O cenário de acompanhamento de transações obteve a menor nota, refletindo a ausência de feedback visual claro quando não há doações em andamento.

Com relação ao tempo para conclusão, notamos discrepância entre a média de tempo dos usuários e o tempo do especialista em ambos os cenários. Tal discrepância é esperada, tendo em vista que o desenvolvedor já tem conhecimento prévio da interface e da lógica de organização das páginas.

**Melhorias identificadas para próximas iterações:**
- Exibir mensagem de confirmação mais clara após criar pedido, indicando que foi publicado com sucesso.
- Melhorar a área de Transações com estado vazio informativo (ex: "Seu pedido ainda não foi aceito por nenhum doador").
- Destacar visualmente o item "Transações" no menu para facilitar a navegação.
