package com.ecommerce.product.repository;

import com.ecommerce.product.entity.Product;
import com.ecommerce.product.enums.ProductCategory;
import com.ecommerce.product.enums.ProductStatus;
//import com.netflix.appinfo.ApplicationInfoManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Find by SKU
    Optional<Product> findBySku(String sku);

    // Find by Product Name
    Optional<Product> findByName(String name);

    // Category Filter
    Page<Product> findByCategory(
            ProductCategory category,
            Pageable pageable
    );

    Page<Product> findByBrandIgnoreCase(
            String brand,
            Pageable pageable
    );

    // Brand Filter
    Page<Product> findByBrand(
            String brand,
            Pageable pageable
    );

    // Status Filter
    Page<Product> findByStatus(
            ProductStatus status,
            Pageable pageable
    );

    // Duplicate Checks
    boolean existsBySku(String sku);

    boolean existsByName(String name);

}
