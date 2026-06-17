import { ManagerLocalStorage } from '../../js/ManagerLocalStorage.js';
import { AuthGuard } from '../../js/AuthGuard.js';

// ============ UTILITÁRIOS ============

function getUsuarioLogado() {
    if (AuthGuard.isUserLoggedIn()) {
        return AuthGuard.getLoggedInUser();
    }

    const idSession = sessionStorage.getItem('careconnect_usuario_logado_id');
    const userSession = sessionStorage.getItem('careconnect_usuario_logado');
    if (idSession && userSession) {
        try {
            return JSON.parse(userSession);
        } catch (e) {
            // ignora
        }
    }

    const chaves = ['usuarioLogado', 'usuario', 'currentUser', 'user', 'loggedUser'];

    for (const chave of chaves) {
        const valor = localStorage.getItem(chave);
        if (!valor) continue;

        try {
            const usuario = JSON.parse(valor);
            if (usuario && (usuario.id || usuario.email || usuario.nome || usuario.name || usuario.userId)) {
                return usuario;
            }
        } catch (e) {
            continue;
        }
    }

    return null;
}

function getIdUsuario(usuario) {
    return usuario?.id ?? usuario?.idUsuario ?? usuario?.idDoador ?? usuario?.userId ?? usuario?.usuarioId;
}

function getIdDoadorPedido(pedido) {
    return pedido?.idDoador ?? pedido?.doadorId ?? pedido?.idUsuarioDoador ?? pedido?.idUsuario ?? pedido?.userId;
}

function getIdSolicitantePedido(pedido) {
    return pedido?.idSolicitante ?? pedido?.idUsuarioSolicitante ?? pedido?.idReceptor ?? pedido?.idUsuarioReceptor ?? pedido?.solicitanteId;
}

function normalizarStatus(status) {
    return String(status || '').trim().toLowerCase();
}

function getStatusTexto(pedido) {
    const status = normalizarStatus(pedido.status);

    if (status === 'andamento' || status === 'em andamento' || status === 'em-andamento') {
        return 'Em andamento';
    }

    if (status === 'concluído' || status === 'concluido' || status === 'entregue') {
        return 'Concluído';
    }

    if (status === 'pendente') {
        return 'Pendente';
    }

    return pedido?.statusTexto || pedido?.status || 'Em andamento';
}

function getNomeUsuario(usuario) {
    return usuario?.nomeCompleto || usuario?.nome || usuario?.name || 'Usuário não encontrado';
}

function getCategoriaPedido(pedido) {
    return pedido?.categoria?.nome || pedido?.categoria || pedido?.item || 'Sem categoria';
}

function getDescricaoPedido(pedido) {
    return pedido?.descricao || pedido?.item || 'Detalhes não informados';
}

function getTodosPedidos() {
    const chavesPossiveis = ['pedidos', 'todosPedidos', 'pedidosCriados', 'pedido'];

    for (const chave of chavesPossiveis) {
        const lista = ManagerLocalStorage.getItem(chave);
        if (Array.isArray(lista) && lista.length > 0) {
            return lista;
        }

        const raw = localStorage.getItem(chave);
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            } catch (e) {
                // ignora chave inválida
            }
        }
    }

    return [];
}

function getTodosUsuarios() {
    const chavesPossiveis = ['careconnect_usuarios', 'usuarios', 'usuariosCadastrados', 'usuariosSalvos', 'users', 'contas'];

    for (const chave of chavesPossiveis) {
        const lista = ManagerLocalStorage.getItem(chave);
        if (Array.isArray(lista) && lista.length > 0) {
            return lista;
        }

        const raw = localStorage.getItem(chave);
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            } catch (e) {
                // ignora chave inválida
            }
        }
    }

    return [];
}

function encontrarUsuarioPorId(idUsuario, usuarios) {
    if (!idUsuario) return null;

    return usuarios.find(usuario => {
        const id = usuario?.id ?? usuario?.idUsuario ?? usuario?.idDoador ?? usuario?.userId ?? usuario?.usuarioId;
        return Number(id) === Number(idUsuario);
    }) || null;
}

