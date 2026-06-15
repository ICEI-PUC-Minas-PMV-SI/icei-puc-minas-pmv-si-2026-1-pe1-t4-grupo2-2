// ============================================
// SISTEMA DE CADASTRO COM BUSCA DE CEP AUTOMÁTICA
// ============================================

document.title = 'CareConnect - Criar Conta';

// Chave para armazenar usuários no LocalStorage
const STORAGE_KEY = 'careconnect_usuarios';

// ============================================
// FUNÇÃO DE BUSCA DE CEP COM API VIACEP (REAL)
// ============================================

async function buscarCEP(cep) {
    // Remove tudo que não é número
    const cepLimpo = cep.replace(/\D/g, '');
    
    // Verificar se o CEP tem 8 dígitos
    if (cepLimpo.length !== 8) {
        return { 
            sucesso: false, 
            mensagem: 'CEP inválido! Digite um CEP com 8 números.' 
        };
    }
    
    try {
        // Mostrar loading no campo de CEP
        mostrarLoadingCEP(true);
        
        // Fazer requisição para a API ViaCEP
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const dados = await response.json();
        
        // Esconder loading
        mostrarLoadingCEP(false);
        
        // Verificar se o CEP foi encontrado
        if (dados.erro) {
            return { 
                sucesso: false, 
                mensagem: 'CEP não encontrado! Verifique o número digitado.' 
            };
        }
        
        // Retornar os dados do endereço
        return {
            sucesso: true,
            dados: {
                logradouro: dados.logradouro || '',
                complemento: dados.complemento || '',
                bairro: dados.bairro || '',
                cidade: dados.localidade || '',
                estado: dados.uf || '',
                cep: dados.cep || ''
            }
        };
        
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        mostrarLoadingCEP(false);
        return { 
            sucesso: false, 
            mensagem: 'Erro ao buscar CEP. Verifique sua conexão com a internet.' 
        };
    }
}

// ============================================
// FUNÇÃO PARA PREENCHER OS CAMPOS DE ENDEREÇO
// ============================================

function preencherEndereco(dados) {
    // Preencher logradouro
    const logradouroInput = document.getElementById('logradouro');
    if (logradouroInput) {
        logradouroInput.value = dados.logradouro;
        // Remover disabled temporariamente para preencher
        logradouroInput.disabled = false;
        logradouroInput.disabled = true; // Reaplicar disabled
    }
    
    // Preencher bairro
    const bairroInput = document.getElementById('bairro');
    if (bairroInput) {
        bairroInput.value = dados.bairro;
        bairroInput.disabled = false;
        bairroInput.disabled = true;
    }
    
    // Preencher complemento (se tiver)
    const complementoInput = document.getElementById('complemento');
    if (complementoInput && dados.complemento) {
        complementoInput.value = dados.complemento;
    }
    
    // Preencher cidade (select)
    const cidadeSelect = document.getElementById('cidade');
    if (cidadeSelect && dados.cidade) {
        // Remover disabled temporariamente
        cidadeSelect.disabled = false;
        
        // Procurar a opção que corresponde à cidade
        const cidadeLower = dados.cidade.toLowerCase();
        let cidadeEncontrada = false;
        
        for (let i = 0; i < cidadeSelect.options.length; i++) {
            const opcao = cidadeSelect.options[i];
            const valorOpcao = opcao.value.toLowerCase();
            const textoOpcao = opcao.text.toLowerCase();
            
            if (valorOpcao === cidadeLower || textoOpcao === cidadeLower || textoOpcao.includes(cidadeLower)) {
                cidadeSelect.value = opcao.value;
                cidadeEncontrada = true;
                break;
            }
        }
        
        // Se não encontrou, tenta adicionar uma opção
        if (!cidadeEncontrada) {
            const novaOpcao = document.createElement('option');
            novaOpcao.value = dados.cidade.toLowerCase().replace(/\s/g, '-');
            novaOpcao.textContent = dados.cidade;
            cidadeSelect.appendChild(novaOpcao);
            cidadeSelect.value = novaOpcao.value;
        }
        
        // Reaplicar disabled
        cidadeSelect.disabled = true;
    }
    
    // Preencher estado (select)
    const estadoSelect = document.getElementById('estado');
    if (estadoSelect && dados.estado) {
        estadoSelect.disabled = false;
        
        const estadoLower = dados.estado.toLowerCase();
        for (let i = 0; i < estadoSelect.options.length; i++) {
            const opcao = estadoSelect.options[i];
            const valorOpcao = opcao.value.toLowerCase();
            const textoOpcao = opcao.text.toLowerCase();
            
            if (valorOpcao === estadoLower || textoOpcao === estadoLower || textoOpcao.includes(estadoLower)) {
                estadoSelect.value = opcao.value;
                break;
            }
        }
        
        estadoSelect.disabled = true;
    }
}

