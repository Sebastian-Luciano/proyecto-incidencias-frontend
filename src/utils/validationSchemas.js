import * as Yup from 'yup';

export const incidenceSchema = Yup.object().shape({
  subject: Yup.string()
    .required('El asunto es obligatorio')
    .min(5, 'El asunto debe tener al menos 5 caracteres')
    .max(100, 'El asunto no puede tener más de 100 caracteres'),
  type: Yup.string()
    .required('El tipo de incidencia es obligatorio')
    .oneOf(['maintenance', 'security', 'cleaning'], 'Tipo de incidencia no válido'),
  description: Yup.string()
    .required('La descripción es obligatoria')
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no puede tener más de 500 caracteres'),
  location: Yup.string()
    .required('La ubicación es obligatoria')
    .max(100, 'La ubicación no puede tener más de 100 caracteres'),
  image: Yup.mixed()
    .test('fileSize', 'El archivo es demasiado grande', (value) => {
      if (!value) return true; // Si no hay archivo, la validación pasa
      return value.size <= 5000000; // 5MB
    })
    .test('fileType', 'Solo se permiten imágenes', (value) => {
      if (!value) return true;
      return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
    })
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo electrónico no válido')
    .required('El correo electrónico es obligatorio'),
  password: Yup.string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
});

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),
  lastName: Yup.string()
    .required('El apellido es obligatorio')
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede tener más de 50 caracteres'),
  email: Yup.string()
    .email('Correo electrónico no válido')
    .required('El correo electrónico es obligatorio'),
  password: Yup.string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial'),
  mobilePhone: Yup.string()
    .required('El teléfono móvil es obligatorio')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Número de teléfono no válido')
});