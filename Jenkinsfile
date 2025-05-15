pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Construindo o projeto...'
                bat 'mvn clean package' // Exemplo para projetos Java usando Maven
            }
        }
        stage('Test') {
            steps {
                echo 'Executando testes...'
                bat 'mvn test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Realizando deploy...'
                bat 'scp target/*.jar user@server:/deploy' // Ajuste conforme necessário
            }
        }
    }
}
