// ============================================
// SISTEMA DE LOGIN COM LOCALSTORAGE
// ============================================

document.title = 'CareConnect - Login';

// Chave para armazenar usuários no LocalStorage
const STORAGE_KEY = 'careconnect_usuarios';
const STORAGE_USUARIO_LOGADO_ID = 'careconnect_usuario_logado_id';
const STORAGE_USUARIO_LOGADO = 'careconnect_usuario_logado';

// ============================================
// DADOS MOCK (exemplo para teste)
// ============================================
const mockUsuarios = [
    {
        id: 1,
        nomeCompleto: "João Silva",
        email: "joao@email.com",
        usuario: "joao.silva",
        senha: "123456",
        cpf: "123.456.789-00",
        dataNascimento: "1990-05-15",
        perfil: "beneficiario",
        cidade: "Belo Horizonte",
        estado: "MG",
        dataCadastro: "2024-01-15T10:30:00Z"
    },
    {
        id: 2,
        nomeCompleto: "Maria Oliveira",
        email: "maria@email.com",
        usuario: "maria.oliveira",
        senha: "senha123",
        cpf: "987.654.321-00",
        dataNascimento: "1985-08-22",
        perfil: "doador",
        cidade: "São Paulo",
        estado: "SP",
        dataCadastro: "2024-02-20T14:45:00Z"
    },
    {
        id: 3,
        nomeCompleto: "Pedro Santos",
        email: "pedro@email.com",
        usuario: "pedro.santos",
        senha: "pedro456",
        cpf: "456.789.123-00",
        dataNascimento: "2000-03-10",
        perfil: "ong",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        dataCadastro: "2024-03-10T09:15:00Z"
    }
];

// ============================================
// FUNÇÕES PRINCIPAIS
// ============================================

// Inicializar o LocalStorage com dados mock (se estiver vazio)
function inicializarLocalStorage() {
    const usuariosExistente = localStorage.getItem(STORAGE_KEY);
    
    if (!usuariosExistente) {
        // Salvar os dados mock no LocalStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUsuarios));
        console.log('✅ Dados mock inicializados no LocalStorage');
        return mockUsuarios;
    }
    
    return JSON.parse(usuariosExistente);
}

// Pegar todos os usuários do LocalStorage
function getUsuarios() {
    const usuarios = localStorage.getItem(STORAGE_KEY);
    if (usuarios) {
        return JSON.parse(usuarios);
    }
    return [];
}

// Salvar usuários no LocalStorage
function salvarUsuarios(usuarios) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
}

// Adicionar novo usuário (para ser usado na tela de criar conta)
function adicionarUsuario(novoUsuario) {
    const usuarios = getUsuarios();
    
    // Verificar se usuário ou email já existe
    const existe = usuarios.some(u => 
        u.email === novoUsuario.email || u.usuario === novoUsuario.usuario
    );
    
    if (existe) {
        throw new Error('Usuário ou e-mail já cadastrado!');
    }
    
    // Gerar novo ID
    const novoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    
    // Adicionar dados extras
    const usuarioCompleto = {
        ...novoUsuario,
        id: novoId,
        dataCadastro: new Date().toISOString()
    };
    
    usuarios.push(usuarioCompleto);
    salvarUsuarios(usuarios);
    
    return usuarioCompleto;
}

// Função de login
function fazerLogin(login, senha) {
    const usuarios = getUsuarios();
    
    // Buscar por usuário OU email
    const usuario = usuarios.find(u => 
        (u.usuario === login || u.email === login) && u.senha === senha
    );
    
    if (usuario) {
        // Retornar usuário sem a senha (por segurança)
        const { senha: _, ...usuarioSemSenha } = usuario;
        return {
            sucesso: true,
            usuario: usuarioSemSenha
        };
    }
    
    return {
        sucesso: false,
        mensagem: 'Usuário/e-mail ou senha incorretos!'
    };
}

// Verificar se usuário está logado (para páginas protegidas)
function usuarioEstaLogado() {
    return sessionStorage.getItem(STORAGE_USUARIO_LOGADO_ID) !== null;
}

