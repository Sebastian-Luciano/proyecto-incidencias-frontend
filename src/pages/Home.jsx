import React from 'react';

export default function Home() {
  return (
<div 
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/residencia.jpg')" }}
    >
      <div className="flex-grow flex flex-col justify-center items-center text-center p-4 bg-black bg-opacity-50">
        <h1 className="text-5xl font-bold mb-6 text-white shadow-lg">Bienvenido a la Gestión de Incidencias</h1>
        <p className="text-xl mb-4 text-white max-w-2xl shadow-md">
          Esta plataforma te permite reportar y gestionar incidencias en tu edificio de manera eficiente.
        </p>
      </div>
    </div>
  )
}