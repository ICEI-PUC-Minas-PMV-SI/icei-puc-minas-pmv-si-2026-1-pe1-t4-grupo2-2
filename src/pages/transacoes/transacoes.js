// 1. FUNÇÃO DE SIMULAÇÃO DE DADOS - PARA TESTES E DEMONSTRAÇÃO

function simularDadosDoGrupo() {
    const doadorFicticio = { idDoador: 456, nome: "Carlos Mendes" };
    localStorage.setItem('usuarioLogado', JSON.stringify(doadorFicticio));

    
    const pedidosFicticios = [
        { idPedido: 1027, idDoador: 456, item: "Cobertores", status: "enviado", statusTexto: "Enviado", icone: "✈️", codigo: "BR45896323", destino: "ONG Mãos Unidas", passos: ["done", "done", "done", ""] },
        { idPedido: 1025, idDoador: 456, item: "Roupas infantis", status: "transporte", statusTexto: "Em transporte", icone: "↻", codigo: "BR45896321", destino: "ONG Esperança", passos: ["done", "done", "done", ""] },
        { idPedido: 1026, idDoador: 456, item: "Alimentos", status: "entregue", statusTexto: "Entregue", icone: "✔", codigo: "BR45896322", destino: "ONG Vida", passos: ["done", "done", "done", "done"] },
        
        
        { idPedido: 1031, idDoador: 456, item: "Kits de Higiene", status: "aberto", statusTexto: "Aberto", icone: "📄", codigo: "BR45896327", destino: "Aguardando Coleta", passos: ["done", "", "", ""] },
        { idPedido: 1032, idDoador: 456, item: "Brinquedos", status: "cancelado", statusTexto: "Cancelado", icone: "❌", codigo: "BR45896328", destino: "Recusado", passos: ["done", "", "", ""] },
        { idPedido: 1033, idDoador: 456, item: "Cadeiras de Rodas", status: "concluido", statusTexto: "Concluído", icone: "🎉", codigo: "BR45896329", destino: "Asilo São Vicente", passos: ["done", "done", "done", "done"] },
        { idPedido: 1034, idDoador: 456, item: "Calçados", status: "andamento", statusTexto: "Em andamento", icone: "⏳", codigo: "BR45896330", destino: "Triagem Central", passos: ["done", "done", "", ""] }
    ];
    
    
    localStorage.setItem('todosPedidos', JSON.stringify(pedidosFicticios));
}

// Simular dados ao carregar o módulo
simularDadosDoGrupo();

document.addEventListener('DOMContentLoaded', () => {
    const containerPedidos = document.getElementById('container-pedidos');
    const containerModais = document.getElementById('container-modais');

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const todosPedidos = JSON.parse(localStorage.getItem('todosPedidos')) || [];

    if (!usuarioLogado) {
        alert("Nenhum doador logado encontrado! Voltando ao Login.");
        window.location.href = "../tela_login/tela_login.html";
        return;
    }

    const meusPedidos = todosPedidos.filter(pedido => pedido.idDoador === usuarioLogado.idDoador);

    if (meusPedidos.length === 0) {
        containerPedidos.innerHTML = `<p class="page-desc">Você ainda não realizou nenhuma doação.</p>`;
        return;
    }

    containerPedidos.innerHTML = "";
    containerModais.innerHTML = "";

    meusPedidos.forEach(pedido => {
        
        const cardHTML = `
            <a href="#modal${pedido.idPedido}" class="pedido-card">
                <div class="status-circle">${pedido.icone}</div>
                <div class="info">
                    <h3>Pedido #${pedido.idPedido}</h3>
                    <p class="category">${pedido.item}</p>
                    <p class="code">Código: ${pedido.codigo}</p>
                </div>
                <span class="status ${pedido.status}">${pedido.statusTexto}</span>
                <span class="card-arrow">›</span>
            </a>
        `;
        containerPedidos.innerHTML += cardHTML;

        
        const modalHTML = `
            <div id="modal${pedido.idPedido}" class="modal">
                <div class="modal-content">
                    <a href="#" class="fechar">×</a>
                    <p class="modal-tag">Rastreamento</p>
                    <h2>Pedido #${pedido.idPedido}</h2>
                    <div class="modal-grid">
                        <div class="modal-field"><label>Doador</label><span>${usuarioLogado.nome}</span></div>
                        <div class="modal-field"><label>Destino</label><span>${pedido.destino}</span></div>
                        <div class="modal-field"><label>Código</label><span>${pedido.codigo}</span></div>
                    </div>
                    <p class="tracking-label">Histórico</p>
                    <ul class="timeline">
                        <li class="${pedido.passos[0]}">Pedido criado</li>
                        <li class="${pedido.passos[1]}">Coletado</li>
                        <li class="${pedido.passos[2]}">Em rota</li>
                        <li class="${pedido.passos[3]}">${pedido.statusTexto === 'Cancelado' ? 'Cancelado' : 'Entregue'}</li>
                    </ul>
                </div>
            </div>
        `;
        containerModais.innerHTML += modalHTML;
    });
});
