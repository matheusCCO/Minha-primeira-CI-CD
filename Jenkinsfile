pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Instalando dependências...'
                bat 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Executando testes...'
                bat 'npm test'
            }
        }
    }

    post {
        always {
            echo 'Pipeline concluída.'
        }
        success {
            echo 'Pipeline executada com sucesso!'
        }
        failure {
            echo 'A pipeline falhou.'
        }
    }
}