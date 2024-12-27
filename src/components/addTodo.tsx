import { Button, Grid2, styled, TextField } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { AppDispatch } from '@/store/store';
import { addTodo } from '@/store/todoSlice';

const CustomTextField = styled(TextField)`
  & .MuiInputBase-root {
    background-color: #1E2D3C;
  }

  & label {
    font-weight: bold;
    color: #3c465a;
  }
`;

const GradientText = styled(Button)({
  fontWeight: 'bold',
  background: 'linear-gradient(90deg, #BC5A96, #795FBF)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

interface AddTodoFormInputs {
  task: string;
}

const AddTodo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { control, handleSubmit, reset } = useForm<AddTodoFormInputs>();

  const onSubmit = async (data: AddTodoFormInputs) => {
	console.log("onSubmit")
	console.log("dispatch")
	console.log(dispatch)
    try {
      await dispatch(addTodo(data.task)); // Despacha la acción con Redux Toolkit
      reset(); // Limpia el formulario después de enviar
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid2 container>
        <Grid2 size={1}></Grid2>
        <Grid2 size={8}>
          <Controller
            name="task"
            control={control}
            defaultValue=""
            rules={{ required: 'Task is required' }}
            render={({ field, fieldState }) => (
              <CustomTextField
                {...field}
                fullWidth
                id="outlined-basic"
                label="What do you have planned?"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid2>
        <Grid2 size={2} justifyContent={'flex-start'} alignItems={'center'} container>
          <GradientText type="submit">Add Task</GradientText>
        </Grid2>
        <Grid2 size={1}></Grid2>
      </Grid2>
    </form>
  );
};

export default AddTodo;
