pipeline {
  agent any

  stages {

    stage('Build & Test UI') {

      stages {

        stage ('Package') {
          steps {
            dir ('ui') {
              withNPM() {
              /* sh 'ls -l /npm'
              sh 'whoami'
              sh 'npm config -g set cafile /npm/nscacert_combined.pem' */
              sh 'npm install'
              sh 'npm run-script build --prod'
            }
            }
          }
        }

        stage('Run UI Tests') {
          steps {
            dir ('ui') {
              sh 'npm run test -- --no-watch --no-progress --browsers=ChromeHeadlessCI'
              sh 'npm run e2e -- --protractor-config=e2e/protractor-ci.conf.js'
            }
          }
        }

        stage('Publish Pacts') {
          steps {
            dir ('ui') {
              sh '''pact-broker publish ./pacts
              --consumer-app-version=${GIT_COMMIT}
              --broker-base-url=pact-broker
              --tag=${BRANCH_NAME}'''
            }
          }
        }
      }
    }

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

    stage('Dockerize') {
      steps {
        script {
          sh './service/gradlew -b ./service/build.gradle docker'
        }
      }
    }
  }
}
