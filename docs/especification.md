# Especificações do Projeto

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto.

Caso deseje atribuir uma imagem a sua persona, utilize o site https://thispersondoesnotexist.com/

## Personas

### 1. João Carlos (Doador)

João Carlos tem 34 anos, é analista de sistemas e mora em Belo Horizonte. Possui renda estável e utiliza a internet diariamente, principalmente pelo celular. Costuma acompanhar notícias e causas sociais pelas redes sociais e já realizou algumas doações pontuais via Pix, mas ficou receoso após ver notícias de golpes envolvendo falsas campanhas.

Ele deseja ajudar pessoas e instituições de forma mais frequente, mas busca uma plataforma que ofereça segurança, transparência e praticidade no processo de doação. João valoriza soluções rápidas, confiáveis e que permitam acompanhar o destino de sua contribuição.

---

### 2. Maria Aparecida (Pessoa em Situação de Vulnerabilidade)

Maria Aparecida tem 42 anos, mora na periferia e está desempregada. Possui ensino fundamental incompleto e utiliza um celular simples com acesso limitado à internet. Seu principal uso digital é para mensagens (como WhatsApp) e redes sociais básicas.

Ela enfrenta dificuldades para suprir necessidades básicas, como alimentação e roupas para sua família. Maria gostaria de uma forma simples de solicitar ajuda, sem burocracia e sem precisar de conhecimentos técnicos avançados. Ela precisa de uma plataforma acessível, fácil de usar e que aumente a visibilidade da sua situação.

---

### 3. Ana Souza (Coordenadora de ONG)

Ana Souza tem 38 anos, é coordenadora de uma ONG que atua na distribuição de alimentos para famílias carentes. Sua organização possui poucos recursos e uma presença digital limitada, com redes sociais pouco atualizadas e sem site próprio.

Ela utiliza o computador e o celular para gerenciar atividades da ONG, mas enfrenta dificuldades para alcançar novos doadores e manter uma comunicação eficiente com o público. Ana busca uma plataforma que aumente a visibilidade da instituição, facilite a captação de doações e transmita credibilidade para possíveis apoiadores.

---

## Histórias de Usuário

Com base na análise das personas, foram identificadas as seguintes histórias de usuário, organizadas por contexto:

---

### 🔹 Contexto: Cadastro e Acesso

| EU COMO...                        | QUERO/PRECISO...                          | PARA...                           |
| --------------------------------- | ----------------------------------------- | --------------------------------- |
| Doador (João)                     | me cadastrar na plataforma                | começar a realizar doações        |
| Pessoa em vulnerabilidade (Maria) | me cadastrar facilmente                   | poder solicitar ajuda             |
| ONG (Ana)                         | cadastrar minha instituição com validação | garantir credibilidade            |
| Usuário                           | fazer login no sistema                    | acessar minha conta com segurança |
| Usuário                           | recuperar minha senha                     | não perder acesso à plataforma    |

---

### 🔹 Contexto: Doação

| EU COMO...    | QUERO/PRECISO...                  | PARA...                        |
| ------------- | --------------------------------- | ------------------------------ |
| Doador (João) | visualizar pedidos de ajuda       | escolher quem ajudar           |
| Doador (João) | filtrar solicitações por região   | encontrar causas próximas      |
| Doador (João) | visualizar informações detalhadas | tomar decisões com confiança   |
| Doador (João) | realizar doações de forma rápida  | não perder tempo no processo   |
| Doador (João) | acompanhar a entrega da doação    | garantir que chegou ao destino |

---

### 🔹 Contexto: Solicitação de Ajuda

| EU COMO...                        | QUERO/PRECISO...              | PARA...                          |
| --------------------------------- | ----------------------------- | -------------------------------- |
| Pessoa em vulnerabilidade (Maria) | criar um pedido de ajuda      | receber doações                  |
| Pessoa em vulnerabilidade (Maria) | descrever minhas necessidades | receber ajuda adequada           |
| Pessoa em vulnerabilidade (Maria) | ser encontrada facilmente     | aumentar minhas chances de ajuda |
| Pessoa em vulnerabilidade (Maria) | confirmar recebimento         | informar que fui atendida        |

---

### 🔹 Contexto: ONG

| EU COMO... | QUERO/PRECISO...              | PARA...               |
| ---------- | ----------------------------- | --------------------- |
| ONG (Ana)  | divulgar minha organização    | aumentar visibilidade |
| ONG (Ana)  | publicar pedidos de doação    | captar recursos       |
| ONG (Ana)  | comprovar minha autenticidade | transmitir confiança  |
| ONG (Ana)  | me comunicar com doadores     | manter relacionamento |

---

### 🔹 Contexto: Segurança e Confiança

| EU COMO...    | QUERO/PRECISO...                     | PARA...                      |
| ------------- | ------------------------------------ | ---------------------------- |
| Doador (João) | ter dados verificados dos receptores | evitar fraudes               |
| Usuário       | ter meus dados protegidos            | garantir privacidade         |
| Usuário       | confiar na plataforma                | utilizá-la com tranquilidade |

---

## Considerações

As histórias de usuário refletem diretamente as necessidades dos diferentes perfis identificados, garantindo que a aplicação seja:

* Simples e acessível (especialmente para usuários com baixa familiaridade digital)
* Segura e confiável (reduzindo riscos de fraude)
* Eficiente na conexão entre doadores e receptores

Esses elementos são fundamentais para o sucesso da solução proposta.


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade | 
|------|-----------------------------------------|----| 
|RF-001| A aplicação deve permitir que o usuário gerencie suas tarefas | ALTA |  
|RF-002| A aplicação deve permitir a emissão de um relatório de tarefas realizadas no mês   | MÉDIA | 


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| A aplicação deve ser responsiva | MÉDIA | 
|RNF-002| A aplicação deve processar requisições do usuário em no máximo 3s |  BAIXA | 

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
