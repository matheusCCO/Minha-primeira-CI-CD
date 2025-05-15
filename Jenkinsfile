pipeline {
    agent any

    environment {
        CYPRESS_RECORD_KEY = credentials('cypress-record-key') // Opcional: para integração com Cypress Dashboard
    }

    parameters {
        string(name: 'TEST_FILE', defaultValue: 'cypress/e2e/teste_visit.cy.js', description: 'Caminho para o arquivo de teste Cypress a ser executado.')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Clonando o repositório...'
                checkout([$class: 'GitSCM',
                  branches: [[name: '*/main']],
                  doGenerateSubmoduleConfigurations: false,
                  extensions: [],
                  userRemoteConfigs: [[
                      url: 'https://github.com/matheusCCO/Minha-primeira-CI-CD',
                      credentialsId: 'ID_DA_SUA_CREDENCIAL'
                  ]]
                ])
            }
        }


        stage('Install Dependencies') {
            steps {
                echo 'Instalando dependências do projeto...'
                sh 'npm install'
            }
        }

        stage('Run Selected Cypress Test') {
            steps {
                echo "Executando o teste Cypress: ${params.TEST_FILE}..."
                sh """
                npx cypress run --browser chrome --headless \
                    --spec ${params.TEST_FILE} \
                    --reporter mocha-junit-reporter \
                    --reporter-options mochaFile=test-results/results.xml
                """
            }
        }

        /*stage('Publish Test Results') {
            steps {
                echo 'Publicando resultados dos testes...'
                junit 'test-results/results.xml'
            }
        }*/
    }

    post {
        always {
            echo 'Executando ações finais...'
            //cleanWs()
        }
        success {
            echo 'Testes executados com sucesso!'
        }
        failure {
            echo 'Falha ao executar os testes.'
        }
    }
}