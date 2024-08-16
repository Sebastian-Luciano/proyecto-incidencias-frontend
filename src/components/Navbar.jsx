import React, { useState } from 'react';
import { Link } from 'wouter';
import { useAuth } from '../hooks/useAuth';
import Modal from './Modal';
import UserProfile from './UserProfile';


export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold">Gestión de Incidencias</span>
        </Link>
        {user ? (
          <div className="flex items-center relative">
            <img
              src={user.photo ? `http://localhost:3000/uploads/${user.photo}` : 'https://via.placeholder.com/40'}
              alt="User"
              className="w-10 h-10 rounded-full mr-2"
            />
            <span className="mr-2">{`${user.name} ${user.lastName}`}</span>
            <button onClick={toggleDropdown} className="focus:outline-none">
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 top-8 mt-2 py-4 w-48 bg-white rounded-md shadow-xl  z-20">
                <a href="#" onClick={() => { setIsModalOpen(true); setIsDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Perfil</a>
                {user.isAdmin && (
                  <Link href="/register">
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Registrar Usuario</a>
                  </Link>
                )}
                <a href="#" onClick={logoutUser} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Cerrar sesión
                  </a>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">
            <span>Iniciar sesión</span>
          </Link>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UserProfile onClose={() => setIsModalOpen(false)} />
      </Modal>
    </nav>
  );
}