package com.ecommerce.recommendation.dto.response;

import com.ecommerce.recommendation.enums.RecommendationType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecommendationResponse {

    private Long id;

    private Long productId;

    private Long recommendedProductId;

    private RecommendationType recommendationType;

    private Double score;

    private Integer priority;

    private Boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
