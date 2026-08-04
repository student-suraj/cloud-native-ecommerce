package com.ecommerce.product.dto.response;

import com.ecommerce.product.dto.external.InventoryResponse;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductWithInventoryResponse {

    private ProductResponse product;

    private InventoryResponse inventory;

}