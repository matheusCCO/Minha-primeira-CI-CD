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
                expression { return params.RUN_TESTS } // Condição: Executar apenas se RUN_TESTS for verdadeiro
            }
            parallel {
                stage('Test in Chrome') {
                    steps {
                        echo 'Testando no navegador Chrome...'
                        bat 'npx cypress run --browser chrome'
                    }
                }
                stage('Test in Edge') {
                    steps {
                        echo 'Testando no navegador Edge...'
                        bat 'npx cypress run --browser electron'
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