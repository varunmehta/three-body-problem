# Three Body Problem
Every application always suffers from a 3 body problem.

 * Development
 * Testing
 * Deployment

I've tried to build a simple app to demonstrate how they can work in harmony with a predictable orbit.

> I was reading the [The Three Body Problem](https://en.wikipedia.org/wiki/The_Three-Body_Problem_(novel)), and trying to work on this sample app, when the two paradigms felt similar to each other. Also naming a project is always [painful](https://blog.codinghorror.com/whats-in-a-project-name/)!

## `trisolar-universe.yml`

In order to run a pipeline we need a couple of services. We leverage here on `docker-compose` file to create a small local network. The services currently in use are;

 * **SonarQube**: Code Quality
 * **Jenkins**: CI/CD
 * **PostgreSQL**: For SonarQube

The [jenkins documentation](https://www.jenkins.io/doc/book/installing/#downloading-and-running-jenkins-in-docker) on how to setup jenkins in docker is well documented. The steps I've followed are documented below in broad strokes. Please refer back to the original documentation for updated changes.

 * Add Jenkins repo with basic plugins
   - Make sure git and sonarqube plugins are installed.
 * Setup [SSH key](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh) for your git account and use that.
 * Configure Jenkinsfile and run with code build.

> Don't use https, you'll run into SSL certificate issues. Just use git:ssh connection.

### testcontainers

Testcontainers, allow you to use docker running integration test with real dockerized DBs. Using localstack allows you to emulate the AWS environment too. Since we are running jenkins in a dockerized environment, we are very prone to docker wormholes. Make sure you use docker:dind to get it working.
