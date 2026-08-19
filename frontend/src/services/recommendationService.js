import api from './api'

export const getRecommendationsByProduct = async (
    productId,
    page = 0,
    size = 10,
    sortBy = 'priority'
) => {

    const response = await api.get(
        `api/v1/recommendations/product/${productId}`,
        {
            params: {
                page,
                size,
                sortBy,
            },
        }
    )

    return response.data
}


export const getAllRecommendations = async (
    page = 0,
    size = 10,
    sortBy = 'priority'
) => {

    const response = await api.get(
        'api/v1/recommendations',
        {
            params: {
                page,
                size,
                sortBy,
            },
        }
    )

    return response.data
}


export const getRecommendationById = async (id) => {

    const response = await api.get(
        `api/v1/recommendations/${id}`
    )

    return response.data
}


export const createRecommendation = async (data) => {

    const response = await api.post(
        'api/v1/recommendations',
        data
    )

    return response.data
}


export const updateRecommendation = async (
    id,
    data
) => {

    const response = await api.put(
        `api/v1/recommendations/${id}`,
        data
    )

    return response.data
}


export const deleteRecommendation = async (id) => {

    const response = await api.delete(
        `api/v1/recommendations/${id}`
    )

    return response.data
}


export const getRecommendationsByType = async (
    type,
    page = 0,
    size = 10,
    sortBy = 'priority'
) => {

    const response = await api.get(
        `api/v1/recommendations/type/${type}`,
        {
            params: {
                page,
                size,
                sortBy,
            },
        }
    )

    return response.data
}