pipeline {
    agent any

    environment {
        NODE_ENV = 'test' // Configuração de ambiente
        CYPRESS_CACHE_FOLDER = 'C:\\Temp\\CypressCache' // Cache do Cypress
    }

    options {
        timestamps() // Adiciona timestamps aos logs
    }

    stages {
        stage('Setup') {
            steps {
                echo 'Instalando dependências...'
                bat 'npm ci'
            }
        }

        stage('Testing in Browsers') {
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
