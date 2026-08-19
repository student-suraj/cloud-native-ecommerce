package com.ecommerce.inventory.mapper;

import com.ecommerce.inventory.dto.request.InventoryRequest;
import com.ecommerce.inventory.dto.response.InventoryResponse;
import com.ecommerce.inventory.entity.Inventory;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-30T00:23:30+0530",
    comments = "version: 1.6.3, compiler: javac, environment: Java 21.0.12 (Oracle Corporation)"
)
@Component
public class InventoryMapperImpl implements InventoryMapper {

    @Override
    public Inventory toEntity(InventoryRequest request) {
        if ( request == null ) {
            return null;
        }

        Inventory.InventoryBuilder inventory = Inventory.builder();

        inventory.sku( request.getSku() );
        inventory.productId( request.getProductId() );
        inventory.productName( request.getProductName() );
        inventory.warehouseCode( request.getWarehouseCode() );
        inventory.warehouseZone( request.getWarehouseZone() );
        inventory.quantityAvailable( request.getQuantityAvailable() );
        inventory.reservedQuantity( request.getReservedQuantity() );
        inventory.reorderLevel( request.getReorderLevel() );
        inventory.maximumStockLevel( request.getMaximumStockLevel() );
        inventory.unitPrice( request.getUnitPrice() );
        inventory.currency( request.getCurrency() );
        inventory.status( request.getStatus() );
        inventory.supplierName( request.getSupplierName() );
        inventory.supplierCode( request.getSupplierCode() );
        inventory.remarks( request.getRemarks() );

        return inventory.build();
    }

    @Override
    public InventoryResponse toResponse(Inventory inventory) {
        if ( inventory == null ) {
            return null;
        }

        InventoryResponse.InventoryResponseBuilder inventoryResponse = InventoryResponse.builder();

        inventoryResponse.id( inventory.getId() );
        inventoryResponse.productId( inventory.getProductId() );
        inventoryResponse.sku( inventory.getSku() );
        inventoryResponse.productName( inventory.getProductName() );
        inventoryResponse.warehouseCode( inventory.getWarehouseCode() );
        inventoryResponse.warehouseZone( inventory.getWarehouseZone() );
        inventoryResponse.supplierCode( inventory.getSupplierCode() );
        inventoryResponse.supplierName( inventory.getSupplierName() );
        inventoryResponse.quantityAvailable( inventory.getQuantityAvailable() );
        inventoryResponse.reservedQuantity( inventory.getReservedQuantity() );
        inventoryResponse.reorderLevel( inventory.getReorderLevel() );
        inventoryResponse.maximumStockLevel( inventory.getMaximumStockLevel() );
        inventoryResponse.unitPrice( inventory.getUnitPrice() );
        inventoryResponse.currency( inventory.getCurrency() );
        inventoryResponse.status( inventory.getStatus() );
        inventoryResponse.remarks( inventory.getRemarks() );
        inventoryResponse.createdAt( inventory.getCreatedAt() );
        inventoryResponse.updatedAt( inventory.getUpdatedAt() );

        return inventoryResponse.build();
    }

    @Override
    public void updateInventoryFromRequest(InventoryRequest request, Inventory inventory) {
        if ( request == null ) {
            return;
        }

        inventory.setSku( request.getSku() );
        inventory.setProductId( request.getProductId() );
        inventory.setProductName( request.getProductName() );
        inventory.setWarehouseCode( request.getWarehouseCode() );
        inventory.setWarehouseZone( request.getWarehouseZone() );
        inventory.setQuantityAvailable( request.getQuantityAvailable() );
        inventory.setReservedQuantity( request.getReservedQuantity() );
        inventory.setReorderLevel( request.getReorderLevel() );
        inventory.setMaximumStockLevel( request.getMaximumStockLevel() );
        inventory.setUnitPrice( request.getUnitPrice() );
        inventory.setCurrency( request.getCurrency() );
        inventory.setStatus( request.getStatus() );
        inventory.setSupplierName( request.getSupplierName() );
        inventory.setSupplierCode( request.getSupplierCode() );
        inventory.setRemarks( request.getRemarks() );
    }
}
