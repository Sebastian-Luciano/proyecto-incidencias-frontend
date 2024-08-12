import React from 'react'

export default function IncidenceFilter({ onFilterChange }) {
  return (
    <div className="mb-4">
      <select
        onChange={(e) => onFilterChange(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      >
        <option value="all">Todas las incidencias</option>
        <option value="pending">Pendientes</option>
        <option value="in_progress">En progreso</option>
        <option value="resolved">Resueltas</option>
      </select>
    </div>
  )
}
