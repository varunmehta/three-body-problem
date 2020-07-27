pipeline {
  agent any

  stages {

    stage('Unit & Integration Tests') {
      steps {
        script {
          try {
            sh './service/gradlew -b ./service/build.gradle clean test --info'
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

    stage('Dockerize') {
      steps {
        script {
          sh './service/gradlew -b ./service/build.gradle docker'
        }
      }
    }
  }
}
