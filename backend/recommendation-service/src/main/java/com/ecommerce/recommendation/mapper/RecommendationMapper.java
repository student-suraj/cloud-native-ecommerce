package com.ecommerce.recommendation.mapper;

import com.ecommerce.recommendation.dto.request.RecommendationRequest;
import com.ecommerce.recommendation.dto.response.RecommendationResponse;
import com.ecommerce.recommendation.entity.Recommendation;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RecommendationMapper {

    Recommendation toEntity(RecommendationRequest request);

    RecommendationResponse toResponse(Recommendation recommendation);

    void updateEntityFromRequest(
            RecommendationRequest request,
            @MappingTarget Recommendation recommendation
    );

}
