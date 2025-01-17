# Use Gradle image for building, specify JDK 21 as the target
FROM gradle:8.8-jdk-focal AS build

WORKDIR /app

# Copy build.gradle and settings.gradle for dependency resolution
COPY build.gradle settings.gradle ./

# Use Gradle's cache to speed up dependency resolution
RUN gradle build --no-daemon -x test || return 0

# Copy the rest of the application code
COPY . /app

# 빌드해서 jar 파일 생성
RUN apt-get update && apt-get install -y openjdk-21-jdk \
    && gradle clean build --no-daemon -x test

# Use JRE for runtime environment to keep the image size smaller
FROM openjdk:21-jdk-slim

WORKDIR /app

# Set up a logs directory for application logs
RUN mkdir -p /app/logs

# Copy the built JAR from the build stage to the runtime stage
COPY --from=build /app/build/libs/*.jar /app/omg-backend.jar

# Expose the necessary port for the backend (8080)
EXPOSE 8080

# Run the Spring Boot application using the built JAR with the 'prod' profile active
ENTRYPOINT [ "java" ]
CMD [ "-jar", "omg-backend.jar", "--spring.profiles.active=prod" ]
