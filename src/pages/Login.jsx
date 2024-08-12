import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../hooks/useAuth';
import Notification from '../components/Notification';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();
  const [, setLocation] = useLocation();
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
      console.log('Resultado de loginUser:', user);
      if (user) {
        if (user.isAdmin) {
          setLocation('/admin-dashboard');
        } else {
          setLocation('/user-dashboard');
        }
      } else {
        throw new Error('No se recibieron datos de usuario');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setNotification({ type: 'error', message: 'Error al iniciar sesión. Por favor, intente de nuevo.' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      {notification && <Notification type={notification.type} message={notification.message} />}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}