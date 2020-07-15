# Three Body Problem
Every application always suffers from a 3 body problem.

 * Development
 * Testing
 * Deployment

I've tried to build a simple app to demonstrate how they can work in harmony with a predictable orbit.

> I was reading the [The Three Body Problem](https://en.wikipedia.org/wiki/The_Three-Body_Problem_(novel)), and trying to solve a problem for a client, when the two paradigms felt similar to each other. Also naming a project is always [painful](https://blog.codinghorror.com/whats-in-a-project-name/)!

## `trisolar-universe.yml`

In order to run a pipeline we need a couple of services. We leverage here on `docker-compose` file to create a small local network. The services currently in use are;

 * **SonarQube**: Code Quality
 * **Jenkins**: CI/CD
 * **PostgreSQL**: For SonarQube
