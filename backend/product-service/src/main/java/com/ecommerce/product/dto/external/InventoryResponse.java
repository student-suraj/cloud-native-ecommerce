package com.ecommerce.product.dto.external;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class InventoryResponse {

    private Long id;

    private Long productId;

    private String sku;

    private String productName;

    private String warehouseCode;

    private String warehouseZone;

    private String supplierCode;

    private String supplierName;

    private Integer quantityAvailable;

    private Integer reservedQuantity;

    private Integer reorderLevel;

    private Integer maximumStockLevel;

    private BigDecimal unitPrice;

    private String currency;

    private String status;

    private String remarks;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}