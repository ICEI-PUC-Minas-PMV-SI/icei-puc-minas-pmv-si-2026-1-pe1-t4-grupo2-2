# CareConnect - Código Fonte

Esta pasta contém todo o código-fonte da aplicação web **CareConnect**, desenvolvida em HTML, CSS e JavaScript puro. A estrutura foi organizada de forma modular para facilitar a manutenção e escalabilidade do projeto.

## 📁 Estrutura de Diretórios

```
src/
├── pages/                     # Páginas da aplicação
│   ├── tela_login/            # Autenticação e login
│   ├── criar_conta/           # Cadastro de novos usuários
│   ├── esqueceu_senha/        # Recuperação de senha
│   ├── tela_pedidos/          # Listagem de pedidos
│   ├── criar_pedido/          # Criação de novos pedidos
│   ├── transacoes/            # Acompanhamento de transações
│   ├── tela_perfil/           # Perfil do usuário
│   └── sobre_nos/             # Página sobre a plataforma
├── js/                        # Módulos JavaScript
│   ├── AuthGuard.js           # Proteção de rotas e autenticação
│   ├── Hamburger.js           # Menu responsivo (mobile)
│   ├── ManagerLocalStorage.js # Gerenciamento do localStorage
│   ├── Order.js               # Lógica de pedidos
│   └── Utils.js               # Funções utilitárias
├── styles/                    # Estilos CSS globais
│   ├── global.css             # Estilos globais e variáveis
│   └── responsive.css         # Estilos responsivos
└── assets/                    # Recursos estáticos
    └── img/                   # Imagens do projeto
```

## 🎨 Páginas Principais

### Páginas Públicas (sem autenticação)
- **Tela de Login** (`tela_login/`) - Acesso à conta com e-mail e senha
- **Criar Conta** (`criar_conta/`) - Registro de novos usuários
- **Esqueceu Senha** (`esqueceu_senha/`) - Recuperação de acesso
- **Sobre Nós** (`sobre_nos/`) - Informações sobre a plataforma

### Páginas Protegidas (requer autenticação)
- **Pedidos** (`tela_pedidos/`) - Listagem de solicitações disponíveis
  - Doadores podem reservar pedidos
  - Filtro por categoria e busca
  - Acesso a informações do solicitante

- **Criar Pedido** (`criar_pedido/`) - Exclusivo para solicitantes
  - Criação de novas solicitações
  - Seleção de categoria
  - Descrição detalhada da necessidade

- **Transações** (`transacoes/`) - Acompanhamento de pedidos
  - Doadores: visualizar reservas e adicionar código de rastreio
  - Solicitantes: confirmar recebimento ou reportar problemas
  - Status visual com cores (amarelo = pendente, verde = em trânsito)

- **Perfil** (`tela_perfil/`) - Gerenciamento da conta do usuário

## 🔑 Módulos JavaScript

### AuthGuard.js
Módulo responsável pela proteção de rotas e gerenciamento de autenticação.
- Verifica se o usuário está autenticado
- Redireciona usuários não autenticados para login
- Valida o tipo de perfil (doador, solicitante)
- Implementa logout

### ManagerLocalStorage.js
Gerencia o armazenamento local de dados do navegador.
- Salva e recupera dados do usuário autenticado
- Armazena pedidos e transações
- Controla dados de sessão

### Order.js
Lógica principal de negócio para pedidos.
- Criação de novos pedidos
- Consulta de pedidos existentes
- Reserva de pedidos por doadores
- Atualização de status

### Hamburger.js
Implementa o menu responsivo para dispositivos móveis.
- Alterna visibilidade do menu
- Fecha menu ao selecionar item

### Utils.js
Funções utilitárias reutilizáveis.
- Geração de IDs únicos
- Formatação de datas
- Validação de dados
- Funções de manipulação de strings

### CEPManager.js
Gerencia buscas de endereço através de API de CEP (viaCEP).
- Busca de endereço completo por CEP
- Validação e formatação de CEP
- Preenchimento automático de formulários
- Tratamento de erros robusto
- Uso: `import { CEPManager } from './CEPManager.js'`

## 🎨 Sistema de Estilos

O projeto utiliza um sistema de variáveis CSS para manter consistência visual:

