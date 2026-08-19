package com.ecommerce.recommendation.entity;

import com.ecommerce.recommendation.common.BaseEntity;
import com.ecommerce.recommendation.enums.RecommendationType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name = "recommendation",

        indexes = {

                @Index(
                        name = "idx_product",
                        columnList = "productId"
                ),

                @Index(
                        name = "idx_recommended_product",
                        columnList = "recommendedProductId"
                ),

                @Index(
                        name = "idx_recommendation_type",
                        columnList = "recommendationType"
                ),

                @Index(
                        name = "idx_active",
                        columnList = "active"
                )

        }
)

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Recommendation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long productId;

    @Column(nullable = false)
    private Long recommendedProductId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private RecommendationType recommendationType;

    @Column(nullable = false)
    private Double score;

    @Column(nullable = false)
    private Integer priority;

    @Column(nullable = false)
    private Boolean active;

}