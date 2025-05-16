pipeline {
    agent any

    environment {
        NODE_ENV = 'production'  // Variáveis de ambiente
        CYPRESS_CACHE_FOLDER = 'C:\\Temp\\CypressCache'  // Para evitar problemas de permissão
    }

    options {
        timestamps() // Adiciona timestamps aos logs
    }

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Nome do branch para build')
    }

    triggers {
        pollSCM('H/5 * * * *') // Verifica mudanças no código a cada 5 minutos
    }

    stages {
        stage('Setup') {
            steps {
                echo 'Configurando o ambiente...'
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo 'Construindo o projeto...'
                bat 'npm run build'
            }
        }

        stage('Testing') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        echo 'Executando testes unitários...'
                        bat 'npm test'
                    }
                }
                stage('Integration Tests') {
                    steps {
                        echo 'Executando testes de integração...'
                        bat 'echo "Teste de integração placeholder"'
                    }
                }
            }
        }

        stage('Browser Testing') {
            matrix {
                axes {
                    axis {
                        name 'BROWSER'
                        values 'chrome', 'firefox'
                    }
                }
                stages {
                    stage('Run Cypress') {
                        steps {
                            echo "Testando no navegador: ${BROWSER}"
                            bat "npx cypress run --browser ${BROWSER}"
                        }
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
            echo 'Pipeline executada com sucesso!'
        }
        failure {
            echo 'Pipeline falhou. Verifique os logs.'
            archiveArtifacts artifacts: '**/*.log', allowEmptyArchive: true
        }
    }
}