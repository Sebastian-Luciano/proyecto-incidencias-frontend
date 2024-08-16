import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function IncidenceForm({ onIncidenceCreated }) {
  const [location, setLocation] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    }
  }, []);


const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    const incidenceData = {
      ...values,
      image: file, 
      latitude: location ? location.latitude : null,
      longitude: location ? location.longitude : null,
    };
    await onIncidenceCreated(incidenceData);
    resetForm();
    setFile(null);
  } catch (error) {
    console.error('Error creating incidence:', error);
  } finally {
    setSubmitting(false);
  }
};

  return (
    <Formik
      initialValues={{
        subject: '',
        type: '',
        description: '',
      }}
      validationSchema={Yup.object({
        subject: Yup.string().required('Required'),
        type: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
      })}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <Field
              name="subject"
              type="text"
              placeholder="Asunto"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="subject" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <Field
              name="type"
              as="select"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccione un tipo</option>
              <option value="maintenance">Mantenimiento</option>
              <option value="security">Seguridad</option>
              <option value="cleaning">Limpieza</option>
            </Field>
            <ErrorMessage name="type" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <Field
              name="description"
              as="textarea"
              placeholder="Descripción"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <input
              type="file"
              onChange={(event) => {
                setFile(event.currentTarget.files[0]);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {location && (
            <p className="text-sm text-gray-600">
              Ubicación: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
          >
            {isSubmitting ? 'Enviando...' : 'Crear Incidencia'}
          </button>
        </Form>
      )}
    </Formik>
  );
}