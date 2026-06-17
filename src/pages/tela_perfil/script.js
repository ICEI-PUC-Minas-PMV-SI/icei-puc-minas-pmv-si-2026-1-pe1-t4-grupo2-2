import { AuthGuard } from "../../js/AuthGuard.js";
import { CEPManager } from "../../js/CEPManager.js";

window.logout = () => AuthGuard.logout();

// ============ FUNÇÕES ============

/**
 * Busca endereço pelo CEP e preenche os campos automaticamente
 * @param {string} cep - CEP a buscar
 */
async function buscarEnderecoPorCEP(cep) {
  const ruaInput = document.getElementById('perfil-rua');
  const cidadeInput = document.getElementById('perfil-cidade');
  const estadoInput = document.getElementById('perfil-estado');

  try {
    const dados = await CEPManager.buscarEnderecoPorCEP(cep);

    // Preencher campos com os dados retornados
    if (ruaInput) ruaInput.value = dados.logradouro || '';
    if (cidadeInput) cidadeInput.value = dados.localidade || '';
    if (estadoInput) estadoInput.value = dados.uf || '';

    // Focar no campo de número para continuar preenchimento
    const numeroInput = document.getElementById('perfil-numero');
    if (numeroInput) numeroInput.focus();
    
  } catch (erro) {
    console.error('Erro ao buscar CEP:', erro.message);
    // Limpar campos em caso de erro
    if (ruaInput) ruaInput.value = '';
    if (cidadeInput) cidadeInput.value = '';
    if (estadoInput) estadoInput.value = '';
  }
}

/**
 * Carrega dados do perfil do localStorage
 */
function carregarDadosPerfil() {
  try {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    if (!usuario) {
      console.warn('Nenhum usuário logado');
      return;
    }

    // Mapear dados do usuário para campos do formulário
    const mapeamento = {
      'perfil-nome': 'nome',
      'perfil-data': 'dataNascimento',
      'perfil-email': 'email',
      'perfil-telefone': 'telefone',
      'perfil-cpf': 'documento',
      'perfil-estado': 'estado',
      'perfil-cidade': 'cidade',
      'perfil-cep': 'cep',
      'perfil-rua': 'rua',
      'perfil-numero': 'numero',
      'perfil-apto': 'apto',
      'perfil-motivacoes': 'motivacoes',
      'perfil-objetivos': 'objetivos',
      'perfil-bio': 'bio'
    };

    Object.entries(mapeamento).forEach(([idCampo, propriedade]) => {
      const elemento = document.getElementById(idCampo);
      if (elemento && usuario[propriedade]) {
        elemento.value = usuario[propriedade];
      }
    });
  } catch (erro) {
    console.error('Erro ao carregar dados do perfil:', erro);
  }
}

/**
 * Salva alterações do perfil no localStorage
 */
function salvarDadosPerfil() {
  try {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    if (!usuarioLogado) {
      alert('Erro: Usuário não encontrado. Faça login novamente.');
      return;
    }

    // Atualizar dados do usuário
    const usuarioAtualizado = {
      ...usuarioLogado,
      nome: document.getElementById('perfil-nome')?.value || '',
      dataNascimento: document.getElementById('perfil-data')?.value || '',
      email: document.getElementById('perfil-email')?.value || '',
      telefone: document.getElementById('perfil-telefone')?.value || '',
      documento: document.getElementById('perfil-cpf')?.value || '',
      estado: document.getElementById('perfil-estado')?.value || '',
      cidade: document.getElementById('perfil-cidade')?.value || '',
      cep: document.getElementById('perfil-cep')?.value || '',
      rua: document.getElementById('perfil-rua')?.value || '',
      numero: document.getElementById('perfil-numero')?.value || '',
      apto: document.getElementById('perfil-apto')?.value || '',
      motivacoes: document.getElementById('perfil-motivacoes')?.value || '',
      objetivos: document.getElementById('perfil-objetivos')?.value || '',
      bio: document.getElementById('perfil-bio')?.value || ''
    };

    // Salvar usuário logado
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));
    
    // Atualizar também na lista de usuários
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const index = usuarios.findIndex(u => u.id === usuarioAtualizado.id);
    if (index !== -1) {
      usuarios[index] = usuarioAtualizado;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    alert('✅ Perfil atualizado com sucesso!');
  } catch (erro) {
    console.error('Erro ao salvar perfil:', erro);
    alert('❌ Erro ao salvar perfil. Tente novamente.');
  }
}

// ============ INICIALIZAÇÃO ============

document.addEventListener('DOMContentLoaded', () => {
  // Carregar dados do perfil
  carregarDadosPerfil();

  // ============ EVENTOS DO CEP ============
  const cepInput = document.getElementById('perfil-cep');

  if (cepInput) {
    // Evento: Buscar CEP ao sair do campo (blur) - AUTOMÁTICO
    cepInput.addEventListener('blur', (e) => {
      const cep = e.target.value.trim();
      if (cep.length === 9) { // CEP formatado tem 9 caracteres (12345-678)
        buscarEnderecoPorCEP(cep);
      }
    });

    // Evento: Buscar CEP ao pressionar Enter - AUTOMÁTICO
    cepInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const cep = e.target.value.trim();
        if (cep.length === 9) {
          buscarEnderecoPorCEP(cep);
        }
      }
    });

    // Formatar CEP automaticamente (12345-678)
    cepInput.addEventListener('input', (e) => {
      let valor = e.target.value.replace(/\D/g, '');
      if (valor.length <= 8) {
        if (valor.length > 5) {
          valor = valor.slice(0, 5) + '-' + valor.slice(5);
        }
        e.target.value = valor;
      }
    });
  }

  // ============ EVENTO DE SALVAMENTO ============
  const btnSalvar = document.getElementById('btn-salvar-perfil');
  if (btnSalvar) {
    btnSalvar.addEventListener('click', () => {
      salvarDadosPerfil();
    });
  }
});
