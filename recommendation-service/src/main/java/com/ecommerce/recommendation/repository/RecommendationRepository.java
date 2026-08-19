package com.ecommerce.recommendation.repository;

import com.ecommerce.recommendation.entity.Recommendation;
import com.ecommerce.recommendation.enums.RecommendationType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecommendationRepository
        extends JpaRepository<Recommendation, Long> {

    /*
     * Pagination by Product ID
     */
    Page<Recommendation> findByProductId(
            Long productId,
            Pageable pageable
    );

    /*
     * Active recommendations
     */
    List<Recommendation> findByActiveTrue();

    /*
     * Active recommendations for a product ordered by priority
     */
    List<Recommendation> findByProductIdAndActiveTrueOrderByPriorityAsc(
            Long productId
    );

    /*
     * Pagination by Recommendation Type
     */
    Page<Recommendation> findByRecommendationType(
            RecommendationType recommendationType,
            Pageable pageable
    );

    /*
     * Find by Product + Recommendation Type
     */
    List<Recommendation> findByProductIdAndRecommendationType(
            Long productId,
            RecommendationType recommendationType
    );

    /*
     * Prevent duplicate recommendations
     */
    Optional<Recommendation> findByProductIdAndRecommendedProductId(
            Long productId,
            Long recommendedProductId
    );

    /*
     * Pagination for active recommendations
     */
    Page<Recommendation> findByActiveTrue(
            Pageable pageable
    );
}