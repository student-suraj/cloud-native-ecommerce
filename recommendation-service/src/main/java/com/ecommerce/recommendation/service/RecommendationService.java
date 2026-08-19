package com.ecommerce.recommendation.service;

import com.ecommerce.recommendation.dto.request.RecommendationRequest;
import com.ecommerce.recommendation.dto.response.RecommendationResponse;
import com.ecommerce.recommendation.enums.RecommendationType;
import org.springframework.data.domain.Page;

public interface RecommendationService {

    RecommendationResponse createRecommendation(
            RecommendationRequest request
    );

    RecommendationResponse updateRecommendation(
            Long id,
            RecommendationRequest request
    );

    RecommendationResponse getRecommendationById(
            Long id
    );

    Page<RecommendationResponse> getAllRecommendations(
            int page,
            int size,
            String sortBy
    );

    Page<RecommendationResponse> getRecommendationsByProduct(
            Long productId,
            int page,
            int size,
            String sortBy
    );

    Page<RecommendationResponse> getRecommendationsByType(
            RecommendationType type,
            int page,
            int size,
            String sortBy
    );

    void deleteRecommendation(
            Long id
    );

}