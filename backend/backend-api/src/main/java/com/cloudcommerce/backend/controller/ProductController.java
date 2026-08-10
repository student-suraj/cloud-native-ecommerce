package com.cloudcommerce.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.cloudcommerce.backend.entity.Product;
import com.cloudcommerce.backend.service.ProductService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create a new product", description = "Creates and stores a new product in the database")
    @ApiResponse(responseCode = "201", description = "Product created successfully")
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    @GetMapping
    @Operation(summary = "Get all products", description = "Retrieves all products from the database")
    @ApiResponse(responseCode = "200", description = "Products retrieved successfully")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get product by ID", description = "Retrieves a specific product using its ID")
    @ApiResponse(responseCode = "200", description = "Product retrieved successfully")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a product", description = "Updates an existing product using its ID")
    @ApiResponse(responseCode = "200", description = "Product updated successfully")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {

        return productService.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a product", description = "Deletes an existing product using its ID")
    @ApiResponse(responseCode = "200", description = "Product deleted successfully")
    public String deleteProduct(@PathVariable Long id) {

        productService.deleteProduct(id);

        return "Product Deleted Successfully";
    }
}