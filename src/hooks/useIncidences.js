import { useState, useEffect, useCallback } from 'react';
import { getIncidences, createIncidence, updateIncidence, deleteIncidence } from '../services/incidenceService';
import { useAuth } from './useAuth';

export const useIncidences = () => {
  const [incidences, setIncidences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logoutUser } = useAuth();

  const fetchIncidences = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getIncidences();
      setIncidences(data);
      setError(null);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Sesión expirada. Por favor, inicie sesión nuevamente.');
      } else {
        setError('Error al cargar las incidencias');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIncidences();
  }, []);

  const addIncidence = async (incidenceData) => {
    try {
      const newIncidence = await createIncidence(incidenceData);
      setIncidences([newIncidence, ...incidences]);
      return newIncidence;
    } catch (err) {
      setError('Error al crear la incidencia');
      throw err;
    }
  };

  const updateIncidenceById = async (id, updatedData) => {
    try {
      const updatedIncidence = await updateIncidence(id, updatedData);
      setIncidences(incidences.map(inc => inc.id === id ? updatedIncidence : inc));
      return updatedIncidence;
    } catch (err) {
      setError('Error al actualizar la incidencia');
      throw err;
    }
  };

  const removeIncidence = async (id) => {
    try {
      await deleteIncidence(id);
      setIncidences(incidences.filter(inc => inc.id !== id));
    } catch (err) {
      setError('Error al eliminar la incidencia');
      throw err;
    }
  };

  return {
    incidences,
    loading,
    error,
    addIncidence,
    updateIncidenceById,
    removeIncidence,
    refreshIncidences: fetchIncidences
  };
};