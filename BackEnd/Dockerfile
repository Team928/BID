FROM openjdk:17

WORKDIR /app

COPY build/libs/*.jar application.jar

EXPOSE 8081

CMD["java", "-jar", "application.jar"]