### Cores Principais
- **Primária**: Azul (#4A90E2)
- **Secundária**: Verde (#28a745)
- **Alerta**: Amarela (#ffcc00)
- **Erro**: Vermelha (#dc3545)

### Tipografia
- Fonte: Raleway (Google Fonts)
- Pesos: 100 a 900

### Responsividade
- Mobile-first approach
- Breakpoints para tablets e desktop
- Menu hambúrguer para telas pequenas

## 🚀 Como Utilizar

### 🌐 Acesso ao Site ao Vivo

A aplicação está disponível online em:
```
https://icei-puc-minas-pmv.github.io/icei-puc-minas-pmv-si-2026-1-pe1-t4-grupo2-2/src/pages/tela_pedidos/pedidos.html
```

**Acesso direto**: [🔗 Clique aqui para acessar o CareConnect](https://icei-puc-minas-pmv.github.io/icei-puc-minas-pmv-si-2026-1-pe1-t4-grupo2-2/src/pages/tela_pedidos/pedidos.html)

> ℹ️ O site está hospedado no GitHub Pages. Não é necessário configurar nada localmente para acessá-lo!

### Execução Local

Se deseja executar a aplicação localmente para desenvolvimento:

1. **Clone ou baixe o repositório**
```bash
git clone <URL_DO_REPOSITORIO>
cd src
```

2. **Abra em um servidor local**
   - Usando Live Server (VS Code): Clique com botão direito no `index.html` e selecione "Open with Live Server"
   - Usando Python: `python -m http.server 8000`
   - Usando Node.js: `npx http-server`

3. **Acesse no navegador**
```
http://localhost:8000
```

### Funcionalidades Principais

#### Cadastro
- Preencha os dados básicos (nome, e-mail, senha)
- Escolha seu perfil (Doador ou Solicitante)
- Para ONGs, é necessário informar o CNPJ

#### Login
- Use seu e-mail e senha cadastrados
- A sessão é mantida em localStorage

#### Perfil do Usuário
- Visualize e edite suas informações pessoais
- **🌐 Busca automática de endereço por CEP**:
  - Digite o CEP (formato: 12345-678)
  - Pressione Enter ou clique no botão 🔍
  - Rua, cidade e estado são preenchidos automaticamente
  - Funcionalidade baseada na API viaCEP
  - Todos os campos podem ser editados manualmente

#### Para Doadores
- Visualize a lista de pedidos disponíveis
- Filtre por categoria
- Reserve pedidos (válidos por 7 dias)
- Adicione código de rastreio
- Acompanhe transações

#### Para Solicitantes
- Crie novos pedidos
- Descreva suas necessidades
- Acompanhe as doações recebidas
- Confirme o recebimento ou reporte problemas

## 📱 Recursos Responsivos

A aplicação é totalmente responsiva e funciona em:
- ✅ Desktop (1920px e acima)
- ✅ Tablets (768px a 1024px)
- ✅ Smartphones (até 768px)

## 🔐 Segurança

- Senhas são validadas localmente
- Dados sensíveis armazenados em localStorage
- Proteção de rotas com AuthGuard
- Validação de entrada de dados

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos responsivos e variáveis
- **JavaScript (ES6+)** - Lógica e interatividade
- **localStorage API** - Persistência de dados do cliente

## 🌐 APIs Externas

### viaCEP - Busca de Endereço por CEP
A aplicação utiliza a API pública do **viaCEP** para buscar endereços a partir do CEP.

**Documentação**: https://viacep.com.br/

**Utilização**:
- Página: Edição de Perfil
- Funcionalidade: Preenchimento automático de endereço
- Módulo: `CEPManager.js`

**Exemplo de uso**:
```javascript
import { CEPManager } from './js/CEPManager.js';

// Buscar endereço por CEP
CEPManager.buscarEnderecoPorCEP('12345-678')
  .then(dados => {
    console.log(dados.logradouro);  // Nome da rua
    console.log(dados.localidade);  // Cidade
    console.log(dados.uf);          // Estado
  })
  .catch(erro => console.error(erro));
```

**Recursos da API**:
- ✅ Sem autenticação necessária
- ✅ Sem limite de requisições (para uso educacional)
- ✅ Retorna dados em JSON
- ✅ Rápida e confiável

## 📝 Convenções de Código

### Nomeação de Arquivos
- Classes e módulos: `PascalCase.js` (ex: `AuthGuard.js`)
- Páginas: `pasta_descritiva/pagina.html`
- Estilos: `nomedescritivo.css`

### Estrutura de Commits
As mudanças no código foram organizadas em commits temáticos conforme especificado em `git log` e issues do projeto.

## 📚 Documentação

Para mais informações sobre:
- **Especificação completa**: Ver [`/docs/especification.md`](../docs/especification.md)
- **Interface e design**: Ver [`/docs/interface.md`](../docs/interface.md)
- **Desenvolvimento**: Ver [`/docs/development.md`](../docs/development.md)
- **Testes**: Ver [`/docs/tests.md`](../docs/tests.md)

## 📋 Histórico de Versões

### [1.0.0] - 12/06/2026
#### Adicionado
- ✨ Autenticação com login e cadastro
- ✨ Listagem de pedidos com filtros
- ✨ Criação de pedidos para solicitantes
- ✨ Sistema de transações e rastreamento
- ✨ Menu responsivo para mobile
- ✨ Recuperação de senha
- ✨ Perfil de usuário
- ✨ Página "Sobre Nós"

#### Melhorado
- 🎨 Design responsivo e acessível
- 🔒 Proteção de rotas com AuthGuard
- 📊 Gerenciamento local de dados com localStorage

#### Corrigido
- 🐛 Importações absolutas convertidas para relativas
- 🐛 Melhor validação de formulários

## 👨‍💻 Integrantes do Projeto

- **Anna Sophia Lopes Peres**
- **Lucas Daniel Nocce**
- **Rafael Martins Lopes**
- **Rafael Souza Inácio**
- **Yuri Christian da Silva Barbosa**

## 👩‍🏫 Orientador

- **Caroline Rhaian da Silva Jandre**

## 📄 Licença

Este projeto é fornecido como material educacional para a disciplina de Projeto - Aplicações Web (PUC Minas).