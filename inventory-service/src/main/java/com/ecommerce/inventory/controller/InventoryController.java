package com.ecommerce.inventory.controller;

import com.ecommerce.inventory.dto.request.InventoryRequest;
import com.ecommerce.inventory.dto.response.InventoryResponse;
import com.ecommerce.inventory.enums.InventoryStatus;
import com.ecommerce.inventory.service.InventoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/inventory")
@RequiredArgsConstructor



@Tag(
        name = "Inventory Controller",
        description = "Inventory Management APIs"
)
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping
    public ResponseEntity<InventoryResponse> createInventory(
            @Valid @RequestBody InventoryRequest request) {

        InventoryResponse response =
                inventoryService.createInventory(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }





    @GetMapping("/{id}")
    public ResponseEntity<InventoryResponse> getInventoryById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                inventoryService.getInventoryById(id)
        );
    }

    @GetMapping("/sku/{sku}")
    public ResponseEntity<InventoryResponse> getInventoryBySku(
            @PathVariable String sku) {

        return ResponseEntity.ok(
                inventoryService.getInventoryBySku(sku)
        );
    }

    @GetMapping
    public ResponseEntity<Page<InventoryResponse>> getAllInventory(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size,

            @RequestParam(defaultValue = "id") String sortBy) {

        return ResponseEntity.ok(

                inventoryService.getAllInventory(
                        page,
                        size,
                        sortBy
                )
        );
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<Page<InventoryResponse>> getInventoryByStatus(

            @PathVariable InventoryStatus status,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size,

            @RequestParam(defaultValue = "id") String sortBy) {

        return ResponseEntity.ok(

                inventoryService.getInventoryByStatus(
                        status,
                        page,
                        size,
                        sortBy
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<InventoryResponse> updateInventory(

            @PathVariable Long id,

            @Valid @RequestBody InventoryRequest request) {

        return ResponseEntity.ok(

                inventoryService.updateInventory(
                        id,
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventory(
            @PathVariable Long id) {

        inventoryService.deleteInventory(id);

        return ResponseEntity.noContent().build();
    }



    @GetMapping("/product/{productId}")
    public ResponseEntity<InventoryResponse> getInventoryByProductId(
            @PathVariable Long productId) {

        return ResponseEntity.ok(
                inventoryService.getInventoryByProductId(productId));
    }

}