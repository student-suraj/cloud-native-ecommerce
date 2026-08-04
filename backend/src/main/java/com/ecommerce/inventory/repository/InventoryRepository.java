package com.ecommerce.inventory.repository;

import com.ecommerce.inventory.entity.Inventory;
import com.ecommerce.inventory.enums.InventoryStatus;
import com.ecommerce.inventory.enums.WarehouseZone;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    Optional<Inventory> findBySku(String sku);

    Optional<Inventory> findByProductId(Long productId);

    //List<Inventory> findByStatus(InventoryStatus status);
    Page<Inventory> findByStatus(
            InventoryStatus status,
            Pageable pageable
    );

    List<Inventory> findByWarehouseCode(String warehouseCode);

    List<Inventory> findBySupplierCode(String supplierCode);

    List<Inventory> findByWarehouseZone( WarehouseZone warehouseZone);

    Page<Inventory> findAll(Pageable pageable);

    boolean existsBySku(String sku);

    boolean existsByProductId(Long productId);



}