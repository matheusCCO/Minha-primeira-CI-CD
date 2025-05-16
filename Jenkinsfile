pipeline {
    agent any // Agente específico para executar a pipeline

    environment {
        NODE_ENV = 'test' // Variável de ambiente
        PROJECT_NAME = 'JenkinsNodePipelineExample'
    }

    options {
        timeout(time: 30, unit: 'MINUTES') // Tempo limite para a execução da pipeline
        buildDiscarder(logRotator(numToKeepStr: '10')) // Limite de builds mantidos no histórico
    }

    parameters {
        string(name: 'BRANCH', defaultValue: 'main', description: 'Qual branch será usada?')
        booleanParam(name: 'RUN_TESTS', defaultValue: true, description: 'Executar os testes?')
    }

    triggers {
        cron('H */4 * * *') // Trigger para executar a cada 4 horas
    }

    stages {
        stage('Setup') {
            steps {
                echo "Preparando o ambiente para o projeto: ${env.PROJECT_NAME}"
                echo "Branch escolhida: ${params.BRANCH}"
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    if (params.RUN_TESTS) {
                        echo 'Instalando dependências...'
                        bat 'npm install'
                    } else {
                        echo 'Pular a instalação de dependências, pois os testes estão desativados.'
                    }
                }
            }
        }

        stage('Run Tests') {
            when {
                expression { return params.RUN_TESTS } // Executa apenas se RUN_TESTS for verdadeiro
            }
            steps {
                echo 'Executando testes...'
                bat 'npm test'
            }
        }

        stage('Deploy') {
            input {
                message "Deploy aprovado?"
                ok "Continuar com o Deploy"
            }
            steps {
                echo "Realizando deploy do projeto: ${env.PROJECT_NAME}"
            }
        }

        stage('Parallel Stages') {
            parallel {
                stage('Linting') {
                    steps {
                        echo 'Executando análise estática (Lint)...'
                        bat 'npm run lint'
                    }
                }

                stage('Build') {
                    steps {
                        echo 'Construindo o projeto...'
                        bat 'npm run build' // Exemplo, ajustar conforme necessário
            }
        }
    }
}