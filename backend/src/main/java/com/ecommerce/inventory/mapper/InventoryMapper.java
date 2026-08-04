package com.ecommerce.inventory.mapper;

import com.ecommerce.inventory.dto.request.InventoryRequest;
import com.ecommerce.inventory.dto.response.InventoryResponse;
import com.ecommerce.inventory.entity.Inventory;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface InventoryMapper {

    Inventory toEntity(InventoryRequest request);

    InventoryResponse toResponse(Inventory inventory);

    void updateInventoryFromRequest(
            InventoryRequest request,
            @MappingTarget Inventory inventory
    );

}