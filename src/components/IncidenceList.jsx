import React, { useState } from 'react';
import IncidenceItem from './IncidenceItem';
import Pagination from './Pagination';

const ITEMS_PER_PAGE = 5;

export default function IncidenceList({ incidences, onUpdateIncidence, onDeleteIncidence, isAdmin }) {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentIncidences = incidences.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(incidences.length / ITEMS_PER_PAGE);

    return (
        <div>
            <div className="space-y-4">
                {currentIncidences.map((incidence) => (
                    <IncidenceItem
                        key={incidence.id}
                        incidence={incidence}
                        onUpdate={onUpdateIncidence}
                        onDelete={onDeleteIncidence}
                        isAdmin={isAdmin}
                    />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}