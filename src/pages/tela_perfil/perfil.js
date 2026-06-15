const STORAGE_KEY = 'careconnect_usuarios';
const STORAGE_USUARIO_LOGADO = 'careconnect_usuario_logado';

const mapeamentoEstados = {
    "AC": "ACRE - AC", "AL": "ALAGOAS - AL", "AP": "AMAPÁ - AP", "AM": "AMAZONAS - AM",
    "BA": "BAHIA - BA", "CE": "CEARÁ - CE", "DF": "DISTRITO FEDERAL - DF", "ES": "ESPÍRITO SANTO - ES",
    "GO": "GOIÁS - GO", "MA": "MARANHÃO - MA", "MT": "MATO GROSSO - MT", "MS": "MATO GROSSO DO SUL - MS",
    "MG": "MINAS GERAIS - MG", "PA": "PARÁ - PA", "PB": "PARAÍBA - PB", "PR": "PARANÁ - PR",
    "PE": "PERNAMBUCO - PE", "PI": "PIAUÍ - PI", "RJ": "RIO DE JANEIRO - RJ", "RN": "RIO GRANDE DO NORTE - RN",
    "RS": "RIO GRANDE DO SUL - RS", "RO": "RONDÔNIA - RO", "RR": "RORAIMA - RR", "SC": "SANTA CATARINA - SC",
    "SP": "SÃO PAULO - SP", "SE": "SERGIPE - SE", "TO": "TOCANTINS - TO"
};

const camposFormulario = {
    nome: document.getElementById('perfil-nome'),
    dataNascimento: document.getElementById('perfil-data'),
    email: document.getElementById('perfil-email'),
    telefone: document.getElementById('perfil-telefone'),
    cpf: document.getElementById('perfil-cpf'),
    estado: document.getElementById('perfil-estado'),
    cidade: document.getElementById('perfil-cidade'),
    cep: document.getElementById('perfil-cep'),
    rua: document.getElementById('perfil-rua'),
    numero: document.getElementById('perfil-numero'),
    apto: document.getElementById('perfil-apto'),
    motivacoes: document.getElementById('perfil-motivacoes'),
    objetivos: document.getElementById('perfil-objetivos'),
    bio: document.getElementById('perfil-bio')
};

const btnSalvar = document.getElementById('btn-salvar-perfil');

function aplicarMascaraTelefone(valor) {
    let n = valor.replace(/\D/g, "").substring(0, 11);
    if (n.length > 6) return `(${n.substring(0, 2)}) ${n.substring(2, 7)}-${n.substring(7)}`;
    if (n.length > 2) return `(${n.substring(0, 2)}) ${n.substring(2)}`;
    return n.length > 0 ? `(${n}` : n;
}

