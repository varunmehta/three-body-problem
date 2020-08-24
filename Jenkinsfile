pipeline {
    agent any

    /* tools {nodejs "node"}
  {
      docker {
        image 'node:10.22.0'
        args '-v /certs/npm:/certs'
      }
  }*/
  environment {
      HOME = '.'
  }

  stages {

    stage('Build & Test UI') {

      stages {

        stage ('Package') {
          steps {
          nodejs(nodeJSInstallationName: 'node10') {
            dir ('ui') {
              sh 'whoami'
              sh 'npm config set cafile /certs/npm/nscacert_combined.pem'
              sh 'npm install'
              sh 'npm run-script build --prod'
              //}
            }
            }
          }
        }

        stage('Run UI Tests') {
          steps {
          nodejs(nodeJSInstallationName: 'node10') {
            dir ('ui') {
              sh 'npm run test -- --no-watch --no-progress --browsers=ChromeHeadlessCI'
              sh 'npm run e2e -- --protractor-config=e2e/protractor-ci.conf.js'
            }
            }
          }
        }

        stage('Publish Pacts') {
          steps {
          sh 'echo ${BRANCH_NAME}'
          nodejs(nodeJSInstallationName: 'node10') {
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
