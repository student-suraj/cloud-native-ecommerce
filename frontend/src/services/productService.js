import api from './api'

export const getProducts = async ({
                                      page = 0,
                                      size = 10,
                                      sortBy = 'id',
                                  } = {}) => {
    const response = await api.get('/api/v1/products', {
        params: {
            page,
            size,
            sortBy,
        },
    })

    return response.data
}


export const createProduct = async (productData) => {
    const response = await api.post(
        '/api/v1/products',
        productData
    )

    return response.data
}


export const updateProduct = async (id, productData) => {
    const response = await api.put(
        `/api/v1/products/${id}`,
        productData
    )

    return response.data
}


export const deleteProduct = async (id) => {
    const response = await api.delete(
        `/api/v1/products/${id}`
    )

    return response.data
}


export const getProductDetails = async (productId) => {
    const response = await api.get(
        `/api/v1/products/${productId}/details`
    )

    return response.data
}