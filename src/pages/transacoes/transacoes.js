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

    if (status === 'enviado') {
        return 'Enviado';
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

// ============ RASTREAMENTO E REPORTE ============

function verificarSeEhDoador(pedido, meuId) {
    const idDoador = getIdDoadorPedido(pedido);
    return Number(idDoador) === Number(meuId);
}

function verificarSeEhSolicitante(pedido, meuId) {
    const idSolicitante = getIdSolicitantePedido(pedido);
    return Number(idSolicitante) === Number(meuId);
}

function abrirModalRastreio(pedido, meuId) {
    const codigoExistente = pedido.codigoRastreio || '';
    const idPedido = pedido.idPedido || pedido.id;
    
    const html = `
        <div id="modal-rastreio-overlay" class="modal-overlay">
            <div class="modal-rastreio-content">
                <h3>Inserir Código de Rastreio</h3>
                <p class="modal-subtitle">Pedido #${idPedido}</p>
                <div class="form-group">
                    <label>Código de Rastreio:</label>
                    <input 
                        type="text" 
                        id="input-rastreio" 
                        placeholder="Ex: BR123456789AB" 
                        value="${codigoExistente}"
                        ${codigoExistente ? 'disabled' : ''}
                        maxlength="50"
                    />
                </div>
                <div class="modal-buttons">
                    <button onclick="document.getElementById('modal-rastreio-overlay').remove()">Cancelar</button>
                    ${!codigoExistente ? `<button onclick="salvarRastreio(${idPedido})" class="btn-primary">Salvar</button>` : '<button disabled>Já inserido</button>'}
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', html);
}

function salvarRastreio(idPedido) {
    const inputRastreio = document.getElementById('input-rastreio');
    const codigo = inputRastreio?.value?.trim();
    
    if (!codigo) {
        alert('Por favor, insira um código de rastreio');
        return;
    }
    
    const pedidos = getTodosPedidos();
    const pedidoIndex = pedidos.findIndex(p => (p.idPedido || p.id) === idPedido);
    
    if (pedidoIndex !== -1) {
        pedidos[pedidoIndex].codigoRastreio = codigo;
        pedidos[pedidoIndex].status = 'enviado';
        ManagerLocalStorage.setItem('pedidos', pedidos);
        
        document.getElementById('modal-rastreio-overlay').remove();
        alert('Código de rastreio salvo com sucesso!');
        location.reload();
    }
}

function abrirModalReporte(pedido, meuId) {
    const idPedido = pedido.idPedido || pedido.id;
    const ehDoador = verificarSeEhDoador(pedido, meuId);
    const ehSolicitante = verificarSeEhSolicitante(pedido, meuId);
    
    let opcoes = '';
    
    if (ehDoador) {
        opcoes = `
            <div class="radio-group">
                <label><input type="radio" name="motivo-reporte" value="impossibilidade-envio"> Impossibilidade do envio</label>
                <label><input type="radio" name="motivo-reporte" value="engano"> Pedido selecionado por engano</label>
            </div>
        `;
    } else if (ehSolicitante) {
        opcoes = `
            <div class="radio-group">
                <label><input type="radio" name="motivo-reporte" value="demora-doador"> Demora por parte do doador para realizar o envio</label>
                <label><input type="radio" name="motivo-reporte" value="cancelar"> Cancelar solicitação</label>
            </div>
        `;
    }
    
    const html = `
        <div id="modal-reporte-overlay" class="modal-overlay">
            <div class="modal-reporte-content">
                <h3>Reportar Transação</h3>
                <p class="modal-subtitle">Pedido #${idPedido}</p>
                ${opcoes}
                <div class="modal-buttons">
                    <button class="btn-cancel"onclick="document.getElementById('modal-reporte-overlay').remove()">Cancelar</button>
                    <button onclick="processarReporte(${idPedido})" class="btn-danger">Reportar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', html);
}

function processarReporte(idPedido) {
    const selectedMotivo = document.querySelector('input[name="motivo-reporte"]:checked');
    
    if (!selectedMotivo) {
        alert('Por favor, selecione um motivo');
        return;
    }
    
    const motivo = selectedMotivo.value;
    const pedidos = getTodosPedidos();
    const pedidoIndex = pedidos.findIndex(p => (p.idPedido || p.id) === idPedido);
    
    if (pedidoIndex !== -1) {
        const pedido = pedidos[pedidoIndex];
        
        if (motivo === 'impossibilidade-envio' || motivo === 'engano' || motivo === 'demora-doador') {
            pedidos[pedidoIndex].status = 'Aberto';
            pedidos[pedidoIndex].motivo_reporte = motivo;
            // Limpar ID do doador anterior quando volta para aberto
            pedidos[pedidoIndex].idDoador = null;
            pedidos[pedidoIndex].doadorId = null;
            pedidos[pedidoIndex].idUsuarioDoador = null;
        } else if (motivo === 'cancelar') {
            pedidos[pedidoIndex].status = 'cancelado';
            pedidos[pedidoIndex].motivo_reporte = motivo;
        }
        
        ManagerLocalStorage.setItem('pedidos', pedidos);
        
        document.getElementById('modal-reporte-overlay').remove();
        alert('Reporte registrado com sucesso! Você será redirecionado.');
        
        setTimeout(() => {
            window.location.href = '../tela_pedidos/pedidos.html';
        }, 1500);
    }
}

function confirmarEntrega(idPedido) {
    const pedidos = getTodosPedidos();
    const idx = pedidos.findIndex(p => String(p.idPedido || p.id) === String(idPedido));

    if (idx !== -1) {
        pedidos[idx].status = 'concluido';
        pedidos[idx].atualizadoEm = new Date().toISOString();
        ManagerLocalStorage.setItem('pedidos', pedidos);
        fecharModal(`modal${idPedido}`);
        alert('Entrega confirmada com sucesso! Obrigado por usar o CareConnect.');
        location.reload();
    }
}

// ===== Expor funções globalmente para onclick do HTML =====
window.abrirModalRastreio = abrirModalRastreio;
window.abrirModalReporte = abrirModalReporte;
window.abrirModal = abrirModal;
window.fecharModal = fecharModal;
window.salvarRastreio = salvarRastreio;
window.processarReporte = processarReporte;
window.confirmarEntrega = confirmarEntrega;
// ======================================================

// ============ PAGINAÇÃO ============

let paginaAtual = 1;
const ITENS_POR_PAGINA = 6;
let todasAsTransacoes = [];
let meuIdGlobal = null;

function mostrarPagina(pagina, meuId) {
    paginaAtual = pagina;
    const inicio = (pagina - 1) * ITENS_POR_PAGINA;
    const fim = inicio + ITENS_POR_PAGINA;
    const transacoesPagina = todasAsTransacoes.slice(inicio, fim);

    const containerPedidos = document.getElementById('container-pedidos');
    const containerModais = document.getElementById('container-modais');
    
    if (!containerPedidos) {
        return;
    }
    if (!containerModais) {
        return;
    }

    containerPedidos.innerHTML = '';
    containerModais.innerHTML = '';

    transacoesPagina.forEach((pedido, index) => {
        criarCardTransacao(pedido, containerPedidos, containerModais, meuId);
    });
}

function criarCardTransacao(pedido, containerPedidos, containerModais, meuId) {
    const usuarios = getTodosUsuarios();
    const idDoador = getIdDoadorPedido(pedido);
    const idSolicitante = getIdSolicitantePedido(pedido);
    
    const doador = encontrarUsuarioPorId(idDoador, usuarios);
    const solicitante = encontrarUsuarioPorId(idSolicitante, usuarios);

    const nomeDoador = getNomeUsuario(doador) || `Usuário #${idDoador}`;
    const nomeSolicitante = getNomeUsuario(solicitante) || `Usuário #${idSolicitante}`;
    const idPedido = pedido.idPedido || pedido.id || '—';
    const categoria = getCategoriaPedido(pedido);
    const descricao = getDescricaoPedido(pedido);
    const statusTexto = getStatusTexto(pedido);
    const status = normalizarStatus(pedido.status);
    const codigoRastreio = pedido.codigoRastreio || '';

    // Determinar ícone baseado no status
    let statusIcon = '<img src="../../assets/img/loader-transition.svg" alt="Em andamento" style="width: 2.5rem; height: auto;">';
    if (status === 'enviado') {
        statusIcon = '<img src="../../assets/img/send-transition.svg" alt="Enviado" style="width: 2.5rem; height: auto;">';
    } else if (status === 'concluído' || status === 'concluido' || status === 'entregue') {
        statusIcon = '<img src="../../assets/img/confirm-transition.svg" alt="Concluído" style="width: 2.5rem; height: auto;">';
    } else if (status === 'pendente') {
        statusIcon = '⏱️';
    } else if (status === 'cancelado') {
        statusIcon = '❌';
    }

    const ehDoador = verificarSeEhDoador(pedido, meuId);
    const ehSolicitante = verificarSeEhSolicitante(pedido, meuId);

    // Criar botões dinamicamente
    let botoesCard = '';
    botoesCard += `<button class="btn-card btn-danger" onclick="event.stopPropagation(); abrirModalReporte(${JSON.stringify(pedido).replace(/"/g, '&quot;')}, ${meuId})" ${codigoRastreio ? 'disabled title="Código de rastreio já foi inserido"' : ''}>Reportar</button>`;
    if (ehDoador && status !== 'cancelado') {
        botoesCard += `<button class="btn-card" onclick="event.stopPropagation(); abrirModalRastreio(${JSON.stringify(pedido).replace(/"/g, '&quot;')}, ${meuId})" ${codigoRastreio ? 'disabled title="Código já foi inserido"' : ''}>Rastreio</button>`;
    }
    if (ehSolicitante && status === 'enviado') {
        botoesCard += `<button class="btn-card btn-success" onclick="event.stopPropagation(); confirmarEntrega('${idPedido}')">Confirmar entrega</button>`;
    }

    const cardHTML = `
        <div class="pedido-card" onclick="abrirModal('modal${idPedido}')">
            <div class="card-left">
                <div class="status-circle">${statusIcon}</div>
                <div class="info">
                    <h3>Pedido #${idPedido}</h3>
                    <p class="category">${categoria}</p>
                    <p class="code">${descricao}</p>
                    <p class="code">Doador: ${nomeDoador}</p>
                    <p class="code">Solicitante: ${nomeSolicitante}</p>
                </div>
            </div>
            <div class="card-right">
                <span class="status ${status || 'andamento'}">${statusTexto}</span>
                <div class="card-buttons">
                    ${botoesCard}
                </div>
            </div>
        </div>
    `;

    const codigoRastreioHTML = codigoRastreio ? `
        <div class="modal-field">
            <label>Código de Rastreio</label>
            <span>${codigoRastreio}</span>
        </div>
    ` : '';

    const confirmarEntregaHTML = (ehSolicitante && status === 'enviado') ? `
        <div class="modal-confirm-entrega">
            <p class="modal-confirm-msg">Você recebeu a doação? Confirme o recebimento para concluir a transação.</p>
            <button class="btn-confirm-entrega" onclick="confirmarEntrega('${idPedido}')">✅ Confirmar recebimento</button>
        </div>
    ` : '';

    const modalHTML = `
        <div id="modal${idPedido}" class="modal">
            <div class="modal-content">
                <a href="#" class="fechar" onclick="fecharModal('modal${idPedido}')">×</a>
                <p class="modal-tag">Rastreamento</p>
                <h2>Pedido #${idPedido}</h2>
                <div class="modal-grid">
                    <div class="modal-field"><label>Doador</label><span>${nomeDoador}</span></div>
                    <div class="modal-field"><label>Solicitante</label><span>${nomeSolicitante}</span></div>
                    <div class="modal-field"><label>Categoria</label><span>${categoria}</span></div>
                    <div class="modal-field"><label>Status</label><span>${statusTexto}</span></div>
                    <div class="modal-field"><label>Descrição</label><span>${descricao}</span></div>
                    ${codigoRastreioHTML}
                </div>
                ${confirmarEntregaHTML}
            </div>
        </div>
    `;

    containerPedidos.innerHTML += cardHTML;
    containerModais.innerHTML += modalHTML;
}

function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('modal-open');
    }
}

