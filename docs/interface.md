
# Projeto de Interface

Durante o desenvolvimento da interface do projeto, a principal prioridade foi criar um design intuitivo e de fácil compreensão, independentemente do nível de conhecimento do usuário ou da sua familiaridade com o meio digital. As cores escolhidas utilizam conceitos de semiótica para transmitir sensações positivas, considerando que solicitar ajuda pode ser um momento de fragilidade, no qual qualquer sensação de acolhimento se torna relevante.

Com o objetivo de facilitar a navegação, optou-se por um menu com poucos itens, evitando confundir usuários com pouca experiência em websites. Dessa forma, priorizaram-se âncoras com textos diretos e intuitivos. 

Os requisitos funcionais RF-01 e RF-02 podem ser acessados pela página inicial, por meio da área de login, onde o usuário pode entrar com e-mail e senha, criar uma conta ou solicitar recuperação de senha (RF-09).

A criação de contas atende ao requisito RF-06, solicitando dados de validação como endereço, telefone ou CPF/CNPJ. 

Os requisitos RF-04 e RF-05 estão disponíveis na página inicial, que apresenta a lista de pedidos. Usuários não autenticados são redirecionados para o login ao interagir com um pedido, enquanto usuários autenticados do tipo “doador” podem reservá-lo. A página também conta com um filtro de busca por itens ou nomes de pedidos, conforme o RF-11.

Por fim, a seção de transações permite ao usuário acompanhar suas doações ou solicitações. Nessa área, usuários do tipo “solicitante” podem confirmar entregas ou reportar problemas, atendendo ao requisito RF-08.

## User Flow

O desenvolvimento do user flow foi realizado por meio do draw.io, devido à sua interface amigável e de fácil utilização. 

A página inicial da plataforma será composta pela lista de pedidos, com o objetivo de incentivar o cadastro de usuários a partir da identificação com as histórias apresentadas. Esses pedidos serão exibidos em formato de cards, contendo um título curto e informações não sensíveis, como nome, idade e localização (cidade/estado).

Usuários não autenticados poderão acessar a página inicial (pedidos), a página “Sobre”, que apresenta o propósito do projeto e a visão dos idealizadores, e a página de login. O acesso à conta será realizado de forma tradicional, utilizando e-mail e senha, proporcionando uma experiência familiar e sem dificuldades.

Após a autenticação, usuários do tipo “doador” poderão acessar a aba de pedidos e reservar solicitações de acordo com seu interesse. Cada reserva terá duração máxima de 7 dias e o pedido ficará temporariamente indisponível para outros usuários. Ao realizar a reserva, o doador poderá enviar uma mensagem ao solicitante, que poderá ser atualizada posteriormente ao inserir o código de rastreio do envio.

Usuários do tipo “solicitante” terão acesso exclusivo à funcionalidade de criação de pedidos, podendo definir um título objetivo e uma descrição detalhada da necessidade. 

Todos os usuários autenticados poderão acessar a seção de transações, onde será possível acompanhar o andamento dos pedidos. Nessa seção, a cor amarela indicará que o pedido está pendente do código de rastreio, enquanto a cor verde indicará que o envio já está em andamento.

Por fim, usuários do tipo “solicitante” terão acesso aos botões de confirmar ou reportar a entrega. Essa funcionalidade visa garantir o recebimento correto dos itens e aumentar a confiabilidade da plataforma. Doadores que forem reportados mais de cinco vezes por solicitantes diferentes poderão ser banidos do sistema.

<figure style="text-align: center;">
    <img src="docs/img/userflow.svg" width="100%">
</figure>

## Wireframes

São protótipos usados em design de interface para sugerir a estrutura de um site web e seu relacionamentos entre suas páginas. Um wireframe web é uma ilustração semelhante do layout de elementos fundamentais na interface e é fundamental sempre relacionar cada wireframe com o(s) requisito(s) que ele atende.

### Exemplo

A tela inicial apresenta um menu lateral com as principais seções do portal, enquanto a navigation bar, ao topo, apresenta informações de envio de imagens ou navegação pela galeria de fotos. A área central apresenta a galeria de fotos na forma de uma grade. Nesta tela, são apresentados os seguintes requisitos

![Exemplo de Wireframe](img/wireframe.png)
