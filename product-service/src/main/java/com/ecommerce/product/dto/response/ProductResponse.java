package com.ecommerce.product.dto.response;

import com.ecommerce.product.enums.ProductCategory;
import com.ecommerce.product.enums.ProductStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {

    private Long id;

    private String sku;

    private String name;

    private String brand;

    private ProductCategory category;

    private String description;

    private BigDecimal price;

    private String currency;

    private Double weight;

    private String color;

    private String imageUrl;

    private ProductStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}