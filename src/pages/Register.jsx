import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../hooks/useAuth';
import { registerSchema } from '../utils/validationSchemas';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Notification from '../components/Notification';

export default function Register() {
  const { registerUser } = useAuth();
  const [, setLocation] = useLocation();
  const [notification, setNotification] = useState(null);

  const initialValues = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    mobilePhone: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await registerUser(values);
      setNotification({ type: 'success', message: 'Registro exitoso. Redirigiendo...' });
      setTimeout(() => setLocation('/dashboard'), 2000);
    } catch (error) {
      console.error('Error registering:', error);
      setNotification({ type: 'error', message: 'Error al registrarse. Por favor, intente de nuevo.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
      {notification && <Notification type={notification.type} message={notification.message} />}
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Nombre</label>
              <Field type="text" id="name" name="name" className="w-full px-3 py-2 border rounded" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block mb-2">Apellido</label>
              <Field type="text" id="lastName" name="lastName" className="w-full px-3 py-2 border rounded" />
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email</label>
              <Field type="email" id="email" name="email" className="w-full px-3 py-2 border rounded" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">Contraseña</label>
              <Field type="password" id="password" name="password" className="w-full px-3 py-2 border rounded" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="mobilePhone" className="block mb-2">Teléfono Móvil</label>
              <Field type="tel" id="mobilePhone" name="mobilePhone" className="w-full px-3 py-2 border rounded" />
              <ErrorMessage name="mobilePhone" component="div" className="text-red-500 text-sm" />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
              {isSubmitting ? 'Registrando...' : 'Registrarse'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
