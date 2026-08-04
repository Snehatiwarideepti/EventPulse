pipeline {
    agent any

    environment {
        IMAGE_NAME = 'snehatiwari34/eventpulse-ai:latest'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t eventpulse-ai:latest .'
            }
        }

        stage('Smoke Test') {
            steps {
              sh 'docker run -d -p 8081:80 --name eventpulse-jenkins eventpulse-ai:latest'
              sh 'sleep 5'
              sh 'curl -f http://localhost:8081/'
            }
          post {
            always {
              sh 'docker rm -f eventpulse-jenkins || true'
            }
          }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker tag eventpulse-ai:latest $IMAGE_NAME
                        docker push $IMAGE_NAME
                        docker logout
                    '''
                }
            }
        }
    }
}
