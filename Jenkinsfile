pipeline {
    agent any

    environment {
        CYPRESS_RECORD_KEY = credentials('cypress-record-key') // Opcional: para integração com Cypress Dashboard
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Clonando o repositório...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Instalando dependências do projeto...'
                sh 'npm install' // Instala as dependências, incluindo o Cypress
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo 'Executando testes Cypress...'
                sh '''
                npx cypress run --browser chrome --headless \
                    --reporter mocha-junit-reporter \
                    --reporter-options mochaFile=test-results/results.xml
                '''
            }
        }

        stage('Publish Test Results') {
            steps {
                echo 'Publicando resultados dos testes...'
                junit 'test-results/results.xml' // Publica o relatório no Jenkins
            }
        }
    }

    post {
        always {
            echo 'Limpando o workspace...'
            cleanWs() // Limpa o workspace ao final
        }
        success {
            echo 'Testes Cypress executados com sucesso!'
        }
        failure {
            echo 'Falha ao executar os testes Cypress.'
        }
    }
}
