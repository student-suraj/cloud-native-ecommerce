package com.ecommerce.product.mapper;

import com.ecommerce.product.dto.request.ProductRequest;
import com.ecommerce.product.dto.response.ProductResponse;
import com.ecommerce.product.entity.Product;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-01T15:03:15+0530",
    comments = "version: 1.6.3, compiler: javac, environment: Java 21.0.12 (Oracle Corporation)"
)
@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public Product toEntity(ProductRequest request) {
        if ( request == null ) {
            return null;
        }

        Product.ProductBuilder product = Product.builder();

        product.sku( request.getSku() );
        product.name( request.getName() );
        product.brand( request.getBrand() );
        product.category( request.getCategory() );
        product.description( request.getDescription() );
        product.price( request.getPrice() );
        product.currency( request.getCurrency() );
        product.weight( request.getWeight() );
        product.color( request.getColor() );
        product.imageUrl( request.getImageUrl() );
        product.status( request.getStatus() );

        return product.build();
    }

    @Override
    public ProductResponse toResponse(Product product) {
        if ( product == null ) {
            return null;
        }

        ProductResponse.ProductResponseBuilder productResponse = ProductResponse.builder();

        productResponse.id( product.getId() );
        productResponse.sku( product.getSku() );
        productResponse.name( product.getName() );
        productResponse.brand( product.getBrand() );
        productResponse.category( product.getCategory() );
        productResponse.description( product.getDescription() );
        productResponse.price( product.getPrice() );
        productResponse.currency( product.getCurrency() );
        productResponse.weight( product.getWeight() );
        productResponse.color( product.getColor() );
        productResponse.imageUrl( product.getImageUrl() );
        productResponse.status( product.getStatus() );
        productResponse.createdAt( product.getCreatedAt() );
        productResponse.updatedAt( product.getUpdatedAt() );

        return productResponse.build();
    }

    @Override
    public void updateProductFromRequest(ProductRequest request, Product product) {
        if ( request == null ) {
            return;
        }

        product.setSku( request.getSku() );
        product.setName( request.getName() );
        product.setBrand( request.getBrand() );
        product.setCategory( request.getCategory() );
        product.setDescription( request.getDescription() );
        product.setPrice( request.getPrice() );
        product.setCurrency( request.getCurrency() );
        product.setWeight( request.getWeight() );
        product.setColor( request.getColor() );
        product.setImageUrl( request.getImageUrl() );
        product.setStatus( request.getStatus() );
    }
}
