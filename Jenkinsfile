pipeline {
    agent any

    environment {
        CYPRESS_RECORD_KEY = credentials('cypress-record-key') // Credencial do Cypress Dashboard, se aplicável
    }

    stages {
        stage('Preparation') {
            steps {
                echo 'Preparando o ambiente para Cypress...'
                sh 'npm install' // Instala dependências do projeto
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
                echo 'Publicando resultados dos testes Cypress...'
                junit 'test-results/results.xml' // Publica os relatórios no Jenkins
            }
        }
    }

    post {
        always {
            echo 'Pipeline concluído!'
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