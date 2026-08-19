package com.ecommerce.inventory.service.impl;

import com.ecommerce.inventory.dto.request.InventoryRequest;
import com.ecommerce.inventory.dto.response.InventoryResponse;
import com.ecommerce.inventory.entity.Inventory;
import com.ecommerce.inventory.enums.InventoryStatus;
import com.ecommerce.inventory.exception.DuplicateSkuException;
import com.ecommerce.inventory.exception.InventoryNotFoundException;
import com.ecommerce.inventory.mapper.InventoryMapper;
import com.ecommerce.inventory.repository.InventoryRepository;
import com.ecommerce.inventory.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository repository;
    private final InventoryMapper mapper;

    @Override
    public InventoryResponse createInventory(InventoryRequest request) {

        if (repository.existsBySku(request.getSku())) {
            throw new DuplicateSkuException(
                    "SKU already exists : " + request.getSku()
            );
        }

        Inventory inventory = mapper.toEntity(request);

        Inventory savedInventory = repository.save(inventory);

        return mapper.toResponse(savedInventory);
    }

    @Override
    public InventoryResponse updateInventory(Long id,
                                             InventoryRequest request) {

        Inventory inventory = repository.findById(id)
                .orElseThrow(() ->
                        new InventoryNotFoundException(
                                "Inventory not found with id : " + id
                        ));

        if (!inventory.getSku().equals(request.getSku())
                && repository.existsBySku(request.getSku())) {

            throw new DuplicateSkuException(
                    "SKU already exists : " + request.getSku()
            );
        }

        mapper.updateInventoryFromRequest(request, inventory);

        Inventory updatedInventory = repository.save(inventory);

        return mapper.toResponse(updatedInventory);
    }

    @Override
    public InventoryResponse getInventoryById(Long id) {

        Inventory inventory = repository.findById(id)
                .orElseThrow(() ->
                        new InventoryNotFoundException(
                                "Inventory not found with id : " + id
                        ));

        return mapper.toResponse(inventory);
    }

    @Override
    public InventoryResponse getInventoryBySku(String sku) {

        Inventory inventory = repository.findBySku(sku)
                .orElseThrow(() ->
                        new InventoryNotFoundException(
                                "Inventory not found with SKU : " + sku
                        ));

        return mapper.toResponse(inventory);
    }

    @Override
    public Page<InventoryResponse> getAllInventory(
            int page,
            int size,
            String sortBy) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy).ascending()
        );

        return repository.findAll(pageable)
                .map(mapper::toResponse);
    }

    @Override
    public Page<InventoryResponse> getInventoryByStatus(
            InventoryStatus status,
            int page,
            int size,
            String sortBy) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy).ascending()
        );

        return repository.findByStatus(status, pageable)
                .map(mapper::toResponse);
    }

    @Override
    public void deleteInventory(Long id) {

        Inventory inventory = repository.findById(id)
                .orElseThrow(() ->
                        new InventoryNotFoundException(
                                "Inventory not found with id : " + id
                        ));

        repository.delete(inventory);
    }


    @Override
    public InventoryResponse getInventoryByProductId(Long productId) {

        Inventory inventory = repository.findByProductId(productId)
                .orElseThrow(() ->
                        new InventoryNotFoundException (
                                "Inventory not found for product id : " + productId));

        return mapper.toResponse(inventory);
    }

}