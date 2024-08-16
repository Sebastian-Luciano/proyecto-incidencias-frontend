import api from './api';

export const updateUser = async (userId, userData) => {
    try {
      const response = await api.put(`/users/${userId}`, userData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.user;
    } catch (error) {
      console.error('Error al actualizar usuario:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Error al actualizar usuario');
    }
  };

export const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    const response = await api.put(`/users/${userId}/update-password`, {
      currentPassword,
      newPassword
    });
    return response.data;
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    throw new Error(error.response?.data?.message || 'Error al cambiar contraseña');
  }
};