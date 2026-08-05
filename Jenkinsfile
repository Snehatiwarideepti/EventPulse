pipeline {
    agent any

    environment {
        IMAGE_NAME = 'snehatiwari34/eventpulse-ai:latest'
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t eventpulse-ai:latest .'
            }
        }

        stage('Push Docker Image') {
            steps {
                sh '''
                    docker tag eventpulse-ai:latest $IMAGE_NAME
                    docker push $IMAGE_NAME
                '''
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