// ============================================
// FUNÇÃO PARA MOSTRAR LOADING
// ============================================

function mostrarLoadingCEP(mostrar) {
    const cepInput = document.getElementById('cep');
    if (!cepInput) return;
    
    if (mostrar) {
        // Salvar placeholder original
        if (!cepInput.getAttribute('data-placeholder-original')) {
            cepInput.setAttribute('data-placeholder-original', cepInput.placeholder);
        }
        cepInput.placeholder = '⏳ Buscando endereço...';
        cepInput.style.opacity = '0.7';
    } else {
        cepInput.placeholder = cepInput.getAttribute('data-placeholder-original') || 'Ex: 30130-003';
        cepInput.style.opacity = '1';
    }
}

// ============================================
// FUNÇÃO PRINCIPAL PARA BUSCAR AO DIGITAR CEP
// ============================================

async function buscarEpreencherEndereco() {
    const cepInput = document.getElementById('cep');
    const cep = cepInput.value;
    
    // Verificar se o CEP tem pelo menos 8 dígitos (ignorando formatação)
    const cepNumeros = cep.replace(/\D/g, '');
    if (cepNumeros.length !== 8) {
        return;
    }
    
    // Buscar endereço
    const resultado = await buscarCEP(cep);
    
    if (resultado.sucesso) {
        preencherEndereco(resultado.dados);
        mostrarMensagem('✅ Endereço encontrado e preenchido automaticamente!', 'sucesso');
    } else {
        mostrarMensagem(resultado.mensagem, 'erro');
        // Limpar campos de endereço
        limparCamposEndereco();
    }
}

// ============================================
// FUNÇÃO PARA LIMPAR CAMPOS DE ENDEREÇO
// ============================================

function limparCamposEndereco() {
    const logradouroInput = document.getElementById('logradouro');
    const bairroInput = document.getElementById('bairro');
    
    if (logradouroInput) {
        logradouroInput.disabled = false;
        logradouroInput.value = '';
        logradouroInput.disabled = true;
    }
    
    if (bairroInput) {
        bairroInput.disabled = false;
        bairroInput.value = '';
        bairroInput.disabled = true;
    }
    
    const cidadeSelect = document.getElementById('cidade');
    const estadoSelect = document.getElementById('estado');
    
    if (cidadeSelect) {
        cidadeSelect.disabled = false;
        cidadeSelect.value = 'belo-horizonte';
        cidadeSelect.disabled = true;
    }
    
    if (estadoSelect) {
        estadoSelect.disabled = false;
        estadoSelect.value = 'mg';
        estadoSelect.disabled = true;
    }
}

// ============================================
// FUNÇÕES DE MÁSCARA
// ============================================

function aplicarMascaraCPFouCNPJ(valor) {
    let value = valor.replace(/\D/g, '');
    
    if (value.length <= 11) {
        // CPF
        if (value.length > 3) value = value.slice(0,3) + '.' + value.slice(3);
        if (value.length > 7) value = value.slice(0,7) + '.' + value.slice(7);
        if (value.length > 11) value = value.slice(0,11) + '-' + value.slice(11);
    } else {
        // CNPJ
        if (value.length > 2) value = value.slice(0,2) + '.' + value.slice(2);
        if (value.length > 6) value = value.slice(0,6) + '.' + value.slice(6);
        if (value.length > 10) value = value.slice(0,10) + '/' + value.slice(10);
        if (value.length > 15) value = value.slice(0,15) + '-' + value.slice(15);
    }
    
    return value;
}

function aplicarMascaraCEP(valor) {
    let value = valor.replace(/\D/g, '');
    if (value.length > 5) {
        value = value.slice(0,5) + '-' + value.slice(5,8);
    }
    return value;
}

