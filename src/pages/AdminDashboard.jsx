import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useIncidences } from '../hooks/useIncidences';
import IncidenceItem from '../components/IncidenceItem';
import Notification from '../components/Notification';
import { FaSearch } from 'react-icons/fa';
import { updateIncidence, deleteIncidence } from '../services/incidenceService';


const AdminDashboard = () => {
  const { incidences, updateIncidenceById, loading, error, refreshIncidences } = useIncidences();
  const [columns, setColumns] = useState({
    pending: [],
    in_progress: [],
    resolved: []
  });
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIncidences, setSelectedIncidences] = useState([]);

  useEffect(() => {
    refreshIncidences();
  }, [refreshIncidences]);

  useEffect(() => {
    const filteredIncidences = incidences.filter(inc => {
      const nameMatch = inc.user && `${inc.user.name} ${inc.user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = statusFilter === 'all' || inc.status === statusFilter;
      return nameMatch && statusMatch;
    });

    const newColumns = {
      pending: filteredIncidences.filter(inc => inc.status === 'pending'),
      in_progress: filteredIncidences.filter(inc => inc.status === 'in_progress'),
      resolved: filteredIncidences.filter(inc => inc.status === 'resolved')
    };
    setColumns(newColumns);
  }, [incidences, searchTerm, statusFilter]);

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    try {
      await updateIncidenceById(draggableId, { status: destination.droppableId });
      setNotification({ type: 'success', message: 'Incidencia actualizada con éxito' });
      refreshIncidences();
    } catch (error) {
      setNotification({ type: 'error', message: 'Error al actualizar la incidencia' });
    }
  };

  const handleEditIncidence = async (updatedIncidence) => {
    try {
      await updateIncidence(updatedIncidence.id, updatedIncidence);
      setNotification({ type: 'success', message: 'Incidencia actualizada con éxito' });
      refreshIncidences();
    } catch (error) {
      setNotification({ type: 'error', message: 'Error al actualizar la incidencia' });
    }
  };

  const handleDeleteIncidence = async (id) => {
    try {
      await deleteIncidence(id);
      setNotification({ type: 'success', message: 'Incidencia eliminada con éxito' });
      refreshIncidences();
    } catch (error) {
      setNotification({ type: 'error', message: 'Error al eliminar la incidencia' });
    }
  };


  const handleCheckboxChange = (incidenceId) => {
    setSelectedIncidences(prev =>
      prev.includes(incidenceId)
        ? prev.filter(id => id !== incidenceId)
        : [...prev, incidenceId]
    );
  };

  const handleBulkStatusChange = async (newStatus) => {
    try {
      for (let id of selectedIncidences) {
        await updateIncidenceById(id, { status: newStatus });
      }
      setNotification({ type: 'success', message: 'Incidencias actualizadas con éxito' });
      setSelectedIncidences([]);
      refreshIncidences();
    } catch (error) {
      setNotification({ type: 'error', message: 'Error al actualizar las incidencias' });
    }
  };


  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {notification && <Notification message={notification.message} type={notification.type} />}
      <h2 className="text-2xl font-bold mb-4">Panel de Administración</h2>

      <div className="mb-4 flex flex-row space-x-2">
        <div className="relative rounded-lg">
          <input
            type="text"
            placeholder="Buscar por nombre o apellido"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 pl-8 border rounded-full mr-2"
          />
          <FaSearch className="absolute left-2 top-3 text-gray-400" />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 w-64 h-10 border rounded-full"
        >
          <option value="all">Todos</option>
          <option value="pending">Pendientes</option>
          <option value="in_progress">En Progreso</option>
          <option value="resolved">Resueltas</option>
        </select>

        <div className="mb-4 space-x-2">
          <button onClick={() => handleBulkStatusChange('pending')} className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600">
            Pendientes
          </button>
          <button onClick={() => handleBulkStatusChange('in_progress')} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
            En Progreso
          </button>
          <button onClick={() => handleBulkStatusChange('resolved')} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600">
            Resueltas
          </button>
        </div>


      </div>


      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(columns).map(([columnId, columnIncidences]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`p-4 rounded-lg ${columnId === 'pending' ? 'bg-yellow-100' :
                    columnId === 'in_progress' ? 'bg-blue-100' :
                      'bg-green-100'
                    }`}
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {columnId === 'pending' ? 'Pendientes' :
                      columnId === 'in_progress' ? 'En Progreso' : 'Resueltas'}
                  </h3>
                  {columnIncidences.map((incidence, index) => (
                    <Draggable key={incidence.id} draggableId={incidence.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`mb-2 p-2 rounded ${columnId === 'pending' ? 'bg-yellow-200' :
                            columnId === 'in_progress' ? 'bg-blue-200' :
                              'bg-green-200'
                            }`}
                        >

                          <div className="flex flex-col right-0 mb-2">
                            <div>
                              <input
                                type="checkbox"
                                checked={selectedIncidences.includes(incidence.id)}
                                onChange={() => handleCheckboxChange(incidence.id)}
                                className="mr-2"
                              />
                            </div>
                            <IncidenceItem
                              incidence={incidence}
                              isAdmin={true}
                              onEdit={handleEditIncidence}
                              onDelete={() => handleDeleteIncidence(incidence.id)}
                            />
                          </div>
                        </div>


                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}

        </div>
      </DragDropContext>
    </div>
  );
};

export default AdminDashboard;