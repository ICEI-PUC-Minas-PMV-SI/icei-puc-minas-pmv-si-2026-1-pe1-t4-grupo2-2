// ============================================
// SISTEMA DE RECUPERAÇÃO DE SENHA COM LOCALSTORAGE
// ============================================

document.title = 'CareConnect - Recuperar Senha';

// Chave para armazenar usuários no LocalStorage (mesma das outras telas)
const STORAGE_KEY = 'careconnect_usuarios';

// ============================================
// FUNÇÕES PRINCIPAIS
// ============================================

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

// Buscar usuário por e-mail
function buscarUsuarioPorEmail(email) {
    const usuarios = getUsuarios();
    return usuarios.find(u => u.email === email);
}

// Atualizar senha do usuário
function atualizarSenha(email, novaSenha) {
    const usuarios = getUsuarios();
    const index = usuarios.findIndex(u => u.email === email);
    
    if (index === -1) {
        throw new Error('E-mail não encontrado!');
    }
    
    if (!novaSenha || novaSenha.length < 6) {
        throw new Error('A nova senha deve ter pelo menos 6 caracteres!');
    }
    
    // Atualizar a senha
    usuarios[index].senha = novaSenha;
    usuarios[index].ultimaAlteracaoSenha = new Date().toISOString();
    
    salvarUsuarios(usuarios);
    
    return { sucesso: true, usuario: usuarios[index] };
}

// Gerar código de verificação (6 dígitos)
function gerarCodigoVerificacao() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Validar formato de e-mail
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ============================================
// FUNÇÕES DE EXIBIÇÃO DE MENSAGENS
// ============================================

function criarElementoMensagem() {
    let mensagemDiv = document.getElementById('mensagem-recuperacao');
    
    if (!mensagemDiv) {
        const form = document.querySelector('form');
        mensagemDiv = document.createElement('div');
        mensagemDiv.id = 'mensagem-recuperacao';
        mensagemDiv.style.cssText = `
            margin: 15px 0;
            padding: 12px;
            border-radius: 5px;
            font-size: 14px;
            display: none;
        `;
        
        if (form) {
            form.parentNode.insertBefore(mensagemDiv, form);
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
    
    // Rolar até a mensagem
    mensagemDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Esconder mensagem após 5 segundos
    setTimeout(() => {
        if (mensagemDiv.style.display !== 'none') {
            mensagemDiv.style.display = 'none';
        }
    }, 5000);
}

// ============================================
// FUNÇÃO PARA CRIAR MODAL DE REDEFINIÇÃO
// ============================================

function criarModalRedefinicao(email) {
    // Remover modal existente se houver
    const modalExistente = document.getElementById('modal-redefinicao');
    if (modalExistente) {
        modalExistente.remove();
    }
    
    // Criar modal
    const modal = document.createElement('div');
    modal.id = 'modal-redefinicao';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 30px;
            border-radius: 10px;
            width: 90%;
            max-width: 400px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        ">
            <h3 style="margin-bottom: 20px; color: #333;">Redefinir Senha</h3>
            <p style="margin-bottom: 15px; color: #666; font-size: 14px;">
                Digite sua nova senha para o e-mail: <strong>${email}</strong>
            </p>
            
            <label for="novaSenha" style="display: block; margin-bottom: 5px; font-weight: bold;">Nova Senha</label>
            <input type="password" id="novaSenhaModal" placeholder="Digite a nova senha" style="
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
                margin-bottom: 15px;
                font-size: 16px;
            ">
            
            <label for="confirmarSenha" style="display: block; margin-bottom: 5px; font-weight: bold;">Confirmar Senha</label>
            <input type="password" id="confirmarSenhaModal" placeholder="Confirme a nova senha" style="
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
                margin-bottom: 20px;
                font-size: 16px;
            ">
            
            <div style="display: flex; gap: 10px;">
                <button id="btnCancelar" style="
                    flex: 1;
                    padding: 10px;
                    background: #ccc;
                    color: #333;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                ">Cancelar</button>
                <button id="btnConfirmar" style="
                    flex: 1;
                    padding: 10px;
                    background: #667eea;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                ">Redefinir Senha</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Adicionar eventos
    const btnCancelar = document.getElementById('btnCancelar');
    const btnConfirmar = document.getElementById('btnConfirmar');
    const novaSenhaInput = document.getElementById('novaSenhaModal');
    const confirmarSenhaInput = document.getElementById('confirmarSenhaModal');
    
    btnCancelar.addEventListener('click', () => {
        modal.remove();
    });
    
    btnConfirmar.addEventListener('click', () => {
        const novaSenha = novaSenhaInput.value;
        const confirmarSenha = confirmarSenhaInput.value;
        
        if (!novaSenha) {
            mostrarMensagem('Por favor, digite a nova senha!', 'erro');
            return;
        }
        
        if (novaSenha !== confirmarSenha) {
            mostrarMensagem('As senhas não coincidem!', 'erro');
            return;
        }
        
        if (novaSenha.length < 6) {
            mostrarMensagem('A senha deve ter pelo menos 6 caracteres!', 'erro');
            return;
        }
        
        try {
            atualizarSenha(email, novaSenha);
            mostrarMensagem('✅ Senha redefinida com sucesso! Redirecionando para o login...', 'sucesso');
            modal.remove();
            
            setTimeout(() => {
                window.location.href = '../tela_login/tela_login.html';
            }, 2000);
        } catch (erro) {
            mostrarMensagem(erro.message, 'erro');
        }
    });
    
    // Permitir Enter nos campos
    novaSenhaInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') btnConfirmar.click();
    });
    confirmarSenhaInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') btnConfirmar.click();
    });
    
    // Fechar modal ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// ============================================
