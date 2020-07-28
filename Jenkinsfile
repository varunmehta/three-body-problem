pipeline {
  agent any

  stages {

    stage('Build & Test Service') {
      steps {
        script {
          try {
            sh './service/gradlew -b ./service/build.gradle clean test'
          } finally {
            junit '**/build/test-results/test/*.xml'
          }
        }
      }
    }

    stage('Publish to SonarQube') {
      steps {
        script {
          sh './service/gradlew -b ./service/build.gradle sonarqube \
                        -Dsonar.host.url=http://sonarqube:9000 \
                        -Dsonar.login=194aaaef3027e61e19752e883e3f8201b2c0d418 \
                        -Dsonar.projectKey=trisolar'
        }
      }
    }

    stage('Build & Test UI') {
      agent {
        docker {
          image 'node:current-alpine'
          args '-p 3000:3000'
          reuseNode true
        }
      }
      stages {
        stage ('Package') {
          steps {
            dir ('ui') {
              sh 'npm install'
              sh 'npm run-script build --prod'
            }
          }
        }
      }
    }

    stage('Dockerize') {
      steps {
        script {
          sh './service/gradlew -b ./service/build.gradle docker'
        }
      }
    }
  }
}
