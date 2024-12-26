import { AppDispatch } from '@/store/store';
import { addTodo } from '@/store/todoSlice';
import { Button, Grid2, styled, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

const CustomTextField = styled(TextField)`
	& .MuiInputBase-root {
    background-color: #1E2D3C;
  }

	& label {
		font-weight: bold;
		color: white;
	}
	& input {
		color: white;
	}
`

const GradientText = styled(Button)({
  fontWeight: "bold", // Grosor de la fuente
  background: "linear-gradient(90deg, #BC5A96, #795FBF)", // Degradado de izquierda a derecha
  WebkitBackgroundClip: "text", // Solo aplica el fondo al texto
  WebkitTextFillColor: "transparent", // Hace el texto transparente para mostrar el gradiente
});

const AddTodo = () => {
	const [addTodoText, setAddTodoText] = useState('')
	const dispatch = useDispatch<AppDispatch>();
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value)
		setAddTodoText(e.target.value)
	}

	const handleAddTask = () => {
    if (addTodoText.trim() === '') return; // No hacer nada si el input está vacío

    dispatch(addTodo(addTodoText)) // Llama al thunk de Redux Toolkit
      .then(() => setAddTodoText('')) // Limpia el estado si el thunk es exitoso
      .catch((error) => console.error('Error adding todo:', error)); // Manejo de errores opcional
  };

	return (
		<Grid2 container>
			<Grid2 size={1}></Grid2>
			<Grid2 size={8}>
				<CustomTextField fullWidth  value={addTodoText} onChange={handleChange} id="outlined-basic" label="What do you have planned?" variant="outlined" />
			</Grid2>
			<Grid2 size={2} justifyContent={"flex-start"} alignItems={"center"} container>
				<GradientText onClick={handleAddTask}>Add Task</GradientText>
			</Grid2>
			<Grid2 size={1}></Grid2>
		</Grid2>
	)
}

export default AddTodo