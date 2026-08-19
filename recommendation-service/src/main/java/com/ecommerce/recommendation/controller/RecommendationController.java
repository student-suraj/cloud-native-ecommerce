package com.ecommerce.recommendation.controller;

import com.ecommerce.recommendation.dto.request.RecommendationRequest;
import com.ecommerce.recommendation.dto.response.RecommendationResponse;
import com.ecommerce.recommendation.enums.RecommendationType;
import com.ecommerce.recommendation.service.RecommendationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    /**
     * Create Recommendation
     */
    @PostMapping
    public ResponseEntity<RecommendationResponse> createRecommendation(
            @Valid @RequestBody RecommendationRequest request) {

        RecommendationResponse response =
                recommendationService.createRecommendation(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Update Recommendation
     */
    @PutMapping("/{id}")
    public ResponseEntity<RecommendationResponse> updateRecommendation(
            @PathVariable Long id,
            @Valid @RequestBody RecommendationRequest request) {

        RecommendationResponse response =
                recommendationService.updateRecommendation(id, request);

        return ResponseEntity.ok(response);
    }

    /**
     * Get Recommendation By Id
     */
    @GetMapping("/{id}")
    public ResponseEntity<RecommendationResponse> getRecommendationById(
            @PathVariable Long id) {

        RecommendationResponse response =
                recommendationService.getRecommendationById(id);

        return ResponseEntity.ok(response);
    }

    /**
     * Get All Recommendations
     */
    @GetMapping
    public ResponseEntity<Page<RecommendationResponse>> getAllRecommendations(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size,

            @RequestParam(defaultValue = "priority") String sortBy) {

        return ResponseEntity.ok(

                recommendationService.getAllRecommendations(
                        page,
                        size,
                        sortBy
                )
        );
    }

    /**
     * Get Recommendations By Product
     */
    @GetMapping("/product/{productId}")
    public ResponseEntity<Page<RecommendationResponse>> getRecommendationsByProduct(

            @PathVariable Long productId,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size,

            @RequestParam(defaultValue = "priority") String sortBy) {

        return ResponseEntity.ok(

                recommendationService.getRecommendationsByProduct(
                        productId,
                        page,
                        size,
                        sortBy
                )
        );
    }

    /**
     * Get Recommendations By Type
     */
    @GetMapping("/type/{type}")
    public ResponseEntity<Page<RecommendationResponse>> getRecommendationsByType(

            @PathVariable RecommendationType type,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size,

            @RequestParam(defaultValue = "priority") String sortBy) {

        return ResponseEntity.ok(

                recommendationService.getRecommendationsByType(
                        type,
                        page,
                        size,
                        sortBy
                )
        );
    }

    /**
     * Delete Recommendation
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecommendation(
            @PathVariable Long id) {

        recommendationService.deleteRecommendation(id);

        return ResponseEntity.noContent().build();
    }

}