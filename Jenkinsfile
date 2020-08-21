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
            sh 'npm -v'
            sh 'node -v'
            dir ('ui') {
              //withNPM(npmrcConfig:'4a13e8f2-bea4-4ee2-b5ac-25b6a7c1d373') {
              //sh 'ls -l /certs'
              sh 'whoami'
              //sh 'sudo chown -R $USER /usr/local/'
              //sh 'npm config -g set cafile /certs/nscacert_combined.pem'
              sh 'npm config set strict-ssl false'
              sh 'npm install'
              sh 'npm run-script build --prod'
              //}
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
