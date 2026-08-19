package com.ecommerce.recommendation.service.impl;

import com.ecommerce.recommendation.dto.request.RecommendationRequest;
import com.ecommerce.recommendation.dto.response.RecommendationResponse;
import com.ecommerce.recommendation.entity.Recommendation;
import com.ecommerce.recommendation.enums.RecommendationType;
import com.ecommerce.recommendation.exception.DuplicateResourceException;
import com.ecommerce.recommendation.exception.ResourceNotFoundException;
import com.ecommerce.recommendation.mapper.RecommendationMapper;
import com.ecommerce.recommendation.repository.RecommendationRepository;
import com.ecommerce.recommendation.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecommendationServiceImpl implements RecommendationService {

    private final RecommendationRepository repository;
    private final RecommendationMapper mapper;

    @Override
    public RecommendationResponse createRecommendation(
            RecommendationRequest request) {

        repository.findByProductIdAndRecommendedProductId(
                request.getProductId(),
                request.getRecommendedProductId()
        ).ifPresent(r -> {
            throw new DuplicateResourceException(
                    "Recommendation already exists."
            );
        });

        Recommendation recommendation = mapper.toEntity(request);

        recommendation = repository.save(recommendation);

        return mapper.toResponse(recommendation);
    }

    @Override
    public RecommendationResponse updateRecommendation(
            Long id,
            RecommendationRequest request) {

        Recommendation recommendation = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Recommendation not found with id : " + id));

        mapper.updateEntityFromRequest(request, recommendation);

        recommendation = repository.save(recommendation);

        return mapper.toResponse(recommendation);
    }

    @Override
    public RecommendationResponse getRecommendationById(Long id) {

        Recommendation recommendation = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Recommendation not found with id : " + id));

        return mapper.toResponse(recommendation);
    }

    @Override
    public Page<RecommendationResponse> getAllRecommendations(
            int page,
            int size,
            String sortBy) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy).ascending());

        return repository.findAll(pageable)
                .map(mapper::toResponse);
    }

    @Override
    public Page<RecommendationResponse> getRecommendationsByProduct(
            Long productId,
            int page,
            int size,
            String sortBy) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy).ascending());

        return repository.findByProductId(
                        productId,
                        pageable)
                .map(mapper::toResponse);
    }

    @Override
    public Page<RecommendationResponse> getRecommendationsByType(
            RecommendationType type,
            int page,
            int size,
            String sortBy) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy).ascending());

        return repository.findByRecommendationType(
                        type,
                        pageable)
                .map(mapper::toResponse);
    }

    @Override
    public void deleteRecommendation(Long id) {

        Recommendation recommendation = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Recommendation not found with id : " + id));

        repository.delete(recommendation);
    }
}