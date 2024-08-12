import api from './api';
import { sendNotification } from './notificationService';

export const getIncidences = async (userId = null) => {
  try {
    const params = userId ? { userId } : {};
    const response = await api.get('/incidences', { params });
    return response.data;
  } catch (error) {
    console.error('Error al obtener incidencias:', error);
    throw error;
  }
};

export const createIncidence = async (incidenceData) => {
  try {
    console.log('Datos de incidencia a enviar:', incidenceData);
    const response = await api.post('/incidences', incidenceData);
    console.log('Respuesta de creación de incidencia:', response.data);

    const newIncidenceId = response.data.id;
    if (!newIncidenceId) {
      console.error('No se recibió ID de incidencia en la respuesta');
      throw new Error('No se pudo obtener el ID de la incidencia');
    }

    await sendNotification(
      'Nueva incidencia creada',
      incidenceData.UserId,
      newIncidenceId,
      'email'
    );

    return response.data;
  } catch (error) {
    console.error('Error al crear incidencia:', error.response?.data || error.message);
    throw error;
  }
};

export const updateIncidence = async (id, updatedData) => {
  try {
    const response = await api.put(`/incidences/${id}`, updatedData);
    await sendNotification(
      `Incidencia ${id} actualizada`,
      response.data.UserId,
      id,
      'email'
    );
    return response.data;
  } catch (error) {
    console.error('Error al actualizar incidencia:', error);
    throw error;
  }
};

export const deleteIncidence = async (id) => {
  try {
    const response = await api.delete(`/incidences/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar incidencia:', error);
    throw error;
  }
};