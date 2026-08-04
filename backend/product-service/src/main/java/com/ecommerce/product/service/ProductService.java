package com.ecommerce.product.service;
import com.ecommerce.product.dto.response.ProductWithInventoryResponse;
import com.ecommerce.product.dto.request.ProductRequest;
import com.ecommerce.product.dto.response.ProductResponse;
import com.ecommerce.product.dto.response.ProductWithInventoryResponse;
import com.ecommerce.product.enums.ProductCategory;
import com.ecommerce.product.enums.ProductStatus;
import org.springframework.data.domain.Page;

public interface ProductService {

    ProductResponse createProduct(ProductRequest request);

    ProductResponse updateProduct(Long id, ProductRequest request);

    ProductResponse getProductById(Long id);

    ProductResponse getProductBySku(String sku);

    Page<ProductResponse> getAllProducts(
            int page,
            int size,
            String sortBy
    );

    Page<ProductResponse> getProductsByCategory(
            ProductCategory category,
            int page,
            int size,
            String sortBy
    );

    Page<ProductResponse> getProductsByBrand(
            String brand,
            int page,
            int size,
            String sortBy
    );

    Page<ProductResponse> getProductsByStatus(
            ProductStatus status,
            int page,
            int size,
            String sortBy
    );

    void deleteProduct(Long id);

    ProductWithInventoryResponse
    getProductWithInventory(Long id);


}