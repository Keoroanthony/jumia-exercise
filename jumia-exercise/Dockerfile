FROM openjdk:17 AS spring-boot-app
ADD target/jumia-exercise.jar jumia-exercise.jar
ADD sample.db sample.db
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "jumia-exercise.jar"]