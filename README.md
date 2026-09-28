Topic: "CircuitBreaker": Cloud-Native E-Commerce API Gateway
Project Overview:
   This demonstrates a microservices based ecommerce using spring cloud gateway and resilience mechanisms.
   This system consists of three services
     . Product Service
     . Inventory Service
     . Recommendation Service
    API Gateway acts as a single entry point that routes the request to the appropriate microservices.
    Resilience mechanisms such as circuit breaker, rate limiter and bulkhead to improve the realiability of the system.
Technology Used:
  . Java 21
  . Spring Boot
  . Spring Cloud Gateway
  . Spring Cloud Circuit Breaker
  . Rate Limiter
  . BulkHead
  . docker
  . Maven
  . Eureka
  . Zipkin
  . PostgreSQL
Project WorkFlow:
     Client
     API Gateway
       . Product Service
       . Inventory Service
       . Recommendation Service
     PostgreSQL
     Eureka
     Zipkin
Services and Ports
   . API Gateway - 8080
   . Product Service - 8081
   . Inventory Service - 8082
   . Recommendation Service - 8083
   . Eureka - 8671
   . Zipkin - 9411
Project Architecture:
    CircuitBreaker/
      api-gateway/
        pox.xml
        Dockerfile
      product-service/
        product-service/
            pom.xml
            Dockerfile
      inventory-service/
        pom.xml
        Dockerfile
      recommendation-service/
         recommendation-service/
            pom.xml
            Dockerfile
      service-registry/
        pom.xml
        Dockerfile
      docker-compose.yml
      README.md
Running the Project:
   Run all the services:
      docker compose up --build
   Check Running containers:
     docker compose ps
   Stop the containers:
     docker compose stop
   Stop and remove the containers:
     docker compose down
   Start the Zipkin separately:
     docker compose up -d zipkin
Local Host testing:
  Product:
    https://localhost:8081/api/v1/products
  Inventory:
    https://localhost:8082/api/v1/inventory
  Recommendation:
     https://localhost:8083/api/v1/recommendations

