import api from './api';

export const sendNotification = async (message, userId, incidenceId, type = 'email') => {
  try {
    const notificationData = {
      message,
      userId,
      incidenceId,
      type,
      status: 'pending',
      read: false
    };
    console.log('Enviando notificación:', notificationData);
    const response = await api.post('/notifications', notificationData);
    console.log('Respuesta del servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al enviar notificación:', error.response?.data || error.message);
    throw error;
  }
};

export const getNotifications = async (userId) => {
  try {
    const response = await api.get(`/notifications/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener notificaciones:', error);
    throw error;
  }
};