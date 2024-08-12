/*  import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useIncidences } from '../hooks/useIncidences';
import IncidenceItem from '../components/IncidenceItem';
import Notification from '../components/Notification';
import { FaSearch } from 'react-icons/fa';
import { updateIncidence, deleteIncidence } from '../services/incidenceService';

const AdminDashboard = () => {
  const { incidences, updateIncidenceById, loading, error } = useIncidences();
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
    const filteredIncidences = incidences.filter(inc => {
      const nameMatch = `${inc.user.name} ${inc.user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
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

    const sourceColumn = columns[source.droppableId];
    const draggedIncidence = sourceColumn.find(inc => inc.id.toString() === draggableId);

    if (source.droppableId !== destination.droppableId) {
      try {
        await updateIncidenceById(draggableId, { status: destination.droppableId });
        setNotification({ type: 'success', message: 'Incidencia actualizada con éxito' });
      } catch (error) {
        setNotification({ type: 'error', message: 'Error al actualizar la incidencia' });
        return;
      }
    }

    setColumns(prev => {
      const newSourceColumn = prev[source.droppableId].filter(inc => inc.id.toString() !== draggableId);
      const newDestColumn = [...prev[destination.droppableId], { ...draggedIncidence, status: destination.droppableId }];

      return {
        ...prev,
        [source.droppableId]: newSourceColumn,
        [destination.droppableId]: newDestColumn
      };
    });
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
    } catch (error) {
      setNotification({ type: 'error', message: 'Error al actualizar las incidencias' });
    }
  };

  const handleEditIncidence = async (incidence) => {
    try {
      const updatedIncidence = await updateIncidence(incidence.id, incidence);
      setColumns(prev => {
        const newColumns = { ...prev };
        const columnKey = updatedIncidence.status;
        newColumns[columnKey] = newColumns[columnKey].map(inc =>
          inc.id === updatedIncidence.id ? updatedIncidence : inc
        );
        return newColumns;
      });
      setNotification({ type: 'success', message: 'Incidencia actualizada con éxito' });
    } catch (error) {
      setNotification({ type: 'error', message: 'Error al actualizar la incidencia' });
    }
  };

  const handleDeleteIncidence = async (id) => {
    try {
      await deleteIncidence(id);
      setColumns(prev => {
        const newColumns = { ...prev };
        Object.keys(newColumns).forEach(key => {
          newColumns[key] = newColumns[key].filter(inc => inc.id !== id);
        });
        return newColumns;
      });
      setNotification({ type: 'success', message: 'Incidencia eliminada con éxito' });
    } catch (error) {
      setNotification({ type: 'error', message: 'Error al eliminar la incidencia' });
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
        <div>
          <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700">
            <FaSearch className="mr-2" /> Buscar
          </button>
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
          <button onClick={() => handleBulkStatusChange('pending')} className="bg-yellow-300 text-white px-4 py-2 rounded-full hover:bg-yellow-500">
            Pendientes
          </button>
          <button onClick={() => handleBulkStatusChange('in_progress')} className="bg-blue-300 text-white px-4 py-2 rounded-full hover:bg-blue-500">
            En Progreso
          </button>
          <button onClick={() => handleBulkStatusChange('resolved')} className="bg-green-300 text-white px-4 py-2 rounded-full hover:bg-green-500">
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

                          </div>
                        </div>
                      )}

                                                  <IncidenceItem
                              incidence={incidence}
                              isAdmin={true}
                              onEdit={handleEditIncidence}
                              onDelete={() => handleDeleteIncidence(incidence.id)}
                            />
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
 */


import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useIncidences } from '../hooks/useIncidences';
import IncidenceItem from '../components/IncidenceItem';
import Notification from '../components/Notification';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { updateIncidence, deleteIncidence } from '../services/incidenceService';

const AdminDashboard = () => {
  const { incidences, updateIncidenceById, loading, error } = useIncidences();
  const [columns, setColumns] = useState({
    pending: [],
    in_progress: [],
    resolved: []
  });
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const filteredIncidences = incidences.filter(inc => {
      const fullName = `${inc.user.name} ${inc.user.lastName}`.toLowerCase();
      const nameMatch = fullName.includes(searchTerm.toLowerCase());
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

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newItems = Array.from(start);
      const [reorderedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, reorderedItem);

      const newColumn = {
        ...columns,
        [source.droppableId]: newItems
      };

      setColumns(newColumn);
      return;
    }

    // Moving from one list to another
    const startItems = Array.from(start);
    const [movedItem] = startItems.splice(source.index, 1);
    const finishItems = Array.from(finish);
    finishItems.splice(destination.index, 0, movedItem);

    const newColumns = {
      ...columns,
      [source.droppableId]: startItems,
      [destination.droppableId]: finishItems
    };

    setColumns(newColumns);

    // Update the incidence status in the backend
    try {
      await updateIncidenceById(draggableId, { status: destination.droppableId });
      setNotification({ type: 'success', message: 'Incidencia actualizada con éxito' });
    } catch (error) {
      setNotification({ type: 'error', message: 'Error al actualizar la incidencia' });
      // Revert the change in the UI if the backend update fails
      setColumns(columns);
    }
  };

  const handleSearch = () => {
    // La búsqueda se realiza automáticamente en el useEffect
  };

  const handleEditIncidence = async (incidence) => {
    try {
      const updatedIncidence = await updateIncidence(incidence.id, incidence);
      setColumns(prev => {
        const newColumns = { ...prev };
        const columnKey = updatedIncidence.status;
        newColumns[columnKey] = newColumns[columnKey].map(inc =>
          inc.id === updatedIncidence.id ? updatedIncidence : inc
        );
        return newColumns;
      });
      setNotification({ type: 'success', message: 'Incidencia actualizada con éxito' });
    } catch (error) {
      setNotification({ type: 'error', message: 'Error al actualizar la incidencia' });
    }
  };

  const handleDeleteIncidence = async (id) => {
    try {
      await deleteIncidence(id);
      setColumns(prev => {
        const newColumns = { ...prev };
        Object.keys(newColumns).forEach(key => {
          newColumns[key] = newColumns[key].filter(inc => inc.id !== id);
        });
        return newColumns;
      });
      setNotification({ type: 'success', message: 'Incidencia eliminada con éxito' });
    } catch (error) {
      setNotification({ type: 'error', message: 'Error al eliminar la incidencia' });
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {notification && <Notification message={notification.message} type={notification.type} />}
      <h2 className="text-2xl font-bold mb-4">Panel de Administración</h2>

      <div className="mb-4 flex flex-row space-x-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre o apellido"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-full w-64"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
          <FaSearch className="inline-block mr-2" />
          Buscar
        </button>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 w-48 border rounded-full"
        >
          <option value="all">Todos</option>
          <option value="pending">Pendientes</option>
          <option value="in_progress">En Progreso</option>
          <option value="resolved">Resueltas</option>
        </select>
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


                          
                          <IncidenceItem incidence={incidence} />
{/*                           <div className="flex justify-end mt-2">
                            <button
                              onClick={() => handleEditIncidence(incidence)}
                              className="bg-yellow-500 text-white p-2 rounded mr-2"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteIncidence(incidence.id)}
                              className="bg-red-500 text-white p-2 rounded"
                            >
                              <FaTrash />
                            </button>
                          </div> */}
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