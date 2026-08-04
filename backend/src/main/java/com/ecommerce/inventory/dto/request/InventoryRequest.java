package com.ecommerce.inventory.dto.request;

import com.ecommerce.inventory.enums.InventoryStatus;
import com.ecommerce.inventory.enums.WarehouseZone;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryRequest {

    @NotNull(message = "Product ID is required")
    private Long productId;

    @NotBlank(message = "SKU is required")
    @Size(max = 100)
    private String sku;

    @NotBlank(message = "Product name is required")
    @Size(max = 200)
    private String productName;

    @NotBlank(message = "Warehouse code is required")
    private String warehouseCode;

    @NotNull(message = "Warehouse zone is required")
    private WarehouseZone warehouseZone;

    @NotBlank(message = "Supplier code is required")
    private String supplierCode;

    @NotBlank(message = "Supplier name is required")
    private String supplierName;

    @NotNull(message = "Available quantity is required")
    @PositiveOrZero(message = "Available quantity cannot be negative")
    private Integer quantityAvailable;

    @NotNull(message = "Reserved quantity is required")
    @PositiveOrZero(message = "Reserved quantity cannot be negative")
    private Integer reservedQuantity;

    @NotNull(message = "Reorder level is required")
    @PositiveOrZero
    private Integer reorderLevel;

    @NotNull(message = "Maximum stock level is required")
    @Positive
    private Integer maximumStockLevel;

    @NotNull(message = "Unit price is required")
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal unitPrice;

    @NotBlank(message = "Currency is required")
    private String currency;

    @NotNull(message = "Inventory status is required")
    private InventoryStatus status;

    @Size(max = 500)
    private String remarks;

}