function aplicarMascaraCpfCnpj(valor) {
    let n = valor.replace(/\D/g, "");
    if (n.length <= 11) {
        return n.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else {
        n = n.substring(0, 14);
        return n.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }
}

function travarCampo(elemento) {
    if (elemento) {
        elemento.disabled = true;
        elemento.style.backgroundColor = "#a3a3a3a1";
        elemento.style.color = "#000"; 
        elemento.style.cursor = "not-allowed"; 
    }
}

function carregarDadosPerfil() {
    const usuarioLogadoSessao = sessionStorage.getItem(STORAGE_USUARIO_LOGADO);
    if (!usuarioLogadoSessao) return;

    const usuario = JSON.parse(usuarioLogadoSessao);

    if (camposFormulario.nome) camposFormulario.nome.value = usuario.nomeCompleto || '';
    if (camposFormulario.dataNascimento) camposFormulario.dataNascimento.value = usuario.dataNascimento || '';
    if (camposFormulario.cpf) camposFormulario.cpf.value = aplicarMascaraCpfCnpj(usuario.cpf || '');

    travarCampo(camposFormulario.nome);
    travarCampo(camposFormulario.dataNascimento);
    travarCampo(camposFormulario.cpf);

    camposFormulario.email.value = usuario.email || '';
    camposFormulario.cidade.value = usuario.cidade || '';
    camposFormulario.cep.value = usuario.cep || '';
    camposFormulario.rua.value = usuario.rua || '';
    camposFormulario.numero.value = usuario.numero || '';
    camposFormulario.apto.value = usuario.apto || '';
    camposFormulario.motivacoes.value = usuario.motivacoes || '';
    camposFormulario.objetivos.value = usuario.objetivos || '';
    camposFormulario.bio.value = usuario.bio || '';

    if (camposFormulario.telefone) camposFormulario.telefone.value = aplicarMascaraTelefone(usuario.telefone || '');

    if (camposFormulario.estado && usuario.estado) {
        const sigla = usuario.estado.toUpperCase().trim();
        camposFormulario.estado.value = mapeamentoEstados[sigla] || usuario.estado;
    }
}

function salvarDadosPerfil(e) {
    e.preventDefault();

    const usuarioLogadoSessao = sessionStorage.getItem(STORAGE_USUARIO_LOGADO);
    if (!usuarioLogadoSessao) return;

    const usuarioAtual = JSON.parse(usuarioLogadoSessao);
    const listaUsuarios = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const index = listaUsuarios.findIndex(u => u.id === usuarioAtual.id);

    if (index !== -1) {
        listaUsuarios[index].email = camposFormulario.email.value;
        listaUsuarios[index].telefone = camposFormulario.telefone.value; 
        listaUsuarios[index].cidade = camposFormulario.cidade.value;
        listaUsuarios[index].cep = camposFormulario.cep.value;
        listaUsuarios[index].rua = camposFormulario.rua.value;
        listaUsuarios[index].numero = camposFormulario.numero.value;
        listaUsuarios[index].apto = camposFormulario.apto.value;
        listaUsuarios[index].motivacoes = camposFormulario.motivacoes.value;
        listaUsuarios[index].objetivos = camposFormulario.objetivos.value;
        listaUsuarios[index].bio = camposFormulario.bio.value;

        let estadoDigitado = camposFormulario.estado.value.toUpperCase().trim();
        listaUsuarios[index].estado = Object.keys(mapeamentoEstados).find(k => 
            estadoDigitado === mapeamentoEstados[k] || estadoDigitado === k
        ) || estadoDigitado;

        localStorage.setItem(STORAGE_KEY, JSON.stringify(listaUsuarios));
        
        const { senha: _, ...semSenha } = listaUsuarios[index];
        sessionStorage.setItem(STORAGE_USUARIO_LOGADO, JSON.stringify(semSenha));

        alert('✅ Perfil atualizado com sucesso!');
        carregarDadosPerfil();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarDadosPerfil();

    if (camposFormulario.telefone) {
        camposFormulario.telefone.addEventListener('input', (e) => e.target.value = aplicarMascaraTelefone(e.target.value));
    }
    
    if (camposFormulario.cpf) {
        camposFormulario.cpf.addEventListener('input', (e) => e.target.value = aplicarMascaraCpfCnpj(e.target.value));
    }

    if (btnSalvar) {
        btnSalvar.addEventListener('click', salvarDadosPerfil);
    }
});

//perfil

document.addEventListener('DOMContentLoaded', () => {
    configurarFiltrosData();
    renderizarPedidos();

    
    const btnBuscarPedidos = document.querySelector('.btn-buscar');
    if(btnBuscarPedidos) {
        btnBuscarPedidos.addEventListener('click', renderizarPedidos);
    }
});

function configurarFiltrosData() {
    
    const hoje = new Date().toISOString().split('T')[0];
    const inputDataAte = document.getElementById('filtro-data-ate');
    const inputDataDe = document.getElementById('filtro-data-de');
    
    if(inputDataAte) inputDataAte.max = hoje;
    if(inputDataDe) inputDataDe.max = hoje;
}

function renderizarPedidos() {
    const containerPedidos = document.querySelector('.pedidos-lista');
    if (!containerPedidos) return;

   
    const usuarioLogadoObj = JSON.parse(sessionStorage.getItem(STORAGE_USUARIO_LOGADO));
    const userId = usuarioLogadoObj ? usuarioLogadoObj.id : Number(sessionStorage.getItem('careconnect_usuario_logado_id'));

    let todosPedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    
    
    let pedidosFiltrados = todosPedidos.filter(p => p.idSolicitante === userId);

   
    const dataDe = document.getElementById('filtro-data-de')?.value;
    const dataAte = document.getElementById('filtro-data-ate')?.value;

    if (dataDe) {
        pedidosFiltrados = pedidosFiltrados.filter(p => new Date(p.criadoEm) >= new Date(dataDe + 'T00:00:00'));
    }
    if (dataAte) {
        pedidosFiltrados = pedidosFiltrados.filter(p => new Date(p.criadoEm) <= new Date(dataAte + 'T23:59:59'));
    }

    containerPedidos.innerHTML = '';

    if (pedidosFiltrados.length === 0) {
        containerPedidos.innerHTML = '<p style="font-size: 1.6rem; color: #555;">Nenhum pedido encontrado no período.</p>';
        return;
    }

    pedidosFiltrados.forEach(pedido => {
        const item = document.createElement('div');
        item.className = 'pedido-dropdown-container';
        
        // Identifica o status do pedido
        const statusReal = pedido.status.toLowerCase();
        let isAberto = statusReal === 'aberto';
        let statusColorClass = 'borda-amarela';
        let textoStatusExibicao = pedido.status;

        if (statusReal === 'concluído' || statusReal === 'concluido') {
            statusColorClass = 'borda-verde';
            textoStatusExibicao = 'Concluído';
        } else if (statusReal === 'cancelado') {
            statusColorClass = 'borda-vermelha';
            textoStatusExibicao = 'Cancelado';
        }

        item.classList.add(statusColorClass);

        const dataCriacaoFormatada = new Date(pedido.criadoEm).toLocaleDateString('pt-BR');

        // Cabeçalho do Dropdown
        const header = document.createElement('div');
        header.className = 'pedido-dropdown-header';
        header.innerHTML = `
            <div class="pedido-info-resumo">
                <strong>${pedido.titulo}</strong>
                <span>Criado em: ${dataCriacaoFormatada}</span>
            </div>
            <div style="font-weight: bold;">
                ${textoStatusExibicao} <span class="seta">▼</span>
            </div>
        `;

        // Corpo do Dropdown
        const body = document.createElement('div');
        body.className = 'pedido-dropdown-body';
        body.style.display = 'none';

        if (isAberto) {
            body.innerHTML = `
                <div class="input-group full">
                    <label>Categoria</label>
                    <select id="cat-${pedido.idPedido}">
                        <option value="1" ${pedido.categoria.id == 1 ? 'selected' : ''}>Roupas</option>
                        <option value="2" ${pedido.categoria.id == 2 ? 'selected' : ''}>Alimentos</option>
                        <option value="3" ${pedido.categoria.id == 3 ? 'selected' : ''}>Eletrônicos</option>
                        <option value="4" ${pedido.categoria.id == 4 ? 'selected' : ''}>Móveis</option>
                        <option value="5" ${pedido.categoria.id == 5 ? 'selected' : ''}>Brinquedos</option>
                        <option value="6" ${pedido.categoria.id == 6 ? 'selected' : ''}>Livros</option>
                        <option value="7" ${pedido.categoria.id == 7 ? 'selected' : ''}>Esportes</option>
                        <option value="8" ${pedido.categoria.id == 8 ? 'selected' : ''}>Beleza</option>
                        <option value="9" ${pedido.categoria.id == 9 ? 'selected' : ''}>Saúde</option>
                    </select>
                </div>
                <div class="input-group full">
                    <label>Para onde será mandado (Endereço)</label>
                    <input type="text" id="dest-${pedido.idPedido}" value="${pedido.enderecoDestino || ''}" placeholder="Ex: Rua das Flores, 123 - Centro">
                </div>
                <div class="input-group full">
                    <label>Descrição</label>
                    <textarea id="desc-${pedido.idPedido}">${pedido.descricao}</textarea>
                </div>
                <button class="btn-salvar-pedido" onclick="salvarEdicaoPedido('${pedido.idPedido}')">SALVAR ALTERAÇÕES DO PEDIDO</button>
            `;
        } else {
           
            let corAviso = statusColorClass === 'borda-verde' ? 'green' : 'red';
            body.innerHTML = `
                <p style="font-size:1.4rem; margin-bottom: 0.5rem"><strong>Categoria:</strong> ${pedido.categoria.nome}</p>
                <p style="font-size:1.4rem; margin-bottom: 0.5rem"><strong>Para onde será mandado:</strong> ${pedido.enderecoDestino || 'Não informado'}</p>
                <p style="font-size:1.4rem; margin-bottom: 1.5rem"><strong>Descrição:</strong> ${pedido.descricao}</p>
                <p style="color: ${corAviso}; font-weight: bold; font-size:1.4rem;">${textoStatusExibicao}: Este pedido não pode mais ser modificado.</p>
            `;
        }


        header.addEventListener('click', () => {
            const isFechado = body.style.display === 'none';
            body.style.display = isFechado ? 'block' : 'none';
            header.querySelector('.seta').innerText = isFechado ? '▲' : '▼';
        });

        item.appendChild(header);
        item.appendChild(body);
        containerPedidos.appendChild(item);
    });
}

window.salvarEdicaoPedido = function(idPedido) {
    const idNumerico = Number(idPedido);
    let todosPedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    let indexPedido = todosPedidos.findIndex(p => p.idPedido === idNumerico);
    
    if(indexPedido !== -1) {
        const catSelect = document.getElementById(`cat-${idNumerico}`);
        const descArea = document.getElementById(`desc-${idNumerico}`);
        const destInput = document.getElementById(`dest-${idNumerico}`);

        const categoriasDict = {
            "1": { id: 1, slug: "categoria1", nome: "Roupas" },
            "2": { id: 2, slug: "categoria2", nome: "Alimentos" },
            "3": { id: 3, slug: "categoria3", nome: "Eletrônicos" },
            "4": { id: 4, slug: "categoria4", nome: "Móveis" },
            "5": { id: 5, slug: "categoria5", nome: "Brinquedos" },
            "6": { id: 6, slug: "categoria6", nome: "Livros" },
            "7": { id: 7, slug: "categoria7", nome: "Esportes" },
            "8": { id: 8, slug: "categoria8", nome: "Beleza" },
            "9": { id: 9, slug: "categoria9", nome: "Saúde" }
        };

        todosPedidos[indexPedido] = {
            ...todosPedidos[indexPedido],
            categoria: categoriasDict[catSelect.value],
            descricao: descArea.value,
            enderecoDestino: destInput.value,
            atualizadoEm: new Date().toISOString()
        };

        localStorage.setItem('pedidos', JSON.stringify(todosPedidos));
        
        alert('✅ Pedido atualizado com sucesso!');
        renderizarPedidos();
    } else {
        alert('❌ Erro: Pedido não encontrado no banco de dados.');
    }
}
