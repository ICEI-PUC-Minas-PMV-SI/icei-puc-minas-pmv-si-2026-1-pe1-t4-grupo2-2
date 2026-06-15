import { Order } from "/src/js/Order.js";

document.title = 'CareConnect - Criar Pedido';

document.addEventListener('DOMContentLoaded', () => {
    const order = new Order();
    order.set();
});
