/* import React, { useState } from 'react';
import { format } from 'date-fns';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function IncidenceItem({ incidence, onUpdate, onDelete, isAdmin }) {
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
        onUpdate(editedIncidence);
        setIsEditing(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100';
            case 'in_progress': return 'bg-blue-100';
            case 'resolved': return 'bg-green-100';
            default: return 'bg-gray-100';
        }
    };

    return (
        <div className={`p-4 rounded-lg shadow-md ${getStatusColor(incidence.status)}`}>
            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-2">
                    <input
                        type="text"
                        name="subject"
                        value={editedIncidence.subject}
                        onChange={handleChange}
                        className="w-full px-2 py-1 border rounded"
                    />
                    <select
                        name="type"
                        value={editedIncidence.type}
                        onChange={handleChange}
                        className="w-full px-2 py-1 border rounded"
                    >
                        <option value="maintenance">Mantenimiento</option>
                        <option value="security">Seguridad</option>
                        <option value="cleaning">Limpieza</option>
                    </select>
                    <textarea
                        name="description"
                        value={editedIncidence.description}
                        onChange={handleChange}
                        className="w-full px-2 py-1 border rounded"
                    ></textarea>
                    {isAdmin && (
                        <select
                            name="status"
                            value={editedIncidence.status}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border rounded"
                        >
                            <option value="pending">Pendiente</option>
                            <option value="in_progress">En progreso</option>
                            <option value="resolved">Resuelto</option>
                        </select>
                    )}
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-3 py-1 bg-gray-300 rounded">Cancelar</button>
                        <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded">Guardar</button>
                    </div>
                </form>
            ) : (
                <>
                    <h3 className="text-lg font-semibold">{incidence.subject}</h3>
                    <p className="text-sm text-gray-600">Tipo: {incidence.type}</p>
                    <p className="mt-2">{incidence.description}</p>
                    <p className="text-sm text-gray-600 mt-2">Estado: {incidence.status}</p>
                    <p className="text-sm text-gray-600">Creado: {format(new Date(incidence.createdAt), 'dd/MM/yyyy HH:mm')}</p>

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

                    {incidence.user && (
                        <div className="mt-4 text-sm text-gray-600 flex items-center">
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

                    <div className="mt-4 flex space-x-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition duration-300"
                        >
                            <FaEdit />
                        </button>
                        <button
                            onClick={() => onDelete(incidence.id)}
                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300"
                        >
                            <FaTrash />
                        </button>
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
} */

    
    import React, { useState } from 'react';
    import { format } from 'date-fns';
    import { MapContainer, TileLayer, Marker } from 'react-leaflet';
    import 'leaflet/dist/leaflet.css';
    import { FaEdit, FaTrash } from 'react-icons/fa';
    
    export default function IncidenceItem({ incidence, onUpdate, onDelete, isAdmin }) {
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
            onUpdate(editedIncidence);
            setIsEditing(false);
        };
    
        const getStatusColor = (status) => {
            switch (status) {
                case 'pending': return 'bg-yellow-100';
                case 'in_progress': return 'bg-blue-100';
                case 'resolved': return 'bg-green-100';
                default: return 'bg-gray-100';
            }
        };
    
        return (
            <div className={`p-4 rounded-lg shadow-md ${getStatusColor(incidence.status)}`}>
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <input
                            type="text"
                            name="subject"
                            value={editedIncidence.subject}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border rounded"
                        />
                        <select
                            name="type"
                            value={editedIncidence.type}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border rounded"
                        >
                            <option value="maintenance">Mantenimiento</option>
                            <option value="security">Seguridad</option>
                            <option value="cleaning">Limpieza</option>
                        </select>
                        <textarea
                            name="description"
                            value={editedIncidence.description}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border rounded"
                        ></textarea>
                        {isAdmin && (
                            <select
                                name="status"
                                value={editedIncidence.status}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border rounded"
                            >
                                <option value="pending">Pendiente</option>
                                <option value="in_progress">En progreso</option>
                                <option value="resolved">Resuelto</option>
                            </select>
                        )}
                        <div className="flex justify-end space-x-2">
                            <button type="button" onClick={() => setIsEditing(false)} className="px-3 py-1 bg-gray-300 rounded">Cancelar</button>
                            <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded">Guardar</button>
                        </div>
                    </form>
                ) : (
                    <>
                        <h3 className="text-lg font-semibold">{incidence.subject}</h3>
                        <p className="text-sm text-gray-600">Tipo: {incidence.type}</p>
                        <p className="mt-2">{incidence.description}</p>
                        <p className="text-sm text-gray-600 mt-2">Estado: {incidence.status}</p>
                        <p className="text-sm text-gray-600">Creado: {format(new Date(incidence.createdAt), 'dd/MM/yyyy HH:mm')}</p>
    
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
    
                        {incidence.user && (
                            <div className="mt-4 text-sm text-gray-600 flex items-center">
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
    
                        <div className="mt-4 flex space-x-2">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition duration-300"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => onDelete(incidence.id)}
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300"
                            >
                                <FaTrash />
                            </button>
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
    }