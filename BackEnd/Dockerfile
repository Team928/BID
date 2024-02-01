FROM openjdk:17

WORKDIR /app

COPY build/libs/*.jar back_application.jar

EXPOSE 8081

CMD ["java", "-jar", "-Dspring.profiles.active=server", "back_application.jar"]