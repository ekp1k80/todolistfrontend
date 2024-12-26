// components/TodoList.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchTodos } from '../store/todoSlice';
import AddTodo from './addTodo';
import TodoPoint from './todoPoint';
import { Box, styled } from '@mui/material';

const Title = styled("h2")`
	text-align: center;
	color: white;
`

const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, loading, error } = useAppSelector(state => state.todos);

  // Fetch todos on component mount
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Error loading tasks...</p>;
  }
	console.log(todos)
  return (
    <Box mt={"12px"}>
    	<AddTodo/>
			
			<Box mb={"12px"} mt={"12px"}>
	      <Title>Your Tasks</Title>
			</Box>
      {todos.length === 0 ? (
        <p>No tasks found. Add some tasks!</p>
      ) : (
        <ul>
          {todos.map((todo, index)  => (
						<Box mb={"12px"} key={`TodoPointFromList${index}`}>
            	<TodoPoint value={todo.task} id={todo.id}/>
						</Box>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default TodoList;
