/**
 * AuthGuard.js - Sistema de autenticação e proteção de rotas
 * Verifica se o usuário está logado e redireciona se necessário
 */

export class AuthGuard {
    static STORAGE_USUARIO_LOGADO_ID = 'careconnect_usuario_logado_id';
    static STORAGE_USUARIO_LOGADO = 'careconnect_usuario_logado';
    static LOGIN_URL = '/src/pages/tela_login/tela_login.html';
    static PEDIDOS_URL = '/src/pages/tela_pedidos/pedidos.html';

    /**
     * Verifica se existe um usuário logado no sessionStorage
     */
    static isUserLoggedIn() {
        return sessionStorage.getItem(this.STORAGE_USUARIO_LOGADO_ID) !== null;
    }

    /**
     * Obtém o ID do usuário logado
     */
    static getLoggedInUserId() {
        const id = sessionStorage.getItem(this.STORAGE_USUARIO_LOGADO_ID);
        return id ? Number(id) : null;
    }

    /**
     * Obtém os dados do usuário logado
     */
    static getLoggedInUser() {
        const userJson = sessionStorage.getItem(this.STORAGE_USUARIO_LOGADO);
        return userJson ? JSON.parse(userJson) : null;
    }

    /**
     * Faz logout do usuário
     */
    static logout() {
        sessionStorage.removeItem(this.STORAGE_USUARIO_LOGADO_ID);
        sessionStorage.removeItem(this.STORAGE_USUARIO_LOGADO);
        window.location.href = this.LOGIN_URL;
    }

    /**
     * Protege uma página - redireciona para login se não estiver autenticado
     * Use em páginas que requerem autenticação
     */
    static protectPage() {
        if (!this.isUserLoggedIn()) {
            window.location.href = this.LOGIN_URL;
        }
    }

    /**
     * Se usuário NÃO está logado, redireciona para login
     * Se estiver logado, pode acessar a página normalmente
     * Use em páginas públicas que devem mostrar menus diferentes
     */
    static redirectToLoginIfNotAuthenticated() {
        if (!this.isUserLoggedIn()) {
            window.location.href = this.LOGIN_URL;
        }
    }
}
