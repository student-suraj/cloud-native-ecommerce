package com.ecommerce.inventory.service;

import com.ecommerce.inventory.dto.request.InventoryRequest;
import com.ecommerce.inventory.dto.response.InventoryResponse;
import com.ecommerce.inventory.enums.InventoryStatus;
import org.springframework.data.domain.Page;

public interface InventoryService {

    InventoryResponse createInventory(InventoryRequest request);

    InventoryResponse updateInventory(Long id, InventoryRequest request);

    InventoryResponse getInventoryById(Long id);

    InventoryResponse getInventoryBySku(String sku);

    Page<InventoryResponse> getAllInventory(
            int page,
            int size,
            String sortBy
    );

    Page<InventoryResponse> getInventoryByStatus(
            InventoryStatus status,
            int page,
            int size,
            String sortBy
    );

    void deleteInventory(Long id);
    InventoryResponse getInventoryByProductId(Long productId);
}