import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IncidenceForm from '../IncidenceForm';

describe('IncidenceForm', () => {
  test('renders form fields', () => {
    render(<IncidenceForm onIncidenceCreated={() => {}} />);
    
    expect(screen.getByPlaceholderText('Asunto')).toBeInTheDocument();
    expect(screen.getByText('Seleccione un tipo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Descripción')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ubicación')).toBeInTheDocument();
    expect(screen.getByText('Crear Incidencia')).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const mockOnIncidenceCreated = jest.fn();
    render(<IncidenceForm onIncidenceCreated={mockOnIncidenceCreated} />);
    
    userEvent.type(screen.getByPlaceholderText('Asunto'), 'Test Incidence');
    userEvent.selectOptions(screen.getByRole('combobox'), 'maintenance');
    userEvent.type(screen.getByPlaceholderText('Descripción'), 'This is a test description');
    userEvent.type(screen.getByPlaceholderText('Ubicación'), 'Test Location');
    
    fireEvent.click(screen.getByText('Crear Incidencia'));

    await waitFor(() => {
      expect(mockOnIncidenceCreated).toHaveBeenCalledWith(expect.objectContaining({
        subject: 'Test Incidence',
        type: 'maintenance',
        description: 'This is a test description',
        location: 'Test Location',
      }));
    });
  });

  test('shows validation errors for invalid data', async () => {
    render(<IncidenceForm onIncidenceCreated={() => {}} />);
    
    fireEvent.click(screen.getByText('Crear Incidencia'));

    await waitFor(() => {
      expect(screen.getByText('El asunto es obligatorio')).toBeInTheDocument();
      expect(screen.getByText('El tipo de incidencia es obligatorio')).toBeInTheDocument();
      expect(screen.getByText('La descripción es obligatoria')).toBeInTheDocument();
      expect(screen.getByText('La ubicación es obligatoria')).toBeInTheDocument();
    });
  });

  test('handles file upload', async () => {
    const mockOnIncidenceCreated = jest.fn();
    render(<IncidenceForm onIncidenceCreated={mockOnIncidenceCreated} />);

    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText(/subir imagen/i);

    userEvent.upload(fileInput, file);

    expect(fileInput.files[0]).toBe(file);
    expect(fileInput.files.item(0)).toBe(file);
    expect(fileInput.files).toHaveLength(1);
  });
});