import { useAppDispatch } from '@/store/store';
import { deleteTodo, updateTodo } from '@/store/todoSlice';
import { Button, Grid2, styled, useMediaQuery } from '@mui/material'
import React, { useState, useRef } from 'react'

const GradientText = styled(Button)({
  fontWeight: "bold", // Grosor de la fuente
  background: "linear-gradient(90deg, #BC5A96, #795FBF)", // Degradado de izquierda a derecha
  WebkitBackgroundClip: "text", // Solo aplica el fondo al texto
  WebkitTextFillColor: "transparent", // Hace el texto transparente para mostrar el gradiente
});

const DeleteButton = styled(Button)`
	color: #B51F47
`

const Text = styled("p")`
	margin: 0;
	font-weight: bold;
	color: white;
`

const Wrapper = styled(Grid2)`
	background-color: #0A1928;
	padding: 10px 0;
`
const StartWrapper = styled(Grid2)`
	background-color: #0A1928;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	padding: 10px 0;
`
const EndWrapper = styled(Grid2)`
	background-color: #0A1928;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	padding: 10px 0;
`



const CustomInput = styled("input")`
	background-color: transparent;
	color: white;
	font-size: 22px;
	border: none;
	text-align: center;
`

interface ITodoPoint {
	value: string
	id: number
}

const TodoPoint: React.FC<ITodoPoint> = ({ id, value }) => {
	const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  
  // Crear un ref para el input
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSaveOrEditButton = () => {
    // Cambiar el estado de edición
    setIsEditing((prev) => !prev);
    
    // Si se activa la edición, enfocar el input
    if (!isEditing) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }

		if (isEditing && inputValue !== value) {
      // Solo despacha la acción si el valor cambió
      dispatch(updateTodo({ id, task: inputValue }));
    }
  }

	const handleDelete = () => {
    dispatch(deleteTodo(id)); // Llama al thunk para eliminar el todo
  };

const matches = useMediaQuery('(min-width:600px)');

  return (
    <Grid2 container>
      <Grid2 size={1}></Grid2>
      <Grid2 size={9}>
        <Grid2 container>
          <StartWrapper size={matches ? 8 : 6} justifyContent={'center'} alignItems={"center"} container>
            {isEditing ? (
              <CustomInput
                ref={inputRef} // Conectar el ref al input
                placeholder="Todo Text"
                value={inputValue}
                onChange={handleChange}
              />
            ) : (
              <Text>{value}</Text>
            )}
          </StartWrapper>
          <Wrapper size={matches ? 2: 3 }>
            <GradientText onClick={handleSaveOrEditButton}>
              {isEditing ? 'Save' : 'Edit'}
            </GradientText>
          </Wrapper>
          <EndWrapper size={matches ? 2 : 3}>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          </EndWrapper>
        </Grid2>
      </Grid2>
    </Grid2>
  )
}

export default TodoPoint