// Obter dados do usuário logado
function getUsuarioLogado() {
    const idLogado = Number(sessionStorage.getItem(STORAGE_USUARIO_LOGADO_ID));
    if (!idLogado) {
        return null;
    }

    const usuarios = getUsuarios();
    const usuario = usuarios.find(u => u.id === idLogado);
    if (!usuario) {
        sessionStorage.removeItem(STORAGE_USUARIO_LOGADO_ID);
        sessionStorage.removeItem(STORAGE_USUARIO_LOGADO);
        return null;
    }

    const { senha: _, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
}

// Fazer logout
function fazerLogout() {
    sessionStorage.removeItem(STORAGE_USUARIO_LOGADO_ID);
    sessionStorage.removeItem(STORAGE_USUARIO_LOGADO);
    window.location.href = '../tela_login/tela_login.html';
}

// ============================================
// FUNÇÕES PARA EXIBIR MENSAGENS
// ============================================

// Criar elemento de mensagem (se não existir)
function criarElementoMensagem() {
    let mensagemDiv = document.getElementById('mensagem-login');
    
    if (!mensagemDiv) {
        mensagemDiv = document.createElement('div');
        mensagemDiv.id = 'mensagem-login';
        mensagemDiv.style.cssText = `
            margin: 10px 0;
            padding: 10px;
            border-radius: 5px;
            font-size: 14px;
            display: none;
        `;
        
        // Inserir antes do botão
        const button = document.querySelector('.section-page button');
        if (button) {
            button.parentNode.insertBefore(mensagemDiv, button);
        }
    }
    
    return mensagemDiv;
}

function mostrarMensagem(mensagem, tipo = 'erro') {
    const mensagemDiv = criarElementoMensagem();
    
    mensagemDiv.textContent = mensagem;
    mensagemDiv.style.display = 'block';
    
    if (tipo === 'erro') {
        mensagemDiv.style.backgroundColor = '#ffebee';
        mensagemDiv.style.color = '#c62828';
        mensagemDiv.style.borderLeft = '4px solid #c62828';
    } else {
        mensagemDiv.style.backgroundColor = '#e8f5e9';
        mensagemDiv.style.color = '#2e7d32';
        mensagemDiv.style.borderLeft = '4px solid #2e7d32';
    }
    
    // Esconder mensagem após 3 segundos
    setTimeout(() => {
        mensagemDiv.style.display = 'none';
    }, 3000);
}

// ============================================
// INICIALIZAÇÃO DA TELA DE LOGIN
// ============================================

// Função principal que roda quando a página carrega
function initTelaLogin() {
    console.log('🚀 Inicializando tela de login...');
    
    // Inicializar LocalStorage com dados mock
    inicializarLocalStorage();
    
    // Verificar se já está logado
    if (usuarioEstaLogado()) {
        window.location.href = '../tela_pedidos/pedidos.html';
        return;
    }
    
    // Adicionar evento ao botão de login
    const button = document.querySelector('.section-page button');
    const inputUser = document.getElementById('user');
    const inputPassword = document.getElementById('password');
    
    if (button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const login = inputUser.value.trim();
            const senha = inputPassword.value;
            
            // Validar campos
            if (!login || !senha) {
                mostrarMensagem('Por favor, preencha todos os campos!', 'erro');
                return;
            }
            
            // Tentar fazer login
            const resultado = fazerLogin(login, senha);
            
            if (resultado.sucesso) {
                // Salvar o usuário atual para rastrear ações (criar/pegar pedidos etc.).
                sessionStorage.setItem(STORAGE_USUARIO_LOGADO_ID, String(resultado.usuario.id));
                sessionStorage.setItem(STORAGE_USUARIO_LOGADO, JSON.stringify(resultado.usuario));
                mostrarMensagem(`Bem-vindo(a), ${resultado.usuario.nomeCompleto}! Redirecionando...`, 'sucesso');
                
                // Redirecionar após 1.5 segundos
                setTimeout(() => {
                    window.location.href = '../tela_pedidos/pedidos.html';
                }, 1500);
            } else {
                mostrarMensagem(resultado.mensagem, 'erro');
            }
        });
    }
    
    // Adicionar evento de pressionar Enter
    const inputs = [inputUser, inputPassword];
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    button.click();
                }
            });
        }
    });
    
    // Log para debug (mostrar usuários cadastrados)
    const usuarios = getUsuarios();
    console.log('📋 Usuários cadastrados:', usuarios.map(u => ({
        nome: u.nomeCompleto,
        usuario: u.usuario,
        email: u.email,
        senha: u.senha
    })));
}

// ============================================
// EXPORTAR FUNÇÕES PARA USO EM OUTRAS TELAS
// ============================================

// Disponibilizar funções globalmente para outras páginas
window.CareConnect = {
    getUsuarios,
    adicionarUsuario,
    fazerLogin,
    getUsuarioLogado,
    usuarioEstaLogado,
    fazerLogout,
    inicializarLocalStorage
};

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', initTelaLogin);