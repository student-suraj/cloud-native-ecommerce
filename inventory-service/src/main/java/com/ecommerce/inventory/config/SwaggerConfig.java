package com.ecommerce.inventory.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI inventoryOpenAPI() {

        return new OpenAPI()

                .info(new Info()

                        .title("Inventory Service API")

                        .description("""
                                Enterprise Inventory Microservice
                                
                                Features:
                                • CRUD Operations
                                • Pagination
                                • Sorting
                                • Validation
                                • Exception Handling
                                • PostgreSQL
                                • Docker
                                • Eureka Client
                                """)

                        .version("v1.0")

                        .contact(new Contact()
                                .name("Saksham Cheulwar")
                                .email("your-email@example.com"))

                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0"))

                )

                .externalDocs(

                        new ExternalDocumentation()

                                .description("Project Documentation")

                                .url("https://github.com/your-github")

                );

    }

}