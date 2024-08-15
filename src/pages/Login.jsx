/* import React, { useState } from 'react';
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
    <header className="bg-cover bg-center bg-no-repeat border-t-2 border-blue-600 h-screen flex items-center opacity-80" style={{ backgroundImage: "url('/residencia.jpg')" }}>

    <div className="flex w-full max-w-6xl mx-auto">
      <div className="w-full lg:w-1/2 bg-white p-8  shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Iniciar Sesión</h2>
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
    </div>
    </header>
  );
} */

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
      if (user) {
        setLocation(user.isAdmin ? '/admin-dashboard' : '/user-dashboard');
      } else {
        throw new Error('No se recibieron datos de usuario');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setNotification({ type: 'error', message: 'Error al iniciar sesión. Por favor, intente de nuevo.' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" 
         style={{ backgroundImage: "url('/residencia.jpg')" }}>
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Iniciar Sesión</h2>
        {notification && <Notification type={notification.type} message={notification.message} />}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="correo@ejemplo.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}