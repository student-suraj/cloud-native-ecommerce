package com.ecommerce.recommendation.dto.request;

import com.ecommerce.recommendation.enums.RecommendationType;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecommendationRequest {

    @NotNull(message = "Product ID is required")
    @Positive(message = "Product ID must be greater than zero")
    private Long productId;

    @NotNull(message = "Recommended Product ID is required")
    @Positive(message = "Recommended Product ID must be greater than zero")
    private Long recommendedProductId;

    @NotNull(message = "Recommendation Type is required")
    private RecommendationType recommendationType;

    @NotNull(message = "Score is required")
    @DecimalMin(value = "0.0", message = "Score cannot be negative")
    @DecimalMax(value = "1.0", message = "Score cannot be greater than 1")
    private Double score;

    @NotNull(message = "Priority is required")
    @Min(value = 1, message = "Priority must be at least 1")
    private Integer priority;

    @NotNull(message = "Active status is required")
    private Boolean active;

}