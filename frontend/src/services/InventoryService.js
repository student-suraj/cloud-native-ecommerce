import api from './api'


export const getInventoryByProductId = async (productId) => {

    const response = await api.get(
        `/api/v1/inventory/product/${productId}`
    )

    return response.data
}


export const updateInventory = async (
    inventoryId,
    inventoryData
) => {

    const response = await api.put(
        `/api/v1/inventory/${inventoryId}`,
        inventoryData
    )

    return response.data
}