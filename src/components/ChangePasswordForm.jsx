import React, { useState } from 'react';
import { changePassword } from '../services/authService';

export default function ChangePasswordForm({ userId, onPasswordChanged }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas nuevas no coinciden');
      return;
    }
    try {
      await changePassword(userId, currentPassword, newPassword);
      onPasswordChanged();
    } catch (error) {
      setError('Error al cambiar la contraseña');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cambio de contraseña obligatorio</h2>
      <input
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        placeholder="Contraseña actual"
        required
      />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Nueva contraseña"
        required
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirmar nueva contraseña"
        required
      />
      {error && <p>{error}</p>}
      <button type="submit">Cambiar contraseña</button>
    </form>
  );
}