// ============ PAGINAÇÃO ============

let paginaAtual = 1;
const ITENS_POR_PAGINA = 6;
let todasAsTransacoes = [];

function mostrarPagina(pagina) {
    paginaAtual = pagina;
    const inicio = (pagina - 1) * ITENS_POR_PAGINA;
    const fim = inicio + ITENS_POR_PAGINA;
    const transacoesPagina = todasAsTransacoes.slice(inicio, fim);

    console.log(`📄 Mostrando página ${pagina}: início=${inicio}, fim=${fim}, transações na página=${transacoesPagina.length}`);

    const containerPedidos = document.getElementById('container-pedidos');
    const containerModais = document.getElementById('container-modais');
    
    if (!containerPedidos) {
        console.error('❌ container-pedidos NÃO ENCONTRADO!');
        return;
    }
    if (!containerModais) {
        console.error('❌ container-modais NÃO ENCONTRADO!');
        return;
    }

    console.log(`✅ Containers encontrados. Limpando...`);
    
    containerPedidos.innerHTML = '';
    containerModais.innerHTML = '';

    console.log(`🔄 Renderizando ${transacoesPagina.length} transações...`);
    transacoesPagina.forEach((pedido, index) => {
        console.log(`   [${index}] Renderizando pedido #${pedido.idPedido}`);
        criarCardTransacao(pedido, containerPedidos, containerModais);
    });
    
    console.log(`✅ Página ${pagina} renderizada. Total de HTML: ${containerPedidos.innerHTML.length} chars`);
}

function criarCardTransacao(pedido, containerPedidos, containerModais) {
    console.log(`🎨 Criando card para pedido:`, pedido);
    
    const usuarios = getTodosUsuarios();
    console.log(`   Usuários disponíveis: ${usuarios.length}`);
    
    const doador = encontrarUsuarioPorId(getIdDoadorPedido(pedido), usuarios);
    const solicitante = encontrarUsuarioPorId(getIdSolicitantePedido(pedido), usuarios);

    console.log(`   Doador encontrado:`, doador?.nomeCompleto || 'NÃO ENCONTRADO');
    console.log(`   Solicitante encontrado:`, solicitante?.nomeCompleto || 'NÃO ENCONTRADO');

    const nomeDoador = getNomeUsuario(doador) || 'Doador não encontrado';
    const nomeSolicitante = getNomeUsuario(solicitante) || 'Solicitante não encontrado';
    const idPedido = pedido.idPedido || pedido.id || '—';
    const categoria = getCategoriaPedido(pedido);
    const descricao = getDescricaoPedido(pedido);
    const statusTexto = getStatusTexto(pedido);
    const status = normalizarStatus(pedido.status);

    // Determinar ícone baseado no status
    let statusIcon = '⏳';
    if (status === 'concluído' || status === 'concluido' || status === 'entregue') {
        statusIcon = '✅';
    } else if (status === 'pendente') {
        statusIcon = '⏱️';
    }

    const cardHTML = `
        <a href="#modal${idPedido}" class="pedido-card">
            <div class="status-circle">${statusIcon}</div>
            <div class="info">
                <h3>Pedido #${idPedido}</h3>
                <p class="category">${categoria}</p>
                <p class="code">${descricao}</p>
                <p class="code">Doador: ${nomeDoador}</p>
                <p class="code">Solicitante: ${nomeSolicitante}</p>
            </div>
            <span class="status ${status || 'andamento'}">${statusTexto}</span>
            <span class="card-arrow">›</span>
        </a>
    `;

    const modalHTML = `
        <div id="modal${idPedido}" class="modal">
            <div class="modal-content">
                <a href="#" class="fechar">×</a>
                <p class="modal-tag">Rastreamento</p>
                <h2>Pedido #${idPedido}</h2>
                <div class="modal-grid">
                    <div class="modal-field"><label>Doador</label><span>${nomeDoador}</span></div>
                    <div class="modal-field"><label>Solicitante</label><span>${nomeSolicitante}</span></div>
                    <div class="modal-field"><label>Categoria</label><span>${categoria}</span></div>
                    <div class="modal-field"><label>Status</label><span>${statusTexto}</span></div>
                    <div class="modal-field"><label>Descrição</label><span>${descricao}</span></div>
                </div>
            </div>
        </div>
    `;

    containerPedidos.innerHTML += cardHTML;
    containerModais.innerHTML += modalHTML;
}