function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('modal-open');
    }
}

function atualizarPaginacao(meuId) {
    const paginationElement = document.getElementById('pagination');
    const totalPaginas = Math.ceil(todasAsTransacoes.length / ITENS_POR_PAGINA);

    // Remover paginação se houver menos de 6 resultados
    if (todasAsTransacoes.length < ITENS_POR_PAGINA) {
        if (paginationElement) {
            paginationElement.classList.add('hidden');
        }
        return;
    }

    if (paginationElement) {
        paginationElement.classList.remove('hidden');
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
                mostrarPagina(i, meuId);
                atualizarPaginacao(meuId);
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

    const usuarioLogado = getUsuarioLogado();
    if (!usuarioLogado) {
        containerPedidos.innerHTML = '<p class="page-desc">Faça login para ver suas transações.</p>';
        if (paginationElement) paginationElement.classList.add('hidden');
        return;
    }

    meuIdGlobal = getIdUsuario(usuarioLogado);
    const pedidos = getTodosPedidos();

    // FILTRAR: Mostrar TODAS as transações que envolvem o usuário (como doador ou solicitante)
    // MAS excluir pedidos com status "aberto" (esses voltam para a lista de pedidos)
    todasAsTransacoes = pedidos.filter(pedido => {
        const idDoador = getIdDoadorPedido(pedido);
        const idSolicitante = getIdSolicitantePedido(pedido);
        const status = normalizarStatus(pedido.status);

        // Excluir pedidos com status "aberto"
        if (status === 'aberto') {
            return false;
        }

        return Number(idDoador) === Number(meuIdGlobal) ||
               Number(idSolicitante) === Number(meuIdGlobal);
    });

    if (todasAsTransacoes.length === 0) {
        containerPedidos.innerHTML = '<p class="page-desc">Você ainda não possui nenhuma transação.</p>';
        if (paginationElement) paginationElement.classList.add('hidden');
        return;
    }

    // Mostrar primeira página e atualizar paginação
    mostrarPagina(1, meuIdGlobal);
    atualizarPaginacao(meuIdGlobal);

    // Eventos dos botões de paginação (apenas se houver paginação)
    if (prevBtn && nextBtn && todasAsTransacoes.length >= ITENS_POR_PAGINA) {
        prevBtn.addEventListener('click', () => {
            if (paginaAtual > 1) {
                mostrarPagina(paginaAtual - 1, meuIdGlobal);
                atualizarPaginacao(meuIdGlobal);
            }
        });

        nextBtn.addEventListener('click', () => {
            const totalPaginas = Math.ceil(todasAsTransacoes.length / ITENS_POR_PAGINA);
            if (paginaAtual < totalPaginas) {
                mostrarPagina(paginaAtual + 1, meuIdGlobal);
                atualizarPaginacao(meuIdGlobal);
            }
        });
    }
});
