pipeline {
    agent any // Define o agente para executar o pipeline

    environment {
        // Definição de variáveis de ambiente
        MY_ENV_VAR = 'HelloWorld'
    }

    options {
        // Configurações de opções
        timeout(time: 30, unit: 'MINUTES') // Timeout de 30 minutos
        timestamps() // Adiciona timestamps aos logs
    }

    parameters {
        // Definição de parâmetros para o pipeline
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Nome do branch')
        booleanParam(name: 'RUN_TESTS', defaultValue: true, description: 'Executar testes?')
    }

    triggers {
        // Configuração de gatilhos
        cron('H 4 * * 1-5') // Executa de segunda a sexta às 4h
    }

    stages {
        stage('Preparation') {
            steps {
                script {
                    echo "Pipeline iniciado com a variável: ${MY_ENV_VAR}"
                }
            }
        }

        stage('Checkout') {
            steps {
                checkout scm // Faz o checkout do código-fonte
            }
        }

        stage('Build') {
            steps {
                echo 'Construindo o projeto...'
            }
        }

        stage('Test') {
            when {
                // Condição para execução do estágio
                expression { params.RUN_TESTS } // Executa se RUN_TESTS for verdadeiro
            }
            steps {
                echo 'Executando os testes...'
            }
        }

        stage('Deploy') {
            input {
                // Solicita confirmação manual para continuar
                message "Deseja realizar o deploy?"
                ok "Sim, continuar"
            }
            steps {
                echo 'Fazendo o deploy...'
            }
        }

        stage('Parallel Stages') {
            parallel {
                stage('Task 1') {
                    steps {
                        echo 'Executando a Tarefa 1'
                    }
                }
                stage('Task 2') {
                    steps {
                        echo 'Executando a Tarefa 2'
                    }
                }
            }
        }

        stage('Matrix') {
            matrix {
                axes {
                    axis {
                        name 'OS'
                        values 'linux', 'windows' // Variáveis para matriz
                    }
                }
                stages {
                    stage('Matrix Build') {
                        steps {
                            echo "Build em execução no sistema operacional: ${OS}"
                        }
                    }
                }
            }
        }
    }

    post {
        // Ações pós-execução
        always {
            echo 'Pipeline finalizado!'
        }
        success {
            echo 'Pipeline executado com sucesso!'
        }
        failure {
            echo 'O pipeline falhou.'
        }
    }
}
