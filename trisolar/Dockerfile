FROM openjdk:8-jdk-alpine

# no root please... 
RUN addgroup -S trisolarans && adduser -S trisolarans -G trisolarans
USER trisolarans

VOLUME /tmp
ARG JAR_FILE
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]