// ============================================
// FUNÇÕES DE VALIDAÇÃO
// ============================================

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    return true;
}

function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, '');
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1{13}$/.test(cnpj)) return false;
    return true;
}

// ============================================
// FUNÇÕES DO LOCALSTORAGE
// ============================================

function getUsuarios() {
    const usuarios = localStorage.getItem(STORAGE_KEY);
    if (usuarios) {
        return JSON.parse(usuarios);
    }
    return [];
}

function salvarUsuarios(usuarios) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
}

function usuarioOuEmailExiste(usuario, email) {
    const usuarios = getUsuarios();
    return usuarios.some(u => u.usuario === usuario || u.email === email);
}

function adicionarUsuario(novoUsuario) {
    const usuarios = getUsuarios();
    
    if (usuarioOuEmailExiste(novoUsuario.usuario, novoUsuario.email)) {
        throw new Error('Este usuário ou e-mail já está cadastrado!');
    }
    
    const novoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    
    const usuarioCompleto = {
        ...novoUsuario,
        id: novoId,
        dataCadastro: new Date().toISOString(),
        status: 'ativo'
    };
    
    usuarios.push(usuarioCompleto);
    salvarUsuarios(usuarios);
    
    return usuarioCompleto;
}

// ============================================
// FUNÇÕES DE EXIBIÇÃO DE MENSAGENS
// ============================================

function criarElementoMensagem() {
    let mensagemDiv = document.getElementById('mensagem-cadastro');
    
    if (!mensagemDiv) {
        const button = document.querySelector('button[type="submit"]');
        mensagemDiv = document.createElement('div');
        mensagemDiv.id = 'mensagem-cadastro';
        mensagemDiv.style.cssText = `
            margin: 15px 0;
            padding: 12px;
            border-radius: 5px;
            font-size: 14px;
            display: none;
        `;
        
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
    
    mensagemDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    setTimeout(() => {
        mensagemDiv.style.display = 'none';
    }, 4000);
}

// ============================================
// GERAR USUÁRIO AUTOMÁTICO
// ============================================

function gerarUsuarioAPartirNome(nome) {
    if (!nome) return '';
    return nome
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '.')
        .replace(/\.+/g, '.')
        .replace(/^\.|\.$/g, '');
}

// ============================================
// INICIALIZAÇÃO DA PÁGINA
// ============================================

