package com.ecommerce.product.client;

import com.ecommerce.product.dto.external.InventoryResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "INVENTORY-SERVICE")
public interface InventoryClient {

    @GetMapping("/api/v1/inventory/product/{productId}")
    InventoryResponse getInventoryByProductId(
            @PathVariable Long productId
    );

}