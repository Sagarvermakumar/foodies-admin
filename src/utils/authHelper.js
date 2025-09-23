// utils/storage.js
export const saveUserRole = (role) => {
  if (role) {
    localStorage.setItem("user_role", role);
  }
};

export const getUserRole = () => {
  return localStorage.getItem("user_role");
};

export const removeUserRole = () => {
  localStorage.removeItem("user_role");
};
