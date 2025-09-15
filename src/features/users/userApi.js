import API from "../../utils/axiosClient";


// update profile
export const updateProfileApi = (data) => API.patch("/user/update-profile", data);  


// update avatar
export const updateAvatarApi = (avatar) => {
  return API.patch("/user/update-profile", avatar, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// get all users
export const getAllUsersApi = (query,page,limit,role,sortBy,sortOrder) =>
  API.get(`/user/all`, {
    params:  {
      query,
      page,
      limit,
      role,
      sortBy,
      sortOrder
    }
  });

// get user by ID
export const getUserByIdApi = (id) => API.get(`/user/details/${id}`);

// block user
export const blockUserApi = (id) => API.patch(`/user/${id}/block`);

// unblock user
export const unblockUserApi = (id) => API.patch(`/user/${id}/unblock`); 

// update user role
export const updateUserRoleApi = (id, data) => API.patch(`/user/${id}/role`, data); 

// delete user profile
export const deleteUserProfileApi = (id) => API.delete(`/user/${id}/delete-profile`);

// get all delivery persons
export const getDeliveryPersonsApi = () => API.get(`/user/all/delivery-person`);