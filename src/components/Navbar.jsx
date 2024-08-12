import React, { useState } from 'react';
import { Link } from 'wouter';
import { useAuth } from '../hooks/useAuth';
import Modal from './Modal';
import UserProfile from './UserProfile';

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold">Gestión de Incidencias</span>
        </Link>
        {user ? (
          <div className="flex items-center">
            <img
              src={user.photo ? `http://localhost:3000/uploads/${user.photo}` : 'https://via.placeholder.com/40'}
              alt="User"
              className="w-10 h-10 rounded-full mr-2 cursor-pointer object-cover"
              onClick={() => setIsModalOpen(true)}
            />
            <span className="mr-4">{`${user.name} ${user.lastName}`}</span>
            {user.isAdmin && (
              <Link href="/register">
                <span className="mr-4">Registrar Usuario</span>
              </Link>
            )}
            <button
              onClick={logoutUser}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Salir
            </button>
          </div>
        ) : (
          <Link href="/login">
            <span>Iniciar sesión</span>
          </Link>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UserProfile />
      </Modal>
    </nav>
  );
}