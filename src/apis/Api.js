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
export const getAllUsersApi = () => Api.get('/api/user/getUsers')
export const getSingleUserApi = (id) => Api.get(`/api/user/getSingleUser/${id}`)
export const updateUserApi = (id, formData) => Api.put(`/api/user/updateUser/${id}`, formData, config)
export const deleteUserApi = (id) => Api.delete(`/api/user/deleteUser/${id}`, config)

// Products
export const createProductApi = (data) => Api.post('/api/product/createProduct', data, config)
export const getAllProductsApi = () => Api.get('/api/product/getProducts')
export const getSingleProductApi = (id) => Api.get(`/api/product/getProduct/${id}`)
export const updateProductApi = (id, formData) => Api.put(`/api/product/updateProduct/${id}`, formData, config)
export const deleteProductApi = (id) => Api.delete(`/api/product/deleteProduct/${id}`, config)

// Category
export const createCategoryApi = (data) => Api.post('/api/category/createCategory', data, config)
export const getAllCategoriesApi = () => Api.get('/api/category/getCategories')
export const deleteCategoryApi = (id) => Api.delete(`/api/category/deleteCategory/${id}`, config)

// Favorite
export const addFavoriteApi = (data) => Api.post('/api/favorite/addFavorite', data, config)
export const getFavoritesByUserIDApi = (id) => Api.get(`/api/favorite/getFavoritesByUserID/${id}`, config)


// Shopping Bag
export const addToShoppingBagApi = (data) => Api.post('/api/shoppingBag/addToShoppingBag', data, config)
export const getShoppingBagByUserIDApi = (id) => Api.get(`/api/shoppingBag/getShoppingBagByUserID/${id}`, config)
export const getSingleShoppingBagApi = (id) => Api.get(`/api/shoppingBag/getSingleShoppingBag/${id}`)
export const updateShoppingBagApi = (id, formData) => Api.put(`/api/shoppingBag/updateShoppingBag/${id}`, formData, config)
export const removeFromShoppingBagApi = (id) => Api.delete(`/api/shoppingBag/removeFromShoppingBag/${id}`, config)

// Shipping Info
export const createShippingInfoApi = (data) => Api.post('/api/shippingInfo/createShippingInfo', data, config)
export const getSingleShippingInfoApi = (id) => Api.get(`/api/shippingInfo/getSingleShippingInfo/${id}`)
export const updateShippingInfoApi = (id, formData) => Api.put(`/api/shippingInfo/updateShippingInfo/${id}`, formData, config)