function initCriarConta() {
    console.log('🚀 Inicializando tela de cadastro com busca automática de CEP...');
    
    // ===== MÁSCARAS E EVENTOS =====
    
    // Máscara para CPF/CNPJ
    const campoCPF = document.getElementById('cpf_cnpj');
    if (campoCPF) {
        campoCPF.addEventListener('input', function(e) {
            e.target.value = aplicarMascaraCPFouCNPJ(e.target.value);
        });
    }
    
    // Máscara para CEP e busca automática
    const campoCEP = document.getElementById('cep');
    if (campoCEP) {
        // Aplicar máscara enquanto digita
        campoCEP.addEventListener('input', function(e) {
            e.target.value = aplicarMascaraCEP(e.target.value);
        });
        
        // Buscar endereço quando sair do campo (blur)
        campoCEP.addEventListener('blur', function() {
            const cep = this.value;
            const cepNumeros = cep.replace(/\D/g, '');
            if (cepNumeros.length === 8) {
                buscarEpreencherEndereco();
            }
        });
        
        // Buscar quando pressionar Enter
        campoCEP.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const cep = this.value;
                const cepNumeros = cep.replace(/\D/g, '');
                if (cepNumeros.length === 8) {
                    buscarEpreencherEndereco();
                }
            }
        });
    }
    
    // ===== GERAR USUÁRIO AUTOMATICAMENTE =====
    const campoNome = document.getElementById('user');
    const campoUsuarioOculto = document.createElement('input');
    campoUsuarioOculto.type = 'hidden';
    campoUsuarioOculto.id = 'usuario-automatico';
    document.querySelector('form')?.appendChild(campoUsuarioOculto);
    
    if (campoNome) {
        campoNome.addEventListener('blur', function() {
            const usuarioGerado = gerarUsuarioAPartirNome(this.value);
            const numeroAleatorio = Math.floor(Math.random() * 1000);
            campoUsuarioOculto.value = `${usuarioGerado}${numeroAleatorio}`;
            console.log('Usuário gerado:', campoUsuarioOculto.value);
        });
    }
    
    // ===== FORMULÁRIO DE CADASTRO =====
    const button = document.querySelector('button[type="submit"]');
    
    if (button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Coletar dados
            const nomeCompleto = document.getElementById('user')?.value.trim();
            const cpfCnpj = document.getElementById('cpf_cnpj')?.value.trim();
            const dataNascimento = document.getElementById('data-nascimento')?.value;
            const cep = document.getElementById('cep')?.value.trim();
            const logradouro = document.getElementById('logradouro')?.value;
            const numero = document.getElementById('numero')?.value.trim();
            const complemento = document.getElementById('complemento')?.value.trim();
            const bairro = document.getElementById('bairro')?.value;
            const cidade = document.getElementById('cidade')?.value;
            const estado = document.getElementById('estado')?.value;
            const perfil = document.getElementById('perfil')?.value;
            const email = document.getElementById('email')?.value.trim();
            const senha = document.getElementById('password')?.value;
            
            // Validações
            if (!nomeCompleto) {
                mostrarMensagem('Por favor, preencha o nome completo!', 'erro');
                return;
            }
            
            if (!cpfCnpj) {
                mostrarMensagem('Por favor, preencha o CPF ou CNPJ!', 'erro');
                return;
            }
            
            const cpfCnpjLimpo = cpfCnpj.replace(/\D/g, '');
            if (cpfCnpjLimpo.length === 11 && !validarCPF(cpfCnpjLimpo)) {
                mostrarMensagem('CPF inválido!', 'erro');
                return;
            }
            if (cpfCnpjLimpo.length === 14 && !validarCNPJ(cpfCnpjLimpo)) {
                mostrarMensagem('CNPJ inválido!', 'erro');
                return;
            }
            
            if (!dataNascimento) {
                mostrarMensagem('Por favor, preencha a data de nascimento!', 'erro');
                return;
            }
            
            if (!email) {
                mostrarMensagem('Por favor, preencha o e-mail!', 'erro');
                return;
            }
            
            if (!validarEmail(email)) {
                mostrarMensagem('E-mail inválido!', 'erro');
                return;
            }
            
            if (!senha) {
                mostrarMensagem('Por favor, preencha a senha!', 'erro');
                return;
            }
            
            if (senha.length < 6) {
                mostrarMensagem('A senha deve ter pelo menos 6 caracteres!', 'erro');
                return;
            }
            
            if (!perfil || perfil === '') {
                mostrarMensagem('Por favor, selecione um perfil!', 'erro');
                return;
            }
            
            // Gerar usuário
            const usuarioBase = gerarUsuarioAPartirNome(nomeCompleto);
            const usuario = `${usuarioBase}${Math.floor(Math.random() * 1000)}`;
            
            // Criar objeto do usuário
            const novoUsuario = {
                nomeCompleto: nomeCompleto,
                cpfCnpj: cpfCnpj,
                dataNascimento: dataNascimento,
                cep: cep,
                logradouro: logradouro || '',
                numero: numero || '',
                complemento: complemento || '',
                bairro: bairro || '',
                cidade: cidade || '',
                estado: estado || '',
                perfil: perfil,
                email: email,
                usuario: usuario,
                senha: senha
            };
            
            console.log('Dados a serem salvos:', novoUsuario);
            
            try {
                adicionarUsuario(novoUsuario);
                mostrarMensagem(`✅ Cadastro realizado com sucesso! Seu usuário é: ${usuario}. Faça login para continuar.`, 'sucesso');
                
                // Limpar formulário
                document.getElementById('user').value = '';
                document.getElementById('cpf_cnpj').value = '';
                document.getElementById('data-nascimento').value = '';
                document.getElementById('cep').value = '';
                document.getElementById('numero').value = '';
                document.getElementById('complemento').value = '';
                document.getElementById('perfil').value = '';
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
                
                // Redirecionar
                setTimeout(() => {
                    window.location.href = '../tela_login/tela_login.html';
                }, 3000);
                
            } catch (erro) {
                mostrarMensagem(erro.message, 'erro');
            }
        });
    }
    
    console.log('✅ Sistema pronto! Digite um CEP válido para testar a busca automática.');
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', initCriarConta);