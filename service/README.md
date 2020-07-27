# The Tri-Solar Service

A simple spring-boot based gradle project. Check `build.gradle` for dependencies.

## Dependencies

 Docker-Desktop. You should have docker running on your local development environment to run unit and integration tests.  

### `testcontainers`

[Testcontainers](https://www.testcontainers.org/), allow you to use docker running integration test with real dockerized DBs. Using [LocalStack](https://www.testcontainers.org/modules/localstack/) allows you to emulate the AWS environment too.

### `localstack`
LocalStack allows you to spin core Cloud APIs without having to connect to a real AWS environment. This allows you to test basic functionality of the app on your local or the pipeline as part of unit test.

## Building the project

Use [gradle wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html) to build the project locally.

```
  ./gradlew clean build
```
