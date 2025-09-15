import API from '../../utils/axiosClient'

// get all  categories of item
export const getAllItemCategoriesApi = () => API.get('/category')

// create a new category of items
export const createItemCategoryApi = (data) =>
  API.post('/category/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

// update category details
export const updateCategoryApi = (id, data) =>
  API.patch(`/category/${id}`, data)

// delete category
export const deleteCategoryApi = (id) => API.delete(`/category/${id}`)

// get a single category
export const getItemCategoryApi = (id) => API.get(`/category/${id}`)