// FUNÇÃO PARA SIMULAR ENVIO DE E-MAIL (DEMONSTRAÇÃO)
// ============================================

function simularEnvioEmail(email, codigo) {
    console.log(`📧 Simulando envio de e-mail para: ${email}`);
    console.log(`🔑 Código de verificação: ${codigo}`);
    
    // Criar alerta personalizado com o código
    const alertaDiv = document.createElement('div');
    alertaDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1001;
        animation: slideIn 0.3s ease-out;
        max-width: 350px;
    `;
    
    alertaDiv.innerHTML = `
        <strong>✉️ E-mail enviado com sucesso!</strong><br>
        Para: ${email}<br>
        <strong>Código de verificação: ${codigo}</strong><br>
        <small style="font-size: 11px;">(Simulação - Em um sistema real, isso iria para seu e-mail)</small>
    `;
    
    document.body.appendChild(alertaDiv);
    
    setTimeout(() => {
        alertaDiv.remove();
    }, 8000);
}

// ============================================
// FUNÇÃO PARA CRIAR MODAL DE VERIFICAÇÃO
// ============================================

function criarModalVerificacao(email) {
    const codigoGerado = gerarCodigoVerificacao();
    
    // Simular envio de e-mail
    simularEnvioEmail(email, codigoGerado);
    
    // Criar modal de verificação
    const modal = document.createElement('div');
    modal.id = 'modal-verificacao';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 30px;
            border-radius: 10px;
            width: 90%;
            max-width: 400px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        ">
            <h3 style="margin-bottom: 20px; color: #333;">Verificação de Segurança</h3>
            <p style="margin-bottom: 15px; color: #666; font-size: 14px;">
                Enviamos um código de verificação para o e-mail:<br>
                <strong>${email}</strong>
            </p>
            <p style="margin-bottom: 10px; color: #888; font-size: 12px;">
                Verifique a caixa de entrada ou spam e digite o código abaixo:
            </p>
            
            <label for="codigoVerificacao" style="display: block; margin-bottom: 5px; font-weight: bold;">Código de Verificação</label>
            <input type="text" id="codigoVerificacao" placeholder="Digite o código de 6 dígitos" maxlength="6" style="
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
                margin-bottom: 20px;
                font-size: 16px;
                text-align: center;
                letter-spacing: 5px;
            ">
            
            <div style="display: flex; gap: 10px;">
                <button id="btnCancelarVerificacao" style="
                    flex: 1;
                    padding: 10px;
                    background: #ccc;
                    color: #333;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                ">Cancelar</button>
                <button id="btnVerificar" style="
                    flex: 1;
                    padding: 10px;
                    background: #667eea;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                ">Verificar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Adicionar eventos
    const btnCancelar = document.getElementById('btnCancelarVerificacao');
    const btnVerificar = document.getElementById('btnVerificar');
    const codigoInput = document.getElementById('codigoVerificacao');
    
    btnCancelar.addEventListener('click', () => {
        modal.remove();
    });
    
    btnVerificar.addEventListener('click', () => {
        const codigoDigitado = codigoInput.value;
        
        if (!codigoDigitado) {
            mostrarMensagem('Por favor, digite o código de verificação!', 'erro');
            return;
        }
        
        if (codigoDigitado === codigoGerado) {
            modal.remove();
            criarModalRedefinicao(email);
        } else {
            mostrarMensagem('Código inválido! Tente novamente.', 'erro');
            codigoInput.value = '';
            codigoInput.focus();
        }
    });
    
    // Permitir Enter
    codigoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') btnVerificar.click();
    });
    
    // Fechar modal ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // Focar no input
    codigoInput.focus();
}

// ============================================
// FUNÇÃO PRINCIPAL - ENVIAR LINK
// ============================================

function enviarLinkRecuperacao(email) {
    // Validar e-mail
    if (!email) {
        throw new Error('Por favor, digite seu e-mail!');
    }
    
    if (!validarEmail(email)) {
        throw new Error('Por favor, digite um e-mail válido!');
    }
    
    // Buscar usuário
    const usuario = buscarUsuarioPorEmail(email);
    
    if (!usuario) {
        throw new Error('E-mail não encontrado! Verifique se você está cadastrado.');
    }
    
    // Criar modal de verificação
    criarModalVerificacao(email);
    
    return { sucesso: true, usuario };
}

// ============================================
// INICIALIZAÇÃO DA PÁGINA
// ============================================

function initEsqueceuSenha() {
    console.log('🚀 Inicializando tela de recuperação de senha...');
    
    // Adicionar estilo para animações
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Pegar formulário
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const button = document.querySelector('button[type="submit"]');
    
    if (form && button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = emailInput?.value.trim();
            
            try {
                const resultado = enviarLinkRecuperacao(email);
                mostrarMensagem(`📧 Um código de verificação foi enviado para ${email}. Verifique sua caixa de entrada!`, 'sucesso');
                
                // Limpar campo de e-mail
                if (emailInput) emailInput.value = '';
                
            } catch (erro) {
                mostrarMensagem(erro.message, 'erro');
            }
        });
        
        // Permitir Enter no campo de e-mail
        if (emailInput) {
            emailInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    button.click();
                }
            });
        }
    }
    
    // Exibir lista de e-mails cadastrados (para debug - remova em produção)
    const usuarios = getUsuarios();
    if (usuarios.length > 0) {
        console.log('📋 E-mails cadastrados no sistema:');
        usuarios.forEach(u => {
            console.log(`   - ${u.email} (${u.nomeCompleto})`);
        });
    }
}

// ============================================
// INICIALIZAR QUANDO A PÁGINA CARREGAR
// ============================================
document.addEventListener('DOMContentLoaded', initEsqueceuSenha);