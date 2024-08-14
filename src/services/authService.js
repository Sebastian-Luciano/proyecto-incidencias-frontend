import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/users/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('user', JSON.stringify({ token, ...user }));
    return { token, ...user };  // Devuelve tanto el token como el usuario
  } catch (error) {
    console.error('Error en login:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error en el inicio de sesión');
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error en registro:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error en el registro');
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/users/${userId}`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw new Error(error.response?.data?.message || 'Error al actualizar usuario');
  }
};

export const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    const response = await api.put(`/users/${userId}/change-password`, {
      currentPassword,
      newPassword
    });
    return response.data;
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    throw new Error(error.response?.data?.message || 'Error al cambiar contraseña');
  }
};
