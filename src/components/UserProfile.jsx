import React, { useState, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { updateUser, changePassword } from '../services/authService';

export default function UserProfile() {
  const { user, updateUserContext } = useAuth();
  console.log('User object:', user);
  const [formData, setFormData] = useState({
    id: user?.id, // Asegúrate de incluir el id aquí
    name: user?.name || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    mobilePhone: user?.mobilePhone || '',
    photo: user?.photo || ''
  });
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notification, setNotification] = useState(null);
  const fileInputRef = useRef(null);

  if (!user) {
    return <div>Por favor, inicia sesión para ver tu perfil.</div>;
  }

  const handleInputChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      const updatedUser = await updateUser(user.id, data);
      updateUserContext(updatedUser);
      setNotification({ type: 'success', message: 'Perfil actualizado con éxito' });
    } catch (error) {
      setNotification({ type: 'error', message: 'Error al actualizar el perfil' });
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
    <div className="bg-white shadow-md rounded px-8 pt-4 pb-6 mb-2">
      {notification && (
        <div className={`p-4 rounded mb-4 ${notification.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {notification.message}
        </div>
      )}

      <div className="mb-2">
        <div className="flex items-center justify-center">
          <div className="relative group">
            <img
              src={formData.photo instanceof File ? URL.createObjectURL(formData.photo) : (formData.photo || 'https://via.placeholder.com/150')}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover cursor-pointer border-4 border-blue-500"
              onClick={() => fileInputRef.current.click()}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handlePhotoUpload}
          className="hidden"
          accept="image/*"
        />
      </div>

      <form onSubmit={handleSubmit} className="mb-2">
        <div className="flex mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="ml-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Apellido
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="ml-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className=" flex mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="ml-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobilePhone">
            Teléfono
          </label>
          <input
            type="tel"
            name="mobilePhone"
            value={formData.mobilePhone}
            onChange={handleInputChange}
            className="ml-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Actualizar Perfil
        </button>
      </form>

      <form onSubmit={handleChangePassword} className="mb-2">
        {/*         <h3 className="text-lg font-semibold mb-3">Cambiar Contraseña</h3> */}
        <div className="mb-2">
          <input
            type="password"
            name="currentPassword"
            placeholder="Contraseña actual"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-2">
          <input
            type="password"
            name="newPassword"
            placeholder="Nueva contraseña"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-2">
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