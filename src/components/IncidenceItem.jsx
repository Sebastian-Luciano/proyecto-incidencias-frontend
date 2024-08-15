import React, { useState } from 'react';
import { format } from 'date-fns';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const IncidenceItem = ({ incidence, isAdmin, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedIncidence, setEditedIncidence] = useState(incidence);
    const [showFullImage, setShowFullImage] = useState(false);
    const [showMap, setShowMap] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedIncidence(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit(editedIncidence);
        setIsEditing(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-300 bg-opacity-30 ';
            case 'in_progress': return 'bg-blue-300 bg-opacity-30 ';
            case 'resolved': return 'bg-green-300 bg-opacity-30';
            default: return 'bg-gray-100';
        }
    };

    return (
        <div className={`bg-white p-4 rounded-lg shadow mb-1 ${getStatusColor(incidence.status)}`}>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="subject"
                        value={editedIncidence.subject}
                        onChange={handleChange}
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <textarea
                        name="description"
                        value={editedIncidence.description}
                        onChange={handleChange}
                        className="w-full mb-2 p-2 border rounded"
                    ></textarea>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-green-500 text-white p-2 rounded mr-2">
                            <FaSave />
                        </button>
                        <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2 rounded">
                            <FaTimes /> 
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <h3 className="text-lg font-semibold">{incidence.subject}</h3>
                    <p className="text-[12px] text-gray-400">Tipo: {incidence.type}</p>
                    <p className="mt-2">{incidence.description}</p>
                    <p className="text-[12px] text-gray-400 mt-2">Estado: {incidence.status}</p>
                    <p className="text-[12px] text-gray-400">Creado: {format(new Date(incidence.createdAt), 'dd/MM/yyyy HH:mm')}</p>

                    {incidence.image && (
                        <div className="mt-2">
                            <img
                                src={`http://localhost:3000/uploads/${incidence.image}`}
                                alt="Incidence"
                                className="w-20 h-20 object-cover cursor-pointer"
                                onClick={() => setShowFullImage(true)}
                            />
                        </div>
                    )}

                    {incidence.latitude && incidence.longitude && (
                        <div className="mt-2">
                            <button
                                onClick={() => setShowMap(true)}
                                className="text-blue-500 underline"
                            >
                                Ver ubicación
                            </button>
                        </div>
                    )}
                    <div className='flex flex-row justify-between space-x-2'>
                    {incidence.user && (
                        <div className="mt-4 text-[11px] text-gray-400 flex items-center">
                            <span>Creado por: {incidence.user.name} {incidence.user.lastName}</span>
                            {incidence.user.avatar && (
                                <img
                                    src={incidence.user.avatar}
                                    alt="User"
                                    className="w-8 h-8 rounded-full ml-2"
                                />
                            )}
                        </div>
                    )}

                    {incidence.user && (
                        <div className="flex justify-end mt-2">
                            <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white p-2 rounded mr-2">
                                <FaEdit />
                            </button>
                            <button onClick={() => onDelete(incidence.id)} className="bg-red-500 text-white p-2 rounded">
                                <FaTrash />
                            </button>
                        </div>
                    )}

                    </div>
                </>
            )}

            {showFullImage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowFullImage(false)}>
                    <img
                        src={`http://localhost:3000/uploads/${incidence.image}`}
                        alt="Incidence Full"
                        className="max-w-full max-h-full"
                    />
                </div>
            )}

            {showMap && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowMap(false)}>
                    <div className="bg-white p-4 rounded-lg" onClick={e => e.stopPropagation()}>
                        <MapContainer
                            center={[incidence.latitude, incidence.longitude]}
                            zoom={13}
                            className="h-96 w-96"
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={[incidence.latitude, incidence.longitude]} />
                        </MapContainer>
                    </div>
                </div>
            )}


        </div>
    );
};

export default IncidenceItem;