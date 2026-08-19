package com.ecommerce.product.dto.request;

import com.ecommerce.product.enums.ProductCategory;
import com.ecommerce.product.enums.ProductStatus;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRequest {

    @NotBlank(message = "SKU is required")
    @Size(max = 100)
    private String sku;

    @NotBlank(message = "Product name is required")
    @Size(max = 200)
    private String name;

    @NotBlank(message = "Brand is required")
    @Size(max = 100)
    private String brand;

    @NotNull(message = "Category is required")
    private ProductCategory category;

    @Size(max = 1000)
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    private BigDecimal price;

    @NotBlank(message = "Currency is required")
    @Size(max = 10)
    private String currency;

    @NotNull(message = "Weight is required")
    @Positive(message = "Weight must be greater than 0")
    private Double weight;

    @NotBlank(message = "Color is required")
    @Size(max = 50)
    private String color;

    @NotBlank(message = "Image URL is required")
    @Size(max = 500)
    private String imageUrl;

    @NotNull(message = "Status is required")
    private ProductStatus status;

}