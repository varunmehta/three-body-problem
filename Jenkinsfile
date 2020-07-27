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

    // stage('Publish to SonarQube') {
    //   steps {
    //     script {
    //       sh './service/gradlew -b ./service/build.gradle sonarqube \
    //                     -Dsonar.host.url=http://sonarqube:9000 \
    //                     -Dsonar.login=39bd6cb5337b9f6abd829ef57171aedbb39a2f77 \
    //                     -Dsonar.projectKey=TRISOLAR --info'
    //     }
    //   }
    // }

    stage('Build & Test UI') {
      agent {
        docker {
          image 'node:6-alpine'
          args '-p 3000:3000'
          args '-v .:${PWD}./ui'
          reuseNode true
        }
      }
      environment {
        HOME = "./ui"
      }
      stages {
        stage ('Install') {
          steps {
            sh 'cd ./ui'
            sh 'pwd'
            sh './ui/npm install'
          }
        }
        stage ('Build') {
          steps {
            sh 'npm run-script build --prod'
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
