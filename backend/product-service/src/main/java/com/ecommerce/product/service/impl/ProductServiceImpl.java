package com.ecommerce.product.service.impl;

import com.ecommerce.product.dto.external.InventoryResponse;
import com.ecommerce.product.dto.request.ProductRequest;
import com.ecommerce.product.dto.response.ProductResponse;
import com.ecommerce.product.dto.response.ProductWithInventoryResponse;
import com.ecommerce.product.entity.Product;
import com.ecommerce.product.enums.ProductCategory;
import com.ecommerce.product.enums.ProductStatus;
import com.ecommerce.product.exception.DuplicateProductException;
import com.ecommerce.product.exception.ProductNotFoundException;
import com.ecommerce.product.mapper.ProductMapper;
import com.ecommerce.product.repository.ProductRepository;
import com.ecommerce.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import com.ecommerce.product.client.InventoryClient;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.web.server.ResponseStatusException;
import io.github.resilience4j.retry.annotation.Retry;
import io.github.resilience4j.bulkhead.annotation.Bulkhead;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repository;
    private final ProductMapper mapper;
    private final InventoryClient inventoryClient;
    //  private final InventoryClient inventoryClient;

    @Override
    public ProductResponse createProduct(ProductRequest request) {

        if (repository.existsBySku(request.getSku())) {

            throw new DuplicateProductException(
                    "SKU already exists : " + request.getSku()
            );
        }

        Product product = mapper.toEntity(request);

        Product saved = repository.save(product);

        return mapper.toResponse(saved);
    }

    @Override
    public ProductResponse updateProduct(
            Long id,
            ProductRequest request) {

        Product product = repository.findById(id)
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Product not found with id : " + id
                        ));

        if (!product.getSku().equals(request.getSku())
                && repository.existsBySku(request.getSku())) {

            throw new DuplicateProductException(
                    "SKU already exists : " + request.getSku()
            );
        }

        mapper.updateProductFromRequest(request, product);

        Product updated = repository.save(product);

        return mapper.toResponse(updated);
    }

    @Override
    public ProductResponse getProductById(Long id) {

        Product product = repository.findById(id)
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Product not found with id : " + id
                        ));

        return mapper.toResponse(product);
    }

    @Override
    public ProductResponse getProductBySku(String sku) {

        Product product = repository.findBySku(sku)
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Product not found with SKU : " + sku
                        ));

        return mapper.toResponse(product);
    }

    @Override
    public Page<ProductResponse> getAllProducts(
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
    public Page<ProductResponse> getProductsByCategory(
            ProductCategory category,
            int page,
            int size,
            String sortBy) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy).ascending()
        );

        return repository.findByCategory(category, pageable)
                .map(mapper::toResponse);
    }

    @Override
    public Page<ProductResponse> getProductsByBrand(
            String brand,
            int page,
            int size,
            String sortBy) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy).ascending()
        );

        return repository.findByBrandIgnoreCase(brand, pageable)
                .map(mapper::toResponse);
    }

    @Override
    public Page<ProductResponse> getProductsByStatus(
            ProductStatus status,
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
    public void deleteProduct(Long id) {

        Product product = repository.findById(id)
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Product not found with id : " + id
                        ));

        repository.delete(product);
    }




   /*


    @Override
    public ProductWithInventoryResponse getProductWithInventory(Long productId) {

        Product product = repository.findById(productId)
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Product not found with id : " + productId));

        ProductResponse productResponse =
                mapper.toResponse(product);

        InventoryResponse inventoryResponse =
                inventoryClient.getInventoryByProductId(productId);

        return ProductWithInventoryResponse.builder()
                .product(productResponse)
                .inventory(inventoryResponse)
                .build();
    }

}

    */
   @Override
   @Retry(
           name = "inventoryService",
           fallbackMethod = "inventoryFallback"
   )
    @CircuitBreaker(
            name = "inventoryService",
            fallbackMethod = "inventoryFallback"
    )
   @Bulkhead(
           name = "inventoryService",
           type = Bulkhead.Type.SEMAPHORE,
           fallbackMethod = "inventoryFallback"
   )

    public ProductWithInventoryResponse getProductWithInventory(Long productId) {

        Product product = repository.findById(productId)
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Product not found with id : " + productId
                        ));

        ProductResponse productResponse = mapper.toResponse(product);

        InventoryResponse inventoryResponse =
                inventoryClient.getInventoryByProductId(productId);

        return ProductWithInventoryResponse.builder()
                .product(productResponse)
                .inventory(inventoryResponse)
                .build();
    }




    private ProductWithInventoryResponse inventoryFallback(
            Long productId,
            Exception exception) {

        Product product = repository.findById(productId)
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Product not found with id : " + productId));

        ProductResponse productResponse =
                mapper.toResponse(product);

        InventoryResponse inventoryResponse =
                new InventoryResponse();

        inventoryResponse.setProductId(productId);
        inventoryResponse.setSku(product.getSku());
        inventoryResponse.setProductName(product.getName());

        inventoryResponse.setQuantityAvailable(0);

        inventoryResponse.setRemarks(
                "Inventory Service is temporarily unavailable.");

        return ProductWithInventoryResponse.builder()
                .product(productResponse)
                .inventory(inventoryResponse)
                .build();
    }


}