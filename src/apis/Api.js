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

// Category
export const createCategoryApi = (data) => Api.post('/api/category/createCategory', data, config)
export const getAllCategoriesApi = () => Api.get('/api/category/getCategories')
// export const getSingleCategoryApi = (id) => Api.get(`/api/category/getCategory/${id}`)
export const deleteCategoryApi = (id) => Api.delete(`/api/category/deleteCategory/${id}`, config)

