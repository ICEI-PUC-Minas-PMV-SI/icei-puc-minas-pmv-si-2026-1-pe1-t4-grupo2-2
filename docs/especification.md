# Especificações CareConnect

Esta seção apresenta a programação das funcionalidades da aplicação web desenvolvida para conectar doadores a pessoas afetadas por desastres naturais. Serão descritas as implementações realizadas com base nos requisitos definidos, as funcionalidades e os artefatos criados.

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
|RF-001| O sistema deve permitir o cadastro de usuários. | Alta |
|RF-002| O sistema deve permitir o login de usuários. | Alta |
|RF-003| O sistema deve disponibilizar uma lista de pedidos/solicitações para que os doadores possam visualizar e escolher qual desejam atender. | Alta |
|RF-004| O sistema deve exigir o envio de dados de validação (endereço, telefone ou CPF/CNPJ) no momento do cadastro para garantir a procedência dos usuários. | Alta |
|RF-005| O sistema deve permitir que o usuário acompanhe a entrega do produto via código de rastreio. | Média |
|RF-006| O sistema deve permitir que o receptor confirme o recebimento do produto. | Média |
|RF-007| O sistema deve permitir a redefinição de senha e e-mail do usuário. | Média |
|RF-008| O sistema deve permitir filtrar as doações disponíveis por região. | Média |

### Requisitos não Funcionais

|ID    | Descrição do Requisito  | Prioridade | 
|------|-----------------------------------------|----| 
|RNF-001| O sistema deve ser responsivo, garantindo o acesso e usabilidade em dispositivos móveis (telas menores). | Alta |
|RNF-002| O sistema deve criptografar as informações sensíveis dos usuários armazenadas no banco de dados. | Alta |
|RNF-003| O sistema deve possuir uma interface intuitiva, focada na facilidade de navegação para o usuário final. | Alta |

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:


## Restrições

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O sistema deve ser desenvolvido utilizando a tríade de tecnologias web: HTML5, CSS3 e JavaScript. |
|02| O sistema deve ser hospedado em um servidor gratuito (ex: GitHub Pages ou o próprio deploy do Apps Script). |
|03| O sistema deve priorizar o uso de APIs gratuitas e seguras para funcionalidades externas. |
|04| O sistema deve ser leve, evitando o uso excessivo de mídias (imagens/vídeos) para garantir carregamento rápido em conexões lentas. |
|05| O sistema deve utilizar Google Sheets (Planilhas) como base de dados para o armazenamento das informações. |

