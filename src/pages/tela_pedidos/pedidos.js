

import { Order } from "../../js/Order.js";
import { AuthGuard } from "../../js/AuthGuard.js";
import { Hamburger } from "../../js/Hamburger.js";


class ManagerOrder {
    constructor() {
        this.order = new Order();
        this.pedidosData = this.order.get("Aberto").reduce((acc, pedido) => {
            acc[pedido.idPedido] = pedido;
            return acc;
        }, {});

        this.PEDIDOS_POR_PAGINA = 6;
        this.currentPage = 1;
        this.currentSearch = '';

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') this.closeModal();
        });

        this.renderOrders();
    }

    renderOrders() {
        const grid = document.getElementById('pedidos-grid');
        const emptyState = document.getElementById('empty-state');
        const emptyMsg = document.getElementById('empty-msg');
        const pedidos = Object.values(this.pedidosData)
            .sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm)); // Ordenar por data de criação (mais novos primeiro)

        grid.querySelectorAll('.pedido-card').forEach(c => c.remove());

        if (pedidos.length === 0) {
            if (this.currentSearch) {
                emptyMsg.textContent = `Nenhum pedido encontrado para "${this.currentSearch}".`;
            } else {
                emptyMsg.textContent = 'Nenhum pedido disponível.';
            }
            emptyState.style.display = 'flex';
            this.updatePagination(0);
            return;
        }

        emptyState.style.display = 'none';

        // Calcular paginação
        const totalPages = Math.ceil(pedidos.length / this.PEDIDOS_POR_PAGINA);
        const inicio = (this.currentPage - 1) * this.PEDIDOS_POR_PAGINA;
        const fim = inicio + this.PEDIDOS_POR_PAGINA;
        const pedidosPagina = pedidos.slice(inicio, fim);

        pedidosPagina.forEach(pedido => {
            const resumo = pedido.descricao.length > 200
                ? pedido.descricao.substring(0, 200) + '...'
                : pedido.descricao;

            const dataCriacao = new Date(pedido.criadoEm).toLocaleDateString('pt-BR');
            const usuario = this.order.getUser(pedido.idSolicitante);
            const nomeUsuario = usuario ? usuario.nomeCompleto : 'Usuário desconhecido';
            const local = usuario ? `${usuario.cidade}, ${usuario.estado}` : '';
            const busca = `${pedido.titulo} ${pedido.categoria.nome} ${nomeUsuario} ${local}`.toLowerCase();
            
            // Verificar se o pedido pertence ao usuário logado
            const isOwnOrder = pedido.idSolicitante === AuthGuard.getLoggedInUserId();
            const btnPegarDisabled = isOwnOrder ? 'disabled' : '';
            const btnPegarClass = isOwnOrder ? 'btn--disabled' : '';

            const article = document.createElement('article');
            article.className = 'pedido-card';
            article.setAttribute('data-busca', busca);
            article.innerHTML = `
                <div class="pedido-card__header">
                    <h2 class="pedido-card__titulo">${pedido.titulo}</h2>
                    <span class="pedido-card__categoria">${pedido.categoria.nome}</span>
                </div>
                <div class="pedido-card__meta">
                    <span class="pedido-card__meta-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        ${nomeUsuario}
                    </span>
                    ${local ? `<span class="pedido-card__meta-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        ${local}
                    </span>` : ''}
                </div>
                <p class="pedido-card__texto">${resumo}</p>
                <div class="pedido-card__acoes">
                    <button class="btn btn--outline" data-id="${pedido.idPedido}" data-action="open-modal">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        Ler pedido completo
                    </button>
                    <button class="btn btn--primary ${btnPegarClass}" data-id="${pedido.idPedido}" data-titulo="${pedido.titulo.replace(/"/g, '&quot;')}" data-action="pegar-pedido" ${btnPegarDisabled} title="${isOwnOrder ? 'Você não pode capturar seu próprio pedido' : ''}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                        Pegar pedido
                    </button>
                </div>
            `;

            grid.insertBefore(article, emptyState);
        });

        grid.addEventListener('click', e => {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;
            const { id, action, titulo } = btn.dataset;
            if (action === 'open-modal') this.openModal(id);
            if (action === 'pegar-pedido') this.getOrder(id, titulo);
        });

        this.updatePagination(totalPages);
    }

    updatePagination(totalPages) {
        const pageNumbers = document.getElementById('page-numbers');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const pagination = document.getElementById('pagination');
        
        // Mostrar/esconder paginação quando não há pedidos
        pagination.style.display = totalPages === 0 ? 'none' : 'flex';
        
        // Limpar botões de página antigos
        pageNumbers.querySelectorAll('.page-btn:not(.page-arrow)').forEach(btn => btn.remove());
        
        // Criar novos botões de página
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.className = `page-btn${i === this.currentPage ? ' active' : ''}`;
            btn.setAttribute('data-page', i);
            btn.textContent = i;
            
            btn.addEventListener('click', () => {
                this.currentPage = i;
                this.renderOrders();
                window.scrollTo(0, 0);
            });
            
            pageNumbers.appendChild(btn);
        }
        
        // Atualizar estado dos botões de navegação
        prevBtn.disabled = this.currentPage === 1;
        nextBtn.disabled = this.currentPage === totalPages || totalPages === 0;
        
        // Event listeners para botões de navegação
        prevBtn.onclick = () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderOrders();
                window.scrollTo(0, 0);
            }
        };
        
        nextBtn.onclick = () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderOrders();
                window.scrollTo(0, 0);
            }
        };
    }

    filterOrders(query) {
        const q = query.toLowerCase().trim();
        this.currentSearch = query;
        
        if (!q) {
            // Se não há query, mostrar todos os pedidos
            this.pedidosData = this.order.get("Aberto").reduce((acc, pedido) => {
                acc[pedido.idPedido] = pedido;
                return acc;
            }, {});
        } else {
            // Filtrar os pedidos baseado na query
            const todosPedidos = this.order.get("Aberto");
            this.pedidosData = {};
            
            todosPedidos.forEach(pedido => {
                const usuario = this.order.getUser(pedido.idSolicitante);
                const nomeUsuario = usuario ? usuario.nomeCompleto : 'Usuário desconhecido';
                const local = usuario ? `${usuario.cidade}, ${usuario.estado}` : '';
                const busca = `${pedido.titulo} ${pedido.categoria.nome} ${nomeUsuario} ${local}`.toLowerCase();
                
                if (busca.includes(q)) {
                    this.pedidosData[pedido.idPedido] = pedido;
                }
            });
        }
        
        // Reset para página 1 quando filtrar
        this.currentPage = 1;
        this.renderOrders();
    }

    openModal(id) {
        const pedidoId = Number(id);
        const pedido = this.pedidosData[pedidoId];
        if (!pedido) return;

        const dataCriacao = new Date(pedido.criadoEm).toLocaleDateString('pt-BR');
        const usuario = this.order.getUser(pedido.idSolicitante);
        const nomeUsuario = usuario ? usuario.nomeCompleto : 'Usuário desconhecido';
        const local = usuario ? `${usuario.cidade}, ${usuario.estado}` : '';
        const conteudo = document.getElementById('modal-conteudo');
        conteudo.innerHTML = `
            <div class="modal__categoria">${pedido.categoria.nome}</div>
            <h2 class="modal__titulo">${pedido.titulo}</h2>
            <div class="modal__meta">
                <span>${nomeUsuario}</span>
                ${local ? `<span>·</span><span>${local}</span>` : ''}
                <span>·</span>
                <span>${dataCriacao}</span>
            </div>
            <div class="modal__texto"><p>${pedido.descricao.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p></div>
        `;

        const btnPegar = document.getElementById('modal-btn-pegar');
        
        // Verificar se é o pedido do usuário logado
        const isOwnOrder = pedido.idSolicitante === AuthGuard.getLoggedInUserId();
        
        if (isOwnOrder) {
            btnPegar.disabled = true;
            btnPegar.classList.add('btn--disabled');
            btnPegar.title = 'Você não pode capturar seu próprio pedido';
        } else {
            btnPegar.disabled = false;
            btnPegar.classList.remove('btn--disabled');
            btnPegar.title = '';
            btnPegar.onclick = () => {
                this.closeModal();
                this.getOrder(pedidoId, pedido.titulo);
            };
        }

        document.getElementById('modal-overlay').classList.add('modal-overlay--visivel');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        document.getElementById('modal-overlay').classList.remove('modal-overlay--visivel');
        document.body.style.overflow = '';
    }

    getOrder(id, titulo) {
        const pedidoId = Number(id);
        
        // Verifica se usuário está autenticado
        if (!AuthGuard.isUserLoggedIn()) {
            alert('Você precisa estar logado para capturar um pedido.');
            window.location.href = '/src/pages/tela_login/tela_login.html';
            return;
        }

        try {
            this.order.updateOrder(pedidoId);
            
            // Mostrar modal de sucesso
            const successModal = document.getElementById('success-modal');
            const successTitle = document.getElementById('success-modal-title');
            const successMessage = document.getElementById('success-modal-message');
            
            successTitle.textContent = `Pedido "${titulo}" capturado!`;
            successMessage.textContent = 'Entraremos em contato com mais detalhes sobre a doação.';
            
            successModal.classList.add('success-modal--visible');
            document.body.style.overflow = 'hidden';
        } catch (error) {
            alert(`Erro ao capturar pedido: ${error.message}`);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar hamburguer
    new Hamburger();
    
    const isLoggedIn = AuthGuard.isUserLoggedIn();
    document.title = isLoggedIn ? 'CareConnect - Pedidos' : 'CareConnect - Home';
    
    const navAuthenticated = document.getElementById('nav-authenticated');
    const navUnauthenticated = document.getElementById('nav-unauthenticated');
    
    // Remover o menu que não vai ser usado (em qualquer resolução)
    if (isLoggedIn) {
        navUnauthenticated?.remove();
    } else {
        navAuthenticated?.remove();
    }
    
    // EM DESKTOP: Deixar o menu visível por padrão
    // EM MOBILE: Hamburger.js cuidará com classes .active
    if (window.innerWidth > 768) {
        const remainingMenu = document.querySelector('.nav-menu');
        if (remainingMenu) {
            remainingMenu.style.display = 'flex';
        }
    }

    const gerenciadorPedidos = new ManagerOrder();

    window.filterOrders = (query) => gerenciadorPedidos.filterOrders(query);
    window.openModal = (id) => gerenciadorPedidos.openModal(id);
    window.closeModal = () => gerenciadorPedidos.closeModal();
    window.getOrder = (id, titulo) => gerenciadorPedidos.getOrder(id, titulo);
    window.logout = () => AuthGuard.logout();
    
    const params = new URLSearchParams(window.location.search);
    const novoPedidoId = params.get('novo');
    if (novoPedidoId) {
        setTimeout(() => {
            gerenciadorPedidos.openModal(novoPedidoId);
            window.history.replaceState({}, document.title, window.location.pathname);
        }, 300);
    }
    
    window.closeSuccessModal = () => {
        const successModal = document.getElementById('success-modal');
        successModal.classList.remove('success-modal--visible');
        document.body.style.overflow = '';
        setTimeout(() => window.location.reload(), 300);
    };
});
