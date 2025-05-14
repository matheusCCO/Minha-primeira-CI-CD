pipeline {
    agent any

    environment {
        // Variáveis de ambiente importantes para os testes
        TEST_ENV = 'staging'
        REPORT_DIR = 'test-reports'
    }

    parameters {
        // Parâmetros para personalizar os testes
        booleanParam(name: 'RUN_INTEGRATION_TESTS', defaultValue: true, description: 'Executar testes de integração?')
        string(name: 'TEST_BRANCH', defaultValue: 'main', description: 'Branch para testar')
    }

    stages {
        stage('Preparation') {
            steps {
                echo 'Preparando ambiente de teste...'
                echo "Executando testes no ambiente: ${TEST_ENV}"
            }
        }

        stage('Checkout') {
            steps {
                // Checkout do branch especificado
                checkout scm
                echo "Branch em teste: ${params.TEST_BRANCH}"
            }
        }

        stage('Build') {
            steps {
                echo 'Construindo o projeto para os testes...'
                sh 'mvn clean install' // Comando para build (usando Maven como exemplo)
            }
        }

        stage('Unit Tests') {
            steps {
                echo 'Executando testes unitários...'
                sh 'mvn test -Dtest=Unit*'
            }
        }

        stage('Integration Tests') {
            when {
                expression { params.RUN_INTEGRATION_TESTS } // Só executa se RUN_INTEGRATION_TESTS for verdadeiro
            }
            steps {
                echo 'Executando testes de integração...'
                sh 'mvn test -Dtest=Integration*'
            }
        }

        stage('Static Code Analysis') {
            steps {
                echo 'Executando análise estática de código...'
                sh 'mvn sonar:sonar' // Exemplo de execução com SonarQube
            }
        }

        stage('Generate Reports') {
            steps {
                echo 'Gerando relatórios de teste...'
                sh "mkdir -p ${REPORT_DIR}"
                sh "cp target/surefire-reports/*.xml ${REPORT_DIR}" // Copia relatórios para um diretório específico
            }
        }

        stage('Publish Reports') {
            steps {
                echo 'Publicando relatórios...'
                junit '**/test-reports/*.xml' // Publica os relatórios no Jenkins
            }
        }
    }

    post {
        always {
            echo 'Pipeline de testes concluído!'
            cleanWs() // Limpa o workspace ao final
        }
        success {
            echo 'Todos os testes foram executados com sucesso!'
        }
        failure {
            echo 'Falha no pipeline de testes!'
        }
    }
}
