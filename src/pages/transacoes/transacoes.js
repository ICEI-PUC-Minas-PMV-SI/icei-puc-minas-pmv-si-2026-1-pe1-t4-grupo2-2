import { ManagerLocalStorage } from '../../js/ManagerLocalStorage.js';
import { AuthGuard } from '../../js/AuthGuard.js';

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

function isPedidoEmAndamento(pedido) {
    const status = normalizarStatus(pedido.status);
    return status === 'andamento' || status === 'em andamento' || status === 'em-andamento';
}

function getStatusTexto(pedido) {
    const status = normalizarStatus(pedido.status);

    if (status === 'andamento' || status === 'em andamento' || status === 'em-andamento') {
        return 'Em andamento';
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

document.addEventListener('DOMContentLoaded', () => {
    const containerPedidos = document.getElementById('container-pedidos');
    const containerModais = document.getElementById('container-modais');

    const usuarioLogado = getUsuarioLogado();
    if (!usuarioLogado) {
        containerPedidos.innerHTML = '<p class="page-desc">Faça login para ver os pedidos em andamento.</p>';
        return;
    }

    const meuId = getIdUsuario(usuarioLogado);
    const pedidos = getTodosPedidos();
    const usuarios = getTodosUsuarios();

    const pedidosEmAndamento = pedidos.filter(pedido => {
        if (!isPedidoEmAndamento(pedido)) return false;

        const idDoador = getIdDoadorPedido(pedido);
        const idSolicitante = getIdSolicitantePedido(pedido);

        return Number(idDoador) === Number(meuId) ||
               Number(idSolicitante) === Number(meuId);
    });

    if (pedidosEmAndamento.length === 0) {
        containerPedidos.innerHTML = '<p class="page-desc">Nenhum pedido em andamento encontrado para você.</p>';
        return;
    }

    containerPedidos.innerHTML = '';
    containerModais.innerHTML = '';

    pedidosEmAndamento.forEach(pedido => {
        const doador = encontrarUsuarioPorId(getIdDoadorPedido(pedido), usuarios);
        const solicitante = encontrarUsuarioPorId(getIdSolicitantePedido(pedido), usuarios);

        const nomeDoador = getNomeUsuario(doador) || 'Doador não encontrado';
        const nomeSolicitante = getNomeUsuario(solicitante) || 'Solicitante não encontrado';
        const idPedido = pedido.idPedido || pedido.id || '—';
        const categoria = getCategoriaPedido(pedido);
        const descricao = getDescricaoPedido(pedido);
        const statusTexto = getStatusTexto(pedido);

        const cardHTML = `
            <a href="#modal${idPedido}" class="pedido-card">
                <div class="status-circle">⏳</div>
                <div class="info">
                    <h3>Pedido #${idPedido}</h3>
                    <p class="category">${categoria}</p>
                    <p class="code">${descricao}</p>
                    <p class="code">Doador: ${nomeDoador}</p>
                    <p class="code">Solicitante: ${nomeSolicitante}</p>
                </div>
                <span class="status ${normalizarStatus(pedido.status) || 'andamento'}">${statusTexto}</span>
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
    });
});
