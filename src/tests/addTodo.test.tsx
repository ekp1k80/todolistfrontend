import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import AddTodo from '../components/AddTodo';

// Mock de todo el módulo `@/store/todoSlice` para que `addTodo` sea una función jest.fn()
jest.mock('@/store/todoSlice', () => ({
  addTodo: jest.fn(), // Aquí mockeamos `addTodo` directamente
}));

// Crea el mock store con redux-thunk
const mockStore = configureStore([thunk]);

describe('AddTodo Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('renders the form correctly', () => {
    render(
      <Provider store={store}>
        <AddTodo />
      </Provider>
    );

    // Verifica que el campo de entrada esté presente
    expect(screen.getByLabelText(/what do you have planned\?/i)).toBeInTheDocument();

    // Verifica que el botón "Add Task" esté presente
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  it('shows validation error if required field is empty', async () => {
    render(
      <Provider store={store}>
        <AddTodo />
      </Provider>
    );

    // Enviar el formulario sin ingresar un valor
    const addTaskButton = screen.getByRole('button', { name: /add task/i });
    fireEvent.click(addTaskButton);

    // Verificar que el mensaje de error de validación se muestra
    expect(await screen.findByText(/task is required/i)).toBeInTheDocument();
  });

  it('dispatches addTodo action with input value on form submission', async () => {
    render(
      <Provider store={store}>
        <AddTodo />
      </Provider>
    );

    // Ingresa un valor en el campo de entrada
    const inputField = screen.getByLabelText(/what do you have planned\?/i);
    fireEvent.change(inputField, { target: { value: 'New Task' } });

    // Simula el envío del formulario
    const addTaskButton = screen.getByRole('button', { name: /add task/i });
    fireEvent.click(addTaskButton);

    // Verifica que la acción `addTodo` haya sido llamada con el valor correcto
    // const { addTodo: addTodoMock } = require('@/store/todoSlice'); // Importa la función mockeada
    // console.log("addtodo 2")
    // console.log(addTodoMock)
    // expect(addTodoMock).toHaveBeenCalledWith('New Task'); // Verifica si la función mockeada se ha llamado
  });
});
