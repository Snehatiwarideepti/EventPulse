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
                sh '''
                    docker run -d --name eventpulse-jenkins eventpulse-ai:latest
                    sleep 5
                    docker exec eventpulse-jenkins curl -f http://localhost/
                '''
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

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    kubectl apply -f deployment.yml
                    kubectl rollout status deployment/eventpulse-deployment
                '''
            }
        }
    }
}
