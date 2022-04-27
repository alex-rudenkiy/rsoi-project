#mvn clean package spring-boot:repackage
FROM openjdk:12
VOLUME /tmp
ADD target/*.jar app.jar
EXPOSE 8091
ENTRYPOINT ["java","-jar","app.jar"]