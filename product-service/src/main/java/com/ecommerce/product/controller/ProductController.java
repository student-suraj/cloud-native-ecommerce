package com.ecommerce.product.controller;

import com.ecommerce.product.dto.request.ProductRequest;
import com.ecommerce.product.dto.response.ProductResponse;
import com.ecommerce.product.enums.ProductCategory;
import com.ecommerce.product.enums.ProductStatus;
import com.ecommerce.product.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ecommerce.product.dto.response.ProductWithInventoryResponse;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // ============================
    // Create Product
    // ============================
    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(
            @Valid @RequestBody ProductRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productService.createProduct(request));
    }

    // ============================
    // Update Product
    // ============================
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request) {

        return ResponseEntity.ok(
                productService.updateProduct(id, request)
        );
    }

    // ============================
    // Get Product By ID
    // ============================
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                productService.getProductById(id)
        );
    }

    // ============================
    // Get Product By SKU
    // ============================
    @GetMapping("/sku/{sku}")
    public ResponseEntity<ProductResponse> getProductBySku(
            @PathVariable String sku) {

        return ResponseEntity.ok(
                productService.getProductBySku(sku)
        );
    }

    // ============================
    // Get All Products
    // ============================
    @GetMapping
    public ResponseEntity<Page<ProductResponse>> getAllProducts(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size,

            @RequestParam(defaultValue = "id") String sortBy) {

        return ResponseEntity.ok(
                productService.getAllProducts(page, size, sortBy)
        );
    }

    // ============================
    // Get Products By Category
    // ============================
    @GetMapping("/category/{category}")
    public ResponseEntity<Page<ProductResponse>> getProductsByCategory(

            @PathVariable ProductCategory category,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size,

            @RequestParam(defaultValue = "id") String sortBy) {

        return ResponseEntity.ok(
                productService.getProductsByCategory(
                        category,
                        page,
                        size,
                        sortBy
                )
        );
    }

    // ============================
    // Get Products By Brand
    // ============================
    @GetMapping("/brand/{brand}")
    public ResponseEntity<Page<ProductResponse>> getProductsByBrand(

            @PathVariable String brand,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size,

            @RequestParam(defaultValue = "id") String sortBy) {

        return ResponseEntity.ok(
                productService.getProductsByBrand(
                        brand,
                        page,
                        size,
                        sortBy
                )
        );
    }

    // ============================
    // Get Products By Status
    // ============================
    @GetMapping("/status/{status}")
    public ResponseEntity<Page<ProductResponse>> getProductsByStatus(

            @PathVariable ProductStatus status,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size,

            @RequestParam(defaultValue = "id") String sortBy) {

        return ResponseEntity.ok(
                productService.getProductsByStatus(
                        status,
                        page,
                        size,
                        sortBy
                )
        );
    }

    // ============================
    // Delete Product
    // ============================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id) {

        productService.deleteProduct(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<ProductWithInventoryResponse> getProductWithInventory(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                productService.getProductWithInventory(id)
        );
    }
}