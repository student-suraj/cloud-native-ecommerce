package com.ecommerce.inventory.entity;

import com.ecommerce.inventory.enums.InventoryStatus;
import com.ecommerce.inventory.enums.WarehouseZone;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "inventory",
        indexes = {

                @Index(name = "idx_inventory_sku", columnList = "sku"),

                @Index(name = "idx_inventory_product", columnList = "productId"),

                @Index(name = "idx_inventory_status", columnList = "status")

        }
)

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Inventory extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String sku;

    @Column(nullable = false)
    private Long productId;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private String warehouseCode;

    @Enumerated(EnumType.STRING)
    private WarehouseZone warehouseZone;

    @Column(nullable = false)
    private Integer quantityAvailable;

    @Column(nullable = false)
    private Integer reservedQuantity;

    @Column(nullable = false)
    private Integer reorderLevel;

    @Column(nullable = false)
    private Integer maximumStockLevel;

    @Column(nullable = false)
    private BigDecimal unitPrice;

    @Column(nullable = false)
    private String currency;

    @Enumerated(EnumType.STRING)
    private InventoryStatus status;

    @Column(nullable = false)
    private String supplierName;

    @Column(nullable = false)
    private String supplierCode;

    private String batchNumber;

    private LocalDate manufactureDate;

    private LocalDate expiryDate;

    @Column(length = 500)
    private String remarks;






}