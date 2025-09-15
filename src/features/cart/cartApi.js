

import API from '../../utils/axiosClient'


export const  getUserCartApi = id=> API.get(`/cart/user/${id}`)