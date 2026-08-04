pipeline {
  agent any

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
        sh 'docker run -d --name eventpulse-jenkins eventpulse-ai:latest'
        sh 'sleep 5'
        sh 'docker exec eventpulse-jenkins curl -f http://localhost/'
      }
      post {
        always {
            sh 'docker rm -f eventpulse-jenkins || true'
        }
      }
    }
  }
}
