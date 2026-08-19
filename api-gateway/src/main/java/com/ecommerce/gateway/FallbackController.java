package com.ecommerce.gateway;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/fallback")
public class FallbackController {

    private final WebClient.Builder webClientBuilder;

    public FallbackController(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }

    @GetMapping("/recommendations")
    public Mono<ResponseEntity<Map<String, Object>>> recommendationFallback(
            @RequestParam(required = false) Long productId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "priority") String sortBy) {

        return webClientBuilder
                .build()
                .get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("http")
                        .host("PRODUCT-SERVICE")
                        .path("/api/v1/products")
                        .queryParam("page", page)
                        .queryParam("size", size)
                        .queryParam("sortBy", sortBy)
                        .build())
                .retrieve()
                .bodyToMono(new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {
                })

                .map(productResponse -> {

                    productResponse.put("fallback", true);

                    productResponse.put(
                            "message",
                            "Recommendation service unavailable. Showing alternative products."
                    );

                    return ResponseEntity.ok(productResponse);
                })

                .onErrorResume(error -> {

                    Map<String, Object> fallbackResponse = Map.of(
                            "content", List.of(),
                            "totalElements", 0,
                            "totalPages", 0,
                            "number", page,
                            "size", size,
                            "fallback", true,
                            "message",
                            "Recommendation service and product fallback are currently unavailable."
                    );

                    return Mono.just(
                            ResponseEntity.ok(fallbackResponse)
                    );
                });
    }
}