pipeline{
    agent any
    options{
        timeout(time: 1, unit: 'SECONDS')
    }
    stages{
        stage('Ola'){
            steps{
                echo 'Ola mundo'
            }
        }
        stage('Informações do sistema'){
            steps{
                echo "O nemo da pipeline é ${env.JOB_NAME}"
                echo "Esta é a execução: #${env.BUILD_NUMBER}"
                echo "Local: #${env.WORKSPACE}"
            }
        }
        stage('teste'){
            steps{
                echo "teste"
            }
        }
    }
}