pipeline {
    agent any

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
                bat '''
                npm install --no-audit --no-fund
                '''
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Executando testes...'
                bat 'npx cypress run'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
