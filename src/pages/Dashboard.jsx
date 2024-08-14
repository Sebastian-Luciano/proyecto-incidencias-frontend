/* import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useIncidences } from '../hooks/useIncidences';
import { useLocation } from 'wouter';
import IncidenceForm from '../components/IncidenceForm';
import IncidenceList from '../components/IncidenceList';
import IncidenceFilter from '../components/IncidenceFilter';
import Notification from '../components/Notification';

export default function Dashboard() {
  const { user, logoutUser } = useAuth();
  const { incidences, loading, error, addIncidence, updateIncidenceById, removeIncidence, refreshIncidences } = useIncidences();
  const [filter, setFilter] = useState('all');
  const [notification, setNotification] = useState(null);
  const [, setLocation] = useLocation();


  useEffect(() => {
    if (!user) {
      setLocation('/login');
    } else {
      refreshIncidences();
    }
  }, [user, setLocation, refreshIncidences]);

  useEffect(() => {
    if (error === 'Sesión expirada. Por favor, inicie sesión nuevamente.') {
      setLocation('/login');
    }
  }, [error, setLocation]);

  const filteredIncidences = incidences.filter(inc => {
    if (filter === 'all') return true;
    return inc.status === filter;
  });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateIncidence = async (incidenceData) => {
    try {
      await addIncidence(incidenceData);
      showNotification('Incidencia creada con éxito');
    } catch (error) {
      showNotification('Error al crear la incidencia', 'error');
    }
  };

  const handleUpdateIncidence = async (updatedIncidence) => {
    try {
      await updateIncidenceById(updatedIncidence.id, updatedIncidence);
      showNotification('Incidencia actualizada con éxito');
    } catch (error) {
      showNotification('Error al actualizar la incidencia', 'error');
    }
  };

  const handleDeleteIncidence = async (id) => {
    try {
      await removeIncidence(id);
      showNotification('Incidencia eliminada con éxito');
    } catch (error) {
      showNotification('Error al eliminar la incidencia', 'error');
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {notification && <Notification message={notification.message} type={notification.type} />}
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p className="mb-4">Bienvenido, {user.name}!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Crear Nueva Incidencia</h3>
          <IncidenceForm onIncidenceCreated={handleCreateIncidence} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Lista de Incidencias</h3>
          <IncidenceFilter onFilterChange={setFilter} />
          <IncidenceList
            incidences={filteredIncidences}
            onUpdateIncidence={handleUpdateIncidence}
            onDeleteIncidence={handleDeleteIncidence}
          />
        </div>
      </div>
    </div>
  )
}
 */