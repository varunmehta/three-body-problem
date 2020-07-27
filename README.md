# Three Body Problem
Every application always suffers from a 3 body problem.

 * Development
 * Testing
 * Deployment

I've tried to build a simple app to demonstrate how they can work in harmony with a predictable orbit.

> I was reading the [The Three Body Problem](https://en.wikipedia.org/wiki/The_Three-Body_Problem_(novel)), and trying to work on this sample app, when the two paradigms felt similar to each other. Also naming a project is always [painful](https://blog.codinghorror.com/whats-in-a-project-name/)! The *people* in the three body universe are called as **Trisolarans**.

[Docker desktop](https://www.docker.com/products/docker-desktop). You should have docker running on your local development environment to run unit and integration tests.  

## Service

`spring-boot` based backend service, exposing a REST API. Check the [documentation under the service](service) to know how to set it up locally.

## Ui

`angular` UI app. Check the [documentation under the ui](ui) to know how to set it up locally.



## Local DevOps Pipeline -`trisolar-universe.yml`

In order to run a pipeline we need a couple of services. We leverage here on `docker-compose` file to create a small local network. The services currently in use are;

 * **Jenkins**: CI/CD
 * **SonarQube**: Code Quality
 * **PostgreSQL**: For SonarQube & Pact Broker
 * **Pact Broker**: Pact Broker to capture pact changes.


### `/etc/hosts`
Since you are running this local, if everything is on localhost, the services don't like it. Add some entries to your `/etc/hosts` for easier management

```
127.0.0.1       jenkins
127.0.0.1       sonarqube
127.0.0.1       pact-broker
```
Access each of the services on their respective ports with the above mentioned names. You can add your own special subdomains or extensions you like.

### Jenkins

The [jenkins documentation](https://www.jenkins.io/doc/book/installing/#downloading-and-running-jenkins-in-docker) on how to setup jenkins in docker is well documented. The steps I've followed are documented below in broad strokes. Please refer back to the original documentation for updated changes.

 * Once Jenkins is installed, switch over to Blue Ocean view
 * Create a new Pipeline.
 * Select git
  > Don't use github by default, it uses https, you'll run into SSL certificate issues. Just use git:ssh connection.
 * Provide `ssh` url for git: git@github.com:varunmehta/three-body-problem.git
 * Jenkins will generate and provide a `ssh-rsa` key for your git server.
 * Add [key to your github account](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh) for the pipeline to use.
 * Create pipeline.
 * Jenkins will pickup the `Jenkinsfile` and start building the code.

### SonarQube

Follow instructions to setup SonarQube, and modify the Jenkinsfile to have the proper key from SonarQube.

```
  sh './service/gradlew -b ./service/build.gradle sonarqube \
               -Dsonar.host.url=http://sonarqube:9000 \
               -Dsonar.login=<insert_key_here> \
               -Dsonar.projectKey=TRISOLAR --info'
```

### Pact-Broker
 pact-broker is happy to be started on its local port.
