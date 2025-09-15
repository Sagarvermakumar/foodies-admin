
import API from '../../utils/axiosClient'

export const pushNotificationApi = (data)=> API.post('/notification/push',data);

export const sendOrderNotificationApi = (id,data)=> API.post(`/notification/order/${id}`,data)