function atualizarPaginacao() {
    const paginationElement = document.getElementById('pagination');
    const totalPaginas = Math.ceil(todasAsTransacoes.length / ITENS_POR_PAGINA);

    // Remover paginação se houver menos de 6 resultados
    if (todasAsTransacoes.length < ITENS_POR_PAGINA) {
        if (paginationElement) {
            paginationElement.style.display = 'none !important';
        }
        return;
    }

    if (paginationElement) {
        paginationElement.style.display = 'flex !important';
    }

    // Atualizar botões de navegação
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) prevBtn.disabled = paginaAtual === 1;
    if (nextBtn) nextBtn.disabled = paginaAtual === totalPaginas;

    // Atualizar números de página
    const pageNumbers = document.getElementById('page-numbers');
    if (pageNumbers) {
        pageNumbers.innerHTML = '';
        
        for (let i = 1; i <= Math.min(totalPaginas, 4); i++) {
            const btn = document.createElement('button');
            btn.className = `page-btn ${i === paginaAtual ? 'active' : ''}`;
            btn.textContent = i;
            btn.dataset.page = i;
            btn.addEventListener('click', () => {
                mostrarPagina(i);
                atualizarPaginacao();
            });
            pageNumbers.appendChild(btn);
        }
    }
}

// ============ INICIALIZAÇÃO ============

document.addEventListener('DOMContentLoaded', () => {
    const containerPedidos = document.getElementById('container-pedidos');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const paginationElement = document.getElementById('pagination');

    console.log('🔍 DOMContentLoaded - Iniciando...');
    console.log('containerPedidos:', containerPedidos);
    console.log('paginationElement:', paginationElement);

    const usuarioLogado = getUsuarioLogado();
    console.log('usuarioLogado:', usuarioLogado);
    
    if (!usuarioLogado) {
        containerPedidos.innerHTML = '<p class="page-desc">Faça login para ver suas transações.</p>';
        if (paginationElement) paginationElement.style.display = 'none !important';
        return;
    }

    const meuId = getIdUsuario(usuarioLogado);
    const pedidos = getTodosPedidos();
    console.log('meuId:', meuId);
    console.log('Total de pedidos:', pedidos.length);

    // FILTRAR: Mostrar TODAS as transações que envolvem o usuário (como doador ou solicitante)
    // Não filtra mais apenas por status "em andamento"
    todasAsTransacoes = pedidos.filter(pedido => {
        const idDoador = getIdDoadorPedido(pedido);
        const idSolicitante = getIdSolicitantePedido(pedido);

        return Number(idDoador) === Number(meuId) ||
               Number(idSolicitante) === Number(meuId);
    });

    console.log('todasAsTransacoes (após filtro):', todasAsTransacoes.length);

    if (todasAsTransacoes.length === 0) {
        containerPedidos.innerHTML = '<p class="page-desc">Você ainda não possui nenhuma transação.</p>';
        if (paginationElement) paginationElement.style.display = 'none !important';
        return;
    }

    // Mostrar primeira página e atualizar paginação
    mostrarPagina(1);
    atualizarPaginacao();

    // Eventos dos botões de paginação (apenas se houver paginação)
    if (prevBtn && nextBtn && todasAsTransacoes.length >= ITENS_POR_PAGINA) {
        prevBtn.addEventListener('click', () => {
            if (paginaAtual > 1) {
                mostrarPagina(paginaAtual - 1);
                atualizarPaginacao();
            }
        });

        nextBtn.addEventListener('click', () => {
            const totalPaginas = Math.ceil(todasAsTransacoes.length / ITENS_POR_PAGINA);
            if (paginaAtual < totalPaginas) {
                mostrarPagina(paginaAtual + 1);
                atualizarPaginacao();
            }
        });
    }
});
