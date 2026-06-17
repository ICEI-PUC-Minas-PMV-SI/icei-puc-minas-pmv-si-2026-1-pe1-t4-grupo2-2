/**
 * CEPManager.js
 * 
 * Módulo para gerenciar buscas de endereço através de CEP
 * Utiliza a API viaCEP (https://viacep.com.br/)
 * 
 * Exemplo de uso:
 * import { CEPManager } from './CEPManager.js';
 * CEPManager.buscarEnderecoPorCEP('12345-678')
 *   .then(dados => console.log(dados))
 *   .catch(erro => console.error(erro));
 */

export class CEPManager {
  /**
   * URL base da API viaCEP
   * @type {string}
   */
  static API_URL = 'https://viacep.com.br/ws';

  /**
   * Busca endereço completo a partir do CEP
   * @param {string} cep - CEP no formato "12345-678" ou "12345678"
   * @returns {Promise<Object>} Objeto com dados do endereço
   * @throws {Error} Se o CEP for inválido ou não encontrado
   */
  static async buscarEnderecoPorCEP(cep) {
    // Validar e limpar CEP
    const cepLimpo = this.validarCEP(cep);
    
    try {
      const response = await fetch(`${this.API_URL}/${cepLimpo}/json/`);
      const dados = await response.json();

      // Verificar se o CEP foi encontrado
      if (dados.erro) {
        throw new Error('CEP não encontrado');
      }

      return dados;
    } catch (erro) {
      throw new Error(`Erro ao buscar CEP: ${erro.message}`);
    }
  }

  /**
   * Valida e formata CEP
   * @param {string} cep - CEP a validar
   * @returns {string} CEP limpo com 8 dígitos
   * @throws {Error} Se o CEP for inválido
   */
  static validarCEP(cep) {
    const cepLimpo = cep.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) {
      throw new Error('CEP deve conter 8 dígitos');
    }

    return cepLimpo;
  }

  /**
   * Formata CEP para o padrão brasileiro (12345-678)
   * @param {string} cep - CEP sem formatação
   * @returns {string} CEP formatado
   */
  static formatarCEP(cep) {
    const cepLimpo = cep.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) {
      return cep; // Retorna original se não tiver 8 dígitos
    }

    return `${cepLimpo.slice(0, 5)}-${cepLimpo.slice(5)}`;
  }

  /**
   * Preenche campos de formulário com dados do CEP
   * @param {string} cep - CEP a buscar
   * @param {Object} campos - Objeto com seletores CSS dos campos
   * @param {string} campos.rua - ID do campo de rua
   * @param {string} campos.cidade - ID do campo de cidade
   * @param {string} campos.estado - ID do campo de estado
   * @param {string} [campos.bairro] - ID do campo de bairro (opcional)
   * @param {Function} [onSucesso] - Callback de sucesso
   * @param {Function} [onErro] - Callback de erro
   */
  static async preencherFormulario(cep, campos, onSucesso, onErro) {
    try {
      const dados = await this.buscarEnderecoPorCEP(cep);

      // Preencher os campos
      if (campos.rua) {
        const ruaInput = document.getElementById(campos.rua);
        if (ruaInput) ruaInput.value = dados.logradouro || '';
      }

      if (campos.cidade) {
        const cidadeInput = document.getElementById(campos.cidade);
        if (cidadeInput) cidadeInput.value = dados.localidade || '';
      }

      if (campos.estado) {
        const estadoInput = document.getElementById(campos.estado);
        if (estadoInput) estadoInput.value = dados.uf || '';
      }

      if (campos.bairro) {
        const bairroInput = document.getElementById(campos.bairro);
        if (bairroInput) bairroInput.value = dados.bairro || '';
      }

      // Chamar callback de sucesso
      if (typeof onSucesso === 'function') {
        onSucesso(dados);
      }

      return dados;
    } catch (erro) {
      console.error('Erro ao preencher formulário:', erro.message);
      
      // Chamar callback de erro
      if (typeof onErro === 'function') {
        onErro(erro.message);
      }

      throw erro;
    }
  }
}
