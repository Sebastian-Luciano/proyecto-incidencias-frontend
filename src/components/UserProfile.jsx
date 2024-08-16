import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { updateUser, changePassword } from '../services/userService';
import PhotoUpload from './PhotoUpload';
import Notification from './Notification';

export default function UserProfile({ onClose }) {
  const { user, updateUserContext } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    mobilePhone: user?.mobilePhone || '',
    photo: null
  });
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notification, setNotification] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (file) => {
    setFormData(prev => ({ ...prev, photo: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        if (key === 'photo' && formData[key] instanceof File) {
          data.append('photo', formData[key], formData[key].name);
        } else {
          data.append(key, String(formData[key]));
        }
      }
    });

    try {
      const updatedUser = await updateUser(user.id, data);
      updateUserContext(updatedUser);
      setNotification({ type: 'success', message: 'Perfil actualizado con éxito' });
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      setNotification({ type: 'error', message: error.message || 'Error al actualizar el perfil' });
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setNotification({ type: 'error', message: 'Las contraseñas nuevas no coinciden' });
      return;
    }
    try {
      await changePassword(user.id, passwords.currentPassword, passwords.newPassword);
      setNotification({ type: 'success', message: 'Contraseña actualizada con éxito' });
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setNotification({ type: 'error', message: 'Error al actualizar la contraseña' });
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-h-[80vh] overflow-y-auto">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <button onClick={onClose} className="float-right text-2xl">&times;</button>
      <h2 className="text-2xl font-bold mb-4">Perfil de Usuario</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4 flex justify-center">
          <PhotoUpload
            currentPhoto={user.photo ? `http://localhost:3000/uploads/${user.photo}` : null}
            onPhotoChange={handlePhotoChange}
            name={formData.name}
            size={120}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Apellido
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobilePhone">
            Teléfono
          </label>
          <input
            type="tel"
            name="mobilePhone"
            value={formData.mobilePhone}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Actualizar Perfil
        </button>
      </form>

      <form onSubmit={handleChangePassword} className="mb-4">
        <h3 className="text-xl font-bold mb-2">Cambiar Contraseña</h3>
        <div className="mb-4">
          <input
            type="password"
            name="currentPassword"
            placeholder="Contraseña actual"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="newPassword"
            placeholder="Nueva contraseña"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar nueva contraseña"
            value={passwords.confirmPassword}
            onChange={handlePasswordChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Cambiar Contraseña
        </button>
      </form>
    </div>
  );
}