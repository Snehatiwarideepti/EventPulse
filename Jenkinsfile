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
        sh 'docker run -d --name eventpulse-jenkins -p 8081:80 eventpulse-ai:latest'
        sh 'sleep 5'
        sh 'curl -f http://127.0.0.1:8081/ | head'
        sh 'docker rm -f eventpulse-jenkins'
      }
    }
  }
}
