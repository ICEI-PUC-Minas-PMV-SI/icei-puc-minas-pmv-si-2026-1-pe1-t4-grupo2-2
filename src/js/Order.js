import { ManagerLocalStorage } from "/src/js/ManagerLocalStorage.js";
import { Utils } from "/src/js/Utils.js";

export class Order {

    #validateForm = (data) => {
        if (!data.title || !data.category || !data.description) {
            throw new Error('Todos os campos são obrigatórios.');
        }
        
        if (data.title.length < 3) {
            throw new Error('O título deve conter pelo menos 3 caracteres.');
        }

        if (data.description.length < 10) {
            throw new Error('A descrição deve conter pelo menos 10 caracteres.');
        }

        if(Utils.isOnlyDigits(data.title) || Utils.isOnlyDigits(data.description)) {
            throw new Error('O título e a descrição não podem conter apenas números.');
        }
    }

    #getCategories = (category) => {
        switch (category) {
            case "1":
                return { id: 1, slug: "categoria1", nome: "Roupas" };
            case "2":
                return { id: 2, slug: "categoria2", nome: "Alimentos" };
            case "3":
                return { id: 3, slug: "categoria3", nome: "Eletrônicos" };
            case "4":
                return { id: 4, slug: "categoria4", nome: "Móveis" };
            case "5":
                return { id: 5, slug: "categoria5", nome: "Brinquedos" };
            case "6":
                return { id: 6, slug: "categoria6", nome: "Livros" };
            case "7":
                return { id: 7, slug: "categoria7", nome: "Esportes" };
            case "8":
                return { id: 8, slug: "categoria8", nome: "Beleza" };
            case "9":
                return { id: 9, slug: "categoria9", nome: "Saúde" };
            default:
                throw new Error('Categoria inválida');
        }
    }

    #getUserLogado = () => {
        const userLogadoId = sessionStorage.getItem('careconnect_usuario_logado_id');
        if (!userLogadoId) {
            throw new Error('Nenhum usuário logado encontrado.');
        }

        return Number(userLogadoId);
    }

    #insertInfoLocalStorage = (obj) => {
        const userLogadoId = this.#getUserLogado();
        const orders = ManagerLocalStorage.getItem('pedidos');
        const ordersArray = Array.isArray(orders) ? orders : [];

        const order = {
            idPedido: Utils.generateUniqueId(),
            idSolicitante: userLogadoId,
            titulo: obj.title,
            categoria: this.#getCategories(obj.category),
            descricao: obj.description,
            status: "Aberto",
            criadoEm: new Date().toISOString(),
            atualizadoEm: new Date().toISOString()
        };

        ordersArray.push(order);
        ManagerLocalStorage.setItem('pedidos', ordersArray);

        return order.idPedido;
    }

    getUser = (idUsuario) => {
        const usuarios = ManagerLocalStorage.getItem('careconnect_usuarios');
        const usuariosArray = Array.isArray(usuarios) ? usuarios : [];
        return usuariosArray.find(u => u.id === idUsuario) || null;
    }

    get = (orderStatus = null) => {
        const orders = ManagerLocalStorage.getItem('pedidos');
        const ordersArray = Array.isArray(orders) ? orders : [];

        if (orderStatus === null) {
            return ordersArray;
        }

        return ordersArray.filter(order => order.status === orderStatus);
    }

    updateOrder = (idPedido) => {
        try {
            const userLogadoId = this.#getUserLogado();
            const orders = ManagerLocalStorage.getItem('pedidos');
            const ordersArray = Array.isArray(orders) ? orders : [];
            
            const orderIndex = ordersArray.findIndex(o => o.idPedido === idPedido);
            if (orderIndex === -1) {
                throw new Error('Pedido não encontrado.');
            }

            ordersArray[orderIndex].status = 'andamento';
            ordersArray[orderIndex].idDoador = userLogadoId;
            ordersArray[orderIndex].atualizadoEm = new Date().toISOString();

            ManagerLocalStorage.setItem('pedidos', ordersArray);
            return ordersArray[orderIndex];
        } catch (error) {
            console.error('Erro ao atualizar pedido:', error);
            throw error;
        }
    }

    set = () => {
        const form = document.getElementById('order-form');
        if (!form) return;

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            const obj = {
                title: data.title,
                category: data.category,
                description: data.description
            };

            const novoPedidoId = this.#insertInfoLocalStorage(obj);

            form.reset();
            window.location.href = `/src/pages/tela_pedidos/pedidos.html?novo=${novoPedidoId}`;
        });
    }
}
