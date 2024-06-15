import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "multipart/form-data",
    }
})

const config = {
    headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }
}

// Auth
export const registerUserApi = (data) => Api.post('api/user/register', data)
export const loginUserApi = (data) => Api.post('/api/user/login', data)

// Products
export const createProductApi = (data) => Api.post('/api/product/createProduct', data, config)
export const getAllProductsApi = () => Api.get('/api/product/getProducts')
export const getSingleProductApi = (id) => Api.get(`/api/product/getProduct/${id}`)
export const updateProductApi = (id, formData) => Api.put(`/api/product/updateProduct/${id}`, formData, config)
export const deleteProductApi = (id) => Api.delete(`/api/product/deleteProduct/${id}`, config)

