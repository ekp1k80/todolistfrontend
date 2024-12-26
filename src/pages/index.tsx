import AuthButton from '@/components/authButton';
import TodoList from '@/components/todoList';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Grid2, styled } from '@mui/material'

const Wrapper = styled("div")`
  background-color: #3c465a;
  width: 100vw;
  height: 100vh
`

const Home: React.FC = () => {
  const { user, error, isLoading } = useUser();

  return (
    <Wrapper >
      <Grid2 container>
        <Grid2 size={2}>
        </Grid2>
        <Grid2 size={8} container justifyContent={"center"} alignItems={"center"}>
          <AuthButton />
        </Grid2>
      </Grid2>
      
      {user ? (
        <div>
          <Grid2 container>
            <Grid2 size={2}>
            </Grid2>
            <Grid2 size={8} container justifyContent={"center"} alignItems={"center"}>
              <h1>Welcome, {user?.name}!</h1>
              <p>Your email: {user?.email}</p>
            </Grid2>
          </Grid2>
          
          <TodoList />
        </div>
      ) : (
        <div>
          <Grid2 container>
            <Grid2 size={2}>
            </Grid2>
            <Grid2 size={8} container justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
              <h1>Welcome to the ToDo App!</h1>
              <p>Please log in to manage your tasks.</p>
            </Grid2>
          </Grid2>
          
        </div>
      )}
    </Wrapper>
  );
};

export default Home;
