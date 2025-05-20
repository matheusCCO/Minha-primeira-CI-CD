pipeline {
    agent any

    environment {
        NODE_ENV = 'test' // Configuração de ambiente
        CYPRESS_CACHE_FOLDER = 'C:\\Temp\\CypressCache' // Cache do Cypress
    }

    parameters {
        string(name: 'BRANCH', defaultValue: 'main', description: 'Branch para executar o pipeline')
        booleanParam(name: 'RUN_TESTS', defaultValue: true, description: 'Executar os testes?')
    }

    triggers {
        pollSCM('H/5 * * * *') // Verifica mudanças no repositório a cada 5 minutos
    }

    options {
        timestamps() // Adiciona timestamps aos logs
    }

    stages {
        stage('Setup') {
            steps {
                echo "Branch selecionada: ${params.BRANCH}"
                echo 'Instalando dependências...'
                bat 'npm install'
            }
        }

        stage('Testing in Browsers') {
            when {
                expression { return params.RUN_TESTS } // Executa somente se RUN_TESTS for verdadeiro
            }
            matrix {
                axes {
                    axis {
                        name 'BROWSER'
                        values 'chrome', 'electron' // Testes nos navegadores Chrome e Electron
                    }
                }
                stages {
                    stage('Run Cypress Tests') {
                        steps {
                            echo "Executando testes no navegador: ${BROWSER}"
                            bat "npx cypress run --browser ${BROWSER}"
                        }
                    }
                }
            }
        }

        stage('Approval') {
            input {
                message "Deseja continuar com a próxima etapa?"
                ok "Sim, continuar"
            }
            steps {
                echo 'Aprovação recebida. Continuando o pipeline...'
            }
        }

        stage('Deploy with Credentials') {
            steps {
                script {
                    // Usando credenciais armazenadas no Jenkins
                    withCredentials([string(credentialsId: 'deploy-key', variable: 'DEPLOY_KEY')]) {
                        echo "Usando a chave de deploy: ${DEPLOY_KEY}"
                        // Exemplo: executar comando de deploy com a chave
                        bat "echo 'Simulação de deploy usando a chave: ${DEPLOY_KEY}'"
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizada.'
        }
        success {
            echo 'Testes executados com sucesso!'
        }
        failure {
            echo 'Alguns testes falharam. Verifique os logs.'
            archiveArtifacts artifacts: '**/*.log', allowEmptyArchive: true
        }
    }
}
