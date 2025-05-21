# Jenkins Pipeline - Guia de Uso

## Descrição

Este repositório contém uma pipeline para automatizar testes usando **Cypress** em navegadores **Chrome** e **Electron**. Além disso, a pipeline inclui recursos como **credenciais**, **parameters**, **matrix**, **trigger**, e **input**, oferecendo flexibilidade e controle sobre o processo de execução.

---

## Configuração do Jenkins

### **1. Integrar o Jenkins com o GitHub**

1. **Configurar a Pipeline com o SCM**:

   - No painel do Jenkins, crie ou edite um job do tipo **Pipeline**.
   - Em "Definição", selecione a opção **Pipeline script from SCM**.
   - Configure o SCM como **Git** e preencha os campos:

     - **Repository URL**: Informe a URL do repositório GitHub (ex.: `https://github.com/seu-usuario/seu-repositorio.git`).
     - **Branches to build**: Informe o branch que deseja utilizar (ex.: `main`).

   - Caso necessário, configure credenciais para acesso ao repositório, selecionando-as no campo **Credentials**.

2. **Salve e Execute**:

   - Clique em **Salvar** e execute o job para verificar se a pipeline é carregada corretamente a partir do repositório.

---

## Parâmetros da Pipeline

A pipeline suporta os seguintes parâmetros:

1. **BRANCH**:

   - Tipo: String.
   - Descrição: Nome do branch do repositório a ser utilizado.
   - Valor padrão: `main`.

2. **RUN_TESTS**:

   - Tipo: Boolean.
   - Descrição: Controla se os testes devem ser executados.
   - Valor padrão: `true`.

---

## Funcionalidades Principais

### **1. Setup**

- Instala todas as dependências necessárias usando o comando `npm install`.

### **2. Testing in Browsers (Matrix)**

- Testa o projeto em uma matriz de navegadores (“Chrome” e “Electron”).
- Usa o recurso **matrix** para executar combinações automaticamente.

### **3. Deploy com Credenciais**

- Utiliza credenciais configuradas no Jenkins para simular uma etapa de deploy.
- Exemplo:

  ```groovy
  withCredentials([string(credentialsId: 'deploy-key', variable: 'DEPLOY_KEY')]) {
      bat "echo 'Simulação de deploy usando a chave: ${DEPLOY_KEY}'"
  }
  ```

### **4. Input Manual**

- Solicita aprovação do usuário antes de prosseguir para o deploy.

### **5. Triggers**

- Verifica alterações no repositório a cada 5 minutos usando `pollSCM`.

---

## Exemplo de Execução

1. Ao iniciar o job, forneça os parâmetros:

   - Nome do branch.
   - Se os testes devem ser executados.

2. Durante a execução:

   - O sistema solicita aprovação manual na etapa “Approval”.

3. A pipeline segue para o deploy utilizando as credenciais configuradas.

---

## Troubleshooting

### **Erros Comuns**

1. **Credenciais não encontradas**:

   - Verifique se o ID da credencial na pipeline corresponde ao configurado no Jenkins.

2. **Erro no Cypress (DevTools Protocol)**:

   - Certifique-se de que o navegador Chrome ou Electron está corretamente instalado e configurado.

3. **Demora na Instalação de Dependências**:

   - Configure o cache de dependências do NPM no Jenkins.

```groovy
environment {
    NPM_CONFIG_CACHE = 'C:\\Temp\\npm-cache'
}
```

---

## Contato

Se precisar de ajuda, entre em contato com o administrador do Jenkins ou revise a configuração no repositório do projeto.
