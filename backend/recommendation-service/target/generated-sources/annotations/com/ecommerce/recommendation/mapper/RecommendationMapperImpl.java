package com.ecommerce.recommendation.mapper;

import com.ecommerce.recommendation.dto.request.RecommendationRequest;
import com.ecommerce.recommendation.dto.response.RecommendationResponse;
import com.ecommerce.recommendation.entity.Recommendation;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-31T21:58:16+0530",
    comments = "version: 1.6.3, compiler: javac, environment: Java 21.0.12 (Oracle Corporation)"
)
@Component
public class RecommendationMapperImpl implements RecommendationMapper {

    @Override
    public Recommendation toEntity(RecommendationRequest request) {
        if ( request == null ) {
            return null;
        }

        Recommendation.RecommendationBuilder recommendation = Recommendation.builder();

        recommendation.productId( request.getProductId() );
        recommendation.recommendedProductId( request.getRecommendedProductId() );
        recommendation.recommendationType( request.getRecommendationType() );
        recommendation.score( request.getScore() );
        recommendation.priority( request.getPriority() );
        recommendation.active( request.getActive() );

        return recommendation.build();
    }

    @Override
    public RecommendationResponse toResponse(Recommendation recommendation) {
        if ( recommendation == null ) {
            return null;
        }

        RecommendationResponse.RecommendationResponseBuilder recommendationResponse = RecommendationResponse.builder();

        recommendationResponse.id( recommendation.getId() );
        recommendationResponse.productId( recommendation.getProductId() );
        recommendationResponse.recommendedProductId( recommendation.getRecommendedProductId() );
        recommendationResponse.recommendationType( recommendation.getRecommendationType() );
        recommendationResponse.score( recommendation.getScore() );
        recommendationResponse.priority( recommendation.getPriority() );
        recommendationResponse.active( recommendation.getActive() );
        recommendationResponse.createdAt( recommendation.getCreatedAt() );
        recommendationResponse.updatedAt( recommendation.getUpdatedAt() );

        return recommendationResponse.build();
    }

    @Override
    public void updateEntityFromRequest(RecommendationRequest request, Recommendation recommendation) {
        if ( request == null ) {
            return;
        }

        recommendation.setProductId( request.getProductId() );
        recommendation.setRecommendedProductId( request.getRecommendedProductId() );
        recommendation.setRecommendationType( request.getRecommendationType() );
        recommendation.setScore( request.getScore() );
        recommendation.setPriority( request.getPriority() );
        recommendation.setActive( request.getActive() );
    }
}
