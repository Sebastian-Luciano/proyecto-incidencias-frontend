import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useIncidences } from '../hooks/useIncidences';
import IncidenceForm from '../components/IncidenceForm';
import IncidenceFilter from '../components/IncidenceFilter';
import Notification from '../components/Notification';
import IncidenceItem from '../components/IncidenceItem';

export default function UserDashboard() {
  const { user } = useAuth();
  const { incidences, loading, error, addIncidence, updateIncidenceById, removeIncidence, refreshIncidences } = useIncidences();
  const [filter, setFilter] = useState('all');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    refreshIncidences(user.id);
  }, [user.id, refreshIncidences]);

  const filteredIncidences = incidences.filter(inc => {
    if (filter === 'all') return true;
    return inc.status === filter;
  });
/* 
  const handleCreateIncidence = async (incidenceData) => {
    try {
      await addIncidence({ ...incidenceData, UserId: user.id });
      setNotification({ type: 'success', message: 'Incidencia creada con éxito' });
      refreshIncidences(user.id);
    } catch (error) {
      setNotification({ type: 'error', message: 'Error al crear la incidencia' });
    }
  };  */

  const handleCreateIncidence = async (incidenceData) => {
    try {
      await addIncidence({ ...incidenceData, UserId: user.id });
      setNotification({ type: 'success', message: 'Incidencia creada con éxito' });
      refreshIncidences(user.id);
    } catch (error) {
      setNotification({ type: 'error', message: 'Error al crear la incidencia' });
    }
  };


  const handleUpdateIncidence = async (updatedIncidence) => {
    try {
      await updateIncidenceById(updatedIncidence.id, updatedIncidence);
      setNotification({ type: 'success', message: 'Incidencia actualizada con éxito' });
      refreshIncidences(user.id);
    } catch (error) {
      setNotification({ type: 'error', message: 'Error al actualizar la incidencia' });
    }
  };

  const handleDeleteIncidence = async (id) => {
    try {
      await removeIncidence(id);
      setNotification({ type: 'success', message: 'Incidencia eliminada con éxito' });
      refreshIncidences(user.id);
    } catch (error) {
      setNotification({ type: 'error', message: 'Error al eliminar la incidencia' });
    }
  };

  const clearNotification = () => {
    setNotification(null);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {notification && (
        <Notification 
        message={notification.message} 
        type={notification.type} 
        onClose={clearNotification}
        />
        )}
      <h2 className="text-2xl font-bold mb-4">Mis Incidencias</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Crear Nueva Incidencia</h3>
          <IncidenceForm onIncidenceCreated={handleCreateIncidence} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Lista de Incidencias</h3>
          <IncidenceFilter onFilterChange={setFilter} />
          {filteredIncidences.map(incidence => (
            <IncidenceItem
              key={incidence.id}
              incidence={incidence}
              onEdit={handleUpdateIncidence}
              onDelete={handleDeleteIncidence}
              isAdmin={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}